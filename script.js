// Cell FACTORY FUNCTION (many -> factory)
function Cell() {
    let mark = ''
    const addMark = (playerMark) => {mark = playerMark}
    const getMark = () => mark;
    return {addMark, getMark}
}



// GAME BOARD MODULE PATTERN (wrap the factory function inside an IIFE)
const gameBoard = (() => {
    let board = [[Cell(),Cell(),Cell()], // no need 'new' keyword because this is factory function!
                 [Cell(),Cell(),Cell()],
                 [Cell(),Cell(),Cell()]];

    const reset = () => {
        board = [[Cell(),Cell(),Cell()],
                 [Cell(),Cell(),Cell()],
                 [Cell(),Cell(),Cell()]];
    }

    const getBoard = () => board;

    const selectCell = (row, column, playerMark) => {board[row][column].addMark(playerMark)}

    const isGameEnd = () => {
        // Check row and column
        for (let i = 0; i < 3; i++) {
            if ((board[i][0].getMark() !== '' && board[i][0].getMark() === board[i][1].getMark() && board[i][1].getMark() === board[i][2].getMark()) ||
                (board[0][i].getMark() !== '' && board[0][i].getMark() === board[1][i].getMark() && board[1][i].getMark() === board[2][i].getMark())) {
                return true;
            }
        }
        // Check diagonal
        if ((board[1][1].getMark() != '' && board[0][0].getMark() === board[1][1].getMark() && board[1][1].getMark() === board[2][2].getMark()) ||
            (board[1][1].getMark() != '' && board[2][0].getMark() === board[1][1].getMark() && board[1][1].getMark() === board[0][2].getMark())) {
            return true
        } 
        return false 
    }

    const isGameTie = () => {
        for(let i = 0; i<3; i++) {
            for(let j = 0; j<3; j++) {
                if(board[i][j].getMark() === '') {return false}
            }
        }
        return true
    }

    const getCellMark = (row, column) => {
        return board[row][column].getMark()
    }

    const isCellAvailable = (row,column) => {
        return board[row][column].getMark() === ''
    }
    
    return {getBoard, selectCell, isGameEnd, getCellMark, isCellAvailable, reset, isGameTie}
})();



// PLAYER MODULE PATTERN
const player = ((playerOneName = "Player One", playerTwoName = "Player Two") => {
    let players = [{name: playerOneName,mark: 'X'}, {name: playerTwoName,mark: 'O'}]
    let activePlayer = players[0]
    
    const reset = () => {
        players = [{name: playerOneName,mark: 'X'}, {name: playerTwoName,mark: 'O'}]
        activePlayer = players[0]
    }
    
    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0]
    }
    
    const getActivePlayer = () => activePlayer
    return {switchPlayerTurn, getActivePlayer, reset}
  })();



// GAME CONTROLLER MODULE PATTERN
const gameController = (() => {
    let subtitles = ''

    const playRound = (row, column) => {
        // Do nothing if game end or cell is unavailable
        if (gameBoard.isGameEnd() || gameBoard.isGameTie() || !gameBoard.isCellAvailable(row, column)) {return}
        // Select cell
        gameBoard.selectCell(row, column, player.getActivePlayer().mark)
        console.log(`${player.getActivePlayer().name} mark on (${row},${column})`)
        subtitles = `${player.getActivePlayer().name} mark on (${row},${column})`
        // Check game end / tie / continue
        if(gameBoard.isGameEnd()) {
            subtitles = `Game end, the winner is ${player.getActivePlayer().name}!`
        } else if(gameBoard.isGameTie()) {
            subtitles = `Game tie, there are no winner kubb!`
        } else {
            player.switchPlayerTurn()
            subtitles = `${player.getActivePlayer().name}'s turn.`
        }
        render(gameBoard, subtitles)
    }

    // Restart
    const restartBtn = document.querySelector('.restart')
    restartBtn.addEventListener('click', () => gameController.playAgain())
    const playAgain = () => {
        gameBoard.reset()
        player.reset()
        subtitles = `${player.getActivePlayer().name}'s turn.`
        render(gameBoard, subtitles)
    }

    // Initial play game message
    subtitles = `${player.getActivePlayer().name}'s turn.`
    render(gameBoard, subtitles)

    return {playRound, playAgain}
})();



// RENDER FUNCTION
function render(board, subtitles) {
    // clear board
    const boardDiv = document.querySelector('.board')
    boardDiv.innerHTML = ''
    // render board
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            // create cell div
            let cellDiv = document.createElement("div")
            cellDiv.classList.add('cell')
            cellDiv.textContent = board.getCellMark(i,j)
            boardDiv.appendChild(cellDiv)
            // add listener to cell div
            cellDiv.addEventListener('click', () => {gameController.playRound(i,j)})
        }
    }
    // Set subtitle
    const subtitlesDiv = document.querySelector('.subtitles')
    subtitlesDiv.textContent = subtitles
}

/* 
no main called here because GAME CONTROLLER is main and it IIFE
*/

