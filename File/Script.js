    // Game state variables
    let currentPlayer = 'X'; // Human is X, AI is O
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let vsAI = true; // Set to false for 2-player mode

    // Get all cell elements
    const cells = document.querySelectorAll('.cell');
    const container = document.querySelector('.container');

    // Add event listeners to each cell
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    // Handle cell click
    function handleCellClick(e) {
        const clickedCell = e.target;
        const clickedCellIndex = Array.from(cells).indexOf(clickedCell);

        // If cell is already filled or game is not active, ignore the click
        if (gameBoard[clickedCellIndex] !== '' || !gameActive || currentPlayer === 'O') {
            return;
        }

        // Update game state
        makeMove(clickedCellIndex, currentPlayer);
        
        // Check for win or draw
        if (checkWin()) {
            endGame(false);
            return;
        } else if (checkDraw()) {
            endGame(true);
            return;
        }

        // Switch player
        currentPlayer = 'O';
        
        // If playing against AI and it's AI's turn
        if (vsAI && gameActive) {
            setTimeout(makeAIMove, 600); // Delay for better UX
        }
    }

    // Make a move on the board
    function makeMove(index, player) {
        gameBoard[index] = player;
        cells[index].textContent = player;
        cells[index].style.backgroundColor = player === 'X' ? '#ff4757' : '#2ed573';
    }

    // AI makes a move
    function makeAIMove() {
        if (!gameActive) return;
        
        // Simple AI with some strategy:
        // 1. First check if AI can win
        // 2. Then check if human can win and block
        // 3. Otherwise pick a strategic position
        
        let move = findWinningMove('O'); // Check if AI can win
        if (move === -1) {
            move = findWinningMove('X'); // Block human from winning
        }
        if (move === -1) {
            move = pickBestMove(); // Pick best available move
        }
        
        makeMove(move, 'O');
        
        // Check for win or draw
        if (checkWin()) {
            endGame(false);
            return;
        } else if (checkDraw()) {
            endGame(true);
            return;
        }
        
        currentPlayer = 'X'; // Switch back to human
    }

    // Find a winning move for the specified player
    function findWinningMove(player) {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];

        for (let condition of winConditions) {
            const [a, b, c] = condition;
            // Check if two in a row and third is empty
            if (gameBoard[a] === player && gameBoard[b] === player && gameBoard[c] === '') return c;
            if (gameBoard[a] === player && gameBoard[c] === player && gameBoard[b] === '') return b;
            if (gameBoard[b] === player && gameBoard[c] === player && gameBoard[a] === '') return a;
        }
        return -1; // No winning move found
    }

    // Pick the best available move
    function pickBestMove() {
        // Center is the best opening move
        if (gameBoard[4] === '') return 4;
        
        // Corners are good secondary moves
        const corners = [0, 2, 6, 8];
        const availableCorners = corners.filter(index => gameBoard[index] === '');
        if (availableCorners.length > 0) {
            return availableCorners[Math.floor(Math.random() * availableCorners.length)];
        }
        
        // Otherwise pick any available cell
        const availableMoves = gameBoard.map((cell, index) => cell === '' ? index : -1).filter(index => index !== -1);
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    // Check for win conditions
    function checkWin() {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];

        return winConditions.some(condition => {
            return condition.every(index => {
                return gameBoard[index] === currentPlayer;
            });
        });
    }

    // Check for draw
    function checkDraw() {
        return gameBoard.every(cell => cell !== '');
    }

    // End the game
    function endGame(draw) {
        gameActive = false;
        
        if (draw) {
            container.style.border = '5px solid yellow';
            setTimeout(() => alert('Game ended in a draw!'), 10);
        } else {
            container.style.border = `5px solid ${currentPlayer === 'X' ? '#ff4757' : '#2ed573'}`;
            const winner = currentPlayer === 'X' ? 'You win!' : 'AI wins!';
            setTimeout(() => alert(winner), 10);
        }
    }

    // Reset game function
    function resetGame() {
        currentPlayer = 'X';
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        
        cells.forEach(cell => {
            cell.textContent = '';
            cell.style.backgroundColor = 'white';
        });
        
        container.style.border = 'none';
    }

    // Toggle between AI and 2-player mode
    function toggleMode() {
        vsAI = !vsAI;
        resetGame();
        modeButton.textContent = vsAI ? 'Switch to 2-Player' : 'Switch to vs AI';
    }

    // Add control buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.style.marginTop = '20px';
    buttonContainer.style.display = 'flex';
    buttonContainer.style.gap = '10px';
    buttonContainer.style.justifyContent = 'center';

    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset Game';
    resetButton.style.padding = '10px 20px';
    resetButton.style.borderRadius = '5px';
    resetButton.style.border = 'none';
    resetButton.style.cursor = 'pointer';
    resetButton.addEventListener('click', resetGame);

    const modeButton = document.createElement('button');
    modeButton.textContent = 'Switch to 2-Player';
    modeButton.style.padding = '10px 20px';
    modeButton.style.borderRadius = '5px';
    modeButton.style.border = 'none';
    modeButton.style.cursor = 'pointer';
    modeButton.addEventListener('click', toggleMode);

    buttonContainer.appendChild(resetButton);
    buttonContainer.appendChild(modeButton);
    document.body.appendChild(buttonContainer);
