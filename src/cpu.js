const player = require('./player');
const ship = require('./ship');

// Cpu Factory
function cpu(isTurn) {

    const cpuPlayer = player(isTurn);
    let possibleAttacks = generateAttacks();

    const generateBoard = (() => {
        let ships = [ship(5), ship(4), ship(3), ship(3), ship(2)];
        let n = 0;

        // Possible Postions
        let possiblePositions = generateAttacks();

        while (n < ships.length) {

            // Booleans
            let alignment = Math.random() < 0.5;

            // Coordinates
            let z = Math.floor(Math.random() * (possiblePositions.length - 1));
            let position = possiblePositions[z];
            let x = position[0];
            let y = position[1];

            // If ship is valid
            if (cpuPlayer.playerBoard.placeShip(ships[n], x, y, alignment)) {
                possiblePositions = generateAttacks();
                n++;
            } else {
                possiblePositions = possiblePositions.filter(function (e) { return e != position; });
            }
            
        }

    })();

    function generatePositions() {
        let positions = [];

        for (let i = 0; i < cpuPlayer.playerBoard.length; i++){
            positions.push([])
            for (let j = 0; j < cpuPlayer.playerBoard.length; j++){
                positions[i].push([i, j]);
            }
        }

        return positions;
    }

    function generateAttacks() {
        let attacks = [];

        for (let i = 0; i < cpuPlayer.playerBoard.length; i++){
            for (let j = 0; j < cpuPlayer.playerBoard.length; j++){
                attacks.push([i, j]);
            }
        }

        return attacks;
    }

    function attackEnemy(enemy) {
        // Get random attack
        let n = Math.floor(Math.random() * (possibleAttacks.length - 1));
        let attack = possibleAttacks[n];
        let x = attack[0];
        let y = attack[1];

        let currentAttack = cpuPlayer.attackEnemy(x, y, enemy);

        // if attack is successful
        if (currentAttack == true) {
            // Remove n from possible attacks
            possibleAttacks = possibleAttacks.filter(function (e) { return e != attack; });
            return true;
        } else {
            return false;
        }
    }

    function changeTurn() {
        cpuPlayer.changeTurn();
    }

    return {
        get possibleAttacksLength() { return possibleAttacks.length; },
        get playerBoard() { return cpuPlayer.playerBoard; },
        changeTurn, attackEnemy
    };
}

module.exports = cpu;