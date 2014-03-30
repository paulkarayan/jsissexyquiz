//provide as JSON. But I want to feed using flask instead so will remove

// var allQuestions = [
// {
//     question: "Who is Prime Minister of the United Kingdom?",
//     choices: ["David Cameron", "Gordon Brown", "Winston Churchill", "Tony Blair"],
//     correctAnswer: 0
// }, {
//     question: "What is the landspeed of an African Swallow?",
//     choices: ["100km/hr", "24mph", "5mph", "Tony Blair"],
//     correctAnswer: 1
// },

//       {question: "What is the capital of Slovenia?",  choices: ["Ljubljana", "Maribor", "Celje"],         correctAnswer: 0}
// ];

// jsonQ = JSON.stringify(allQuestions);

var apiurl = 'http://gentle-hamlet-8813.herokuapp.com/';

var questionnum = 0;
var score = 0;
var qtext = "Quiz - Question 1";
var stext = "Score: 0";
var answernum = 2;
var oldanswers = {};

$(".body").hide();
$('.scorebut :input[value="Back"]').hide();


$(document).ready(function() {

jsonlib.fetch('http://gentle-hamlet-8813.herokuapp.com/', function(m) {

  $(".allQuestion").text(m.content);

var blah = $(".allQuestion").text();
var allQuestions = JSON.parse(blah);

//console.log(allQuestions, typeof allQuestions);

var question = allQuestions[questionnum];
var choices = question['choices'];



function setupQuestions (qnum) {

    console.log(qnum,"<-qunum in setupQuestions");

    question = allQuestions[questionnum];

    choices = question['choices'];

    correct = question['correctAnswer']

    qtext = "Quiz - Question " + (qnum + 1);
    stext = "Score: " + score;

    $(".question").text(question['question']).hide().fadeIn(500);
    $("#qq").hide().text(qtext).fadeIn(500);
    $("#score").hide().text(stext).fadeIn(500);
    $('<p>Your Answer:</p>').appendTo(".question");


    // console.log(choices, choices.length);

     for (var i = 0; i < choices.length; i++) {
        var answerinputs = $('<input type="radio" name="answer" value="' + i + '">' + choices[i] + '</input>')
        $(answerinputs).hide().appendTo('#options').fadeIn(500);
    };

    console.log(questionnum);
  if (questionnum === 1) {
  $('#back').show();
    };

};





console.log(question, choices, "<-- question, choices");

setupQuestions(0)


$('#back').on('click', function () {
  //alert("thp");
  questionnum--;
  console.log(questionnum, "<-back!");
  //alert("thp");

  var oldanswer = oldanswers[questionnum]
  $('input[name=answer]:radio:checked').val(oldanswer)
  console.log(oldanswer, "<-back!");
})


$('.scorebut :input[value="Next"]').on('click', function () {

  var answernum = $('input[name=answer]:radio:checked').val()

  oldanswers[questionnum] = answernum;
  console.log(oldanswers, "<---all the old answers");


  console.log(answernum);
  if (!answernum) {
    alert("Sorry - you didn't select an answer. please select an answer and try again");
    return
  }

    if (correct === parseInt(answernum)) {
        score = score + 1;
        console.log(answernum, correct, "score incresase")
      } else {
        console.log(answernum, correct, "fail!");
      };

      $('#options').empty();


    console.log(allQuestions.length,questionnum, "nums before setup");
    questionnum++ ;


  if (allQuestions.length === questionnum) {

        $('.wrapper').empty();
        $('.header').empty();

        var finalscoreoutput = $('<h2> thanks for playing! your score was: ' + score + '</h2>')
        $(finalscoreoutput).appendTo('.wrapper');
        var headeroutput = $('<h1> Quiz - Final Score </h2>')
        $(headeroutput).appendTo('.header');
    } else {

    setupQuestions(questionnum);

    console.log(allQuestions.length,questionnum, "nums before if");
  };
});
});



 })



