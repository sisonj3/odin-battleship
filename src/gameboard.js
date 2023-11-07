const ship = require('./ship');

// Gameboard Factory
function gameboard() {

    const gameboard = generateBoard();
    const ships = [];

    function generateBoard() {
        let board = []

        for (let i = 0; i < 10; i++){
            let row = [];
            for (let j = 0; j < 10; j++){
                row.push(-1);
            }
            board.push(row);
        }

        return board;
    }

    function placeShip(ship, x, y, isXAxis) {
        if (isXAxis) {
            if ((ship.length + x - 1) >= gameboard.length) {
                return false;
            }

            // Check if space is already occupied
            for (let i = 0; i < ship.length; i++){
                if (gameboard[x + i][y] != -1) {
                    return false;
                }
            }

            ships.push(ship);

            for (let i = 0; i < ship.length; i++){
                gameboard[x + i][y] = ships.indexOf(ship) + 1;
            }

        } else {
            if ((ship.length + y - 1) >= gameboard.length) {
                return false;
            }

            // Check if space is already occupied
            for (let i = 0; i < ship.length; i++){
                if (gameboard[x][y + i] != -1) {
                    return false;
                }
            }

            ships.push(ship);

            for (let i = 0; i < ship.length; i++){
                gameboard[x][y + i] = ships.indexOf(ship) + 1;
            }
        }

        return true;
    }

    function checkLoss() {
        for (let i = 0; i < ships.length; i++){
            if (ships[i].isSunk() == false) {
                return false;
            }
        }

        return true;
    }

    function printBoard() {
        let board = '';

        for (let i = 0; i < 10; i++){
            let row = '';

            for (let j = 0; j < 10; j++){
                row += gameboard[i][j];
            }

            row += '\n';
            board += row;

        }

        return board;
    }

    return {
        get gameboard() { return gameboard; }, placeShip, checkLoss, printBoard };
}

module.exports = gameboard;