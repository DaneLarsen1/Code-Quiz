document.addEventListener('DOMContentLoaded', function () {
    const startScreen = document.getElementById('start-screen');
    const quizContainer = document.getElementById('quiz-container');
    const endScreen = document.getElementById('end-screen');
    const startButton = document.getElementById('start-button');
    const nextButton = document.getElementById('next-button');
    const saveButton = document.getElementById('save-button');
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const feedbackElement = document.getElementById('feedback');
    const finalScoreElement = document.getElementById('final-score');
    const initialsInput = document.getElementById('initials');
    const timerContainer = document.getElementById('timer-container');
    const highscoresScreen = document.getElementById('highscores-screen');
    const highscoresList = document.getElementById('highscores-list');
    const clearButton = document.getElementById('clear-button');
    const tryAgainButton = document.getElementById('try-again-button');


    let currentQuestionIndex = 0;
    let timer;
    let score = 0;
    const timeLimit = 60;
    let timeLeft = timeLimit;

    const questions = [
        {
            question: "What does HTML stand for?",
            options: ["Hyper Text Markup Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language", "Hyper Transfer Markup Language"],
            correctAnswer: "Hyper Text Markup Language"
        },
        {
            question: "What are people who write computer code called?",
            options: ["Cryptographers", "Professors", "Programmers", "Manufacturers"],
            correctAnswer: "Programmers"
        },
        {
            question: "What is computer coding?",
            options: ["A radio show", "A list of functions", "Telling a computer what to do", "A best seller book"],
            correctAnswer: "Telling a computer what to do"
        },
        {
            question: "Which one of these is not a programming language?",
            options: ["CSS", "HTML", "FTL", "Java-Script"],
            correctAnswer: "FTL"
        },
        {
            question: "What word describes the set of instructions that computers need to do work?",
            options: ["Blueprint", "Agenda", "Synopsis", "Program"],
            correctAnswer: "Program"
        },
        {
            question: "How can you open a link in a new browser window?",
            options: ["_blank", "Target", "Same", "_Open"],
            correctAnswer: "_blank"
        },
        {
            question: "The content of the page (your images,text,links) will show up where??",
            options: ["Head", "Body", "Style", "Folder"],
            correctAnswer: "Body"
        },
        {
            question: "The default link color for hyperlinks?",
            options: ["green", "Blue", "Purple", "Red"],
            correctAnswer: "Blue"
        },
        {
            question: "Which tag is used to underline text in HTML?",
            options: ["<a>", "<b>", "<u>", "<l>"],
            correctAnswer: "<u>"
        },
        {
            question: "What does CSS stand for?",
            options: ["Colorful Style Sheets", "Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets"],
            correctAnswer: "Cascading Style Sheets"
        },
        {
            question: "How do you insert a comment in a CSS file??",
            options: ["'this is a comment", "//this is a comment//", "/* this is a comment */", "//this is a comment"],
            correctAnswer: "/* this is a comment */"
        },
        {
            question: "How do you add a background color for all <h1> elements?",
            options: ["h1.all {background-color:#FFFFFF;}", "all.h1 {background-color:#FFFFFF;}", "all {background-color:#FFFFFF;}", "h1 {background-color:#FFFFFF;}"],
            correctAnswer: "h1 {background-color:#FFFFFF;}"
        },
    ];

    startButton.addEventListener('click', startQuiz);
    // nextButton.addEventListener('click', loadNextQuestion);
    nextButton.addEventListener('click', function () {
        // Check if the user has skipped the question
        if (!questions[currentQuestionIndex].answered) {
            // If the question is skipped, treat it as incorrect
            feedbackElement.style.color = '#f44336';
            feedbackElement.textContent = "Skipped!";  // You can customize the message
            clearInterval(timer);
            startTimer();
        }

        currentQuestionIndex++;
        loadNextQuestion();
    });
    saveButton.addEventListener('click', saveScore);
    function startQuiz() {
        startScreen.style.display = 'none';
        quizContainer.style.display = 'block';
        loadNextQuestion();
        startTimer();
    }

    function startTimer() {
        timer = setInterval(function () {
            timeLeft--;

            if (timeLeft <= 0) {
                endGame();
            } else {
                updateTimerDisplay();
            }
        }, 1000);
    }

    function updateTimerDisplay() {
        document.getElementById('time-display').textContent = timeLeft;
    }

    function loadNextQuestion() {
        if (currentQuestionIndex < questions.length) {
            const currentQuestion = questions[currentQuestionIndex];
            displayQuestion(currentQuestion);
        } else {
            endGame();
        }
    }

    function displayQuestion(question) {
        questionElement.textContent = question.question;
        optionsElement.innerHTML = "";
        question.answered = false;

        question.options.forEach(function (option) {
            const button = document.createElement('button');
            button.textContent = option;
            button.addEventListener('click', function () {
                checkAnswer(option, question.correctAnswer);
            });
            optionsElement.appendChild(button);
        });
    }

    function checkAnswer(userAnswer, correctAnswer) {
        question.answered = true;
        if (userAnswer === correctAnswer) {
            feedbackElement.style.color = '#4caf50';
            feedbackElement.textContent = "Correct!";
            score++;
        } else {
            feedbackElement.style.color = '#f44336';
            feedbackElement.textContent = "Incorrect!";
            timeLeft -= 5; // Deduct 10 seconds for an incorrect answer
            if (timeLeft < 0) {
                timeLeft = 0;
            }
            updateTimerDisplay();
        }

        currentQuestionIndex++;
        loadNextQuestion();
    }

    function endGame() {
        clearInterval(timer);
        quizContainer.style.display = 'none';
        endScreen.style.display = 'block';
        finalScoreElement.textContent = score;
    }

//     function saveScore() {
//         // Save the score and initials to your desired location or perform any other action
//         const initials = initialsInput.value;
//         console.log("Initials:", initials, "Score:", score);
//     }
// });
clearButton.addEventListener("click" , clearHighScores);
    tryAgainButton.addEventListener("click" , tryAgain);

    function clearHighScores() {
        // Clear high scores logic here
        localStorage.removeItem('highScores');
        displayHighScores(); // Refresh the high scores list
    }

    function tryAgain() {
        // Reload the page to start the quiz again
        location.reload();
    }

    function saveScore() {
    const initials = initialsInput.value;

    // Load existing high scores from local storage
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

    // Add the current score to the high scores
    highScores.push({ initials, score });

    // Sort high scores by score in descending order
    highScores.sort((a, b) => b.score - a.score);

    // Save the updated high scores to local storage
    localStorage.setItem('highScores', JSON.stringify(highScores));

    // Display high scores
    displayHighScores();
}

function displayHighScores() {
    // Load high scores from local storage
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

    // Display high scores in the list
    highscoresList.innerHTML = highScores
        .map(score => `<li>${score.initials}: ${score.score}</li>`)
        .join('');

    // Show the highscores screen
    quizContainer.style.display = 'none';
    endScreen.style.display = 'none';
    highscoresScreen.style.display = 'block';
}
});