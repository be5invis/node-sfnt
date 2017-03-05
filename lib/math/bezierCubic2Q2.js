/**
 * @file 三次贝塞尔转二次贝塞尔
 * @author mengke01(kekee000@gmail.com)
 *
 * references:
 * https://github.com/search?utf8=%E2%9C%93&q=svg2ttf
 * http://www.caffeineowl.com/graphics/2d/vectorial/cubic2quad01.html
 *
 */

function findIntersection(p1, c1, c2, p2) {
    var d1 = { x: c1.x - p1.x, y: c1.y - p1.y }
    var d2 = { x: c2.x - p2.x, y: c2.y - p2.y }

    var det = d2.x * d1.y - d2.y * d1.x;
    if (Math.abs(det) < 1e-6) return null;
    var u = ((p2.y - p1.y) * d2.x - (p2.x - p1.x) * d2.y) / det
    var v = ((p2.y - p1.y) * d1.x - (p2.x - p1.x) * d1.y) / det
    if (u <= 0 || v <= 0) return null;
    return {
        x: p1.x + d1.x * u,
        y: p1.y + d1.y * u
    }
}

function toQuad(p1, c1, c2, p2) {
    var pt = findIntersection(p1, c1, c2, p2);
    if (!pt) pt = {
        x: (p1.x + p2.x) / 2,
        y: (p1.y + p2.y) / 2
    }
    return [p1, pt, p2]
}


/**
 * 三次贝塞尔转二次贝塞尔
 *
 * @param {Object} p1 开始点
 * @param {Object} c1 控制点1
 * @param {Object} c2 控制点2
 * @param {Object} p2 结束点
 * @return {Array} 二次贝塞尔控制点
 */
function bezierCubic2Q2(p1, c1, c2, p2, level) {
    level = level || 0;

    // 判断极端情况，控制点和起止点一样
    if (p1.x === c1.x && p1.y === c1.y && c2.x === p2.x && c2.y === p2.y) {
        return [
            [
                p1,
                {
                    x: (p1.x + p2.x) / 2,
                    y: (p1.y + p2.y) / 2
                },
                p2
            ]
        ];
    }


    var mx = p2.x - 3 * c2.x + 3 * c1.x - p1.x;
    var my = p2.y - 3 * c2.y + 3 * c1.y - p1.y;

    // control points near
    if (mx * mx + my * my <= 16 || level > 4) {
        return [
            toQuad(p1, c1, c2, p2)
        ];
    }

    // Split to 2 qubic beziers by midpoints
    // (p2 + 3*c2 + 3*c1 + p1)/8
    var mp = {
        x: (p2.x + 3 * c2.x + 3 * c1.x + p1.x) / 8,
        y: (p2.y + 3 * c2.y + 3 * c1.y + p1.y) / 8

    };

    return bezierCubic2Q2(
        p1,
        {
            x: (p1.x + c1.x) / 2,
            y: (p1.y + c1.y) / 2

        },
        {
            x: (p1.x + 2 * c1.x + c2.x) / 4,
            y: (p1.y + 2 * c1.y + c2.y) / 4
        },
        mp,
        level + 1
    ).concat(bezierCubic2Q2(
        mp,
        {
            x: (p2.x + c1.x + 2 * c2.x) / 4,
            y: (p2.y + c1.y + 2 * c2.y) / 4

        },
        {
            x: (p2.x + c2.x) / 2,
            y: (p2.y + c2.y) / 2
        },
        p2,
        level + 1
    ))
}

module.exports = bezierCubic2Q2;

