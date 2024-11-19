const emojis = ['🍎', '🍌', '🍇', '🍊', '🍓', '🍉', '🍋', '🍒'];
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let score = 0;
let canFlip = true;

function initializeGame() {
    const gameBoard = document.getElementById('game-board');
    const movesDisplay = document.getElementById('moves');
    const scoreDisplay = document.getElementById('score');
    
    // Reset game state
    cards = [];
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    score = 0;
    canFlip = true;
    
    // Update displays
    movesDisplay.textContent = moves;
    scoreDisplay.textContent = score;
    
    // Create card deck
    const cardDeck = [...emojis, ...emojis];
    shuffleArray(cardDeck);
    
    // Clear game board
    gameBoard.innerHTML = '';
    
    // Create cards
    cardDeck.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.index = index;
        card.dataset.emoji = emoji;
        card.addEventListener('click', () => flipCard(card));
        cards.push(card);
        gameBoard.appendChild(card);
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function flipCard(card) {
    if (!canFlip || flippedCards.includes(card) || card.classList.contains('matched')) {
        return;
    }
    
    // Flip card
    card.classList.add('flipped');
    card.textContent = card.dataset.emoji;
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
        canFlip = false;
        moves++;
        document.getElementById('moves').textContent = moves;
        
        // Check for match
        if (flippedCards[0].dataset.emoji === flippedCards[1].dataset.emoji) {
            matchedPairs++;
            score += 10;
            document.getElementById('score').textContent = score;
            
            flippedCards.forEach(card => {
                card.classList.add('matched');
            });
            
            flippedCards = [];
            canFlip = true;
            
            // Check for game completion
            if (matchedPairs === emojis.length) {
                setTimeout(() => {
                    alert(`Congratulations! You won!\nScore: ${score}\nMoves: ${moves}`);
                }, 500);
            }
        } else {
            // No match - flip cards back
            setTimeout(() => {
                flippedCards.forEach(card => {
                    card.classList.remove('flipped');
                    card.textContent = '';
                });
                flippedCards = [];
                canFlip = true;
            }, 1000);
        }
    }
}

// Initialize game
document.getElementById('reset').addEventListener('click', initializeGame);
initializeGame();