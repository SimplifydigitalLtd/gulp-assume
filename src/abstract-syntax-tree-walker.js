/**
 * Created by scarratt on 15/01/2015.
 */

var _ = require('lodash');

function AbstractSyntaxTreeWalker(syntaxTree, options) {
	var self = this,
		callbacks = options;

	self.currentBlockStatmentIndex = 0;

	function createCallbackName(node) {
		return String(node.type).toLowerCase() + 'Callback';
	}

	function processSyntaxNodes(syntaxNode) {
		if (syntaxNode === undefined) {
			return;
		}

		var callback = callbacks[createCallbackName(syntaxNode)];
		if (callback !== undefined) {
			callback(syntaxNode);
		}

		switch (syntaxNode.type) {
			case 'CallExpression':
				processCallExpression(syntaxNode);
				break;
			case 'ExpressionStatement':
				processExpressionSatement(syntaxNode);
				break;
			case 'FunctionExpression':
				processFunctionExpression(syntaxNode);
				break;
			case 'Literal':
				break;
			case 'BlockStatement':
			case 'Program':
				processBlockStatement(syntaxNode);
				break;
		}
	}

	function processBlockStatement(blockStatement) {
		for (var i = 0; i < blockStatement.body.length; i++) {
			self.currentBlockStatmentIndex = i;
			processSyntaxNodes(blockStatement.body[i]);
		}
	}

	function processFunctionExpression(expressionStatement) {
		return processSyntaxNodes(expressionStatement.body);
	}

	function processCallExpression(callExpression) {
		processSyntaxNodes(callExpression.callee)
	}

	function processExpressionSatement(expression) {
		processSyntaxNodes(expression.expression);
	}

	self.walkSyntaxTree = function () {
		processSyntaxNodes(syntaxTree);
	};

	self.setCallbacks = function (newCallbacks) {
		callbacks = newCallbacks;
	}
}

module.exports = AbstractSyntaxTreeWalker;
