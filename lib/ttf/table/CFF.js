/**
 * @file cff表
 * @author mengke01(kekee000@gmail.com)
 *
 * reference:
 * http://wwwimages.adobe.com/content/dam/Adobe/en/devnet/font/pdfs/5176.CFF.pdf
 *
 * modify from:
 * https://github.com/nodebox/opentype.js/blob/master/src/tables/cff.js
 */
var table = require('./table');
var string = require('../util/string');
var encoding = require('./cff/encoding');
var parseCFFDict = require('./cff/parseCFFDict');
var parseCFFGlyph = require('./cff/parseCFFGlyph');
var parseCFFCharset = require('./cff/parseCFFCharset');
var parseCFFEncoding = require('./cff/parseCFFEncoding');
var Reader = require('../reader');

/**
 * 获取cff偏移
 * @param  {Reader} reader  读取器
 * @param  {number} offSize 偏移大小
 * @param  {number} offset  起始偏移
 * @return {number}         偏移
 */
function getOffset(reader, offSize) {
	var v = 0;
	for (var i = 0; i < offSize; i++) {
		v <<= 8;
		v += reader.readUint8();
	}
	return v;
}

/**
 * 解析cff表头部
 * @param  {Reader} reader 读取器
 * @return {Object}        头部字段
 */
function parseCFFHead(reader) {
	var head = {};
	head.startOffset = reader.offset;
	head.endOffset = head.startOffset + 4;
	head.formatMajor = reader.readUint8();
	head.formatMinor = reader.readUint8();
	head.size = reader.readUint8();
	head.offsetSize = reader.readUint8();
	return head;
}

/**
 * 解析`CFF`表索引
 * @param  {Reader} reader       读取器
 * @param  {number} offset       偏移
 * @param  {Funciton} conversionFn 转换函数
 * @return {Object}              表对象
 */
function parseCFFIndex(reader, offset, conversionFn) {
	if (offset) {
		reader.seek(offset);
	}
	var start = reader.offset;
	var offsets = [];
	var objects = [];
	var count = reader.readUint16();
	var i;
	var l;
	if (count !== 0) {
		var offsetSize = reader.readUint8();
		for (i = 0, l = count + 1; i < l; i++) {
			offsets.push(getOffset(reader, offsetSize));
		}

		for (i = 0, l = count; i < l; i++) {
			var value = reader.readBytes(offsets[i + 1] - offsets[i]);
			if (conversionFn) {
				value = conversionFn(value);
			}
			objects.push(value);
		}
	}

	return {
		objects: objects,
		startOffset: start,
		endOffset: reader.offset
	};
}
/**
 * Parse CID FDSelect entries
 */
function parseCFFFDSelect(reader, offset, nGlyphs, fdArrayCount) {
	if (offset) {
		reader.seek(offset);
	}
	var fdSelect = []; // returned result
	var format, iGid, fdIndex, nRanges, iRange, first, next;

	format = reader.readUint8();

	switch (format) {
		case 0: // simple list of nGlyphs elements
			for (iGid = 0; iGid < nGlyphs; iGid++) {
				fdIndex = reader.readUint8();
				if (fdIndex >= fdArrayCount)
					throw new Error('CFF table CID Font FDSelect has bad FD index value %d (FD count %d)',
						fdIndex, fdArrayCount);
				fdSelect.push(fdIndex);
			}
			break;
		case 3: // ranges
			nRanges = reader.readUint16();
			first = reader.readUint16();
			if (first !== 0)
				throw new Error('CFF Table CID Font FDSelect format 3 range has bad initial GID ' + first);
			for (iRange = 0; iRange < nRanges; iRange++) {
				fdIndex = reader.readUint8();
				next = reader.readUint16();
				if (fdIndex >= fdArrayCount)
					throw new Error('CFF table CID Font FDSelect has bad FD index value %d (FD count %d)',
						fdIndex, fdArrayCount);
				if (next > nGlyphs)
					throw new Error('CFF Table CID Font FDSelect format 3 range has bad GID ' + next);
				for (; first < next; first++)
					fdSelect.push(fdIndex);
				first = next;
			}
			if (next !== nGlyphs)
				throw new Error('CFF Table CID Font FDSelect format 3 range has bad final GID ' + next);
			break;
		default:
			throw new Error('CFF Table CID Font FDSelect table has invalid format ' + format);
	}
	return fdSelect;
}
// Subroutines are encoded using the negative half of the number space.
// See type 2 chapter 4.7 "Subroutine operators".
function calcCFFSubroutineBias(subrs) {
	var bias;
	if (subrs.length < 1240) {
		bias = 107;
	} else if (subrs.length < 33900) {
		bias = 1131;
	} else {
		bias = 32768;
	}
	return bias;
}


