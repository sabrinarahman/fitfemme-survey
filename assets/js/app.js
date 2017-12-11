'use strict';


const clientId = 'ilyKhNb1I2BQEpesxJuWnQ';
const clientSecret = 'Tv0AqJmkLdVcQ8IWJecmgK89zywp6DwyZ2XVm4aIVXaJkHbCbeEmLu7BRltky5GJ';
let authToken = "";
let results = "";

function getYelpToken() {
	$.ajax({
  	  type: "POST",
	  url: "https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token",
	  data: {grant_type: "client_credentials", client_id: clientId, client_secret: clientSecret},
	  success: storeToken,
	});
}
function storeToken(result) {
	authToken = authToken ? authToken : result.access_token;
}
function makeYelpSearch(result, searchTerm) {
	$.ajax({
  	  type: "GET",
	  url: "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=nyc&term=" + searchTerm,
	  headers: {Authorization: "Bearer " + authToken},
	  success: function(result) {
	  	setView(result.businesses)
	  },
	});
}
function setView(businesses) {
	businesses.forEach( function(biz, index){
		if (index === 0) {
			$("#results").html('<a href="' + biz.url + '">' + `<h1>` + biz.name + `</h1>` + '</a>');
		}else {
			$("#results").append('<a href="' + biz.url + '">' + `<h1>` + biz.name + `</h1>` + '</a>');
		}
	});
}

function init() {
	replaceQuestion(myQuestions[0]);
	getYelpToken();
}
function appendAnswers(answers) {
	var answerHTML = "";
	answers.forEach( function(answer) {
		answerHTML += 
		`<p><button class="button ` + answer.text.toLowerCase().split(' ').join('') + `">
			<i class="fa fa ` + answer.icon + `" ></i> ` + answer.text + `
		</button></p>`
	})
	return answerHTML;
}

function bindEvents(question) {
	if (myQuestions[0] === question) {
		$(".oneononetrainer").click(function() {
			replaceQuestion(myQuestions[2]);
		})	

		$(".classinstructor").click(function() {
			replaceQuestion(myQuestions[1]);
		})	
	} else {
		$('.button').click(function() {
			var search = $(this)[0].textContent;
			makeYelpSearch(authToken, search)
			//window.location = "https://www.google.com/maps/search/?api=1&query=" + search;
		})
	} 

	
}

function replaceQuestion(question) {
	var answers = appendAnswers(question.answers);
	$('header').html(
		`<h1>` + question.question + `</h1>` +
		answers
	)
	bindEvents(question);
}

init();




