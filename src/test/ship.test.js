const ship = require('../ship');

describe('Carrier', () => {
    let piece = ship(5);

    test('Carrier length', () => {
        expect(piece.length).toBe(5);
    });

    for (let i = 1; i <= piece.length; i++){
        test(`Carrier hit ${i} time(s)`, () => {
            piece.hit();

            if (i < piece.length) {
                expect(piece.isSunk()).toBe(false);
            } else {
                expect(piece.isSunk()).toBe(true);
            }
            
        });
    }

});

describe('Battleship', () => {
    let piece = ship(4);

    test('Battleship length', () => {
        expect(piece.length).toBe(4);
    });

    for (let i = 1; i <= piece.length; i++){
        test(`Battleship hit ${i} time(s)`, () => {
            piece.hit();

            if (i < piece.length) {
                expect(piece.isSunk()).toBe(false);
            } else {
                expect(piece.isSunk()).toBe(true);
            }
            
        });
    }

});

describe('Destroyer', () => {
    let piece = ship(3);

    test('Destroyer length', () => {
        expect(piece.length).toBe(3);
    });

    for (let i = 1; i <= piece.length; i++){
        test(`Destroyer hit ${i} time(s)`, () => {
            piece.hit();

            if (i < piece.length) {
                expect(piece.isSunk()).toBe(false);
            } else {
                expect(piece.isSunk()).toBe(true);
            }
            
        });
    }

});

describe('Submarine', () => {
    let piece = ship(3);

    test('Submarine length', () => {
        expect(piece.length).toBe(3);
    });

    for (let i = 1; i <= piece.length; i++){
        test(`Submarine hit ${i} time(s)`, () => {
            piece.hit();

            if (i < piece.length) {
                expect(piece.isSunk()).toBe(false);
            } else {
                expect(piece.isSunk()).toBe(true);
            }
            
        });
    }

});

describe('Patrol Boat', () => {
    let piece = ship(2);

    test('Patrol Boat length', () => {
        expect(piece.length).toBe(2);
    });

    for (let i = 1; i <= piece.length; i++){
        test(`Patrol Boat hit ${i} time(s)`, () => {
            piece.hit();

            if (i < piece.length) {
                expect(piece.isSunk()).toBe(false);
            } else {
                expect(piece.isSunk()).toBe(true);
            }
            
        });
    }

});