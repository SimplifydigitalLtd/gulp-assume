/**
 * Created by scarratt on 16/01/2015.
 */

var _ = require('lodash');

function unwrapDefineFunction(syntaxTreeWalker, blockStatementMerger){
	var defineFunction,
		defineFunctionParentBlockStatement,
		defineCallIndexInBlockStatement;


	var setCallbacks = function (){
		var lastBlockStatement;

		function blockStatementListener(node) {
			if (defineFunctionParentBlockStatement !== undefined) {
				return;
			}

			lastBlockStatement = node
		}

		var findDefineCall = function (node) {
			if (node.callee.type == 'Identifier' && node.callee.name == 'define') {
				defineFunction = node;
				defineFunctionParentBlockStatement = lastBlockStatement;
				defineCallIndexInBlockStatement = syntaxTreeWalker.currentBlockStatmentIndex;
			}
		};

		var listeningOptions = {callexpressionCallback : findDefineCall, blockstatementCallback : blockStatementListener};

		syntaxTreeWalker.setCallbacks(listeningOptions);
	};

	function getModuleDefinitionFromDefineCall() {
		return _.find(defineFunction.arguments, function(argument) {
			return argument.type == 'FunctionExpression';
		}).body;
	}

	setCallbacks();

	syntaxTreeWalker.walkSyntaxTree();

	if (defineFunction === undefined || defineFunctionParentBlockStatement === undefined) {
		console.log('could not find the module to extract');
		return;
	}

	var definedModuleBlockStatement = getModuleDefinitionFromDefineCall();

	defineFunctionParentBlockStatement.body = blockStatementMerger(defineFunctionParentBlockStatement.body, defineCallIndexInBlockStatement, definedModuleBlockStatement.body);
}

module.exports = unwrapDefineFunction;
