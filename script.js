//change display type for div holding content, start timer
const startQuiz = document.querySelector("#startButton");
const timer = document.querySelector("#timer");
const startPage = document.querySelector("#startPage");
const questions = document.querySelector("#questionPage");
const results = document.querySelector("#resultsPage");

let secondsLeft = 60

function setTime() {
    const timerInterval = setInterval(function() {
      secondsLeft--;
      timer.textContent = secondsLeft;
  
      if(secondsLeft === 0) {
        clearInterval(timerInterval);
        sendMessage();
      }
  
    }, 1000);
}

startQuiz.addEventListener("click", function(){
    event.preventDefault();
    setTime();
    questions.setAttribute("class", "shown");
    startPage.removeAttribute("class");
})


//function changing the question / answer text to the next question when each question is answered
//event listenter that pertains to all answer buttons that runs funcion a (changes to next question)
    //by changing the textContent for the question space and ansewr content
//last question changes class of master divs to hide question space and show results screen

//array of questions
    //for each question, we'll have an array of answers


const questionText = ["question 1","question 2","question 3","question 4","question 5"];
const questAns = [
    ["answer 1","answer 2","answer 3","answer 4"],
    ["dog 1","dog 2","dog 3","dog 4"],
    ["cat 1","cat 2","cat 3","cat 4"],
    ["pig 1","pig 2","pig 3","pig 4"],
    ["monkey 1","monkey 2","monkey 3","monkey 4"]
];

let currentQuestion=0

const question = document.querySelector("#questionSpace");
const ans1 = document.querySelector("#answerButton1");
const ans2 = document.querySelector("#answerButton2");
const ans3 = document.querySelector("#answerButton3");
const ans4 = document.querySelector("#answerButton4");
const answer = document.querySelector(".answerButton");
const ansList = document.querySelector("#ansList")

//function keeping score
//runs if correct answer is clicked; 
    //if statements to add to a scoce variable as the test continues

let userScore = 0;

//if the correct answer is clicked, respective of each question, add 20 to userScore
// ans1.addEventListener("click", function(){
//     event.preventDefault();
//     if (currentQuestion === 0) {
//     userScore + 20;
//     }
// })

// ans4.addEventListener("click", function(){
//     event.preventDefault();
//     if (currentQuestion === 1) {
//     userScore + 20;
//     }
// })

// ans4.addEventListener("click", function(){
//     event.preventDefault();
//     if (currentQuestion === 2) {
//     userScore + 20;
//     }
// })

// ans2.addEventListener("click", function(){
//     event.preventDefault();
//     if (currentQuestion === 3) {
//     userScore + 20;
//     }
// })

// ans3.addEventListener("click", function(){
//     event.preventDefault();
//     if (currentQuestion === 4) {
//     userScore + 20;
//     }
// })

const scoreKeeper = function() {
    if (currentQuestion === 0) {
        ans1.addEventListener("click", function(){
            userScore + 20
        })
    }
    if (currentQuestion === 1) {
        ans4.addEventListener("click", function(){
            userScore + 20
        })
    }
    if (currentQuestion === 2) {
        ans4.addEventListener("click", function(){
            userScore + 20
        })
    }
    if (currentQuestion === 3) {
        ans2.addEventListener("click", function(){
            userScore + 20
        })
    }
    if (currentQuestion === 4) {
        ans3.addEventListener("click", function(){
            userScore + 20
        })
    }
}

document.querySelectorAll('.answerButton').forEach(item =>{
    item.addEventListener("click", function(){
        scoreKeeper();
        console.log(currentQuestion);
        if(currentQuestion === 4) {
            questions.removeAttribute("class");
            results.setAttribute("class", "shown");
        } else {
            currentQuestion++;
            question.textContent=questionText[currentQuestion];
            ans1.textContent = questAns[currentQuestion][0];
            ans2.textContent = questAns[currentQuestion][1];
            ans3.textContent = questAns[currentQuestion][2];
            ans4.textContent = questAns[currentQuestion][3];
        }
        console.log(userScore)
    })
})

const scoreSpace = document.querySelector("#finalScore");
scoreSpace.textContent = userScore;

//when user submits initials, run a funtion that adds the score to the local storage
const scoreSubmit = document.querySelector("#scoreSubmit")
scoreSubmit.addEventListener("click", function(){
    localStorage.setItem("hiScore", userScore)
})

//get the data from local storage to show the scores in a list
// localStorage.getItem("hiScore")

// document.createElement("li")