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
    const isGameEnd = () => {
        // Check row
        for (let i = 0; i < 3; i++) {
            if (board[i][0].getMark() != '-' && board[i][0].getMark() === board[i][1].getMark() && board[i][1].getMark() === board[i][2].getMark()) {
                return true
            }
        }
        // Check column
        for (let j = 0; j < 3; j++) {
            if (board[0][j].getMark() != '-' && board[0][j].getMark() === board[1][j].getMark() && board[1][j].getMark() === board[2][j].getMark()) {
                return true
            }
        }
        // Check diagonal
        if (board[1][1].getMark() != '-' && board[0][0].getMark() === board[1][1].getMark() && board[1][1].getMark() === board[2][2].getMark()) {
            return true
        } else if (board[1][1].getMark() != '-' && board[2][0].getMark() === board[1][1].getMark() && board[1][1].getMark() === board[0][2].getMark()) {
            return true
        }
        return false 
    }
    
    return {getBoard, selectCell, printBoard, isGameEnd}
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
    let isGameEnd = false

    const printNewRound = () => {
        board.printBoard()
        console.log(`${player.getActivePlayer().name}'s turn.`)
    }

    const playRound = (row, column) => {
        // Select cell
        board.selectCell(row, column, player.getActivePlayer().mark)
        console.log(`${player.getActivePlayer().name} mark on (${row},${column})`)

        if(!board.isGameEnd()) {
            player.switchPlayerTurn()
            printNewRound()
        } else {
            console.log(`Game end! The winner is ${player.getActivePlayer().name}!`)
        }
    }

    // Initial play game message
    printNewRound()

    return {playRound}
}

const game = GameController()

