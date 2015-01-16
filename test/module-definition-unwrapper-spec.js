/**
 * Created by scarratt on 16/01/2015.
 */


require("mocha");
delete require.cache[require.resolve("../")];

var unwrapModuleDefinition = require("../src/module-definition-unwrapper"),
	should = require("should");

describe('define function unwrapper', function () {
	var syntaxTreeWalkerStub = {currentBlockStatmentIndex : 1},
		blockStatementMergerStub;

	it('should call the block statement merger with the module definition block statement and the block statement containing the define call', function (done) {
		var callbacks,
			statement2Body = [{"type": "ExpressionStatement","expression": {"type": "Literal","value": "use strict","raw": "'use strict'"}},{"type": "ExpressionStatement","expression": {"type": "CallExpression","callee": {"type": "Identifier","name": "define"},"arguments": [{"type": "ArrayExpression","elements": [{"type": "Literal","value": "knockout","raw": "'knockout'"},{"type": "Literal","value": "text!./sd-command-history.html","raw": "'text!./sd-command-history.html'"},{"type": "Literal","value": "postal","raw": "'postal'"}]},{"type": "FunctionExpression","id": null,"params": [{"type": "Identifier","name": "ko"},{"type": "Identifier","name": "templateMarkup"},{"type": "Identifier","name": "postal"}],"defaults": [],"body": {"type": "BlockStatement","body": []},"rest": null,"generator": false,"expression": false}]}}],
			moduleDefinitionBody = {"type": "BlockStatement","body": {modDef: "module-Definition"}},
			blockStatement1 = {"type":"BlockStatement", "body": [{"type": "ExpressionStatement","expression": {"type": "CallExpression","callee": {"type": "MemberExpression","computed": false,"object": {"type": "Identifier","name": "self"},"property": {"type": "Identifier","name": "commandHistory"}},"arguments": [{"type": "MemberExpression","computed": false,"object": {"type": "MemberExpression","computed": false,"object": {"type": "Identifier","name": "basicInfo"},"property": {"type": "Identifier","name": "history"}},"property": {"type": "Identifier","name": "commandHistory"}}]}}]},
			blockStatement2 = {"type":"BlockStatement", "body": statement2Body},
			blockStatement3 = {"type":"BlockStatement", "body":[{"type": "ExpressionStatement","expression": {"type": "CallExpression","callee": {"type": "MemberExpression","computed": false,"object": {"type": "Identifier","name": "self"},"property": {"type": "Identifier","name": "commandHistory"}},"arguments": [{"type": "MemberExpression","computed": false,"object": {"type": "MemberExpression","computed": false,"object": {"type": "Identifier","name": "basicInfo"},"property": {"type": "Identifier","name": "history"}},"property": {"type": "Identifier","name": "commandHistory"}}]}}]},
			defineCall = {"type": "CallExpression","callee": {"type": "Identifier","name": "define"},"arguments": [{"type": "ArrayExpression","elements": [{"type": "Literal","value": "knockout","raw": "'knockout'"},{"type": "Literal","value": "text!./sd-command-history.html","raw": "'text!./sd-command-history.html'"},{"type": "Literal","value": "postal","raw": "'postal'"}]},{"type": "FunctionExpression","id": null,"params": [{"type": "Identifier","name": "ko"		},{"type": "Identifier","name": "templateMarkup"},{"type": "Identifier","name": "postal"}],"defaults": [],"body": moduleDefinitionBody,"rest": null,"generator": false,"expression": false}]};

		syntaxTreeWalkerStub.setCallbacks = function (newCallbacks) {
			callbacks = newCallbacks;
		};

		blockStatementMergerStub = function (targetBlockStatement, indexInTargetToOverwrite, statementToInsert) {
			should.equal(targetBlockStatement, blockStatement2.body);
			should.equal(statementToInsert, moduleDefinitionBody.body);
			should.equal(indexInTargetToOverwrite, 1);
			done();
		};

		syntaxTreeWalkerStub.walkSyntaxTree = function () {
			callbacks.blockstatementCallback(blockStatement1);
			callbacks.blockstatementCallback(blockStatement2);
			callbacks.callexpressionCallback(defineCall);
			callbacks.blockstatementCallback(blockStatement3);
		};

		unwrapModuleDefinition(syntaxTreeWalkerStub, blockStatementMergerStub);
	})
});
