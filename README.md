# Gulp-Sass-Export
Gulp plugin for [sass-export] Sass export utilities.

#### Use it for dev
Install it from NPM

```
$ npm install --save-dev gulp-sass-export
```

#### gulp plugin usage

``` javascript
const gulp = require('gulp');
const sassExport = require('gulp-sass-export');

gulp.task('sass-export', function() {
    let sourceFiles = ['./scss/_variables.scss', './scss/_colors.scss', './scss/utils/*.scss'];

    gulp.src(sourceFiles)
        .pipe(sassExport({
            fileName: 'sass-data.json',
            dependencies: ['./scss/globals/']
        }))
        .pipe(gulp.dest('./tmp'))
});

gulp.task('default', ['sass-export']);

```

### Options:
 * **fileName**: {String} output file name. Default: 'sass-exported.json'
 * **dependencies**:  {array} list of folders where your source files should look for the imports. default: []
 * **type**: {String} set it to 'array' for an array typed output, default 'structured'

[sass-export]:  <https://github.com/plentycode/sass-export>

