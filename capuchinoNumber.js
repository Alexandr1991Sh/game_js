export class CapuchinoNumber {
    getRandomIntegerNumber(fromInclusive, toExclusive) {
        return Math.floor(Math.random() * (toExclusive - fromInclusive) + fromInclusive);
    }
}