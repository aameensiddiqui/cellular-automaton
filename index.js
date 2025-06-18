"use strict";
/** number of cells 32 x 32 */
const BOARD_ROWS = 32;
const BOARD_COLS = 32;
/** diff colors for diff states */
const stateColors = ["#151515", "#FF0000", "#00FF00", "#0000FF"];
/** function for creating boards: current and next.
 * Swap these boards to see changes in canvas */
function createBoard() {
    const board = [];
    /** filling all the cells of the board with dead */
    // for(let r  = 0 ; r < BOARD_ROWS ; ++r){
    //     const row: Array<State> = [];
    //     for(let c = 0 ; c < BOARD_COLS ; ++c){
    //         row.push('dead');
    //     }
    //     board.push(row);
    // }
    for (let r = 0; r < BOARD_ROWS; ++r) {
        board.push(new Array(BOARD_COLS).fill(0));
    }
    return board;
}
let currentBoard = createBoard();
let nextBoard = createBoard();
const canvasId = "app";
const app = document.getElementById(canvasId);
if (app === null) {
    throw new Error(`canvas ki id nahi mili ${canvasId}`);
}
/** set canvas height and width */
app.height = 600;
app.width = 600;
/** height and width of a cell */
const CELL_WIDTH = app.width / BOARD_COLS;
const CELL_HEIGHT = app.height / BOARD_ROWS;
/** get the 2d context */
const ctx = app.getContext("2d");
if (ctx === null) {
    throw new Error(`2d context initialize nahi hua ctx=>${ctx}`);
}
// console.log(ctx);
/** count all the neighbours
 * ###
 * #-#
 * ###
 */
function countNeighbours(board, nbors, r0, c0) {
    nbors.fill(0);
    for (let rr = -1; rr <= 1; ++rr) {
        for (let cc = -1; cc <= 1; ++cc) {
            /** count all (nbors) except current one */
            if (rr != 0 || cc != 0) {
                const r = rr + r0;
                const c = cc + c0;
                if (0 <= r && r < BOARD_ROWS) {
                    if (0 <= c && c < BOARD_COLS) {
                        nbors[board[r][c]]++;
                    }
                }
            }
        }
    }
}
/** computing next board */
function computNextBoard(states, current, next) {
    const ALIVE = 1;
    const DEAD = 0;
    const nbors = new Array(states).fill(0);
    for (let r = 0; r < BOARD_ROWS; ++r) {
        for (let c = 0; c < BOARD_COLS; ++c) {
            countNeighbours(current, nbors, r, c);
            switch (current[r][c]) {
                case DEAD:
                    if (nbors[ALIVE] === 3)
                        next[r][c] = ALIVE;
                    else
                        next[r][c] = DEAD;
                    break;
                case ALIVE:
                    if (nbors[ALIVE] === 2 || nbors[ALIVE] === 3)
                        next[r][c] = ALIVE;
                    else
                        next[r][c] = DEAD;
                    break;
            }
        }
    }
}
/** renders the cell */
function render(ctx, currentBoard) {
    ctx.fillStyle = "#151515";
    ctx.fillRect(0, 0, app.width, app.height);
    /** iterate thr the canvas and render cells */
    ctx.fillStyle = "FF0000";
    for (let r = 0; r < BOARD_ROWS; ++r) {
        for (let c = 0; c < BOARD_COLS; ++c) {
            let x = c * CELL_WIDTH;
            let y = r * CELL_HEIGHT;
            ctx.fillStyle = stateColors[currentBoard[r][c]];
            ctx.fillRect(x, y, CELL_WIDTH, CELL_HEIGHT);
        }
    }
}
/** click to add a cell */
app.addEventListener("click", (e) => {
    const col = Math.floor(e.offsetX / CELL_WIDTH);
    const row = Math.floor(e.offsetY / CELL_HEIGHT);
    currentBoard[row][col] = 1;
    render(ctx, currentBoard);
});
const nextId = "next";
const next = document.getElementById(nextId);
if (next === null)
    throw new Error(`next ka button nahi mil raha`);
next.addEventListener("click", (e) => {
    computNextBoard(2, currentBoard, nextBoard);
    /** swap currentBoard and nextBoard. here done by destructuring */
    [currentBoard, nextBoard] = [nextBoard, currentBoard];
    render(ctx, currentBoard);
});
/* first render */
render(ctx, currentBoard);
