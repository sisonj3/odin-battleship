import player from './player';
import ship from './ship';

// Dom elements
const overlay = document.querySelector('.overlay');
const setupDiv = document.querySelector('.ship-setup');
const axisDiv = document.querySelector('.axis-chooser');
const setupBoardDiv = document.querySelector('.setup');
const axisBtn = document.createElement('button');

// Function is called when New Game button is pressed
function setupGame() {
    // Create player
    const realPlayer = player(true);

    // Boolean to check if setup is complete
    let setupDone = false;

    setupBoardDiv.dataset.n = 0;

    // Clear axisDiv
    while (axisDiv.firstChild) {
        axisDiv.removeChild(axisDiv.lastChild);
    }

    // Set up axisBtn and add to axisDiv
    axisBtn.innerText = 'Axis: X';
    axisDiv.appendChild(axisBtn);

    // Clear setupBoardDiv
    while (setupBoardDiv.firstChild) {
        setupBoardDiv.removeChild(setupBoardDiv.lastChild);
    }

    let ships = [ship(5), ship(4), ship(3), ship(3), ship(2)];

    let cells = [];
    
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

            cell.addEventListener('mouseover', () => {
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
            });

            cell.addEventListener('mouseout', () => {
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
            });

            cell.addEventListener('click', (e) => {
                let currentShip = ships[setupBoardDiv.dataset.n];
                let alignment = checkAxis();

                // If ship is placed
                if (realPlayer.playerBoard.placeShip(currentShip, i, j, alignment) && !setupDone) {
                    console.log(`Adding ships[${setupBoardDiv.dataset.n}] at (${i}, ${j})`);

                    if (alignment) {
                        for (let k = 0; k < currentShip.length; k++) {
                            cells[i][j + k].classList.remove('ship');
                            cells[i][j + k].classList.add('placed');
                        }
                    } else {
                        for (let k = 0; k < currentShip.length; k++) {
                            cells[i + k][j].classList.remove('ship');
                            cells[i + k][j].classList.add('placed');
                        }
                    }

                    if (setupBoardDiv.dataset.n < ships.length - 1) {
                        setupBoardDiv.dataset.n++;
                    } else {
                        // Start game
                        console.log('Start game');
                        console.log(realPlayer.playerBoard.printBoard());
                        setupDone = true;
                    }
                    
                }

            });
        }
    }

    // Show overlay and setup form
    overlay.classList.toggle('hidden');
    setupDiv.classList.toggle('hidden');

    // Axis btn event listener
    axisBtn.addEventListener('click', () => {
        if (checkAxis()) {
            console.log('Change to Y');
            axisBtn.innerText = 'Axis: Y';
        } else {
            console.log('Change to X');
            axisBtn.innerText = 'Axis: X';
        }
    });
}

function checkAxis() {
    if (axisBtn.innerText == 'Axis: X') {
        return true;
    } else {
        return false;
    }
}

export default setupGame;