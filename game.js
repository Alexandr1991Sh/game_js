import {Position} from "./position";
import {MOVE_DIRECTION} from "./MOVE_DIRECTION";

export class Game {
    #status = GAME_STATUSES.PENDING
    #googlePosition = null
    #numberUtility
    #player1Position = null
    #player2Position = null
    #google
    #settings = {
        gridSize: {columnsCount: 4, rowsCount: 4,},
        jumpInterval: 1000
    }

    // dependency injection
    constructor(numberUtility) {
        this.#numberUtility = numberUtility
        this.#numberUtility.setMax(this.#settings.gridSize.columnsCount, this.#settings.gridSize.rowsCount)
    }

    #googleJump() {
        // todo: refactor move common logic for random players and google position to new function
        const newPosition = this.#numberUtility.getRandomPosition()

        if (newPosition.equals(this.#googlePosition)
            || newPosition.equals(this.#player1Position)
            || newPosition.equals(this.#player2Position)
        ) {
            return this.#googleJump()
        }
        this.#googlePosition = newPosition
    }

    //todo: refactor 2 methods info 1
    #setPlayer1Position() {
        const newPosition = this.#numberUtility.getRandomPosition()
        this.#player1Position = newPosition
    }

    #setPlayer2Position() {
        if (!this.#player1Position) throw new Error('first you must set position for first player')
        const newPosition = this.#numberUtility.getRandomPosition()
        if (newPosition.x === this.#player1Position.x && newPosition.y === this.#player1Position?.y) {
            return this.#setPlayer2Position()
        }
        this.#player2Position = newPosition
    }


    // post/mutation/action/setter
    start() {
        this.#status = GAME_STATUSES.IN_PROGRESS
        this.#setPlayer1Position()
        this.#setPlayer2Position()
        this.#googleJump()
        setInterval(() => {
            this.#googleJump()
        }, this.#settings.jumpInterval)
    }


// selector/getter
    get status() {
        return this.#status
    }

    get settings() {
        return {
            ...this.#settings,
            gridSize: {...this.#settings.gridSize}
        }
    }

    set settings(settings) {
        if (settings.gridSize && settings.gridSize.columnsCount * settings.gridSize.rowsCount < 4) {
            throw new Error('401 error')
        }

        this.#settings = {
            gridSize: settings.gridSize ? {...settings.gridSize} : this.#settings.gridSize,
            jumpInterval: settings.jumpInterval ? settings.jumpInterval : this.#settings.jumpInterval
        }
        this.#numberUtility.setMax(this.#settings.gridSize.columnsCount, this.#settings.gridSize.rowsCount)
    }

    get googlePosition() {
        return this.#googlePosition
    }

    get player1Position() {
        return this.#player1Position
    }

    movePlayer(playerNumber, direction) {
        const newPosition = this.#player1Position.clone()
        switch (direction) {
            case MOVE_DIRECTION.UP:
                newPosition.y--
                break
            case MOVE_DIRECTION.DOWN:
                newPosition.y++
                break
            case MOVE_DIRECTION.LEFT:
                newPosition.x--
                break
            case MOVE_DIRECTION.RIGHT:
                newPosition.x++
                break
            default:
                throw new Error('invalid direction')
        }

        if (!this.#isInsideGrid(newPosition)) return
        if (this.#isCellBusyByOtherPlayer(newPosition)) return
        this.#player1Position = newPosition
    }

    #isInsideGrid(newPosition) {
        return 0 <= newPosition.x && newPosition.x < this.#settings.gridSize.columnsCount
            && 0 <= newPosition.y && newPosition.y < this.#settings.gridSize.rowsCount
    }

    #isCellBusyByOtherPlayer(newPosition) {
        return newPosition.equals(this.#player1Position)
            || newPosition.equals(this.#player2Position)
    }

}


export const GAME_STATUSES = {
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
}


