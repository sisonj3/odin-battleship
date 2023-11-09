const player = require('./player');

// Cpu Factory
function cpu(isTurn) {

    const cpuPlayer = player(isTurn);
    let possibleAttacks = generateAttacks();

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