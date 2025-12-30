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

//IIFE:
// const constant = (function () {return "test"})();
// For single use

//Factory Functions:
// function test() {return "test"};
// const constant = test();
// To create multiple

const initBoard = (function(){
    function cell() {
        let isClicked = false;
        let marker = "";
        return {isClicked, marker};
    }
    function createBoard() {
        let row = 3;
        let col = 3;
        let board = []

        for (let i = 0; i < row; i++){
            let bRow = [];
            for (let j = 0; j < col; j++){
                bRow.push([cell()]);
            }
            board.push(bRow);
        }
        return board;
    }
    const board = (function (){
        return createBoard();
    })();
    return board
})();

const control = (function(){
    const getBoard = () => initBoard;
    const displayBoard = () => {
        const board = getBoard();
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
        return getBoard()[x][y][0];
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

    function Player(name,marker){
        return {name, marker};
    }
    return {displayBoard, selectCell, Player};
})();
control.displayBoard();