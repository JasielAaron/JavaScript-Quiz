var questions = [
  { 
    prompt: `Commonly used data types DO NOT iclude:`, 
    options: [ 
        "strings", 
        "booleans", 
        "alerts", 
        "numbers", 
    ], 
    answer: "alerts", 
}, 

{ 
    prompt: `The condition in an if / else statement is enclosed within _____.`, 
    options: ["quotes", "curly brackets", "parentheses", "square brackets"], 
    answer: "parentheses", 
}, 

{ 
    prompt: `Arrays in JavaScript can be used to store _____.`, 
    options: [ 
        "numbers and strings ", 
        "other arrays", 
        "booleans", 
        "all of the above", 
    ], 
    answer: "all of the above", 
}, 

{ 
  prompt: `String values nust be enclosed within _____ when being assigned to variables.`, 
  options: [ 
      "commas", 
      "curly brackets", 
      "quotes", 
      "parentheses", 
  ], 
  answer: "quotes", 
}, 

{ 
  prompt: `A very useful tool used during development and debugging for printiing contect to the debugger is:`, 
  options: [ 
      "JavaScript ", 
      "Terminal / bash", 
      "for loops", 
      "console.log", 
  ], 
  answer: "console.log", 
}, 
]; 



var questionsEl = 
    document.querySelector( 
        "#questions"
    ); 
var timerEl = 
    document.querySelector("#timer"); 
var choicesEl = 
    document.querySelector("#options"); 
var submitBtn = document.querySelector( 
    "#submit-score"
); 
var startBtn = 
    document.querySelector("#start"); 
var nameEl = 
    document.querySelector("#initials"); 
var feedbackEl = document.querySelector( 
    "#feedback"
); 
var reStartBtn = 
    document.querySelector("#restart"); 
  
//How the quiz intial state is 
var currentQuestionIndex = 0; 
var time = questions.length * 15; 
var timerId; 
  
//to start quiz and hide front page
  
function quizStart() { 
    timerId = setInterval( 
        clockTick, 
        1000 
    ); 
    timerEl.textContent = time; 
    var landingScreenEl = 
        document.getElementById( 
            "start-screen"
        ); 
    landingScreenEl.setAttribute( 
        "class", 
        "hide"
    ); 
    questionsEl.removeAttribute( 
        "class"
    ); 
    getQuestion(); 
} 
  
//loops through questions in the array it should answer create list with buttons
function getQuestion() { 
    var currentQuestion = 
        questions[currentQuestionIndex]; 
    var promptEl = 
        document.getElementById( 
            "question-words"
        ); 
    promptEl.textContent = 
        currentQuestion.prompt; 
    choicesEl.innerHTML = ""; 
    currentQuestion.options.forEach( 
        function (choice, i) { 
            var choiceBtn = 
                document.createElement( 
                    "button"
                ); 
            choiceBtn.setAttribute( 
                "value", 
                choice 
            ); 
            choiceBtn.textContent = 
                i + 1 + ". " + choice; 
            choiceBtn.onclick = 
                questionClick; 
            choicesEl.appendChild( 
                choiceBtn 
            ); 
        } 
    ); 
} 
  

//will check for right answer and will deduct time for wrong answers and go the next question 

  
function questionClick() { 
    if ( 
        this.value !== 
        questions[currentQuestionIndex] 
            .answer 
    ) { 
        time -= 10; 
        if (time < 0) { 
            time = 0; 
        } 
        timerEl.textContent = time; 
        feedbackEl.textContent = `Wrong! The correct answer was  
        ${questions[currentQuestionIndex].answer}.`; 
        feedbackEl.style.color = "red"; 
    } else { 
        feedbackEl.textContent = 
            "Correct!"; 
        feedbackEl.style.color = 
            "green"; 
    } 
    feedbackEl.setAttribute( 
        "class", 
        "feedback"
    ); 
    setTimeout(function () { 
        feedbackEl.setAttribute( 
            "class", 
            "feedback hide"
        ); 
    }, 2000); 
    currentQuestionIndex++; 
    if ( 
        currentQuestionIndex === 
        questions.length 
    ) { 
        quizEnd(); 
    } else { 
        getQuestion(); 
    } 
} 
  
//will check for right answer and will deduct time for wrong answers and go the next question 
  
function quizEnd() { 
    clearInterval(timerId); 
    var endScreenEl = 
        document.getElementById( 
            "quiz-end"
        ); 
    endScreenEl.removeAttribute( 
        "class"
    ); 
    var finalScoreEl = 
        document.getElementById( 
            "score-final"
        ); 
    finalScoreEl.textContent = time; 
    questionsEl.setAttribute( 
        "class", 
        "hide"
    ); 
} 
  
// end the quiz if the timer reaches 0
  
function clockTick() { 
    time--; 
    timerEl.textContent = time; 
    if (time <= 0) { 
        quizEnd(); 
    } 
} 
  
//to save score and initals
function saveHighscore() { 
    var name = nameEl.value.trim(); 
    if (name !== "") { 
        var highscores = 
            JSON.parse( 
                window.localStorage.getItem( 
                    "highscores"
                ) 
            ) || []; 
        var newScore = { 
            score: time, 
            initials: initials, 
        }; 
        highscores.push(newScore); 
        window.localStorage.setItem( 
            "highscores", 
            JSON.stringify(highscores) 
        ); 
        alert( 
            "Your Score has been Submitted"
        ); 
    } 
} 
  
// saves scores after pressing enter
  
function checkForEnter(event) { 
    if (event.key === "Enter") { 
        saveHighscore(); 
        alert( 
            "Your Score has been Submitted"
        ); 
    } 
} 
nameEl.onkeyup = checkForEnter; 
  
// saves score after clicking submit
  
submitBtn.onclick = saveHighscore; 
  
//starts quiz
  
startBtn.onclick = quizStart;

