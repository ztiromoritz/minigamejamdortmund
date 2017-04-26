var debug = require('debug')('metalsmith-copy'),
    path = require('path'),
    cloneDeep = require('lodash').cloneDeep,
    minimatch = require('minimatch');

module.exports = plugin;



// Based on: https://github.com/mattwidmann/metalsmith-copy
// License and Copyright: https://raw.githubusercontent.com/mattwidmann/metalsmith-copy/master/LICENSE
function plugin(options) {
  return function(files, metalsmith, done) {
    if (!options.directory && !options.extension && !options.transform) return done(new Error('metalsmith-copy: "directory" or "extension" option required'));
    if (!options.force) options.force = false;

    var matcher = minimatch.Minimatch(options.pattern);

    Object.keys(files).forEach(function (file) {
      debug('checking file: ' + file);
      if (!matcher.match(file)) return;

      var newName = file;

      // transform filename
      if (options.transform) {
        newName = options.transform(file);
      } else {
        if (options.extension) {
          var currentExt = path.extname(file);
          newName = path.join(path.dirname(file), path.basename(file, currentExt) + options.extension);
        }
        if (options.directory) {
          newName = path.join(options.directory, path.basename(newName));
        }
      }

      if (newName === file) {
        return;
      }

      if (files[newName] && options.force === false) return done(new Error('metalsmith-copy: copying ' + file + ' to ' + newName + ' would overwrite file'));

      debug('copying file: ' + newName);
      files[newName] = cloneDeep(files[file], function(value) {
        if (value instanceof Buffer) {
          return new Buffer(value);
        }
      });
      if (options.move) {
        delete files[file];
      }

      if(options.edit){
          options.edit(files[newName]);
      }


    });

    done();
  }
}
