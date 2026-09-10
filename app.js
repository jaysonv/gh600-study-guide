const EXAM_LENGTH = 5; // Set how many questions to pull for the exam session
const PASSING_SCORE = 70; // 70% passing threshold

let examQuestions = [];
let userAnswers = {}; // Stores { questionIndex: selectedOptionIndex }
let currentQuestionIndex = 0;

// UI Elements
const questionText = document.getElementById('question-text');
const domainText = document.getElementById('domain-text');
const optionsContainer = document.getElementById('options-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const progress = document.getElementById('progress');
const quizContainer = document.getElementById('quiz-container');
const resultsContainer = document.getElementById('results-container');
const scoreText = document.getElementById('score-text');
const passFailBadge = document.getElementById('pass-fail-badge');
const reviewContainer = document.getElementById('review-container');

function initializeExam() {
    // Shuffle the question bank and pick the required amount
    const shuffled = [...questionsBank].sort(() => 0.5 - Math.random());
    examQuestions = shuffled.slice(0, EXAM_LENGTH);
    
    currentQuestionIndex = 0;
    userAnswers = {};
    renderQuestion();
}

function renderQuestion() {
    const currentQ = examQuestions[currentQuestionIndex];
    
    questionText.textContent = currentQ.question;
    domainText.textContent = `Domain: ${currentQ.domain}`;
    progress.textContent = `Question ${currentQuestionIndex + 1} of ${EXAM_LENGTH}`;

    // Render Options
    optionsContainer.innerHTML = '';
    currentQ.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        // Default styling
        button.className = 'w-full text-left p-4 border border-gray-300 rounded-md hover:bg-blue-50 transition-colors bg-white focus:outline-none';
        
        // Check if this option was already selected by the user
        if (userAnswers[currentQuestionIndex] === index) {
            button.classList.add('bg-blue-100', 'border-blue-500', 'ring-2', 'ring-blue-500');
        }

        button.onclick = () => selectOption(index);
        optionsContainer.appendChild(button);
    });

    updateNavigation();
}

function selectOption(selectedIndex) {
    userAnswers[currentQuestionIndex] = selectedIndex;
    renderQuestion(); // Re-render to update the selected UI state
}

function updateNavigation() {
    // Prev Button State
    prevBtn.disabled = currentQuestionIndex === 0;

    // Next / Submit Button State
    if (currentQuestionIndex === EXAM_LENGTH - 1) {
        nextBtn.classList.add('hidden');
        submitBtn.classList.remove('hidden');
    } else {
        nextBtn.classList.remove('hidden');
        submitBtn.classList.add('hidden');
    }
}

// Event Listeners
prevBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < EXAM_LENGTH - 1) {
        currentQuestionIndex++;
        renderQuestion();
    }
});

submitBtn.addEventListener('click', () => {
    // Check for unanswered questions
    const answeredCount = Object.keys(userAnswers).length;
    if (answeredCount < EXAM_LENGTH) {
        const confirmSubmit = confirm(`You have ${EXAM_LENGTH - answeredCount} unanswered questions. Unanswered questions will be marked as incorrect. Submit anyway?`);
        if (!confirmSubmit) return;
    }
    evaluateExam();
});

function evaluateExam() {
    quizContainer.classList.add('hidden');
    resultsContainer.classList.remove('hidden');
    
    let correctCount = 0;
    reviewContainer.innerHTML = ''; // Clear previous review

    examQuestions.forEach((q, index) => {
        const userAnswerIndex = userAnswers[index];
        const isCorrect = userAnswerIndex === q.answer;
        
        if (isCorrect) correctCount++;

        // Generate Review UI
        const reviewBox = document.createElement('div');
        reviewBox.className = `p-4 rounded-md border ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`;
        
        const statusText = isCorrect ? '<span class="text-green-700 font-bold">Correct</span>' : '<span class="text-red-700 font-bold">Incorrect</span>';
        const userProvidedAnswer = userAnswerIndex !== undefined ? q.options[userAnswerIndex] : '<span class="italic">No answer provided</span>';
        
        reviewBox.innerHTML = `
            <div class="flex justify-between items-start mb-2">
                <span class="text-xs font-bold text-gray-500 uppercase">${q.domain}</span>
                ${statusText}
            </div>
            <p class="font-medium mb-3">${index + 1}. ${q.question}</p>
            <div class="text-sm space-y-1 mb-3">
                <p><span class="font-semibold">Your Answer:</span> ${userProvidedAnswer}</p>
                ${!isCorrect ? `<p><span class="font-semibold text-green-700">Correct Answer:</span> ${q.options[q.answer]}</p>` : ''}
            </div>
            <div class="bg-white p-3 rounded text-sm border">
                <span class="font-semibold">Explanation:</span> ${q.explanation}
            </div>
        `;
        reviewContainer.appendChild(reviewBox);
    });

    // Score Calculation
    const percentage = Math.round((correctCount / EXAM_LENGTH) * 100);
    const passed = percentage >= PASSING_SCORE;

    scoreText.innerHTML = `You answered <strong>${correctCount}</strong> out of <strong>${EXAM_LENGTH}</strong> correctly.`;
    
    if (passed) {
        passFailBadge.textContent = `PASSED (${percentage}%)`;
        passFailBadge.classList.add('bg-green-100', 'text-green-800');
    } else {
        passFailBadge.textContent = `FAILED (${percentage}%)`;
        passFailBadge.classList.add('bg-red-100', 'text-red-800');
        scoreText.innerHTML += `<br><span class="text-sm">A score of ${PASSING_SCORE}% is required to pass.</span>`;
    }
}

// Start the app
initializeExam();
