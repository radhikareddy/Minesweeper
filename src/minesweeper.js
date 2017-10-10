class Game{
  constructor(numberOfRows, numberOfColumns,numberOfBombs){
    this._board = new Board(numberOfRows, numberOfColumns,numberOfBombs);
  }

  playMove(rowIndex, columnIndex){
    this._board.flipTile(rowIndex, columnIndex);
    if(this._board._playerBoard[rowIndex][columnIndex] === 'B'){
      console.log("Game Over");
      this._board.print();
    }else if(this._board.hasSafeTiles() === false){
      console.log("Congratulations! you won.");
    }else{
      console.log("Current Board:");
      this._board.print();
    }
  }
}


class Board{
  constructor(numberOfRows, numberOfColumns,numberOfBombs){
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns,numberOfBombs);
  }
    get playerBoard(){
      return this._playerBoard;
    }
    get bombBoard() {
      return this._bombBoard;
    }

    flipTile(rowIndex, columnIndex){
      if(this._playerBoard[rowIndex][columnIndex] !== ' '){
        return "This tile has already been flipped!";
      }else if(this._bombBoard[rowIndex][columnIndex] === 'B'){
        this._playerBoard[rowIndex][columnIndex] = 'B';
      }else{
        this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex,columnIndex);
      }
      this._numberOfTiles--;
    }

    getNumberOfNeighborBombs( rowIndex, columnIndex){
      const neighborOffsets = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
      const numberOfRows = this._bombBoard.length;
      const numberOfColumns = this._bombBoard[0].length;
      let numberOfBombs = 0;
      neighborOffsets.forEach(offset => {
        const neighborRowIndex = rowIndex + offset[0];
        const neighborColumnIndex = columnIndex + offset[1];
        if(neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex <numberOfColumns){
          if(this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B'){
            numberOfBombs++;
          }
        }
      });
      return numberOfBombs;
    }

    hasSafeTiles(){
      //if(this._numberOfTiles !== this._numberOfBombs){
        return this._numberOfTiles !== this._numberOfBombs;

    }

    print(){
      let result = this._playerBoard.map(row => row.join(' | ')).join('\n')
      console.log( result );
     //console.log("calling printBoard");
    }

    static generatePlayerBoard(numberOfRows, numberOfColumns){
      let board = [];
      for(let i=0; i< numberOfRows; i++){
        let row =[];
        for(let j=0;j< numberOfColumns; j++){
          row.push(' ');
        }
        board.push(row);
      }
      return board;
    }
    static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs){
      let board = [];
      for(let rowsIndex=0; rowsIndex< numberOfRows; rowsIndex++){
        let row =[];
        for(let columnsIndex=0;columnsIndex< numberOfColumns; columnsIndex++){
          row.push(null);
        }
        board.push(row);
      }
      let numberOfBombsPlaced = 0;
      while(numberOfBombsPlaced < numberOfBombs){
        let randomRowIndex = Math.floor(Math.random() * numberOfRows);
        let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
        if(board[randomRowIndex][randomColumnIndex] !== 'B' ){
          board[randomRowIndex][randomColumnIndex] = 'B';
          numberOfBombsPlaced++;
        }
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
        //TBD loop has the potential to place bombs on top of already existing bombs
      }
      return board;
    }


}


const g = new Game(3, 3, 3);
g.playMove(0,0);
