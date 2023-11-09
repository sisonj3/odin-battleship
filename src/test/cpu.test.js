const player = require('../player');
const cpu = require('../cpu');
const ship = require('../ship');

describe('CPU Tests', () => {
    let player1, cpu1;

    beforeEach(() => {
        player1 = player(true);
        cpu1 = cpu(false);

        player1.playerBoard.placeShip(ship(5), 0, 0, true);
        cpu1.playerBoard.placeShip(ship(5), 0, 0, true);
    });

    test('CPU initially has 100 possible attacks', () => {
        expect(cpu1.possibleAttacksLength).toBe(100);
    });

    test('CPU cannot attack first', () => {
        expect(cpu1.attackEnemy(player1)).toBe(false);
    });

    test('CPU attacks second and attack amount is decreased to 99', () => {
        expect(player1.attackEnemy(0, 0, cpu1)).toBe(true);
        expect(cpu1.attackEnemy(player1)).toBe(true);
        expect(cpu1.possibleAttacksLength).toBe(99);
    });

    test('CPU cannot attack twice in a row', () => {
        expect(player1.attackEnemy(0, 0, cpu1)).toBe(true);
        expect(cpu1.attackEnemy(player1)).toBe(true);
        expect(cpu1.possibleAttacksLength).toBe(99);
        expect(cpu1.attackEnemy(player1)).toBe(false);
        expect(cpu1.possibleAttacksLength).toBe(99);
    });
});