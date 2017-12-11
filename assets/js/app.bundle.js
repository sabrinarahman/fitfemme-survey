/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var clientId = 'ilyKhNb1I2BQEpesxJuWnQ';
var clientSecret = 'Tv0AqJmkLdVcQ8IWJecmgK89zywp6DwyZ2XVm4aIVXaJkHbCbeEmLu7BRltky5GJ';
var authToken = "";
var results = "";

function getYelpToken() {
	$.ajax({
		type: "POST",
		url: "https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token",
		data: { grant_type: "client_credentials", client_id: clientId, client_secret: clientSecret },
		success: storeToken
	});
}
function storeToken(result) {
	authToken = authToken ? authToken : result.access_token;
}
function makeYelpSearch(result, searchTerm) {
	$.ajax({
		type: "GET",
		url: "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=nyc&term=" + searchTerm,
		headers: { Authorization: "Bearer " + authToken },
		success: function success(result) {
			setView(result.businesses);
		}
	});
}
function setView(businesses) {
	businesses.forEach(function (biz, index) {
		if (index === 0) {
			$("#results").html('<a href="' + biz.url + '">' + '<h1>' + biz.name + '</h1>' + '</a>');
		} else {
			$("#results").append('<a href="' + biz.url + '">' + '<h1>' + biz.name + '</h1>' + '</a>');
		}
	});
}

function init() {
	replaceQuestion(myQuestions[0]);
	getYelpToken();
}
function appendAnswers(answers) {
	var answerHTML = "";
	answers.forEach(function (answer) {
		answerHTML += '<p><button class="button ' + answer.text.toLowerCase().split(' ').join('') + '">\n\t\t\t<i class="fa fa ' + answer.icon + '" ></i> ' + answer.text + '\n\t\t</button></p>';
	});
	return answerHTML;
}

function bindEvents(question) {
	if (myQuestions[0] === question) {
		$(".oneononetrainer").click(function () {
			replaceQuestion(myQuestions[2]);
		});

		$(".classinstructor").click(function () {
			replaceQuestion(myQuestions[1]);
		});
	} else {
		$('.button').click(function () {
			var search = $(this)[0].textContent;
			makeYelpSearch(authToken, search);
			//window.location = "https://www.google.com/maps/search/?api=1&query=" + search;
		});
	}
}

function replaceQuestion(question) {
	var answers = appendAnswers(question.answers);
	$('header').html('<h1>' + question.question + '</h1>' + answers);
	bindEvents(question);
}

init();

/***/ })
/******/ ]);