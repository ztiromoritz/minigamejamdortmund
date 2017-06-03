module.exports = plugin;

function plugin(options) {
    return (files, metalsmith, done) => {
        setImmediate(done);

        Object.keys(files).forEach(function(file) {
            console.log("file", file)
        });
    }
}
