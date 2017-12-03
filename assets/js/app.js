function init() {
	debugger
	replaceQuestion(myQuestions[0]);
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
	//if it's question 1 redirect user to either replaceQuestion 2 or 3
	if (myQuestions[0] === question) {
		$(".oneononetrainer").click(function() {
			replaceQuestion(myQuestions[1]);
		})	

		$(".classinstructor").click(function() {
			replaceQuestion(myQuestions[2]);
		})	
	} else {
		$('.button').click(function() {
			var search = $(this)[0].textContent;
			window.location = "https://www.google.com/maps/search/?api=1&query=" + search;
		})
	} 
	//if it's question 2 or 3 redirect user to API call

	
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