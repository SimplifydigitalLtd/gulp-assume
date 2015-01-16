/**
 * Created by scarratt on 16/01/2015.
 */

var _ = require('lodash');

function blockStatementMerger(targetBlockStatement, indexToInsertInto, sourceBlockStatement) {

	var firstElementsOfNewBody= _.first(targetBlockStatement, indexToInsertInto);

	return _.union(firstElementsOfNewBody, sourceBlockStatement, _.rest(targetBlockStatement, indexToInsertInto + 1))
}

module.exports = blockStatementMerger;
