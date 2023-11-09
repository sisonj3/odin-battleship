const gameboard = require('./gameboard');

// Player factory
function player(isTurn) {

    // Player's board
    const playerBoard = gameboard();

    // Return true if attack goes through, false otherwise
    function attackEnemy(x, y, enemy) {
        if (isTurn && enemy.playerBoard.receiveAttack(x, y)) {
            // Player turn ends
            changeTurn();
            // Enemy turn starts
            enemy.changeTurn();
            return true;
        } else {
            return false;
        }
    }

    function changeTurn() {
        isTurn = !isTurn;
    }

    return {
        get playerBoard() { return playerBoard; },
        attackEnemy, changeTurn};
}

module.exports = player;