/**
 * @file OS/2表
 * @author mengke01(kekee000@gmail.com)
 *
 * http://www.microsoft.com/typography/otspec/os2.htm
 */

// Unicode ragnes
// ref: https://www.microsoft.com/typography/otspec/os2.htm#ur
var ranges = {
    '0': [[0x0000,0x007F]],
    '1': [[0x0080,0x00FF]],
    '2': [[0x0100,0x017F]],
    '3': [[0x0180,0x024F]],
    '4': [[0x0250,0x02AF],[0x1D00,0x1D7F],[0x1D80,0x1DBF]],
    '5': [[0x02B0,0x02FF],[0xA700,0xA71F]],
    '6': [[0x0300,0x036F],[0x1DC0,0x1DFF]],
    '7': [[0x0370,0x03FF]],
    '8': [[0x2C80,0x2CFF]],
    '9': [[0x0400,0x04FF],[0x0500,0x052F],[0x2DE0,0x2DFF],[0xA640,0xA69F]],
    '10': [[0x0530,0x058F]],
    '11': [[0x0590,0x05FF]],
    '12': [[0xA500,0xA63F]],
    '13': [[0x0600,0x06FF],[0x0750,0x077F]],
    '14': [[0x07C0,0x07FF]],
    '15': [[0x0900,0x097F]],
    '16': [[0x0980,0x09FF]],
    '17': [[0x0A00,0x0A7F]],
    '18': [[0x0A80,0x0AFF]],
    '19': [[0x0B00,0x0B7F]],
    '20': [[0x0B80,0x0BFF]],
    '21': [[0x0C00,0x0C7F]],
    '22': [[0x0C80,0x0CFF]],
    '23': [[0x0D00,0x0D7F]],
    '24': [[0x0E00,0x0E7F]],
    '25': [[0x0E80,0x0EFF]],
    '26': [[0x10A0,0x10FF],[0x2D00,0x2D2F]],
    '27': [[0x1B00,0x1B7F]],
    '28': [[0x1100,0x11FF]],
    '29': [[0x1E00,0x1EFF],[0x2C60,0x2C7F],[0xA720,0xA7FF]],
    '30': [[0x1F00,0x1FFF]],
    '31': [[0x2000,0x206F],[0x2E00,0x2E7F]],
    '32': [[0x2070,0x209F]],
    '33': [[0x20A0,0x20CF]],
    '34': [[0x20D0,0x20FF]],
    '35': [[0x2100,0x214F]],
    '36': [[0x2150,0x218F]],
    '37': [[0x2190,0x21FF],[0x27F0,0x27FF],[0x2900,0x297F],[0x2B00,0x2BFF]],
    '38': [[0x2200,0x22FF],[0x2A00,0x2AFF],[0x27C0,0x27EF],[0x2980,0x29FF]],
    '39': [[0x2300,0x23FF]],
    '40': [[0x2400,0x243F]],
    '41': [[0x2440,0x245F]],
    '42': [[0x2460,0x24FF]],
    '43': [[0x2500,0x257F]],
    '44': [[0x2580,0x259F]],
    '45': [[0x25A0,0x25FF]],
    '46': [[0x2600,0x26FF]],
    '47': [[0x2700,0x27BF]],
    '48': [[0x3000,0x303F]],
    '49': [[0x3040,0x309F]],
    '50': [[0x30A0,0x30FF],[0x31F0,0x31FF]],
    '51': [[0x3100,0x312F],[0x31A0,0x31BF]],
    '52': [[0x3130,0x318F]],
    '53': [[0xA840,0xA87F]],
    '54': [[0x3200,0x32FF]],
    '55': [[0x3300,0x33FF]],
    '56': [[0xAC00,0xD7AF]],
    '57': [[0xD800,0xDFFF]],
    '58': [[0x10900,0x1091F]],
    '59': [[0x4E00,0x9FFF],[0x2E80,0x2EFF],[0x2F00,0x2FDF],[0x2FF0,0x2FFF],[0x3400,0x4DBF],[0x20000,0x2A6DF],[0x3190,0x319F]],
    '60': [[0xE000,0xF8FF]],
    '61': [[0x31C0,0x31EF],[0xF900,0xFAFF],[0x2F800,0x2FA1F]],
    '62': [[0xFB00,0xFB4F]],
    '63': [[0xFB50,0xFDFF]],
    '64': [[0xFE20,0xFE2F]],
    '65': [[0xFE10,0xFE1F],[0xFE30,0xFE4F]],
    '66': [[0xFE50,0xFE6F]],
    '67': [[0xFE70,0xFEFF]],
    '68': [[0xFF00,0xFFEF]],
    '69': [[0xFFF0,0xFFFF]],
    '70': [[0x0F00,0x0FFF]],
    '71': [[0x0700,0x074F]],
    '72': [[0x0780,0x07BF]],
    '73': [[0x0D80,0x0DFF]],
    '74': [[0x1000,0x109F]],
    '75': [[0x1200,0x137F],[0x1380,0x139F],[0x2D80,0x2DDF]],
    '76': [[0x13A0,0x13FF]],
    '77': [[0x1400,0x167F]],
    '78': [[0x1680,0x169F]],
    '79': [[0x16A0,0x16FF]],
    '80': [[0x1780,0x17FF],[0x19E0,0x19FF]],
    '81': [[0x1800,0x18AF]],
    '82': [[0x2800,0x28FF]],
    '83': [[0xA000,0xA48F],[0xA490,0xA4CF]],
    '84': [[0x1700,0x171F],[0x1720,0x173F],[0x1740,0x175F],[0x1760,0x177F]],
    '85': [[0x10300,0x1032F]],
    '86': [[0x10330,0x1034F]],
    '87': [[0x10400,0x1044F]],
    '88': [[0x1D000,0x1D0FF],[0x1D100,0x1D1FF],[0x1D200,0x1D24F]],
    '89': [[0x1D400,0x1D7FF]],
    '90': [[0xFF000,0xFFFFD],[0x100000,0x10FFFD]],
    '91': [[0xFE00,0xFE0F],[0xE0100,0xE01EF]],
    '92': [[0xE0000,0xE007F]],
    '93': [[0x1900,0x194F]],
    '94': [[0x1950,0x197F]],
    '95': [[0x1980,0x19DF]],
    '96': [[0x1A00,0x1A1F]],
    '97': [[0x2C00,0x2C5F]],
    '98': [[0x2D30,0x2D7F]],
    '99': [[0x4DC0,0x4DFF]],
    '100': [[0xA800,0xA82F]],
    '101': [[0x10000,0x1007F],[0x10080,0x100FF],[0x10100,0x1013F]],
    '102': [[0x10140,0x1018F]],
    '103': [[0x10380,0x1039F]],
    '104': [[0x103A0,0x103DF]],
    '105': [[0x10450,0x1047F]],
    '106': [[0x10480,0x104AF]],
    '107': [[0x10800,0x1083F]],
    '108': [[0x10A00,0x10A5F]],
    '109': [[0x1D300,0x1D35F]],
    '110': [[0x12000,0x123FF],[0x12400,0x1247F]],
    '111': [[0x1D360,0x1D37F]],
    '112': [[0x1B80,0x1BBF]],
    '113': [[0x1C00,0x1C4F]],
    '114': [[0x1C50,0x1C7F]],
    '115': [[0xA880,0xA8DF]],
    '116': [[0xA900,0xA92F]],
    '117': [[0xA930,0xA95F]],
    '118': [[0xAA00,0xAA5F]],
    '119': [[0x10190,0x101CF]],
    '120': [[0x101D0,0x101FF]],
    '121': [[0x102A0,0x102DF],[0x10280,0x1029F],[0x10920,0x1093F]],
    '122': [[0x1F030,0x1F09F],[0x1F000,0x1F02F]],
};
function b2ul(a){
    var r = 0
    for(var k = a.length - 1; k >= 0; k--){
        r = r << 1 | a[k]
    };
    return r;
}
var bitmap = [] 
for(var bit in ranges) {
    var record = ranges[bit];
    for(var j = 0; j < record.length; j++) for(var c = record[j][0]; c <= record[j][1]; c++) {
        bitmap[c] = bit - 0;
    }
}

        var table = require('./table');
        var struct = require('./struct');
        var lang = require('../../common/lang');
        var computeBoundingBox = require('../../graphics/computeBoundingBox');

        var OS2 = table.create(
            'OS/2',
            [
                ['version', struct.Uint16],

                ['xAvgCharWidth', struct.Int16],
                ['usWeightClass', struct.Uint16],
                ['usWidthClass', struct.Uint16],

                ['fsType', struct.Uint16],

                ['ySubscriptXSize', struct.Uint16],
                ['ySubscriptYSize', struct.Uint16],
                ['ySubscriptXOffset', struct.Uint16],
                ['ySubscriptYOffset', struct.Uint16],

                ['ySuperscriptXSize', struct.Uint16],
                ['ySuperscriptYSize', struct.Uint16],
                ['ySuperscriptXOffset', struct.Uint16],
                ['ySuperscriptYOffset', struct.Uint16],

                ['yStrikeoutSize', struct.Uint16],
                ['yStrikeoutPosition', struct.Uint16],

                ['sFamilyClass', struct.Uint16],

                // Panose
                ['bFamilyType', struct.Uint8],
                ['bSerifStyle', struct.Uint8],
                ['bWeight', struct.Uint8],
                ['bProportion', struct.Uint8],
                ['bContrast', struct.Uint8],
                ['bStrokeVariation', struct.Uint8],
                ['bArmStyle', struct.Uint8],
                ['bLetterform', struct.Uint8],
                ['bMidline', struct.Uint8],
                ['bXHeight', struct.Uint8],

                // unicode range
                ['ulUnicodeRange1', struct.Uint32],
                ['ulUnicodeRange2', struct.Uint32],
                ['ulUnicodeRange3', struct.Uint32],
                ['ulUnicodeRange4', struct.Uint32],

                // char 4
                ['achVendID', struct.String, 4],

                ['fsSelection', struct.Uint16],
                ['usFirstCharIndex', struct.Uint16],
                ['usLastCharIndex', struct.Uint16],

                ['sTypoAscender', struct.Int16],
                ['sTypoDescender', struct.Int16],
                ['sTypoLineGap', struct.Int16],

                ['usWinAscent', struct.Uint16],
                ['usWinDescent', struct.Uint16],
                // version 0 above 39

                ['ulCodePageRange1', struct.Uint32],
                ['ulCodePageRange2', struct.Uint32],
                // version 1 above 41

                ['sxHeight', struct.Int16],
                ['sCapHeight', struct.Int16],

                ['usDefaultChar', struct.Uint16],
                ['usBreakChar', struct.Uint16],
                ['usMaxContext', struct.Uint16]
                // version 2,3,4 above 46
            ],
            {

                read: function (reader, ttf) {
                    var format = reader.readUint16(this.offset);
                    var struct = this.struct;

                    // format2
                    if (format === 0) {
                        struct = struct.slice(0, 39);
                    }
                    else if (format === 1) {
                        struct = struct.slice(0, 41);
                    }

                    var OS2Head = table.create('os2head', struct);
                    var tbl = new OS2Head(this.offset).read(reader, ttf);

                    // 补齐其他version的字段
                    var os2Fields = {
                        ulCodePageRange1: 1,
                        ulCodePageRange2: 0,
                        sxHeight: 0,
                        sCapHeight: 0,
                        usDefaultChar: 0,
                        usBreakChar: 32,
                        usMaxContext: 0
                    };

                    return lang.extend(os2Fields, tbl);
                },

                size: function (ttf) {

                    // 更新其他表的统计信息
                    // header
                    var xMin = 16384;
                    var yMin = 16384;
                    var xMax = -16384;
                    var yMax = -16384;

                    // hhea
                    var advanceWidthMax = -1;
                    var minLeftSideBearing = 16384;
                    var minRightSideBearing = 16384;
                    var xMaxExtent = -16384;

                    // os2 count
                    var xAvgCharWidth = 0;
                    var usFirstCharIndex = 0x10FFFF;
                    var usLastCharIndex = -1;

                    // maxp
                    var maxPoints = 0;
                    var maxContours = 0;
                    var maxCompositePoints = 0;
                    var maxCompositeContours = 0;
                    var maxSizeOfInstructions = 0;
                    var maxComponentElements = 0;

                    var glyfNotEmpty = 0; // 非空glyf
                    var hinting = ttf.writeOptions.hinting;

                    // 计算instructions和functiondefs
                    if (hinting) {

                        if (ttf.cvt) {
                            maxSizeOfInstructions = Math.max(maxSizeOfInstructions, ttf.cvt.length);
                        }

                        if (ttf.prep) {
                            maxSizeOfInstructions = Math.max(maxSizeOfInstructions, ttf.prep.length);
                        }

                        if (ttf.fpgm) {
                            maxSizeOfInstructions = Math.max(maxSizeOfInstructions, ttf.fpgm.length);
                        }

                    }


                    ttf.glyf.forEach(function (glyf, index) {

                        // 统计control point信息
                        if (glyf.compound) {
                            var compositeContours = 0;
                            var compositePoints = 0;
                            glyf.glyfs.forEach(function (g) {
                                var cglyf = ttf.glyf[g.glyphIndex];
                                compositeContours += cglyf.contours ? cglyf.contours.length : 0;
                                if (cglyf.contours && cglyf.contours.length) {
                                    cglyf.contours.forEach(function (contour) {
                                        compositePoints += contour.length;
                                    });
                                }

                            });

                            maxComponentElements++;
                            maxCompositePoints = Math.max(maxCompositePoints, compositePoints);
                            maxCompositeContours = Math.max(maxCompositeContours, compositeContours);
                        }
                        // 简单图元
                        else if (glyf.contours && glyf.contours.length) {
                            maxContours = Math.max(maxContours, glyf.contours.length);

                            var points = 0;
                            glyf.contours.forEach(function (contour) {
                                points += contour.length;
                            });
                            maxPoints = Math.max(maxPoints, points);
                        }

                        if (hinting && glyf.instructions) {
                            maxSizeOfInstructions = Math.max(maxSizeOfInstructions, glyf.instructions.length);
                        }

                        // 统计边界信息
                        if (glyf.compound || glyf.contours && glyf.contours.length) {
                            
                            // Recalculate glyph bouonding boxes
                            if(glyf.contours && glyf.contours.length){
                                var bound = computeBoundingBox.computePathBox.apply(this, glyf.contours);
                                glyf.xMin = Math.round(bound.x);
                                glyf.xMax = Math.round(bound.x + bound.width);
                                glyf.yMin = Math.round(bound.y);
                                glyf.yMax = Math.round(bound.y + bound.height);
                                glyf.leftSideBearing = glyf.xMin;
                            }

                            if (glyf.xMin < xMin) {
                                xMin = glyf.xMin;
                            }

                            if (glyf.yMin < yMin) {
                                yMin = glyf.yMin;
                            }

                            if (glyf.xMax > xMax) {
                                xMax = glyf.xMax;
                            }

                            if (glyf.yMax > yMax) {
                                yMax = glyf.yMax;
                            }

                            advanceWidthMax = Math.max(advanceWidthMax, glyf.advanceWidth);
                            minLeftSideBearing = Math.min(minLeftSideBearing, glyf.leftSideBearing);
                            minRightSideBearing = Math.min(minRightSideBearing, glyf.advanceWidth - glyf.xMax);
                            xMaxExtent = Math.max(xMaxExtent, glyf.xMax);

                            xAvgCharWidth += glyf.advanceWidth;

                            glyfNotEmpty++;
                        }

                        var unicodes = glyf.unicode;

                        if (typeof glyf.unicode === 'number') {
                            unicodes = [glyf.unicode];
                        }

                        if (Array.isArray(unicodes)) {
                            unicodes.forEach(function (unicode) {
                                if (unicode !== 0xFFFF) {
                                    usFirstCharIndex = Math.min(usFirstCharIndex, unicode);
                                    usLastCharIndex = Math.max(usLastCharIndex, unicode);
                                }
                            });
                        }
                    });

                    // 重新设置version 4
                    if(!ttf.writeOptions.preserveOS2Version) { ttf['OS/2'].version = 0x4 }
                    ttf['OS/2'].achVendID = (ttf['OS/2'].achVendID + '    ').slice(0, 4);
                    if(ttf.writeOptions.preserveXAvgCharWidth) {
                        ttf['OS/2'].xAvgCharWidth = xAvgCharWidth / (glyfNotEmpty || 1);
                    }

                    var unicoderanges = new Array(128);
                    for(var j = 0; j < unicoderanges.length; j++) unicoderanges[j] = 0;
                    for(var j = 0; j < ttf.glyf.length; j++) if(ttf.glyf[j].unicode) {
                        for(var k = 0; k < ttf.glyf[j].unicode.length; k++) if(bitmap[ttf.glyf[j].unicode[k]] >= 0) {
                            unicoderanges[bitmap[ttf.glyf[j].unicode[k]]] = 1
                        }
                    }
                    ttf['OS/2'].ulUnicodeRange1 = b2ul(unicoderanges.slice(0, 32));
                    ttf['OS/2'].ulUnicodeRange2 = b2ul(unicoderanges.slice(32, 64));
                    ttf['OS/2'].ulUnicodeRange3 = b2ul(unicoderanges.slice(64, 96));
                    ttf['OS/2'].ulUnicodeRange4 = b2ul(unicoderanges.slice(96, 128));
                    
                    ttf['OS/2'].usFirstCharIndex = usFirstCharIndex;
                    ttf['OS/2'].usLastCharIndex = usLastCharIndex;

                    // rewrite hhea
                    ttf.hhea.version = ttf.hhea.version || 0x1;
                    ttf.hhea.advanceWidthMax = advanceWidthMax;
                    ttf.hhea.minLeftSideBearing = minLeftSideBearing;
                    ttf.hhea.minRightSideBearing = minRightSideBearing;
                    ttf.hhea.xMaxExtent = xMaxExtent;

                    // rewrite head
                    ttf.head.version = ttf.head.version || 0x1;
                    ttf.head.lowestRecPPEM = ttf.head.lowestRecPPEM || 0x8;
                    ttf.head.xMin = xMin;
                    ttf.head.yMin = yMin;
                    ttf.head.xMax = xMax;
                    ttf.head.yMax = yMax;

                    // 这里根据存储的maxp来设置新的maxp，避免重复计算maxp
                    ttf.maxp = ttf.maxp || {};
                    ttf.support.maxp = {
                        version: 1.0,
                        numGlyphs: ttf.glyf.length,
                        maxPoints: maxPoints,
                        maxContours: maxContours,
                        maxCompositePoints: maxCompositePoints,
                        maxCompositeContours: maxCompositeContours,
                        maxZones: ttf.maxp.maxZones || 0,
                        maxTwilightPoints: ttf.maxp.maxTwilightPoints || 0,
                        maxStorage: ttf.maxp.maxStorage || 0,
                        maxFunctionDefs: ttf.maxp.maxFunctionDefs || 0,
                        maxStackElements: ttf.maxp.maxStackElements || 0,
                        maxSizeOfInstructions: maxSizeOfInstructions,
                        maxComponentElements: maxComponentElements,
                        maxComponentDepth: maxComponentElements ? 1 : 0
                    };

                    return table.size.call(this, ttf);
                }
            }
        );

        module.exports = OS2;
    
