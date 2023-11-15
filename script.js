function Gameboard() {
    const board = [[Cell(),Cell(),Cell()],
                   [Cell(),Cell(),Cell()],
                   [Cell(),Cell(),Cell()]];
    const getBoard = () => board;
    const selectCell = (row, column, playerMark) => {
        if (board[row][column].getMark() === '-') {
            board[row][column].addMark(playerMark)
        }
    }
    const printBoard = () => {
        const boardWithCellMarks = board.map((row) => row.map((cell) => cell.getMark()))
        console.log(boardWithCellMarks)
    }
    return {getBoard, selectCell, printBoard}
}

function Cell() {
    let mark = '-'
    const addMark = (playerMark) => {
        mark = playerMark
    }
    const getMark = () => mark;
    return {addMark, getMark}
}

function Player(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
  ) {
    const players = [
        {
            name: playerOneName,
            mark: 'X'
        },
        {
            name: playerTwoName,
            mark: 'O'
        }
    ]
    let activePlayer = players[0]
    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0]
    }
    // Getter
    const getActivePlayer = () => activePlayer
    return {switchPlayerTurn, getActivePlayer}
  }


function GameController() {
    const board = Gameboard()
    const player = Player()

    const printNewRound = () => {
        board.printBoard()
        console.log(`${player.getActivePlayer().name}'s turn.`)
    }

    const playRound = (row, column) => {
        // Select cell
        board.selectCell(row, column, player.getActivePlayer().mark)
        console.log(`${player.getActivePlayer().name} mark on (${row},${column})`)

        // Is game end
        
    
        player.switchPlayerTurn()
        printNewRound()
    }

    // Initial play game message
    printNewRound()

    return {playRound}
}

const game = GameController()

