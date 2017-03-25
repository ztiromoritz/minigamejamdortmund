module.exports = plugin;

// Collections will generate dublicates when browsersync triggers rerun.
// FIX: https://github.com/segmentio/metalsmith-collections/issues/27
function plugin(options) {
    return (files, metalsmith, done) => {
        setImmediate(done);
        metalsmith.metadata({
            site: {},
            package: require('../package.json')
        });
    }
}
