const board = document.getElementById('board');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let gameActive = true;
let boardState = Array(9).fill(null);

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
    [0, 4, 8], [2, 4, 6]             // Diagonal
];

function createBoard() {
    boardState.forEach((_, index) => {
        const square = document.createElement('div');
        square.classList.add('square');
        square.dataset.index = index;
        square.addEventListener('click', handleSquareClick);
        board.appendChild(square);
    });
}

function handleSquareClick(event) {
    const square = event.target;
    const index = square.dataset.index;

    if (boardState[index] || !gameActive) {
        return; // Square already filled or game is inactive
    }

    boardState[index] = currentPlayer;
    square.textContent = currentPlayer;
    checkResult();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
}

function checkResult() {
    let roundWon = false;
    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        alert(`Player ${currentPlayer} wins!`);
        gameActive = false;
        return;
    }

    if (!boardState.includes(null)) {
        alert("It's a draw!");
        gameActive = false;
    }
}

resetButton.addEventListener('click', resetGame);

function resetGame() {
    boardState.fill(null);
    currentPlayer = 'X';
    gameActive = true;
    board.innerHTML = ''; // Clear the board
    createBoard();
}

createBoard();
