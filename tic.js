const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const status = document.getElementById('status');
const restartButton = document.getElementById('restart');
const sparkles = document.getElementById('sparkles');
let currentPlayer = 'X';
let isGameActive = true;

function checkWin() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (cells[a].innerText && cells[a].innerText === cells[b].innerText && cells[a].innerText === cells[c].innerText) {
            isGameActive = false;
            status.innerText = `Player ${currentPlayer} wins!`;
            status.style.color = 'green';

            // Add the sparkles when a player wins
            sparkles.classList.add('active');

            return;
        }
    }

    if (![...cells].some(cell => !cell.innerText)) {
        isGameActive = false;
        status.innerText = "It's a draw!";
    }
}

function handleCellClick(e) {
    const cell = e.target;

    if (!isGameActive || cell.innerText) {
        return;
    }

    cell.innerText = currentPlayer;
    cell.classList.add('occupied');

    checkWin();

    if (isGameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.innerText = `Player ${currentPlayer}'s turn`;
    }
}

function restartGame() {
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('occupied');
    });

    currentPlayer = 'X';
    isGameActive = true;
    status.innerText = `Player ${currentPlayer}'s turn`;
    status.style.color = 'black';

    // Remove the sparkles when the game is restarted
    sparkles.classList.remove('active');
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);