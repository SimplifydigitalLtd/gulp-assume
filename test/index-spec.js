/*global describe, it*/
"use strict";

var fs = require("fs"),
	es = require("event-stream"),
	should = require("should");

require("mocha");

delete require.cache[require.resolve("../")];

var gutil = require("gulp-util"),
	assume = require("../index");

describe("gulp-assume", function () {

	var expectedFile = new gutil.File({
		path: "test/expected/basic-module.json",
		cwd: "test/",
		base: "test/expected",
		contents: fs.readFileSync("test/expected/basic-module.json")
	});

	it("should remove define function and rewrite its contents to the outer wrapper", function(done) {
		var srcFile = new gutil.File({
			path: "test/fixtures/basic-module.json",
			cwd: "test/",
			base: "test/fixtures",
			contents: fs.readFileSync("test/fixtures/basic-module.json")
		});

		var stream = assume();

		stream.on("error", function(err) {
			should.exist(err);
			done(err);
		});

		stream.on("data", function (newFile) {

			should.exist(newFile);
			should.exist(newFile.contents);

			JSON.parse(String(newFile.contents)).should.containDeep(JSON.parse(String(expectedFile.contents)));
			done();
		});

		stream.write(srcFile);
		stream.end();
	});

	it("should remove define function without dependencies and rewrite its contents to the outer wrapper", function(done) {
		var srcFile = new gutil.File({
			path: "test/fixtures/basic-module.json",
			cwd: "test/",
			base: "test/fixtures",
			contents: fs.readFileSync("test/fixtures/module-without-dependencies.json")
		});

		var stream = assume();

		stream.on("error", function(err) {
			should.exist(err);
			done(err);
		});

		stream.on("data", function (newFile) {

			should.exist(newFile);
			should.exist(newFile.contents);

			JSON.parse(String(newFile.contents)).should.containDeep(JSON.parse(String(expectedFile.contents)));
			done();
		});

		stream.write(srcFile);
		stream.end();
	});

	it("should error on stream", function (done) {

		var srcFile = new gutil.File({
			path: "test/fixtures/basic-module.json",
			cwd: "test/",
			base: "test/fixtures",
			contents: fs.createReadStream("test/fixtures/basic-module.json")
		});

		var stream = assume();

		stream.on("error", function(err) {
			should.exist(err);
			done();
		});

		stream.on("data", function (newFile) {
			newFile.contents.pipe(es.wait(function(err, data) {
				done(err);
			}));
		});

		stream.write(srcFile);
		stream.end();
	});

	it("should not error without params", function() {
		var stream = assume();
	})
});
