/**
* Created by scarratt on 15/01/2015.
*/

require("mocha");
delete require.cache[require.resolve("../")];

var AbstractSyntaxTreeWalker = require("../src/abstract-syntax-tree-walker"),
	should = require("should");

describe("abstract syntax tree", function () {
	var sampleFunctionAST = {"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"FunctionExpression","id":null,"params":[],"defaults":[],"body":{"type":"BlockStatement","body":[]},"rest":null,"generator":false,"expression":false},"arguments":[]}}]},
		multipleStatementFunction = {"type":"Program","body":[{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"a"},"init":{"type":"BinaryExpression","operator":"+","left":{"type":"Literal","value":1,"raw":"1"},"right":{"type":"Literal","value":1,"raw":"1"}}}],"kind":"var"},{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"b"},"init":{"type":"BinaryExpression","operator":"+","left":{"type":"Literal","value":2,"raw":"2"},"right":{"type":"Literal","value":2,"raw":"2"}}}],"kind":"var"}]};

	it ('should call program node callback', function(done) {
		var sut = new AbstractSyntaxTreeWalker(sampleFunctionAST, {programCallback: function(node){
			should.exist(node);
			done();
		}});

		sut.walkSyntaxTree();
	});

	it('should call expression statement callback', function (done) {
		var sut = new AbstractSyntaxTreeWalker(sampleFunctionAST, {expressionstatementCallback: function(node){
			should.exist(node);
			done();
		}});

		sut.walkSyntaxTree();
	});

	it('should call call expression callback', function (done) {
		var sut = new AbstractSyntaxTreeWalker(sampleFunctionAST, {callexpressionCallback: function(node){
			should.exist(node);
			done();
		}});

		sut.walkSyntaxTree();
	});

	it('should call function expression callback', function (done) {
		var sut = new AbstractSyntaxTreeWalker(sampleFunctionAST, {functionexpressionCallback: function(node){
			should.exist(node);
			done();
		}});

		sut.walkSyntaxTree();
	});

	it('should call block statement  callback', function (done) {
		var sut = new AbstractSyntaxTreeWalker(sampleFunctionAST, {blockstatementCallback: function(node){
			should.exist(node);
			done();
		}});

		sut.walkSyntaxTree();
	});

	it('should call callback for each node in function body', function (done) {
		var timesCalled = 0;

		var sut = new AbstractSyntaxTreeWalker(multipleStatementFunction, {variabledeclarationCallback: function(node){
			should.exist(node);

			should.equal(sut.currentBlockStatmentIndex, timesCalled);

			timesCalled ++;

			if (timesCalled == 2) {
				done();
			}
		}});

		sut.walkSyntaxTree();
	})
});
