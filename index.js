var through = require("through2"),
	gutil = require("gulp-util"),
	blockStatementMerger = require("./src/block-statement-merger"),
	AbstractSyntaxTreeWalker = require("./src/abstract-syntax-tree-walker"),
	unwrapModuleDefinition = require("./src/module-definition-unwrapper");

module.exports = function (param) {
	"use strict";

	// if necessary check for required param(s), e.g. options hash, etc.
	if (!param) {
		//throw new gutil.PluginError("gulp-assume", "No param supplied");
	}

	function assume(file, enc, callback) {

		// Do nothing if no contents
		if (file.isNull()) {
			this.push(file);
			return callback();
		}

		if (file.isStream()) {

			// accepting streams is optional
			this.emit("error",
				new gutil.PluginError("gulp-assume", "Stream content is not supported"));
			return callback();
		}

		// check if file.contents is a `Buffer`
		if (file.isBuffer()) {

			var syntaxTree = JSON.parse(String(file.contents));

            var abstractSyntaxTreeWalker = new AbstractSyntaxTreeWalker(syntaxTree);

			unwrapModuleDefinition(abstractSyntaxTreeWalker, blockStatementMerger);

			// get function containing define function call

			// insert contents of module definition into wrapper function

			// manipulate buffer in some way
			// http://nodejs.org/api/buffer.html
			file.contents = new Buffer(JSON.stringify(syntaxTree));

			this.push(file);

		}
		return callback();
	}

	return through.obj(assume);
};
