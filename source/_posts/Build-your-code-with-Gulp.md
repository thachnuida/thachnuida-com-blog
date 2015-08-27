title: Build your code with Gulp
date: 2014-01-14 21:28:28
tags:
- Web Development
- Note
---

[Gulp](http://gulpjs.com/) is the streaming build system. Gulp’s use of streams and code-over-configuration makes for a simpler and more intuitive build. I didn’t use Gulp or Grunt before. Today, I hear about it and decide to use it on my project. What I write here is not a tutorial, it just what I do with Gulp.

## 1. Install – NodeJS - Gulp:

To install Gulp we must have node installed. Nodejs can be installed from here http://nodejs.org/

– Gulp: We should install gulp globally

```
$ npm install -g gulp
```

## 2. Using Gulp in project First, jump to your project folder.
<!-- more -->

```
$ cd /path/to/your/project
```

Install `gulp` and `gulp-util` in your project as `devDepencies`. Before it you should have `package.json` file in your project or init it by

```
npm init
$ npm install --save-dev gulp gulp-util
```

`--save-dev` will let `npm` add `gulp` and `gulp-util` into `devDepencies` of file `package.json`

Create file `gulpfile.js`  at your project root with bellow simple content:

```
var gulp = require('gulp');
var gutil = require('gulp-util');

gulp.task('default', function(){
  // place code for your default task here
});
```

Run gulp

```
$ gulp
```

## 3. Do more with gulp

Above is just some step to get started with gulp. You can find here https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md

I want do more with gulp in my project, such as minify JS code, build LESS code to CSS… Let install some gulp plugins and write some simple code. Gulp plugins can be found here: http://gratimax.github.io/search-gulp-plugins/

As my requirement I will install `gulp-less`, `gulp-uglify` and `gulp-jshint`.

```
$ npm install --save-dev gulp-less gulp-uglify gulp-jshint
```

Now, we create (make) some tasks for gulp by writing code.

```
var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var uglify = require('gulp-uglify');

// jshint task
gulp.task('jshint', function(){
  gulp.src('./js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Minify JS code
gulp.task('minify', function(){
  gulp.src('./js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});

// Convert less to css
gulp.task('less', function(){
  gulp.src('./less/*.less')
    .pipe(less())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('default', function(){
  // Run default tasks
  gulp.run('jshint', 'minify', 'less');

  // Watch for JS files changing
  gulp.watch('./js/*.js', function(){
    gulp.run('jshint', 'minify');
  });

  // Watch for Less files changing
  gulp.watch('./less/*.less', function(){
    gulp.run('less');
  });
});
```

There are 4 gulp tasks and they can be called by commands:

```
$ gulp jshint

$ gulp minify

$ gulp less

$ gulp
```

- Task `jshint`:  This task will check all JS file in folder `/js` and report error.
- Task `minify`: This task will get all JS files in folder `/js` , minifies them and save to folder `/dist/js`
- Task `less`: This task will convert all LESS files in folder /less to CSS and save to folder `/dist/css`
- Task `default`: This task will run 3 above tasks and add watching for JS, LESS files. If JS files in folder `/js` change, it will run task jshint and minify. The same with LESS file in folder `/less`.

## Wrapping UP After all, we can:

- Install NodeJS
- Install Gulp and its plugins
- Create Gulp tasks for our project

This is the first time I using gulp, if you have any info or ideal about gulp feel free to comment and let me know. Very thank you for your comments.