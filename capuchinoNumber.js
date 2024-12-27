import {Position} from "./position";

export class CapuchinoNumber {
    #maxX
    #maxY

    setMax(maxX, maxY) {
        this.#maxX = maxX
        this.#maxY = maxY
    }

    getRandomIntegerNumber(fromInclusive, toExclusive) {
        return Math.floor(Math.random() * (toExclusive - fromInclusive) + fromInclusive);
    }

    getRandomPosition(maxX = this.#maxX, maxY = this.#maxY) {
        return new Position(
            this.getRandomIntegerNumber(0, maxX),
            this.getRandomIntegerNumber(0, maxY)
        )
    }
}