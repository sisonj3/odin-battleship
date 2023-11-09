const player = require('../player');
const ship = require('../ship');

describe('Player tests', () => {
    let player1, player2;

    beforeEach(() => {
        player1 = player(true);
        player2 = player(false);

        player1.playerBoard.placeShip(ship(5), 0, 0, true);
        player2.playerBoard.placeShip(ship(5), 0, 0, true);
    });

    test('Player1 first attack is hit', () => {
        // Attack is valid
        expect(player1.attackEnemy(0, 0, player2)).toBe(true);
        // Enemy board updated correctly
        expect(player2.playerBoard.getAtIndex(0, 0)).toBe('X');

    });

    test('Player1 first attack is miss', () => {
        // Attack is valid
        expect(player1.attackEnemy(1, 1, player2)).toBe(true);
        // Enemy board updated correctly
        expect(player2.playerBoard.getAtIndex(1, 1)).toBe('O');
    });

    test('Player1 cannot attack twice in a row', () => {
        // Attack is valid
        expect(player1.attackEnemy(1, 1, player2)).toBe(true);
        // Attack is invalid
        expect(player1.attackEnemy(0, 0, player2)).toBe(false);
    });

    test('Player2 cannot attack first', () => {
        expect(player2.attackEnemy(0, 0, player1)).toBe(false);
    });

    test('Player2 attacks second', () => {
        expect(player1.attackEnemy(1, 1, player2)).toBe(true);
        expect(player2.attackEnemy(1, 1, player1)).toBe(true);
    });

    test('Player2 cannot attack twice in a row', () => {
        expect(player1.attackEnemy(1, 1, player2)).toBe(true);
        expect(player2.attackEnemy(1, 1, player1)).toBe(true);
        expect(player2.attackEnemy(1, 1, player1)).toBe(false);
    });

    test('Player1 turn again after player2 turn', () => {
        expect(player1.attackEnemy(1, 1, player2)).toBe(true);
        expect(player2.attackEnemy(1, 1, player1)).toBe(true);
        expect(player1.attackEnemy(0, 0, player2)).toBe(true);
    });

    test('Player1 cannot attack the same spot after player2 turn', () => {
        expect(player1.attackEnemy(1, 1, player2)).toBe(true);
        expect(player2.attackEnemy(1, 1, player1)).toBe(true);
        expect(player1.attackEnemy(1, 1, player2)).toBe(false);
    });

    test('Player2 cannot take turn if player1\'s previous turn was not valid', () => {
        expect(player1.attackEnemy(1, 1, player2)).toBe(true);
        expect(player2.attackEnemy(1, 1, player1)).toBe(true);
        expect(player1.attackEnemy(1, 1, player2)).toBe(false);
        expect(player2.attackEnemy(0, 0, player1)).toBe(false);
    });
});