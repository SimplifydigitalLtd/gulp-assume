# gulp-assume
> plugin for [gulp](https://github.com/wearefractal/gulp) to 'derequire' javascript files

Rquires input as AST (Recommended to use gulp-ast)
Moves the module definition in to the same scope as the requirejs define call.
Then outputs the modified AST.

## Usage
First, install `gulp-assume` as a development dependency:

```shell
npm install --save-dev gulp-assume
```

Then, add it to your `gulpfile.js`:

```javascript
var assume = require("gulp-assume")
	AST = require('gulp-ast');

gulp.src("./src/*.js")
	.pipe(AST.parse())
	.pipe(assume())
	.pipe(AST.render())
	.pipe(gulp.dest("./dist"));
```
