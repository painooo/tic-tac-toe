// When button is pressed
// Call steps after round is initialized
const gameStatus = document.querySelector("#gameStatus"); 
const winStat = document.querySelector("#winStat");
const startBtn = document.querySelector("#start");
const clearBtn = document.querySelector("#clear");

function initDisplay(play){
    const gameBoard = document.createElement("div");
    gameBoard.id="gameBoard";
    document.body.appendChild(gameBoard);
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++) {
            const button = document.createElement("button");
            gameBoard.appendChild(button);
            button.textContent="";
            button.id=`${i}-${j}`;
            button.classList.add("space");
            button.addEventListener("click", (e) => {
                let loc = ((e.target).id).split("-");
                play(loc[0],loc[1], e.target);
            })
        }
    }
    return(gameBoard);
};
function clearDisplay(displayBoard){
    for (const child of displayBoard.children){
        child.remove();
    }
}

function initBoard(){
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
};

function control(board) {
    const displayBoard = () => {
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
        return board[x][y][0];
    };

    const selectCell = (x, y, marker,target) => {
        let cell = getCell(x,y);
        if (!cell.isClicked){
            cell.marker = marker;
            cell.isClicked = true;
            target.textContent = marker;
        } else {
            console.log("Click a different cell");
        }
    };
    function checkWin() {
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

    function createPlayer(name,marker){
        let score = 0;
        return {name, marker, score};
    }
    const playerOne = createPlayer("playerOne", "X");
    const playerTwo = createPlayer("playerTwo", "O");

    let currPlayer = playerOne;
    const selectPlayer = (player) => player == playerOne ? playerTwo : playerOne;
    return {displayBoard, selectCell, checkWin, selectPlayer, currPlayer};
};
function round(board) {
    const cntrl = control(board);
    let isWin = false;
    let count = 0;
        return function play(cellY, cellX, target){
            if (count != 9) {
                if (!isWin){
                    cntrl.selectCell(cellY, cellX, cntrl.currPlayer.marker, target);
                    cntrl.displayBoard();    
                    isWin = cntrl.checkWin();
                    if (isWin) {
                        console.log(`${cntrl.currPlayer.name} wins!!`)
                        winStat.textContent = cntrl.currPlayer.name + " wins!!"
                    }
                    cntrl.currPlayer = cntrl.selectPlayer(cntrl.currPlayer);
                    gameStatus.textContent = "Current player: "+cntrl.currPlayer.name;
                    count++;
                }
            }else {
                console.log(`TIEEEE!!!!`);
                gameStatus.textContent = "TIEEEE!!"
            }
        }
};
function game() {
    const board = initBoard();
    const playRound = () => {
        board.createBoard();
        const play = round(board.board);
        initDisplay(play);
    }
    return {playRound}
};

startBtn.addEventListener("click", () => {
    init = game();
    init.playRound();
})
clearBtn.addEventListener("click", () => {
    (document.querySelector("#gameBoard")).remove()
})