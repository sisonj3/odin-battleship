const gameboard = require('../gameboard');
const ship = require('../ship');

describe('Placing Carrier', () => {

    describe('Placing Carrier out of bounds', () => {
        let board = gameboard();
        let piece = ship(5);

        test('X Axis', () => {
            expect(board.placeShip(piece, 6, 0, true)).toBe(false);
        });

        test('Y Axis', () => {
            expect(board.placeShip(piece, 0, 6, false)).toBe(false);
        });
    });
    
    describe('Placing carrier in bounds', () => {
        let board;
        let piece;

        beforeEach(() => { board = gameboard(); piece = ship(5)});

        test('Place from (0,0) to (4,0)', () => {
            expect(board.placeShip(piece, 0, 0, true)).toBe(true);
        });

        test('Place from (9, 5) to (9, 9)', () => {
            expect(board.placeShip(piece, 9, 5, false)).toBe(true);
        });
    });
    
    describe('Intersecting pieces', () => {
        let board = gameboard();
        let piece1 = ship(5);
        let piece2 = ship(3);

        expect(board.placeShip(piece1, 0, 0, true)).toBe(true);

        expect(board.placeShip(piece2, 2, 0, false)).toBe(false);
    });

});

describe('Test loss', () => {
    let board;
    
    beforeEach(() => { board = gameboard(); });

    test('Empty board loses', () => {
        expect(board.checkLoss()).toBe(true);
    });

    test('At least one remaining piece', () => {
        expect(board.placeShip(ship(5), 0, 0, true)).toBe(true);

        expect(board.checkLoss()).toBe(false);
    });

    test('Pieces sunk', () => {
        let piece = ship(5);
        piece.hit();
        piece.hit();
        piece.hit();
        piece.hit();
        piece.hit();

        expect(board.placeShip(piece, 0, 0, true)).toBe(true);

        expect(board.checkLoss()).toBe(true);
    });
});