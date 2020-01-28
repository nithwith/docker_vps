'use strict';

import "@babel/polyfill";

/* global __webpack_nonce__ __webpack_public_path__ OC t n */
// eslint-disable-next-line
__webpack_nonce__ = btoa(OC.requestToken);
// eslint-disable-next-line
__webpack_public_path__ = OC.linkTo('deck', 'js/build/');

// used for building a vendor stylesheet
import 'ng-sortable/dist/ng-sortable.css';

import angular from 'angular';
import markdownit from 'markdown-it';
global.markdownit = markdownit;

import app from './app/App.js';
import './app/Config.js';
import './app/Run.js';


import ListController from 'controller/ListController.js';
import attachmentListComponent from './controller/AttachmentController.js';
import activityComponent from './controller/ActivityController.js';

app.controller('ListController', ListController);
app.component('attachmentListComponent', attachmentListComponent);
app.component('activityComponent', activityComponent);


// require all the js files from subdirectories
var context = require.context('.', true, /(controller|service|filters|directive)\/(.*)\.js$/);

context.keys().forEach(function (key) {
	context(key);
});

