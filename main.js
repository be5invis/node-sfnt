/**
 * @file main.js
 * @author mengke01
 * @date
 * @description
 * ttf模块的导出函数
 */

module.exports = {
    TTFReader: require('./lib/ttf/ttfreader'),
    TTFWriter: require('./lib/ttf/ttfwriter'),
    Reader: require('./lib/ttf/reader'),
    Writer: require('./lib/ttf/writer'),
    OTFReader: require('./lib/ttf/otfreader'),
    otf2ttfobject: require('./lib/ttf/otf2ttfobject')
};
