// creating questions for my quiz
const hitTag = document.getElementById("hits");
const openingBox = document.getElementById("openingBox");
const start = document.getElementById("startButton");
const quiz = document.getElementById("quiz");
const questionBox = document.getElementById("questionBox");
const question = document.getElementById("question");
const questionImage = document.getElementById("questionImage");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const answer = document.getElementById("answer");
const next = document.getElementById("next");
const progressSection = document.getElementById("progressSection");
const progress = document.getElementById("progress");
const questionBar = document.getElementById("questionBar");
const questionBarColour = document.getElementById("questionBarColour");
const closingBox = document.getElementById("closingBox");
const scoreBox = document.getElementById("scoreBox");
const counter = document.getElementById("counter");
let questions = [
    {
        question : "What is 5 x 7?",
        imgSrc: "images/numbers.jfif",
        choiceA : "35",
        choiceB : "30",
        choiceC : "40",
        correct : "A"
    },
    {
        question : "What is the Capital of Italy?",
        imgSrc: "images/italy.jfif",
        choiceA : "Venice",
        choiceB : "Pompeii",
        choiceC : "Rome",
        correct : "C"
    },
    {
        question : "Which year did the second World War start?",
        imgSrc: "images/ww2.jfif",
        choiceA : "1942",
        choiceB : "1937",
        choiceC : "1939",
        correct : "C"
    },
    {
        question : "What is the sqaure root of 625?",
        imgSrc: "images/numbers-2.jfif",
        choiceA : "26",
        choiceB : "25",
        choiceC : "28",
        correct : "B"
    },
    {
        question : "Which of these is Disney's first film?",
        imgSrc: "images/disney.jfif",
        choiceA : "Snow White",
        choiceB : "Cinderella",
        choiceC : "Sleeping Beauty",
        correct : "A"

    },
    { question : "What is 1470 divided by 5?",
        imgSrc: "images/numbers-3.jfif",
        choiceA : "220",
        choiceB : "294",
        choiceC : "258",
        correct : "B"
    },
    {
        question : "Which football team is known as the Red Devils?",
        imgSrc: "images/red-devil.jfif",
        choiceA : "Liverpool",
        choiceB : "Manchester City",
        choiceC : "Manchester United",
        correct : "C"
    },
    {
        question : "How many countries are there in the world?",
        imgSrc: "images/countries.jfif",
        choiceA : "201",
        choiceB : "195",
        choiceC : "179",
        correct : "B"
    },
    {
        question : "In the Simpsons, what is Homer's middle name?",
        imgSrc: "images/homer.jfif",
        choiceA : "Lou",
        choiceB : "Lee",
        choiceC : "Jay",
        correct : "C"
    },
    {
        question : "Acrophobia is the fear of what?",
        imgSrc: "images/fear.jfif",
        choiceA : "Spiders",
        choiceB : "Insects",
        choiceC : "Heights",
        correct : "C"
    },
    {
        question : "Which country has the longest coastline in the world?",
        imgSrc: "images/coastline.jfif",
        choiceA : "Canada",
        choiceB : "Russia",
        choiceC : "Indonesia",
        correct : "A"
    },
    {
        question : "What is 567 + 349?",
        imgSrc: "images/numbers-4.jfif",
        choiceA : "916",
        choiceB : "915",
        choiceC : "917",
        correct : "A"
    },
    {
        question : "What is the longest river in the world?",
        imgSrc: "images/nile.jfif",
        choiceA : "Amazon",
        choiceB : "Nile",
        choiceC : "Yangtze",
        correct : "B"
    },
    {
        question : "Which country is modern-day Timbuktu?",
        imgSrc: "images/timbuktu.jfif",
        choiceA : "Figi",
        choiceB : "Thailand",
        choiceC : "Mali",
        correct : "C"
    },
    {
        question : "Which is the largest of the Canary Islands?",
        imgSrc: "images/canary-islands.jfif",
        choiceA : "Lanzarote",
        choiceB : "Tenerife",
        choiceC : "Gran Canaria",
        correct : "B"
    }
];

