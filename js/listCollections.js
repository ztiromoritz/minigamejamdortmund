const _ = require('lodash');

module.exports = plugin;

function plugin(options) {
    return (files, metalsmith, done) => {
        setImmediate(done);

        _.forEach(metalsmith.metadata().collections, function(value,key){
            console.log(key);
            _.forEach(value, function(value){
                console.log("  "+value.path);
            });
        });
    }
}
