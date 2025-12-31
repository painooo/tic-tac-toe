// Board:
// Use for loops to create a 3x3 array board
// Cell:
// Has two attributes
//  1. isClicked (true, false)
//      - If clicked can't be clicked again
//  2. Marker
//      - When selected marker will be changed to reflect
// Selection:
//  - Takes an X and Y
//  - Uses X and Y to determine cell to click
//  - Also takes in a marker
//  - Should check isClicked
//
// DisplayBoard:
//  - Will use getBoard
//  - Iterate through each row
//      - Iterate through each cell to out marker
// Players:
//  - Created via factory Functions
//  - Will have two different markers
// Win:
//  - Check each row
//  - Check is column board[0][1] board[1][1]  board[2][1]
//  - Check diags. (Dunno yet)
// Game:
//  - Will have:
//      - selectPlayer (alternate between)
//      - play

//IIFE:
// const constant = (function () {return "test"})();
// For single use

//Factory Functions:
// function test() {return "test"};
// const constant = test();
// To create multiple
const initBoard = ( function(){
    function cell() {
        let isClicked = false;
        let marker = "";
        return {isClicked, marker};
    }
    let board = []
    function createBoard() {
        let row = 3;
        let col = 3;

        for (let i = 0; i < row; i++){
            let bRow = [];
            for (let j = 0; j < col; j++){
                bRow.push([cell()]);
            }
            board.push(bRow);
        }
    }
    return {board, createBoard};
})();
const control = (function(){
    const displayBoard = () => {
        const board = initBoard.board;
        let displayBoard = [];
        for (let row of board) {
            let displayRow = []
            for (let cell of row) {
                displayRow.push(cell[0].marker)
            }
            displayBoard.push(displayRow);
        }
        console.log(displayBoard);
    };

    const getCell = (x, y) => {
        return initBoard.board[x][y][0];
    };

    const selectCell = (x, y, marker) => {
        let cell = getCell(x,y);
        if (!cell.isClicked){
            cell.marker = marker;
            cell.isClicked = true;
        } else {
            console.log("Click a different cell");
        }
    };
    return {displayBoard, selectCell};
})();

function game() {
    function createPlayer(name,marker){
        let score = 0;
        return {name, marker, score};
    }
    const playerOne = createPlayer("playerOne", "X");
    const playerTwo = createPlayer("playerTwo", "O");
    let currPlayer = playerOne;
    const selectPlayer = (player) => player == playerOne ? playerTwo : playerOne;
    const playRound = () => {
        initBoard.createBoard();
    }
    function checkWin() {
        const board = initBoard.board;
        let isWin = false;
        let diagPrev = undefined;
        let diagCount = 0;

        let invDiagPrev = undefined;
        let invDiagCount = 0;
        for (let row = 0; row < board.length; row++) {
            let rowPrev = undefined;
            let rowCount = 0;

            let columnPrev = undefined;
            let columnCount = 0;

            if (board[row][row][0].marker == "X" || board[row][row][0].marker == "O") {
                if (board[row][row][0].marker == invDiagPrev) {
                    invDiagCount++;
                }
                invDiagPrev = board[row][row][0].marker;
            }
            if (board[2-row][row][0].marker == "X" || board[2-row][row][0].marker == "O") {
                if (board[2-row][row][0].marker == diagPrev) {
                    diagCount++;
                }
                diagPrev = board[row][row][0].marker;
            }
            for (let cell = 0; cell < board.length; cell++) {
                if (board[row][cell][0].marker == "X" || board[row][cell][0].marker == "O") {
                    if (board[row][cell][0].marker == rowPrev) {
                        rowCount++;
                    }
                    rowPrev = board[row][cell][0].marker;
                }
                if (board[cell][row][0].marker == "X" || board[cell][row][0].marker == "O") {
                    if (board[cell][row][0].marker == columnPrev) {
                            columnCount++;
                        }
                        columnPrev = board[cell][row][0].marker;
                    }
            }
            if (rowCount == 2 || columnCount == 2 || diagCount == 2 || invDiagCount == 2) {
                isWin = true;
                break;
            }
        }
        return isWin;
    }
    return {playRound, selectPlayer, currPlayer, checkWin}
};


function round() {
    const currRound = game();
    currRound.playRound();
    let isWin = false;
    while(!isWin){
        let cellY = parseInt(prompt(`pick a cell row ${currRound.currPlayer.name}`)); // Should be displayed on board as buttons (LATER)
        let cellX = parseInt(prompt(`pick a cell column ${currRound.currPlayer.name}`));
        control.selectCell(cellY, cellX, currRound.currPlayer.marker);
        control.displayBoard();    
        isWin = currRound.checkWin();
        if (isWin) {
            console.log(`${currRound.currPlayer.name} wins!!`)
            break;
        }
        currRound.currPlayer = currRound.selectPlayer(currRound.currPlayer);
    }
}
let rounds = 3;
while(rounds != 0) {
    round();
    rounds--;
}