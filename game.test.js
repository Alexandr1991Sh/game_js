const {Game, GAME_STATUSES} = require('./game')
const {CapuchinoNumber} = require("./capuchinoNumber");
const {Position} = require("./position");
const {MOVE_DIRECTION} = require("./MOVE_DIRECTION");

describe('game tests', () => {
    let game
    beforeEach(() => {
        const capuchinoNumber = new CapuchinoNumber()
        game = new Game(capuchinoNumber)
    })

    it('game should started', () => {
        expect(game.status).toBe(GAME_STATUSES.PENDING)
        game.start()
        expect(game.status).toBe(GAME_STATUSES.IN_PROGRESS)
    })

    it('settings should be set', () => {
        //default settings
        expect(game.settings).toEqual({
            gridSize: {
                columnsCount: 4, rowsCount: 4
            },
            jumpInterval: 1000
        })

        // game.start()

        game.settings = {
            gridSize: {
                columnsCount: 3,
                rowsCount: 3
            }
        }
        game.settings.gridSize.columnsCount = -1000
        expect(game.settings.gridSize).toEqual({columnsCount: 3, rowsCount: 3})
    })

    it('settings should be set partially', () => {
        //default settings
        game.settings = {
            jumpInterval: 1
        }
        expect(game.settings.gridSize).toEqual({columnsCount: 4, rowsCount: 4})
        expect(game.settings.jumpInterval).toEqual(1)
    })

    it('google should be on the grid after start', () => {
        game.settings = {
            gridSize: {
                columnsCount: 3,
                rowsCount: 2
            }
        }
        game.start()

        expect(game.googlePosition.x).toBeGreaterThanOrEqual(0)
        expect(game.googlePosition.x).toBeLessThan(3)

        expect(game.googlePosition.y).toBeGreaterThanOrEqual(0)
        expect(game.googlePosition.y).toBeLessThan(2)
    })

    it('google should have other position after interval', async () => {
        game.settings = {
            gridSize: {
                columnsCount: 3,
                rowsCount: 2
            },
            jumpInterval: 1
        }
        game.start()

        for (let i = 0; i < 10; i++) {
            const position1 = game.googlePosition
            await delay(1)
            const position2 = game.googlePosition
            expect(position1).not.toEqual(position2)
        }

    })

    // it('google should have another position after interval', async () => {
    //     game.settings = {
    //         gridSize: {
    //             columnsCount: 3,
    //             rowsCount: 2
    //         },
    //         jumpInterval: 1
    //     };
    //     game.start();
    //
    //     let previousPosition = JSON.stringify(game.googlePosition);
    //
    //     for (let i = 0; i < 10; i++) {
    //         await delay(1);
    //         const currentPosition = JSON.stringify(game.googlePosition);
    //
    //         // Проверка, что текущая позиция отличается от предыдущей
    //         if (currentPosition === previousPosition) {
    //             console.log('Google did not move, still at: ', currentPosition);
    //         } else {
    //             // Проверка на то, что предыдущая позиция не равна текущей
    //             expect(currentPosition).not.toEqual(previousPosition);
    //             previousPosition = currentPosition; // Обновляем предыдущую позицию
    //         }
    //     }
    // });

    it('players should be on the grid after start', () => {
        game.settings = {
            gridSize: {
                columnsCount: 3,
                rowsCount: 2
            }
        }
        game.start()

        expect(game.player1Position.x).toBeGreaterThanOrEqual(0)
        expect(game.player1Position.x).toBeLessThan(3)

        expect(game.player1Position.y).toBeGreaterThanOrEqual(0)
        expect(game.player1Position.y).toBeLessThan(2)
    })

    it('players should moving in accessible direction', () => {

        class MockNumberUtility extends CapuchinoNumber {
            #pointerIndex = 0
            #mockValues = [
                new Position(2, 2),
                new Position(0, 2),
                new Position(1, 1),
            ]

            getRandomPosition() {
                return this.#mockValues[this.#pointerIndex++]
            }
        }

        const testGame = new Game(new MockNumberUtility())

        testGame.settings = {
            gridSize: {columnsCount: 3, rowsCount: 3},
            jumpInterval: 100000
        }
        testGame.start()

        //[  } [  } [  }
        //[  } [  } [  }
        //[p2} [  } [p1}

        expect(testGame.player1Position.x).toEqual(2)
        expect(testGame.player1Position.y).toEqual(2)

        testGame.movePlayer(1, MOVE_DIRECTION.DOWN)

        expect(testGame.player1Position.x).toEqual(2)
        expect(testGame.player1Position.y).toEqual(2)

        testGame.movePlayer(1, MOVE_DIRECTION.RIGHT)

        expect(testGame.player1Position.x).toEqual(2)
        expect(testGame.player1Position.y).toEqual(2)

        testGame.movePlayer(1, MOVE_DIRECTION.UP)
        //[  } [  } [  }
        //[  } [  } [p1}
        //[p2} [  } [  }
        expect(testGame.player1Position.x).toEqual(2)
        expect(testGame.player1Position.y).toEqual(1)

        testGame.movePlayer(1, MOVE_DIRECTION.LEFT)
        //[  } [  } [  }
        //[  } [p1} [  }
        //[p2} [  } [  }
        expect(testGame.player1Position.x).toEqual(1)
        expect(testGame.player1Position.y).toEqual(1)

        testGame.movePlayer(1, MOVE_DIRECTION.UP)
        //[  } [p1} [  }
        //[  } [  } [  }
        //[p2} [  } [  }
        expect(testGame.player1Position.x).toEqual(1)
        expect(testGame.player1Position.y).toEqual(0)

        testGame.movePlayer(1, MOVE_DIRECTION.UP)
        //[  } [p1} [  }
        //[  } [  } [  }
        //[p2} [  } [  }
        expect(testGame.player1Position.x).toEqual(1)
        expect(testGame.player1Position.y).toEqual(0)

        testGame.movePlayer(1, MOVE_DIRECTION.LEFT)
        //[p1} [  } [  }
        //[  } [  } [  }
        //[p2} [  } [  }
        expect(testGame.player1Position.x).toEqual(0)
        expect(testGame.player1Position.y).toEqual(0)

        testGame.movePlayer(1, MOVE_DIRECTION.LEFT)
        //[p1} [  } [  }
        //[  } [  } [  }
        //[p2} [  } [  }
        expect(testGame.player1Position.x).toEqual(0)
        expect(testGame.player1Position.y).toEqual(0)

        testGame.movePlayer(1, MOVE_DIRECTION.DOWN)
        //[  } [  } [  }
        //[p1} [  } [  }
        //[p2} [  } [  }
        expect(testGame.player1Position.x).toEqual(0)
        expect(testGame.player1Position.y).toEqual(1)

        testGame.movePlayer(1, MOVE_DIRECTION.DOWN)
        //[  } [  } [  }
        //[p1} [  } [  }
        //[p2} [  } [  }
        expect(testGame.player1Position.x).toEqual(0)
        expect(testGame.player1Position.y).toEqual(1)

    })


})

const delay = (ms) => new Promise(res => setTimeout(res, ms))