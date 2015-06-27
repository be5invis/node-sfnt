/**
 * @file maxp 表
 * @author mengke01(kekee000@gmail.com)
 */
        function SUM(x, y){ return x + y }
        function statGlyf(glyf, j) {
            var stats = {
                contours: 0,
                points: 0,
                depth: 0,
                numComponentElements: 0
            };
            if(glyf[j].compound) {
                stats.contours = 0;
                stats.points = 0;
                stats.numComponentElements = glyf[j].glyfs.length;
                for(var component = 0; component < glyf[j].glyfs.length; component++) {
                    var componentStats = statGlyf(glyf, glyf[j].glyfs[component].glyphIndex);
                    stats.contours += componentStats.contours;
                    stats.points += componentStats.points;
                    stats.depth = Math.max(stats.depth, componentStats.depth)
                }
            } else {
                stats.contours = glyf[j].contours.length;
                stats.points = glyf[j].contours.map(function(c){ return c.length }).reduce(SUM, 0)
            };
            return stats;
        }
        function statGlyfs(ttf){
            var numGlyphs = ttf.glyf.length;
            var maxContours = 0, 
                maxPoints = 0, 
                maxCompositeContours = 0, 
                maxCompositePoints = 0,
                maxComponentElements = 0,
                maxComponentDepth = 0;
            for(var j = 0; j < numGlyphs; j++) if(ttf.glyf[j]) {
                var stats = statGlyf(ttf.glyf, j);
                if(ttf.glyf[j].compound) {
                    maxCompositeContours = Math.max(maxCompositeContours, stats.contours);
                    maxCompositePoints = Math.max(maxCompositePoints, stats.points);
                    maxComponentElements = Math.max(maxComponentElements, stats.numComponentElements);
                    maxComponentDepth = Math.max(maxComponentDepth, stats.depth);
                } else {
                    maxContours = Math.max(maxContours, stats.contours);
                    maxPoints = Math.max(maxPoints, stats.points);
                }
            }
            this.numGlyphs = numGlyphs;
            this.maxContours = maxContours;
            this.maxPoints = maxPoints;
            this.maxCompositeContours = maxCompositeContours;
            this.maxCompositePoints = maxCompositePoints;
            this.maxComponentElements = maxComponentElements;
            this.maxComponentDepth = maxComponentDepth;
        }

        var table = require('./table');
        var struct = require('./struct');
        var maxp = table.create(
            'maxp',
            [
                ['version', struct.Fixed],
                ['numGlyphs', struct.Uint16],
                ['maxPoints', struct.Uint16],
                ['maxContours', struct.Uint16],
                ['maxCompositePoints', struct.Uint16],
                ['maxCompositeContours', struct.Uint16],
                ['maxZones', struct.Uint16],
                ['maxTwilightPoints', struct.Uint16],
                ['maxStorage', struct.Uint16],
                ['maxFunctionDefs', struct.Uint16],
                ['maxInstructionDefs', struct.Uint16],
                ['maxStackElements', struct.Uint16],
                ['maxSizeOfInstructions', struct.Uint16],
                ['maxComponentElements', struct.Uint16],
                ['maxComponentDepth', struct.Int16]
            ],
            {
                // TODO: Actually re-stat glyphs.
                write: function (writer, ttf) {
                    statGlyfs.call(this, ttf);
                    table.write.call(this, writer, ttf.support);
                    return writer;
                },

                size: function (ttf) {
                    return 32;
                }
            }
        );

        module.exports = maxp;
    
