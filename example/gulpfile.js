var gulp = require('gulp');
var gutil = require('gulp-util');
//Import project config
var config = require('./config');
var gulpHelper = require('gulp-build-helper');
//Environment
var isDev = ! gutil.env.production;
//Init Gulp Helper
gulpHelper.init(gulp, config, isDev);