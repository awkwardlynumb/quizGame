//define different parts of the page to be displayed at different times throughout the program, as well as the buttons on them and the text areas needed to be filled
const startPage = document.querySelector("#startPage");
    const startQuiz = document.querySelector("#startButton");
    const timer = document.querySelector("#timer");
    const hiscoreLink = document.querySelector("#hiscoresButton");
const questions = document.querySelector("#questionPage");
    const question = document.querySelector("#questionSpace");
    const ansList = document.querySelector("#ansList")
const results = document.querySelector("#resultsPage");
    const scoreSpace = document.querySelector("#finalScore");
    const initials = document.querySelector("#initials")
    const scoreSubmit = document.querySelector("#scoreSubmit")
const hiScoresPage = document.querySelector("#hiScoresPage");
    const scoresList = document.querySelector(".scoresList")
    const backToStart = document.querySelector("#backToStart")
const failPage = document.querySelector("#failPage");
    const restart = document.querySelector("#restart")

//define the questions the quiz will be asking
const questionText = ["Where on Tatooine was Anakin Skywalker born and raised?",
    "The leader of the Geonosians was one of the main contributors in the early stages of the Death Star project, before being killed by Darth Vader on Mustafar. What was his name?",
    "What is the name of the planet that was raided by the rebellion in order to capture the plans to the Death Star?",
    "Each of the following characters had a strong claim to being the best pilot in the galaxy, which of them didn't actively claim to be?",
    "Jar-Jar Binks was not executed for returning to meet with the Bosses of Gungan City on Naboo after being banished. What was the one thing that ensured his safety?"];

//define the answer choices to each question
    const questAns = [
    ["Mos Espa","Lars family moisture farm","Mos Eisley","Hutt City"],
    ["Boss Nass","Hugo Stiglitz","Viceroy Gunray","Archduke Poggle the Lesser"],
    ["Endor","Corouscant","Yavin","Scarif"],
    ["Han Solo","Luke Skywalker","Anakin Skywalker","Poe Dameron"],
    ["He wasn't worth their time","He was just passing through","A life-debt owed to Qui-Gon Jinn","He paid reparations"]
];

//define which answer is correct for each question (DON'T CHEAT, TAKE THE QUIZ FIRST!!)
const correctAns = [
    ["correct","incorrect","incorrect","incorrect"],
    ["incorrect","incorrect","incorrect","correct"],
    ["incorrect","incorrect","incorrect","correct"],
    ["incorrect","correct","incorrect","incorrect"],
    ["incorrect","incorrect","correct","incorrect"]
];

//define the amout of time on the clock to start
let secondsLeft = 60

//define what happens if time runs out
const heheLoser = function() {
    timer.textContent = "Time's Up!";
    questions.removeAttribute("class");
    failPage.setAttribute("class", "shown");
}

//set the timer
const timeLeft = setInterval(setTime, 1000)
function setTime() {
    secondsLeft--;
    timer.textContent = secondsLeft;
  
    if(secondsLeft <= 0) {
        clearInterval(timeLeft);
        heheLoser();
    }
}

//create a variable that will allow the test to progess through each question as the last one is answered
let currentQuestion=0

//start the quiz, hiding the start page, displaying the quiz page, and populating it with the first questions and its answers
//note to grader: I tried calling the nextQ function instead of running all the same stuff seperately in this listener, but ran into wacky-wonky-crazy issues and couldn't resolve them
startQuiz.addEventListener("click", function(){
    event.preventDefault();
    setTime();
    questions.setAttribute("class", "shown");
    startPage.removeAttribute("class");
    nextQ();
})

//define what happens when the user moves onto a new question from the star page or from the previous question
const nextQ = function(){
//empty out the ul containing the answer choices
    ansList.innerHTML = "";
//populate the question space with the text of the next question
    question.textContent = questionText[currentQuestion];
//generate answer buttons, use j to rebel against the system
    for (let j = 0; j < questAns[currentQuestion].length; j++) {
//create the answer buttons as well as list items for them to be housed in
        let ansSpc = document.createElement("li");
        let ansBtn = document.createElement("button");
//give the buttons their text and define them as correct or incorrect
        ansBtn.textContent = questAns[currentQuestion][j];
        ansBtn.setAttribute("value", correctAns[currentQuestion][j]);
        ansBtn.setAttribute("type", "button");
//house the buttons in the ul
        ansSpc.appendChild(ansBtn);
        ansList.appendChild(ansSpc);
    }
}

//define how the quiz will progress and eventually conclude
ansList.addEventListener("click", function(event) {
//on the last question...
    if(currentQuestion === 4) {
//remove the time if they click the wrong answer
        if (event.target.matches("button") && event.target.value === "incorrect"){
            secondsLeft -= 4;
            clearInterval(timeLeft);
//hide the questions and show the results
            questions.removeAttribute("class");
            results.setAttribute("class", "shown");
            scoreSpace.textContent = secondsLeft;
        } else {
            clearInterval(timeLeft);
            questions.removeAttribute("class");
            results.setAttribute("class", "shown");
            scoreSpace.textContent = secondsLeft;
        }
    } else if (event.target.matches("button") && event.target.value === "incorrect"){
        secondsLeft -= 4;
        currentQuestion ++;
//go to the next question
        nextQ();
    } else {
        currentQuestion ++;
        nextQ();
    } 
});

//when user submits initials, run a funtion that adds the score to the local storage

const scoreName = initials.value
scoreSubmit.addEventListener("click", function(){   
    localStorage.setItem("hiScore", scoreName + "" + secondsLeft);
    results.removeAttribute("class");
    hiScoresPage.setAttribute("class", "shown");
})

//get the data from local storage to show the scores in a list
// document.createElement("li")




hiscoreLink.addEventListener("click", function(){
    failPage.removeAttribute("class")
    startPage.removeAttribute("class");
    questions.removeAttribute("class");
    results.removeAttribute("class");
    hiScoresPage.setAttribute("class", "shown");
    clearInterval(timeLeft);
})


restart.addEventListener("Click", function(){
    clearInterval(timeLeft);
    secondsLeft = 60;
    failPage.removeAttribute("class")
    startPage.setAttribute("class", "shown")
})

backToStart.addEventListener("Click", function(){
    clearInterval(timeLeft);
    secondsLeft = 60;
    hiScoresPage.removeAttribute("class")
    startPage.setAttribute("class", "shown")
})