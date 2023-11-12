import cpu from './cpu';
import hit from './plus.svg';
import miss from './circle.svg';

// DOM Elements
const gameDiv = document.querySelector('.game');

let realPlayer, enemy;

// Function to play the game
function playGame(player) {
    console.log('Start game');

    realPlayer = player;
    enemy = cpu(false);

    // Show gameDiv
    gameDiv.classList.remove('hidden');

    dipslayBoard(realPlayer.playerBoard, false);
    dipslayBoard(enemy.playerBoard, true);

}

function dipslayBoard(board, isCpu) {
    let boardDiv;

    // Select board
    if (isCpu) {
        boardDiv = document.querySelector('.cpu');
    } else {
        boardDiv = document.querySelector('.player');
    }

    // Clear board
    while (boardDiv.firstChild) {
        boardDiv.removeChild(boardDiv.lastChild);
    }
 
    // Generateboard
    for (let i = 0; i < board.length; i++){
        for (let j = 0; j < board.length; j++){
            let currentCell = board.getAtIndex(i, j);
 
            // Create cell
            let cell = document.createElement('div');
            cell.classList.add('cell');

            // Set appropriate display for cell
            if (currentCell == 'X') {
                let img = document.createElement('img');
                img.src = hit;
                img.alt = 'X';

                img.classList.add('hit');
                img.classList.add('delete');

                cell.appendChild(img);

            } else if (currentCell == 'O') {
                let img = document.createElement('img');
                img.src = miss;
                img.alt = 'O';

                img.classList.add('miss');

                cell.appendChild(img);
            }

            if (currentCell != -1 && currentCell != 'O' && !isCpu) {
                cell.classList.add('placed');
            }

            if (isCpu) {
                cell.addEventListener('click', () => { attackCpu(i, j) });
            }

            boardDiv.appendChild(cell);
        }
    }
}

function attackCpu(i, j) {

    // Player attacks cpu
    if (realPlayer.attackEnemy(i, j, enemy) && !enemy.playerBoard.checkLoss() && !realPlayer.playerBoard.checkLoss()) {

        // Enemy attacks
        enemy.attackEnemy(realPlayer);
  
    }

    // Update boards
    dipslayBoard(enemy.playerBoard, true);
    dipslayBoard(realPlayer.playerBoard, false);

    // Check if enemy loss
    if (enemy.playerBoard.checkLoss()) {
        document.querySelector('.results-display').textContent = 'Player Wins!';
    }

    // Check if player loss
    if (realPlayer.playerBoard.checkLoss()) {
        document.querySelector('.results-display').textContent = 'CPU Wins!';
    }

}

export default playGame;