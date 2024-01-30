const questions = [
    {
        question: "Elije la verdadera",
        answers: [
            { text: "Soy la tercera", correct:false},
            { text: "Soy la segunda", correct:true},
            { text: "Soy la primera", correct:false},
            { text: "Soy la tercera", correct:false}
        ]
    },
    {
        question: "¿Cuál es un ave?",
        answers: [
            { text: "Colibri", correct:true},
            { text: "Tigre", correct:false},
            { text: "Ballena", correct:false},
            { text: "Salmón", correct:false}
        ]
    }
];

const questionElement = document.getElementById("question");
const control = document.getElementById("control");
const nextButton = document.getElementById("next-btn");
const valButton = document.getElementById("validate-btn");

let currentQuestionIndex = 0;
let score = 0;
let correctAnswer = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    //valButton.innerHTML = "Confirmar";
    //nextButton.innerHTML = "Siguiente";
    showQuestion();
}

function getCorrectAnswer(currentQuestion){
    for (let i = 0; i < currentQuestion.answers.length; i++) {
        if (currentQuestion.answers[i].correct) {
            return i+1;
        }
    }
    // If no correct answer found, return -1 or handle the case as needed
    return -1
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    correctAnswer = getCorrectAnswer(currentQuestion);
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    let innerAnswerId = 1
    currentQuestion.answers.forEach(answer => {
        const button = createRadioButton(answer.text, innerAnswerId)
        control.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        innerAnswerId++;
    });
    valButton.addEventListener("click", validateAnswer);
}

function createRadioButton(labelText, value) {
    // Create label element
    var label = document.createElement("label");
    label.classList.add("btn");
    
    // Create input element
    var input = document.createElement("input");
    input.setAttribute("required", "");
    input.classList.add("radio-dot");
    input.setAttribute("type", "radio");
    input.setAttribute("name", "group");
    input.setAttribute("value", value);
    
    // Create span element for label text
    var span = document.createElement("span");
    span.classList.add("radio-label-text");
    span.textContent = labelText;
    
    // Append input and span elements to label
    label.appendChild(input);
    label.appendChild(span);
    
    return label;
}

function resetState(){
    while(control.firstChild){
        control.removeChild(control.firstChild);
    }
}


function validateAnswer(){

    nextButton.style.display = "inline";

    // Get the value of the selected radio button
    var selectedOption = document.querySelector('input[name="group"]:checked');

    var answers = control.children;
        
    // Check if an option is selected
    if (selectedOption) {
        // Check if the selected value is correct (option 2)
        if (selectedOption.value === `${correctAnswer}`) {
            answers[correctAnswer-1].classList.add("correct");
            //alert("Respuesta correcta"); // Correct answer
        } else {
            answers[correctAnswer-1].classList.add("correct");
            answers[parseInt(selectedOption.value,10)-1].classList.add("incorrect");
            //alert("Respuesta incorrecta"); // Incorrect answer
        }
    } else {
        alert("Por favor seleccione una opción"); // No option selected
    }
}


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct == "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(control.children).forEach(button => {
        if(button.dataset.correct == "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Tu puntuación es ${score} de ${questions.length}`;
    nextButton.innerHTML = "Repetir Test";
    nextButton.style.display = "block";
}

function handleNextQuetion(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextQuetion();
    }else{
        startQuiz();
    }
});

startQuiz();