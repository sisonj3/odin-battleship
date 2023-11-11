import player from './player';
import ship from './ship';

// Dom elements
const overlay = document.querySelector('.overlay');
const setupDiv = document.querySelector('.ship-setup');
const setupBoardDiv = document.querySelector('.setup');
const axisBtn = document.querySelector('.axis-btn');
const startBtn = document.querySelector('.start-btn');

// Axis btn event listener
axisBtn.addEventListener('click', setAxisText);

// Start btn event listener
startBtn.addEventListener('click', startGame);

// Ships to be placed
let ships;
// Cells that fill the board
let cells;
// Player
let realPlayer;
// Boolean to check if setup is complete
let setupDone;

// Function is called when New Game button is pressed
function setupGame() {
    // Create player
    realPlayer = player(true);

    // Boolean to check if setup is complete
    setupDone = false;

    // Reset setup index
    setupBoardDiv.dataset.n = 0;

    // Clear setupBoardDiv
    while (setupBoardDiv.firstChild) {
        setupBoardDiv.removeChild(setupBoardDiv.lastChild);
    }

    ships = [ship(5), ship(4), ship(3), ship(3), ship(2)];

    cells = [];
    
    for (let i = 0; i < 10; i++){
        // Add row to cells array
        cells.push([]);

        for (let j = 0; j < 10; j++){
            // Create cell
            let cell = document.createElement('div');
            cell.classList.add('cell');

            // Add coordinates to cell
            cell.dataset.x = i;
            cell.dataset.y = j;

            // Add cell to board
            setupBoardDiv.appendChild(cell);

            // Add cell to cell array
            cells[i].push(cell);

            cell.addEventListener('mouseover', () => { displayShip(i, j) });

            cell.addEventListener('mouseout', () => { endDisplay(i, j) });

            cell.addEventListener('click', () => { setShip(i, j) });
        }
    }

    // Show overlay and setup form
    overlay.classList.toggle('hidden');
    setupDiv.classList.toggle('hidden');

}

function displayShip(i, j) {
    let currentShipLength = ships[setupBoardDiv.dataset.n].length;

    // X axis display
    if (checkAxis()) {

        if ((j + currentShipLength) > 10) {
            cells[i][j].classList.add('invalid');
        } else {
            for (let k = 0; k < currentShipLength; k++){
                cells[i][j + k].classList.add('ship');
            }
        }
        
    } else {

        if ((i + currentShipLength) > 10) {
            cells[i][j].classList.add('invalid');
        } else {
            for (let k = 0; k < currentShipLength; k++){
                cells[i + k][j].classList.add('ship');
            }
        }
        
    }
}

function endDisplay(i, j) {
    let currentShipLength = ships[setupBoardDiv.dataset.n].length;

    if (cells[i][j].classList.contains('invalid')) {
        cells[i][j].classList.remove('invalid');
    } else if (checkAxis()) {
        for (let k = 0; k < currentShipLength; k++){
            cells[i][j + k].classList.remove('ship');
        }
    } else {
        for (let k = 0; k < currentShipLength; k++){
            cells[i + k][j].classList.remove('ship');
        }
    }
}

function setShip(i, j) {
    let ship = ships[setupBoardDiv.dataset.n]
    let alignment = checkAxis();

    // If ship is placed
    if (realPlayer.playerBoard.placeShip(ship, i, j, alignment) && !setupDone) {
        console.log(`Adding ships[${setupBoardDiv.dataset.n}] at (${i}, ${j})`);

        if (alignment) {
            for (let k = 0; k < ship.length; k++) {
                cells[i][j + k].classList.remove('ship');
                cells[i][j + k].classList.add('placed');
            }
        } else {
            for (let k = 0; k < ship.length; k++) {
                cells[i + k][j].classList.remove('ship');
                cells[i + k][j].classList.add('placed');
            }
        }

        if (setupBoardDiv.dataset.n < ships.length - 1) {
            setupBoardDiv.dataset.n++;
        } else {
            setupDone = true;
        }
    }
}

function setAxisText() {
    if (checkAxis()) {
            console.log('Change to Y');
            axisBtn.innerText = 'Axis: Y';
        } else {
            console.log('Change to X');
            axisBtn.innerText = 'Axis: X';
        }
}

function startGame() {
    if (setupDone) {
        // Start game
        console.log('Start game');
        console.log(realPlayer.playerBoard.printBoard());
    }
}

function checkAxis() {
    if (axisBtn.innerText == 'Axis: X') {
        return true;
    } else {
        return false;
    }
}

export default setupGame;