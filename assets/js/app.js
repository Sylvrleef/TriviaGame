$.fn.trivia = function() {
    var t = this;
    t.userPick = null;
    t.answers = {
        correct: 0,
        incorrect: 0
    };
    t.images = null;
    t.count = 30;
    t.current = 0;
    t.questions = [{
        question: "Which sign does jQuery use as a shortcut for jQuery?",
        choices: ["the $ sign", "the ? sign", "the # sign", "the % sign"],
        correct: 0
    }, {
        question: "What is the correct jQuery code to set the background color of all p elements to red?",
        choices: ["$('p').manipulate('background-color','red')", "$('p').layout('background-color','red')", "$('p').css('background-color','red')", "$('p').style('background-color','red')"],
        correct: 2

    }, {
        question: "With jQuery, look at the following selector: $('div.intro'). What does it select?",
        choices: ["All div elements with id='intro'", "The first div element with class='intro'", "All div elements with class='intro'", "The first div element with id='intro'"],
        correct: 2

    }, {
        question: "Which jQuery method is used to hide selected elements?",
        choices: ["hidden()", "visible(false)", "hide()", "display(none)"],
        correct: 2

    }, {
        question: "Which jQuery method is used to set one or more style properties for selected elements?",
        choices: ["style()", "css()", "html()", "text()"],
        correct: 1

    }, {
        question: "Which jQuery method is used to perform an asynchronous HTTP request?",
        choices: ["jQuery.ajax()", "jQuery.ajaxAsync()", "jQuery.ajaxSetup()", "jQuery.async()"],
        correct: 0

    }, {
        question: "What is the correct jQuery code for making all div elements 100 pixels high??",
        choices: ["$('div').yPos(100)", "$('div').height='100'", "$('div').style(100)", "$('div').height(100)"],
        correct: 3

    }, {
        question: "Which statement is true?",
        choices: ["To use jQuery, you do not have to do anything. Most browsers (Internet Explorer, Chrome, Firefox and Opera) have the jQuery library built in the browser", "To use jQuery, you must buy the jQuery library at www.jquery.com", "To use jQuery, you can refer to a hosted jQuery library at Google", "None of the above"],
        correct: 2
    }, {
        question: "What scripting language is jQuery written in?",
        choices: ["JavaScript", "VBScript", "C#", "C++"],
        correct: 0
    }, {
        question: "Which jQuery function is used to prevent code from running, before the document is finished loading?",
        choices: ["$(document).ready()", "$(body).onload()", "$(document).load()", "$(document).onready()"],
        correct: 0
    }, {
        question: "Which jQuery method should be used to deal with name conflicts?",
        choices: ["nameConflict()", "noConflict()", "conflict()", "noNameConflict()"],
        correct: 1
    }, {
        question: "Which jQuery method is used to switch between adding/removing one or more classes (for CSS) from selected elements?",
        choices: ["switchClass()", "altClass()", "toggleClass()", "switch()"],
        correct: 2
    }, {
        question: "Look at the following selector: $('div p'). What does it select?",
        choices: ["All p elements inside a div element", "The first p element inside a div element", "All div elements with a p element", "All p elements"],
        correct: 0
    }, {
        question: "Look at the following selector: $('p#intro'). What does it select?",
        choices: ["The p element with id='intro'", "All p elements with class='intro'", "The p element with class='intro'", "All p elements with id='intro'"],
        correct: 0
    }, {
        question: "Which jQuery method is used to remove selected elements?",
        choices: ["detach()", "remove()", "Both a and b", "None of the above"],
        correct: 2
    }, {
        question: "Look at the following selector: $(':disabled'). What does it select?",
        choices: ["All hidden elements", "All disabled input elements", "All elements that does not contain the text 'disabled'", "All elements containing the text 'disabled'"],
        correct: 1
    }, {
        question: "Which jQuery method returns the direct parent element of the selected element?",
        choices: ["parents()", "ancestors()", "parent()", "ancestor()"],
        correct: 2
    }];
    t.ask = function() {
        if (t.questions[t.current]) {
            $("#timer").html("Time remaining: " + "00:" + t.count + " secs");
            $("#question").html(t.questions[t.current].question);
            var choicesArr = t.questions[t.current].choices;
            var buttonsArr = [];

            for (var i = 0; i < choicesArr.length; i++) {
                var button = $('<br /><button>');
                button.text(choicesArr[i]);
                button.attr('data-id', i);
                $('#answer').append(button);
            }
            window.triviaCounter = setInterval(t.timer, 1000);
        } else {
            $('#content').append($('<div />', {
                text: 'Unanswered: ' + (
                    t.questions.length - (t.answers.correct + t.answers.incorrect)),
                class: 'result'
            }));
            $('#startGame').text('Play Again').appendTo('#content').show();
        }
    };
    t.timer = function() {
        t.count--;
        if (t.count <= 0) {
            setTimeout(function() {
                t.nextQ();
            });

        } else {
            $("#timer").html("Time remaining: " + "00:" + t.count + " secs");
        }
    };
    t.nextQ = function() {
        t.current++;
        clearInterval(window.triviaCounter);
        t.count = 30;
        $('#timer').html("");
        setTimeout(function() {
            t.cleanUp();
            t.ask();
        }, 1000);
    };
    t.cleanUp = function() {
        $('div.clear').each(function(item) {
            $(this).html('');
        });
        $('.correct').html('Correct answers: ' + t.answers.correct);
        $('.incorrect').html('Incorrect answers: ' + t.answers.incorrect);
    };
    t.answer = function(correct) {
        var string = correct ? 'Correct' : 'Incorrect';
        t.answers[string]++;
        $('.' + string).html(string + ' answers: ' + t.answers[string]);
    };
    return t;
};
var Trivia;

$("#startGame").click(function() {
    $(this).hide();
    $('.result').remove();
    Trivia = new $(window).trivia();
    Trivia.ask();
});

$('#answer').on('click', 'button', function(e) {
    var userPick = $(this).data("id"),
        t = Trivia || $(window).trivia(),
        index = t.questions[t.current].correct,
        correct = t.questions[t.current].choices[index];

    if (userPick !== index) {
        $('#answer').text("Wrong Answer! The correct answer was: " + correct);
        t.answer(false);
    } else {
        $('#answer').text("Correct!!! The correct answer was: " + correct);
        t.answer(true);
    }
    t.nextQ();
});