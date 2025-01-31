const questions = [
    {
    question : "1) DI QUALE GRUPPO FANNO PARTE GUÈ PEQUENO, JAKE LA FURIA E DON JOE?",
    answers: [
        { text: "ASSALTI FRONTALI", correct: false},
        { text: "CLUB DOGO", correct: true},
        { text: "99 POSSE", correct: false},
        { text: "N.W.A", correct: false},
    ]
    },
    {
        question : "2) QUALE RAPPER TRA QUESTI HA INERPRETATO IL PROTAGONISTA NEL FILM 8 MILE?",
        answers: [
            { text: "SNOOP DOGG", correct: false},
            { text: "PLAYBOY CARTI", correct: false},
            { text: "MACKLEMORE", correct: false},
            { text: "EMINEM", correct: true},
        ]
    },
    {
        question : "3) QUALE TRA QUESTI ERA IL TITOLO ORIGINALE DELL'ALBUM 'TO PIMP A BUTTERFLY' DI KENDRICK LAMAR?",
        answers: [
            { text: "TO PIMP A BITCH", correct: false},
            { text: "SECTION 81", correct: false},
            { text: "TO PIMP A CATERPILLAR", correct: true},
            { text: "B .A. A. .D. CITY", correct: false},
        ]
    },
    {
        question : "4) CHI ERA DONDA?",
        answers: [
            { text: "LA MOGLIE DI DR. DRE", correct: false},
            { text: "LA SORELLA DI DRAKE", correct: false},
            { text: "LA MADRE DI KANYE WEST", correct: true},
            { text: "LA MADRE DI JAY-Z", correct: false},
        ]
    },
    {
        question : "5) DAJE ZI, DAJE...",
        answers: [
            { text: "... SCHIAVO!!!", correct: false},
            { text: "... ANDRE!!!", correct: true},
            { text: "... CARMINE!!!", correct: false},
            { text: "... ROMA!!!", correct: false},
        ]
    },
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const introText2 = document.getElementById("textIntro2");
const logoImage = document.getElementById("imageLogo");
const divSpotifyLink = document.getElementById("spotify-link")
const youtubevideo = document.getElementById("youtube-video")

let currentQuestionIndex = 0;
let score = 0;


var aud = document.getElementById("spoilerSong");

var isPlaying = false;
aud.pause();
aud.volume = 0.5;


function playPause() {

  if (isPlaying) {
    aud.pause();
    playMusicButton.textContent = "▶";
  } else {
    aud.play();
    playMusicButton.textContent  = "❚❚";
  }
  isPlaying = !isPlaying;
}


function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "CONTINUA";
    showQuestion();

}



function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){

    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";



}

function showScore() {
    resetState();
    if(score == "5") {
        questionElement.innerHTML = "HAI VINTO!"
        introText2.style.display = "none"
        divSpotifyLink.style.display = "block"
        youtubevideo.style.display = "block"
    }else{
        questionElement.innerHTML = "HAI RISPOSTO CORRETTAMENTE A " + score + " DOMANDE SU 5! HAI PERSO, RIPROVA PER AVERE LO SPOILER DEL BRANO DI SCHIAVO!"
        nextButton.innerHTML = "RIPROVA";
        nextButton.style.display = "block";
        introText2.style.display = "none"
        divSpotifyLink.style.display = "block"
    }

}

function handleNextButton(){
    currentQuestionIndex++
    introText2.style.display = "none"
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    }else{
        if(score == "4") {
            showScore();
        }else{
            showScore();
        }
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        location.reload();
    }
})

startQuiz();