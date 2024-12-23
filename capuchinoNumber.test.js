// CapuchinoNumber.test.js
import {CapuchinoNumber} from "./capuchinoNumber";

describe('CapuchinoNumber', () => {
    let capuchinoNumber;

    beforeEach(() => {
        capuchinoNumber = new CapuchinoNumber();
    });

    test('should return a number between the specified range', () => {
        const fromInclusive = 1;
        const toExclusive = 10;
        const randomNumber = capuchinoNumber.getRandomIntegerNumber(fromInclusive, toExclusive);
        expect(randomNumber).toBeGreaterThanOrEqual(fromInclusive);
        expect(randomNumber).toBeLessThan(toExclusive);
    });

     test('should return a number in the range when called multiple times', () => {
        const fromInclusive = 5;
        const toExclusive = 15;
        let allNumbers = new Set();

        for (let i = 0; i < 1000; i++) {
            const randomNumber = capuchinoNumber.getRandomIntegerNumber(fromInclusive, toExclusive);
            allNumbers.add(randomNumber);
        }

        // Check that all generated numbers are within the range
        allNumbers.forEach(num => {
            expect(num).toBeGreaterThanOrEqual(fromInclusive);
            expect(num).toBeLessThan(toExclusive);
        });
    });

    test('should handle negative ranges', () => {
        const fromInclusive = -10;
        const toExclusive = -5;
        const randomNumber = capuchinoNumber.getRandomIntegerNumber(fromInclusive, toExclusive);
        expect(randomNumber).toBeGreaterThanOrEqual(fromInclusive);
        expect(randomNumber).toBeLessThan(toExclusive);
    });

    test('should return the same number if fromInclusive equals toExclusive (edge case)', () => {
        const fromInclusive = 5;
        const toExclusive = 5;
        const randomNumber = capuchinoNumber.getRandomIntegerNumber(fromInclusive, toExclusive);
        expect(randomNumber).toEqual(5); // Consistently returns the lower bound if the range is invalid
    });

});