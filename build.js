var Metalsmith = require('metalsmith');
var collections = require('metalsmith-collections');
var layouts = require('metalsmith-layouts');
var markdown = require('metalsmith-markdown');
var assets = require('metalsmith-assets');
var debug = require('metalsmith-debug');
var htmlmin = require('metalsmith-html-minifier');
var browsersync = require('metalsmith-browser-sync');
var cleanCSS = require('metalsmith-clean-css');
var writemetadata = require('metalsmith-writemetadata');
var filter = require('metalsmith-filter');
var listFiles = require('./js/listFiles');
var fixCollectionsOnRerun = require('./js/fixCollectionsOnRerun');

var HELP = false;
var DEV_BUILD = false;

var args = process.argv.slice(2);
args.forEach(function(val) {
    if (val === '--dev') {
        DEV_BUILD = true;
    }
    if (val === '--help' || val === '-h') {
        HELP = true;
    }
});


if (HELP) {
    console.log('Metalsmith buildscript. By default generates hompage')
    console.log('Usage:');
    console.log('   node build.js [options]');
    console.log('Options:');
    console.log('   -h,--help print this message only.');
    console.log('   --dev start dev server')
    process.exit();
}

const dir = {
    base: __dirname + '/',
    lib: __dirname + '/lib/',
    source: './src/content/',
    assets: './src/assets/',
    templates: './src/templates/',
    partials: './src/partials/',
    dest: (DEV_BUILD) ? 'dev' : './docs/'
};

var ms = Metalsmith(dir.base)


ms = ms.use(fixCollectionsOnRerun()).metadata({
        sitename: "Mini Game Jam Dortmund",
        siteurl: "https://game-jam-do.de",
        description: "Entspannter eintägiger Game Jam im Künstlerhaus in Dortmund.",
        generatorname: "Metalsmith",
        generatorurl: "http://metalsmith.io/"
    })
    .source(dir.source)
    .destination(dir.dest)
    .clean(true)
    .use(collections({
        entries: {
            pattern: 'entries/*.md',
            sortBy: 'prio'
        }
    }))
    .use(markdown())
    .use(layouts({
        pattern: ["*.html", "!entries/*.html"],
        engine: 'handlebars',
        directory: dir.templates,
        partials: dir.partials,
        default: 'page.html'
    }))
    .use(filter(["*.html", "!entries/*.html"])) //Entries no longer needed as single files. There content shoud be included in index.html
    .use(assets({
        source: dir.assets,
        destination: './'
    }));






if (DEV_BUILD) {
    ms = ms.use(browsersync({
        server: dir.dest,
        files: [
            dir.source + "**/*.md",
            dir.templates + "**/*.html",
            dir.partials + "**/*.html"
        ]
    }));
} else {
    //ms = ms.use(htmlmin()).use(cleanCSS());
}


ms.build(function(err) {
    if (err) throw err;
});



// FOR DEBUGGING
// .use(writemetadata({
//     pattern: ['**/*.html'],
//     bufferencoding: 'utf8',
//     ignorekeys: ['next', 'previous'],
//     collections: {
//         entries: {
//             output: {
//                 path: 'entries.json',
//                 asObject: true,
//                 metadata: {
//                     "type": "list"
//                 }
//             },
//             ignorekeys: ['next', 'previous']
//         }
//     }
// }))
// .use(listFiles())
//
// .use(debug());
//
