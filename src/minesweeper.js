let board = [
  [' ',' ',' '],
  [' ',' ',' '],
  [' ',' ',' ']
];
const printBoard = (board) => {
  console.log("Current Board:");
  console.log(board[0].join(' | '));
  console.log(board[1].join(' | '));
  console.log(board[2].join(' | '));
};
//empty board
printBoard(board);

//setting values on board
board[0][1] = 1;
board[2][2] = 'B';
printBoard(board);