function gatherTopDicts(reader, offset, dicts, strings){
	var tds = [];
	for(var j = 0; j < dicts.length; j++){
		var dictReader = new Reader(new Uint8Array(dicts[j]).buffer);
		var dict = parseCFFDict.parseTopDict(
			dictReader,
			0,
			dictReader.length,
			strings
		);
		dict.subrs = [];
		dict.subrsBias = 0;
		dict.defaultWidthX = 0;
		dict.nominalWidthX = 0;
		
		var privateSize = dict.private[0];
		var privateOffset = dict.private[1];
		if ( privateSize !== 0  &&  privateOffset !== 0 ) {
			privateOffset += offset;
			var privateDict = parseCFFDict.parsePrivateDict(
				reader,
				privateOffset,
				privateSize,
				strings
			);
			dict.defaultWidthX = privateDict.defaultWidthX;
			dict.nominalWidthX = privateDict.nominalWidthX;
			
			tds.privateDict = privateDict;
			
			if(privateDict.subrs){
				var subrOffset = privateOffset + privateDict.subrs;
				var subrIndex = parseCFFIndex(reader, subrOffset);
				var subrs = subrIndex.objects;
				var subrsBias = calcCFFSubroutineBias(subrs);
				
				dict.subrs = subrs;
				dict.subrsBias = subrsBias;
			}
		}
		tds.push(dict);
	}
	return tds;
}

var cff = table.create(
	'cff', [], {
		read: function(reader, font) {
			var offset = this.offset;
			reader.seek(offset);

			var head = parseCFFHead(reader);
			var nameIndex = parseCFFIndex(reader, head.endOffset, string.getString);
			var topDictIndex = parseCFFIndex(reader, nameIndex.endOffset);
			var stringIndex = parseCFFIndex(reader, topDictIndex.endOffset, string.getString);
			var globalSubrIndex = parseCFFIndex(reader, stringIndex.endOffset);

			var cff = {
				head: head
			};

			// 全局子glyf数据
			cff.gsubrs = globalSubrIndex.objects;
			cff.gsubrsBias = calcCFFSubroutineBias(globalSubrIndex.objects);

			var tds = gatherTopDicts(reader, offset, topDictIndex.objects, stringIndex.objects);
			var topDict = cff.topDict = tds[0];
			cff.defaultWidthX = topDict.defaultWidthX;
			cff.nominalWidthX = topDict.nominalWidthX;
			cff.privateDict = topDict.privateDict || {};
			cff.subrs = topDict.subrs || {};
			cff.subrsBias = topDict.subrsBias || 0;
			
			cff.isCID = topDict.ROS[0] || topDict.ROS[1];
			


			// 解析glyf数据和名字
			var charStringsIndex = parseCFFIndex(reader, offset + topDict.charStrings);
			var nGlyphs = charStringsIndex.objects.length;
			cff.charset = parseCFFCharset(reader, offset + topDict.charset, nGlyphs, stringIndex.objects);
			
			if(cff.isCID){
				var fdArrayOffset  = offset + topDict.FDArray;
				var fdSelectOffset = offset + topDict.FDSelect;
				var fdArrayIndex = parseCFFIndex(reader, fdArrayOffset);
				//console.log(fdArrayIndex);
				var fdArray = gatherTopDicts(reader, offset, fdArrayIndex.objects, stringIndex.objects);
				var fdSelect = parseCFFFDSelect(reader, fdSelectOffset, nGlyphs, fdArray.length);
				cff.fdArray = fdArray;
				cff.fdSelect = fdSelect;
			}
			
			// Standard encoding
			if (topDict.encoding === 0) {
				cff.encoding = encoding.standardEncoding;
			}
			// Expert encoding
			else if (topDict.encoding === 1) {
				cff.encoding = encoding.expertEncoding;
			} else {
				cff.encoding = parseCFFEncoding(reader, offset + topDict.encoding);
			}

			cff.glyf = [];
			for (var i = 0, l = nGlyphs; i < l; i++) {
				var glyf = parseCFFGlyph(charStringsIndex.objects[i], cff, i);
				glyf.name = cff.charset[i];
				cff.glyf.push(glyf);
			}

			return cff;
		},

		write: function(writer, font) {
			throw 'not support write cff table';
		},

		size: function(font) {
			throw 'not support get cff table size';
		}
	}
);

module.exports = cff;