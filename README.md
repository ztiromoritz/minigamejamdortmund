# game-jam-do.de
game-jam-do.de hompage.
It uses [metalsmith.io](http://www.metalsmith.io/) as static site generator.

# Setup
Fork this repository.
Clone this repository and install node packages.
```    
    git clone git@github.com:%username%/minigamejamdortmund.git
    npm install
```

## Preview changes locally
This starts a local dev server to u
```
    npm run dev
```
## Deployment of new content
The page will be deployed to the gh-pages branch by the [travis pages provider](https://docs.travis-ci.com/user/deployment/pages/).
So every changes on master will be reflected under [https://ztiromoritz.github.io/minigamejamdortmund/](https://ztiromoritz.github.io/minigamejamdortmund/)
To check the deployment locally run:
```
    npm run build
```
This will build a minified version of the page to the build/ folder.

# Folder
 * build - generated page result (@ .gitignore)
 * dev - live server temp folder
 * js - build scripts
 * print - print flyer projected (independent from website)
 * src - page source
 * src/assets/img - includes also some social media header images
 * stuff - some pdf flyer (TODO: move ??)

# TODO
 * Create sprite from people.png to replace peopX.png files.
 * Blog
 * minify javascript
 * apple favicon quadratisch

# DONE
 * basic robots.txt
