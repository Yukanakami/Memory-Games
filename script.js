const cards = [
    '🐶', '🐶',
    '🐱', '🐱',
    '🐭', '🐭',
    '🐹', '🐹',
    '🐰', '🐰',
    '🦊', '🦊',
    '🐻', '🐻',
    '🐼', '🐼',
    '😈', '😈',
    '🐸', '🐸',
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let score = 0;
let timeLeft = 60; 
let countdownInterval = null; 
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    const gameBoard = document.querySelector('.game-board');
    gameBoard.innerHTML = ''; 
    shuffle(cards);
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.icon = card;
        cardElement.innerHTML = '<div class="card-inner"><div class="card-front"></div><div class="card-back">' + card + '</div></div>';
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });

    
    score = 0;
    timeLeft = 60; 
    document.getElementById('score').textContent = score;
    document.getElementById('timer').textContent = timeLeft;

    
    document.getElementById('timer').classList.remove('low-time');

    
    clearInterval(countdownInterval); 
    countdownInterval = setInterval(updateTimer, 1000);
}


function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.icon === secondCard.dataset.icon;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

   
    score++;
    document.getElementById('score').textContent = score;

   
    if (score === cards.length / 2) {
        clearInterval(countdownInterval); 
        alert("Congratulations! You've matched all cards.");
    }

    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function updateTimer() {
    timeLeft--;
    const timerElement = document.getElementById('timer');
    timerElement.textContent = timeLeft; 

    
    if (timeLeft <= 10) {
        timerElement.classList.add('low-time'); 
    } else {
        timerElement.classList.remove('low-time'); 
    }

    if (timeLeft <= 0) {
        clearInterval(countdownInterval); 
        alert("Time's up! Game over.");
        lockBoard = true; 
    }
}


document.getElementById('reset-button').addEventListener('click', createBoard);


createBoard();
