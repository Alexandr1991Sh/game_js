export class Position {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    equals(otherPosition) {
        if (!otherPosition) return false
        // if (!(otherPosition instanceof Position)) throw new Error('otherPosition should be instance of Position class')
        return this.x === otherPosition.x && this.y === otherPosition.y
    }


    clone() {
       return new Position(this.x,this.y)
    }
}