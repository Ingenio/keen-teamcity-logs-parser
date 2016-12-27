# TeamCity Logs Parser

Creates a tree from plaintext TeamCity logs, so they can be manipulated further, for example to visualized what is taking so long during the build process.

## Purpose

We need a tool to parse teamcity logs and put it in in-memory tree data structure. So we can visualize it as a _flame graph_ using for instance https://github.com/spiermar/d3-flame-graph

Example:
![Image of Yaktocat](http://content.screencast.com/users/Restuta/folders/Jing/media/8fa59e35-f127-4380-8c8b-0eb28331737d/00001367.png)


## Deps

* Node 7
* Babel
* ESLint
* Nodemon
* Yarn (optional)

## Usage
- `yarn install` to install deps
- `yarn start` to run it
- `yarn run dev` to run auto-reloading nodemon server
- `yarn run eslint` to run code-analysis
