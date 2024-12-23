const {Game, GAME_STATUSES} = require('./game')
const {CapuchinoNumber} = require("./capuchinoNumber");

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

    it('google should be on the grid after tart', () => {
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
})

const delay = (ms) => new Promise(res => setTimeout(res, ms))