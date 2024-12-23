export class Game {
    #status = GAME_STATUSES.PENDING
    #googlePosition = null
    #numberUtility
    #player1
    #player2
    #google
    #settings = {
        gridSize: {columnsCount: 4, rowsCount: 4,},
        jumpInterval: 1000
    }


    // dependency injection
    constructor(numberUtility) {
        this.#numberUtility = numberUtility
    }

    #googleJump() {
        const newPosition = {
            x: this.#numberUtility.getRandomIntegerNumber(0, this.#settings.gridSize.columnsCount),
            y: this.#numberUtility.getRandomIntegerNumber(0, this.#settings.gridSize.rowsCount)
        }
        if (newPosition.x === this.#googlePosition?.x && newPosition.y === this.#googlePosition?.y) {
            return this.#googleJump()
        }
        this.#googlePosition = newPosition
    }

    // #getRandomPosition(){
    //     let newX
    //     let newY
    //
    // }

    // post/mutation/action/setter
    start() {
        this.#status = GAME_STATUSES.IN_PROGRESS
        this.#googleJump()
        setInterval(() => {
            this.#googleJump()
        }, this.#settings.jumpInterval)
    }




// selector/getter
    get status() {
        return this.#status
    }

    get googlePosition() {
        return this.#googlePosition
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
    }

    get player1() {
        return this.#player1
    }

    get player2() {
        return this.#player2
    }

    get google() {
        return this.#google
    }

}


export const GAME_STATUSES = {
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed'
}


