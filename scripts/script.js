var CookieUtil = {
  get: function (name){
  var cookieName = encodeURIComponent(name) + "=",
  cookieStart = document.cookie.indexOf(cookieName),
  cookieValue = null;
  if (cookieStart > -1){
  var cookieEnd = document.cookie.indexOf(";", cookieStart);
  if (cookieEnd == -1){
  cookieEnd = document.cookie.length;
  }
  cookieValue = decodeURIComponent(document.cookie.substring(cookieStart
  + cookieName.length, cookieEnd));
  }
  return cookieValue;
  },

  set: function (name, value, expires, path, domain, secure) {
  var cookieText = encodeURIComponent(name) + "=" +
  encodeURIComponent(value);
  if (expires instanceof Date) {
  cookieText += "; expires=" + expires.toGMTString();
  }
  if (path) {
  cookieText += "; path=" + path;
  }
  if (domain) {
  cookieText += "; domain=" + domain;
  }
  if (secure) {
  cookieText += "; secure";
  }
  document.cookie = cookieText;
  },
  unset: function (name, path, domain, secure){
  this.set(name, "", new Date(0), path, domain, secure);
}
};


function blowAway (){
  CookieUtil.unset("name");
  sessionStorage.removeItem("name");
  sessionStorage.removeItem("username");
}



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

//error for error collection testing
//throw "Error - collect me please";


jsonlib.fetch(apiurl, function(m) {

  $(".allQuestion").text(m.content);

var blah = $(".allQuestion").text();
var allQuestions = JSON.parse(blah);

//console.log(allQuestions, typeof allQuestions);

var question = allQuestions[questionnum];
var choices = question['choices'];



// set the username
// if no username...


function setUsername (username) {
      sessionStorage.setItem("username",username);
    }

function setName (name) {
  sessionStorage.setItem("name",name);
  CookieUtil.set("name",name);
    }

function checkLogin() {
  var username = sessionStorage.getItem("username");
  var name = sessionStorage.getItem("name");
  var cookiename = CookieUtil.get("name");

  console.log(username,name,cookiename);
  console.log(typeof username,typeof name,typeof cookiename);



  if (cookiename !== null) {
// this was for debugging
  }

  if (username !== null) {
    alert("welcome, " + username)
    // put the username in the banner+
     $("#usernameheader").text("Username: " + username);


  } else {
    console.log("no username");
    // pop the modal to get the username...


    $(function() {
      var test = '<form id="form"><label for="username">Select a Username:</label><br><input type="textarea" id="username" name="username" </input>'
    $( "#popup" ).dialog({
    height: 250,
    width: 300,
    modal: true
    });
    $("#popup").append(test);
    $("#popup").append('<input type="submit" button id="button-id"/>')
    //$("#popup").append('<p><button id="button-id" input type = "submit">Submit</button></p></form>');
    });



    $('#button-id').click(function() {

      var namez = $('#username').val()

      setUsername(namez);
      setName(namez);
      //alert( namez );

      $("#usernameheader").text("Username: " + namez);

    console.log(form, namez, "<-form shit");

    $( "#popup" ).dialog('close');

    //window.location.reload()

    });
  }
}


checkLogin();

// create and manipulate the modal for interacting with user

function setupQuestions (qnum, scoredecrement) {

    var sd = scoredecrement

    score = score - sd

    console.log(qnum, score, sd,"<-qunum score sd in setupQuestions");

    question = allQuestions[questionnum];

    choices = question['choices'];

    correct = question['correctAnswer']

   // alert('stop')
    qtext = "Quiz - Question " + (qnum + 1);
    stext = "Score: " + (score);

    $(".question").text(question['question']).hide().fadeIn(500);
    $("#qq").hide().text(qtext).fadeIn(500);
    $("#score").hide().text(stext).fadeIn(500);
    $('<p>Your Answer:</p>').appendTo(".question");

    console.log(qnum, score, sd,"<-qunum score sd in setupQuestions v2");
    // console.log(choices, choices.length);

     for (var i = 0; i < choices.length; i++) {
        var answerinputs = $('<input type="radio" name="answer" value="' + i + '">' + choices[i] + '</input>')
        $(answerinputs).hide().appendTo('#options').fadeIn(500);
    };

    //console.log(questionnum);
  if (questionnum === 1) {
  $('#back').show();
    };

//handle case of going back muliple times and continue to select
  if (questionnum in oldanswers){
  //  alert("it exists!!");
    oldanswer = parseInt(oldanswers[questionnum]);

    $('input[name=answer][value=' + oldanswer + ']:radio').prop('checked',true);
}

};

//console.log(question, choices, "<-- question, choices");

setupQuestions(0,0)


$('#back').on('click', function () {

  questionnum--;
  console.log(questionnum, "<-back qnum only!");

  $('#options').empty();

  var oldanswer = parseInt(oldanswers[questionnum])
  question = allQuestions[questionnum];

  //console.log(oldanswer, question['correctAnswer'], "<-back! answer, correct answer");

  if (oldanswer === question['correctAnswer']) {
//send something to decrement the score

  setupQuestions(questionnum, 1);
  } else {

    setupQuestions(questionnum, 0);
  }

//should remove once double back works...
// $('input[name=answer][value=' + oldanswer + ']:radio').prop('checked',true);

})


$('.scorebut :input[value="Next"]').on('click', function () {

  var answernum = $('input[name=answer]:radio:checked').val()

  oldanswers[questionnum] = answernum;


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

var username = sessionStorage.getItem("username");


if (!localStorage["scorehistory"]) {
  localStorage["scorehistory"] = JSON.stringify(" are: ");
};

var storedNames = JSON.parse(localStorage["scorehistory"]);

storedNames += username + ":" + score + ",";

localStorage["scorehistory"] = JSON.stringify(storedNames);

storedNames = JSON.parse(localStorage["scorehistory"]);

console.log (storedNames, "<---the shits");
          //user get the most recent score only... no logic here..



        var finalscoreoutput = $('<h2> thanks for playing! your score was: ' + score + '</h2><p> other scores' + storedNames+'</p>')


        $(finalscoreoutput).appendTo('.wrapper');
        var headeroutput = $('<h1> Quiz - Final Score </h2>')
        $(headeroutput).appendTo('.header');

    } else {

    setupQuestions(questionnum, 0);

  //  console.log(allQuestions.length,questionnum, "nums before if");
  };
});
});



 })



