/**
 * @file 缩减glyf大小，去除冗余节点
 * @author mengke01(kekee000@gmail.com)
 */




        var reducePath = require('../../graphics/reducePath');

        /**
         * 缩减glyf，去除冗余节点
         *
         * @param {Object} glyf glyf对象
         * @return {Object} glyf对象
         */
        function reduceGlyf(glyf) {

            var contours = glyf.contours;
            var contour;
            for (var j = contours.length - 1; j >= 0; j--) {
                contour = reducePath(contours[j]);

                // 空轮廓
                if (contour.length <= 2) {
                    contours.splice(j, 1);
                    continue;
                }
            }

            if (0 === glyf.contours.length) {
                delete glyf.contours;
            }

            return glyf;
        }

        module.exports = reduceGlyf;
    
