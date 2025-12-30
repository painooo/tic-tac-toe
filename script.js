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
// DisplayBoard:
//  - Will use getBoard
//  - Iterate through each row
//      - Iterate through each cell to out marker
//
//IIFE:
// const constant = (function () {return "test"})();
// For single use

//Factory Functions:
// function test() {return "test"};
// const constant = test();
// To create multiple
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

const getBoard = () => board;

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
    return displayBoard;
};

const getCell = (x, y) => {
    return getBoard()[x][y][0];
};

const selectCell = (x, y) => {
    getCell(x,y).marker = 'X';
};

selectCell(2,1)
console.log(displayBoard())