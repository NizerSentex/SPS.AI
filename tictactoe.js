let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let gameMode = ""; // 'multiplayer' or 'singleplayer'

// Winning conditions for Tic-Tac-Toe
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Start the game in selected mode
function startGame(mode) {
    gameMode = mode;
    document.getElementById("tic-tac-toe").style.display = "block";
    document.querySelector(".game-mode").style.display = "none";
    resetGame();
}

// Handle moves based on game mode
function makeMove(cell, index) {
    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("move-animation"); // Add animation to cell

    checkResult();

    if (gameActive) {
        if (gameMode === "singleplayer" && currentPlayer === "X") {
            currentPlayer = "O";
            setTimeout(roboMove, 500);
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            document.getElementById("status").textContent = `${currentPlayer}'s turn`;
        }
    }
}

// Robo AI for single-player mode
function roboMove() {
    let availableMoves = board
        .map((cell, index) => (cell === "" ? index : null))
        .filter(index => index !== null);

    let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    board[randomMove] = "O";

    let cell = document.querySelectorAll(".cell")[randomMove];
    cell.textContent = "O";
    cell.classList.add("move-animation");
    checkResult();
    currentPlayer = "X";
    document.getElementById("status").textContent = `Player X's turn`;
}

// Check for win or draw
function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        document.getElementById("status").textContent = `${currentPlayer} wins! 🎉`;
        gameActive = false;
        triggerWinEffect(); // Trigger win particle effect
    } else if (!board.includes("")) {
        document.getElementById("status").textContent = "It's a draw!";
        gameActive = false;
    }
}

// Reset the game
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    document.getElementById("status").textContent = "Player X's turn";
    document.querySelectorAll(".cell").forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("move-animation");
    });
}

// Win particle effect
function triggerWinEffect() {
    const canvas = document.getElementById("particleCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            radius: Math.random() * 5 + 1,
            dx: (Math.random() - 0.5) * 5,
            dy: (Math.random() - 0.5) * 5,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`
        });
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((particle, i) => {
            particle.x += particle.dx;
            particle.y += particle.dy;
            particle.radius *= 0.98;
            if (particle.radius < 0.1) particles.splice(i, 1);
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            ctx.closePath();
        });
        if (particles.length > 0) requestAnimationFrame(animateParticles);
    }

    animateParticles();
}
// Show guidelines modal
function showGuidelines() {
    document.getElementById("guidelines-modal").style.display = "block";
}

// Close guidelines modal
function closeGuidelines() {
    document.getElementById("guidelines-modal").style.display = "none";
}

// Close modal if clicking outside of the content
window.onclick = function(event) {
    const modal = document.getElementById("guidelines-modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
}
