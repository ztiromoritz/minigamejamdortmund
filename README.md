# game-jam-do.de
Metal smith hompage do the game-jam-do.de hompage.
It uses [metalsmith.io](https://metalsmith.io) as static side generator.

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
This generates a minified version of the page to the checked in docs directory.
```
    npm run build
    git add docs
    git commit -m "%What is new%"
    git push
```
After this changes are available under
%username%.github.io/minigamejamdortmund/
