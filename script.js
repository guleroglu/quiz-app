const questions = [
    {
        question: "2022-2023 Süper Lig Şampiyonu Kim Olacak?",
        answers: [
            { text: "Beşiktaş", correct: false},
            { text: "Fenerbahçe", correct: true},
            { text: "Trabzonspor", correct: false},
            { text: "Galatasaray", correct: false},
        ]
    },
    {
        question: "2022-2023 Premier Lig Şampiyonu Kim Olacak?",
        answers: [
            { text: "Arsenal", correct: true},
            { text: "Manchester City", correct: false},
            { text: "Liverpol", correct: false},
            { text: "Manchester United", correct: false},
        ]
    },
    {
        question: "Elrond'un hanımı, Galadriel'i kızı ve Arwen'in annesi olan Elf'in adı nedir?",
        answers: [
            { text: "Morwen", correct: false},
            { text: "Earwen", correct: false},
            { text: "Celebrindal", correct: false},
            { text: "Celebrian", correct: true},
        ]
    },
    {
        question: "Moria'ya kadar Yüzük Kardeşliği ile birlikte yolculuk eden, Sam'in sadık midillisinin adı nedir?",
        answers: [
            { text: "Bob", correct: false},
            { text: "Bill", correct: true},
            { text: "Will", correct: false},
            { text: "Rob", correct: false},
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer);
    });
}


function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
    }else {
        selectedBtn.classList.add('incorrect');
    }
    Array.from(answerButtons.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
    console.log(selectedBtn);
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Skorun ${questions.length} üzerinden ${score} Tebrikler!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    }else {
        showScore();
    }
};

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }else {
        startQuiz();
    }
})


startQuiz();

