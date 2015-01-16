/**
* Created by scarratt on 16/01/2015.
*/


require("mocha");
require("should");
delete require.cache[require.resolve("../")];

var blockStatementMerger = require("../src/block-statement-merger"),
	_ = require('lodash');

describe("block statement merger", function () {
	var targetBlock = [1, 2, 3, 4],
		sourceBlock = [5, 6, 7];


	it('should merge array at index 0 of target array', function() {
		var mergedArrays = blockStatementMerger(targetBlock, 0, sourceBlock);

		mergedArrays.should.match([5, 6, 7, 2, 3, 4]);
	});

	it ('should merge array at index in middle of target array', function () {
		var mergedArrays = blockStatementMerger(targetBlock, 2, sourceBlock);

		mergedArrays.should.match([ 1, 2, 5, 6, 7, 4]);
	});

	it ('should merge array at end of target array', function () {
		var mergedArrays = blockStatementMerger(targetBlock, targetBlock.length-1, sourceBlock);

		mergedArrays.should.match([ 1, 2, 3, 5, 6, 7]);
	});

	it ('should handle target array of length 1', function() {
		var mergedArrays = blockStatementMerger([1], 0, sourceBlock);

		mergedArrays.should.match([5, 6, 7]);
	});

	it ('should handle source array of length 0', function() {
		var mergedArrays = blockStatementMerger(targetBlock, 0, []);

		mergedArrays.should.match([2,3,4]);
	});


});

