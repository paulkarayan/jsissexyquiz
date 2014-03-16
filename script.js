var allQuestions = [
{
    question: "Who is Prime Minister of the United Kingdom?",
    choices: ["David Cameron", "Gordon Brown", "Winston Churchill", "Tony Blair"],
    correctAnswer: 0
}, {
    question: "What is the landspeed of an African Swallow?",
    choices: ["100km/hr", "24mph", "5mph", "Tony Blair"],
    correctAnswer: 1
},

      {question: "What is the capital of Slovenia?",  choices: ["Ljubljana", "Maribor", "Celje"],         correctAnswer: 0}
];

var questionnum = 0;
var score = 0;
var qtext = "Quiz - Question 1";
var stext = "Score: 0";
var question = allQuestions[questionnum];
var choices = question['choices'];
var answernum = 2;


function setupQuestions (qnum) {

    console.log(qnum,question,"<-qunum in setupQuestions");

    question = allQuestions[questionnum];
    $(".question").text(question['question']);
    choices = question['choices'];

    correct = question['correctAnswer']

    qtext = "Quiz - Question " + (qnum + 1);
    stext = "Score: " + score;

    $("#qq").text(qtext);
    $("#score").text(stext);

     console.log(choices, choices.length);

     for (var i = 0; i < choices.length; i++) {
        var answerinputs = $('<input type="radio" name="answer" value="' + i + '">' + choices[i] + '</input>')
        $(answerinputs).appendTo('#options');
    };

};




$(document).ready(function() {
setupQuestions(0);

$('.scorebut').on('click', function () {

  var answernum = $('input[name=answer]:radio:checked').val()

  //todo - add handling for no checked radio button

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