// create variables
const numQuestions = questions.length;
let runningQuestion = 0;
let count = 15;
const questionTime = 15;
let timer;
let score = 0;
let width = 0;

// starting event listeners
window.addEventListener("load", hitCounter);
start.addEventListener("click", startQuiz);

// initialise quiz
function startQuiz(){
    openingBox.style = "display: none";
    hitTag.style = "display: none";
    renderQuestion(runningQuestion);
    quiz.style = "display: block";
    renderCounter();
    counter.style = "display: block";
    timer = setInterval(renderCounter,1000);
}

// render next question
function renderQuestion(q){
    questionBox.style = "display: block";
    question.innerHTML = questions[q].question;
    questionImage.src = questions[q].imgSrc;
    choiceA.innerHTML = "<button>"+questions[q].choiceA+"</button>";
    choiceB.innerHTML = "<button>"+questions[q].choiceB+"</button>";
    choiceC.innerHTML = "<button>"+questions[q].choiceC+"</button>";
    choiceA.addEventListener("click", checkAnswerA);
    choiceB.addEventListener("click", checkAnswerB);
    choiceC.addEventListener("click", checkAnswerC);
}

// render progess
function renderProgress(){
    progress.innerHTML = "Your next question will be number "+(runningQuestion+2)+" of "+numQuestions;
    document.documentElement.style.setProperty('--previousWidth', width+"%")
    width = 100 * (runningQuestion+1)/numQuestions;
    document.documentElement.style.setProperty('--newWidth', width+"%")
    questionBarColour.classList.remove("animateBar");
    setTimeout(function(){questionBarColour.classList.add("animateBar")}, 1);
}

function resetCounter() {
    clearInterval(timer);
    count=questionTime;
    counter.style = "display: none";
    counter.innerHTML = '';
}

//render counter 
function renderCounter(){
    if(count >= 0){
        counter.innerHTML = "You have "+count+" seconds left!";
        count--
    }
    else{ //ran out of time
        ranOutOfTime();
    }
}

function checkAnswerA(){
    choiceA.removeEventListener("click", checkAnswerA);
    choiceB.removeEventListener("click", checkAnswerB);
    choiceC.removeEventListener("click", checkAnswerC);
    questionBox.style = "display: none";
    resetCounter();
    if(questions[runningQuestion].correct === 'A'){ //answer is correct
        answerIsCorrect(); // change progress to green and increment score
    }
    else{ //answer is incorrect
        answerIsWrong(); //change progress to red
    }
    runningQuestion++
}

function checkAnswerB(){
    questionBox.style = "display: none";
    choiceA.removeEventListener("click", checkAnswerA);
    choiceB.removeEventListener("click", checkAnswerB);
    choiceC.removeEventListener("click", checkAnswerC);
    resetCounter();
    if(questions[runningQuestion].correct === 'B'){ //answer is correct
        answerIsCorrect(); // change progress to green and increment score
    }
    else{ //answer is incorrect
        answerIsWrong(); //change progress to red
    }
    runningQuestion++
}

function checkAnswerC(){
    questionBox.style = "display: none";
    choiceA.removeEventListener("click", checkAnswerA);
    choiceB.removeEventListener("click", checkAnswerB);
    choiceC.removeEventListener("click", checkAnswerC);
    resetCounter();
    if(questions[runningQuestion].correct === 'C'){ //answer is correct
        answerIsCorrect(); // change progress to green and increment score
    }
    else{ //answer is incorrect
        answerIsWrong(); //change progress to red
    }
    runningQuestion++
}

function answerIsCorrect() {
    score++
    answer.innerHTML = "Correct!";
    answer.style = "display: block";
    answer.style = "background-color: #33e84e";
    checkNext();
}

