var through = require('through2');
var gutil = require('gulp-util');

var exporter = require('sass-export').buffer;

var PLUGIN_NAME = 'gulp-sass-export';

module.exports = function (userOptions) {

  let options = {
    fileName: userOptions.fileName || 'sass-exported.json',
    includePaths: userOptions.dependencies || userOptions.includePaths
  }

  // Create a stream to take in images
  var bufferList = [];

  var onData = function (file, encoding, cb) {
    if (file.isStream()) {
      this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streams are not supported!'));
      return cb();
    }

    if (file.isBuffer()) {
      bufferList.push(file.contents);
      cb();
    }
  };

  // When we have completed our input
  var onEnd = function (cb) {
    if (bufferList.length === 0) {
      retStream.push(null);
      return cb();
    }

    exporter(bufferList, options).then((result) => {
      let content = new Buffer(JSON.stringify(result, null, 2));

      let file = new gutil.File({
        path: options.fileName,
        contents: content
      });

      cb(null, file);
    }).catch((err) => {
      this.emit('error', new gutil.PluginError(PLUGIN_NAME, err.message));
      return cb();
    });
  };

  var retStream = through.obj(onData, onEnd);
  return retStream;
};