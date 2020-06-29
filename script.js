//change display type for div holding content, start timer
const startQuiz = document.querySelector("#startButton");
const timer = document.querySelector("#timer");
const startPage = document.querySelector("#startPage");
const questions = document.querySelector("#questionPage");
const results = document.querySelector("#resultsPage");
const failPage = document.querySelector("#failPage")

let secondsLeft = 60

const sendMessage = function() {
    timer.textContent = "Time's Up!";
    questions.removeAttribute("class");
    failPage.setAttribute("class", "shown");
}

function setTime() {
    const timeLeft = setInterval(function() {
      secondsLeft--;
      timer.textContent = secondsLeft;
  
      if(secondsLeft <= 0) {
        clearInterval(timeLeft);
        sendMessage();
      }
  
    }, 1000);
}




//function changing the question / answer text to the next question when each question is answered
//event listenter that pertains to all answer buttons that runs funcion a (changes to next question)
    //by changing the textContent for the question space and ansewr content
//last question changes class of master divs to hide question space and show results screen

//array of questions
    //for each question, we'll have an array of answers


const questionText = ["Where on Tatooine was Anakin Skywalker born and raised?",
    "The leader of the Geonosians was one of the main contributors in the early stages of the Death Star project, before being killed by Darth Vader on Mustafar. What was his name?",
    "What is the name of the planet that was raided by the rebellion in order to capture the plans to the Death Star?",
    "Each of the following characters had a strong claim to being the best pilot in the galaxy, which of them didn't actively claim to be?",
    "Jar-Jar Binks was not executed for returning to meet with the Bosses of Gungan City on Naboo after being banished. What was the one thing that ensured his safety?"];
const questAns = [
    ["Mos Espa","Lars family moisture farm","Mos Eisley","Hutt City"],
    ["Boss Nass","Hugo Stiglitz","Viceroy Gunray","Archduke Poggle the Lesser"],
    ["Endor","Corouscant","Yavin","Scarif"],
    ["Han Solo","Luke Skywalker","Anakin Skywalker","Poe Dameron"],
    ["He wasn't worth their time","He was just passing through","A life-debt owed to Qui-Gon Jinn","He paid reparations"]
];

const correctAns = [
    ["correct","incorrect","incorrect","incorrect"],
    ["incorrect","incorrect","incorrect","correct"],
    ["incorrect","incorrect","incorrect","correct"],
    ["incorrect","correct","incorrect","incorrect"],
    ["incorrect","incorrect","correct","incorrect"]
];



let currentQuestion=0

const question = document.querySelector("#questionSpace");

const ansList = document.querySelector("#ansList")

//function keeping score
//subtracts time if incorrect answer is clicked

const nextQ = function(){
    currentQuestion ++;
    
}


startQuiz.addEventListener("click", function(){
    event.preventDefault();
    setTime();
    questions.setAttribute("class", "shown");
    startPage.removeAttribute("class");
    question.textContent = questionText[currentQuestion];
    for (let j = 0; j < questAns[currentQuestion].length; j++) {
        let ansSpc = document.createElement("li");
        let ansBtn = document.createElement("button");
        ansBtn.textContent = questAns[currentQuestion][j];
        ansBtn.setAttribute("value", correctAns[currentQuestion][j]);
        ansBtn.setAttribute("type", "button");
        ansSpc.appendChild(ansBtn);
        ansList.appendChild(ansSpc);
    }
    ansList.addEventListener("click", function(event) {
        if(currentQuestion === 4) {
            if (event.target.matches("button") && event.target.value === "incorrect"){
                secondsLeft -= 4;
                clearInterval(timeLeft);
                questions.removeAttribute("class");
                results.setAttribute("class", "shown");
            } else {
                clearInterval(timeLeft);
                questions.removeAttribute("class");
                results.setAttribute("class", "shown");
            }
        } else if (event.target.matches("button") && event.target.value === "incorrect"){
            console.log("bacon");
            secondsLeft -= 4;
            currentQuestion ++;
        } else {
            currentQuestion ++;
        } 
    })
})



const scoreSpace = document.querySelector("#finalScore");
scoreSpace.textContent = secondsLeft;

//when user submits initials, run a funtion that adds the score to the local storage
const scoreSubmit = document.querySelector("#scoreSubmit")
const initials = document.querySelector("#initials")
scoreSubmit.addEventListener("click", function(){
    localStorage.setItem("hiScore", initials + secondsLeft);
    results.removeAttribute("class");
    hiScoresPage.setAttribute("class", "shown");
})

//get the data from local storage to show the scores in a list

// document.createElement("li")
const hiScoresPage = document.querySelector("#hiScoresPage");
const hiscoreLink = document.querySelector("#hiscoresButton");
hiscoreLink.addEventListener("click", function(){
    startPage.removeAttribute("class");
    questions.removeAttribute("class");
    results.removeAttribute("class");
    hiScoresPage.setAttribute("class", "shown");
})