function answerIsWrong() {
    answer.innerHTML = "Incorrect";
    answer.style = "display: block";
    answer.style = "background-color: #eb4034";
    checkNext();
}

function ranOutOfTime() {
    choiceA.removeEventListener("click", checkAnswerA);
    choiceB.removeEventListener("click", checkAnswerB);
    choiceC.removeEventListener("click", checkAnswerC);
    questionBox.style = "display: none";
    resetCounter();
    answer.innerHTML = "Too slow!";
    answer.style = "display: block";
    answer.style = "background-color: #eb4034";
    checkNext();
    runningQuestion++
}

function checkNext() {
    if((runningQuestion+2 /*runningQuestion starts at 0, so add 2 to get next question ID*/) <= numQuestions){
        next.style = "display: block";
        progressSection.style = "display: block";
        renderProgress();
        next.innerHTML = "<button id='nxtBtn' onClick='nextQuestion()'>Next Question</button>";
    }
    else{ //end of quiz
        getResults();
    }
}

function getResults() {
    progress.innerHTML = "You have completed the quiz!"
    progressSection.style = "display: block";
    document.documentElement.style.setProperty('--previousWidth', width+"%")
    width = 100 * (runningQuestion+1)/numQuestions;
    document.documentElement.style.setProperty('--newWidth', width+"%")
    questionBarColour.classList.remove("animateBar");
    setTimeout(function(){questionBarColour.classList.add("animateBar")}, 1);
    next.innerHTML = "<button id='RsltsBtn' onClick='endQuiz()'>Results</button>";
    next.style = "display: block;"
}

function nextQuestion() {
    answer.style = "display: none";
    next.style = "display: none";
    progressSection.style = "display: none";
    renderCounter();
    renderQuestion(runningQuestion);
    timer = setInterval(renderCounter,1000);
    counter.style = "display: block";
}

function endQuiz() {
    resetCounter();
    quiz.style = "display: none;"
    progress.innerHTML = "You have finished the quiz!"
    scoreRender();
}

//score render
function scoreRender() {
    closingBox.style = "display: block";

    // add up percentage score
    const scorePer = Math.round(100 * score/numQuestions);

    // score images
    let img = (scorePer >= 85) ? "images/excellent.jfif":
              (scorePer >= 65) ? "images/great-work.jfif":
              (scorePer >= 50) ? "images/nice-try.jfif":
                                 "images/unlucky.jfif";

    let message = (scorePer >= 85) ? "You're a talented quizer!":
                  (scorePer >= 65) ? "Great effort!":
                  (scorePer >= 50) ? "Room for improvement!":
                                     "Maybe quizzing isn't for you...";
    
    scoreBox.innerHTML = "<img src=" + img + ">";
    scoreBox.innerHTML += "<p>Score: " + scorePer + "%</p>";
    scoreBox.innerHTML += "<p>"+message+"</p>";
    scoreBox.innerHTML += "<button id='retry' onClick='window.location.reload();'>Try Again?</button>"             
}
    
function hitCounter() {
    let hits;
                
    // See if the counter already exists
    try {
        hits = JSON.parse(localStorage.getItem("hits"));
    } catch (error) {
        // If it doesn't exist, make it
        hits = {};
    }

    if(typeof hits !== 'number'){
        // initialise the hit counter
        hits = 0;
    }

    // Add a hit since someone has just loaded the website
    hits++;

    // Store in localStorage
    localStorage.setItem("hits", JSON.stringify(hits));

    // Show hits on page
    if(JSON.parse(localStorage.getItem("hits")) === 1){
        hitTag.innerHTML = "<p>This is the first time this quiz has been visited. <br> Thanks for dropping by, have fun!</p>"
    }
    else{
        hitTag.innerHTML = "<p>This quiz has been visited "+JSON.parse(localStorage.getItem("hits"))+" times so far.</p>"
    }
}