const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  let board = [];
  for(let i=0; i< numberOfRows; i++){
    let row =[];
    for(let j=0;j< numberOfColumns; j++){
      row.push(' ');
    }
    board.push(row);
  }
  return board;
};
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  let board = [];
  for(let rowsIndex=0; rowsIndex< numberOfRows; rowsIndex++){
    let row =[];
    for(let columnsIndex=0;columnsIndex< numberOfColumns; columnsIndex++){
      row.push(null);
    }
    board.push(row);
  }
  let numberOfBombsPlaced = 0;
  while(numberOfBombsPlaced != numberOfBombs){
    let randomRowIndex = Math.floor(Math.random() * numberOfRows);
    let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
    board[randomRowIndex][randomColumnIndex] = 'B';
    numberOfBombsPlaced++;
    //TBD loop has the potential to place bombs on top of already existing bombs
  }
  return board;
}
const printBoard = (board) => {
  let result = board.map(row => row.join(' | ')).join('\n')
 console.log( result );
 //console.log("calling printBoard");
};


let playerBoard = generatePlayerBoard(3,4);
let bombBoard = generateBombBoard(3,4,5);
console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard)
