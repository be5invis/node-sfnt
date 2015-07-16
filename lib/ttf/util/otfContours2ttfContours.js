/**
 * @file otf轮廓转ttf轮廓
 * @author mengke01(kekee000@gmail.com)
 */



        var bezierCubic2Q2 = require('../../math/bezierCubic2Q2');
        var pathCeil = require('../../graphics/pathCeil');

        /**
         * 转换轮廓
         * @param  {Array} otfContour otf轮廓
         * @return {Array}            ttf轮廓
         */
        function transformContour(otfContour) {
            var contour = [];
            var prevPoint;
            var curPoint;
            var nextPoint;
            var nextNextPoint;

            contour.push(prevPoint = otfContour[0]);
            for (var i = 1, l = otfContour.length; i < l; i++) {
                curPoint = otfContour[i];

                if (curPoint.onCurve) {
                    contour.push(curPoint);
                    prevPoint = curPoint;
                }
                // 三次bezier曲线
                else {
                    nextPoint =  otfContour[i + 1];
                    nextNextPoint =  i === l - 2 ? otfContour[0] : otfContour[i + 2];
                    var bezierArray = bezierCubic2Q2(prevPoint, curPoint, nextPoint, nextNextPoint);
                    for(var j = 0; j < bezierArray.length; j++){
                        bezierArray[j][2].onCurve = true;
                        contour.push(bezierArray[j][1]);
                        contour.push(bezierArray[j][2]);
                    }

                    prevPoint = nextNextPoint;
                    i += 2;
                }
            }
            // NOTE: Standard direction differs from CFF OTF and Truetype, we should perform a reversion.
            // (A better solution should be correcting every contour. it is a TO-DO so far.)
            return pathCeil(contour).reverse();
        }


        /**
         * otf轮廓转ttf轮廓
         * @param  {Array} otfContours otf轮廓数组
         * @return {Array} ttf轮廓
         */
        function otfContours2ttfContours(otfContours) {
            if (!otfContours || !otfContours.length) {
                return otfContours;
            }
            var contours = [];
            for (var i = 0, l = otfContours.length; i < l; i++) {

                // 这里可能由于转换错误导致空轮廓，需要去除
                if (otfContours[i][0]) {
                    contours.push(transformContour(otfContours[i]));
                }
            }

            return contours;
        }

        module.exports = otfContours2ttfContours;
    
