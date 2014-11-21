# JavaScript skeleton(starter, example) using Express and Chaplin
[ ![Codeship Status for ButuzGOL/gss](https://www.codeship.io/projects/f207da30-66f1-0131-7b0a-7ac0e27144fd/status?branch=master)](https://www.codeship.io/projects/12642)
[![Build Status](https://travis-ci.org/ButuzGOL/gss.png?branch=master)](https://travis-ci.org/ButuzGOL/gss)
[![Coverage Status](https://coveralls.io/repos/ButuzGOL/gss/badge.png?branch=master)](https://coveralls.io/r/ButuzGOL/gss?branch=master)
[![Dependency Status](https://gemnasium.com/ButuzGOL/gss.png)](https://gemnasium.com/ButuzGOL/gss)
[![Stories in Ready](https://badge.waffle.io/ButuzGOL/gss.png?label=ready)](https://waffle.io/ButuzGOL/gss)
[![Gittip](http://img.shields.io/gittip/ButuzGOL.png)](https://www.gittip.com/ButuzGOL/)
[![Total views](https://sourcegraph.com/api/repos/github.com/ButuzGOL/gss/counters/views.png)](https://sourcegraph.com/github.com/ButuzGOL/gss)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/ButuzGOL/gss/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

If you want to start a project in pure JavaScript it is one of the options of project structure. I was faced with this problem, considered a lot of projects and collect this one.  
The project structure is divided into two parts, the frontend and backend. This two parts are very similar in structure using **MVC**. The app works on the principle of building ui based on data from the backend as **JSON**.  
Also in this project you can find a few examples (authorization using passport, test coverage on frontend, etc.)   
And of course **[Demo](http://butuzgol-gss.herokuapp.com/)** (email@email.com:password) if white screen "Refresh page"

## Technologies
#### Backend (MVC)
- Express
- Mongoose
- Winston
- Passport

**Test**
- Mocha
- Should
- Supertest
- Blanket
- Casper
- Benchmark

#### Frontend (MVC)
- [Yo generator](https://github.com/ButuzGOL/generator-chaplinjs)
- Grunt
- Bower
- Require
- Backbone
- Chaplin
- Bootstrap
- Ejs
- Stylus
- YUIDoc

**Test**
- Mocha
- Expect
- Sinon
- Blanket
- Casper
- Benchmark

## Usage
**Run Development**
```
npm install
mongod
node server
cd public
grunt server
```
**Run Production**
```
npm install
mongod
node server
```
**Test**
```
mongod
mocha test/spec --recursive -R spec
// Coverage
mocha test/spec --recursive -r blanket -R html-cov > coverage.html
open coverage.html
// Frontend
cd public
grunt test
// html
grunt server
visit http://localhost:9000/test/spec/index.html
visit http://localhost:9000/test/spec/coverage.html
```
**Frontend commands**
```
cd public
grunt (running lint and test)
grunt server (running dev frontend server)
grunt prepare (gather static from bower)
grunt build
grunt lint
grunt docs (build docs)
```

## File structure
```
-app/
 |--controllers/
 |--models/
 |--views/
 |--helpers/
 |--mailers/
 |--assets/
-config/
 |--locales/
 |--routes.js
 |--environment.js
 |--passport.js
 |--express.js
 |--application.js
 |--frontend.js
 |--mongoose.js
-lib/
 |--log.js
 |--utils.js
-test/
 |--automation
 |--benchmark
 |--spec
    |--controllers/
    |--models/
    |--helpers/
    |--mailers/
    |--factories.js
    |--helper.js
    |--server.js
--server.js
--data-gen.js (generates data to mongo)
--package.json
-public/
 |--src/
    |--app/
       |--controllers/
          |--base/
       |--models/
          |--base/
       |--views/
          |--base/
          |--styles/
          |--templates/
       |--helpers/
       |--config/
          |--locales/
          |--routes.js
          |--environment.js
          |--application.js
          |--backend.js
       |--assets/
       |--lib/
          |--utils.js
          |--error-handler.js
       |--application.js
       |--mediator.js
       |--main.js
       |--initialize.js
    |--test/
       |--automation
       |--benchmark
       |--spec
          |--controllers/
          |--models/
          |--helpers/
          |--lib/
          |--views/
          |--index.html
          |--coverage.html
          |--helper.js
          |--initialize.js
    |--vendor/
       |--scripts/
       |--styles/
    |--index.html
 |--Gruntfile.js
 |--bower.json
 |--yuidoc.json
 |--package.json
```
