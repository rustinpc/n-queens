/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  // handle n === 0 case
  if (n === 0) {return [];}
  // create n x n board
  var solutionBoard = new Board({'n': n});

  // iterate through solution board rows
  for (var row = 0; row < n; row++) {
    // iterate through row items
    for (var col = 0; col < n; col++) {
      // if position is available...
      if (solutionBoard.rows()[row][col] === 0) {
        // ...toggle position
        solutionBoard.togglePiece(row, col);
        // if conflicts exist...
        if (solutionBoard.hasColConflictAt(col)) {
          // ...untoggle piece
          solutionBoard.togglePiece(row, col);
        } else {
          break;
        }
      }
    }
  }

  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solutionBoard));
  // return solution board
  return solutionBoard.rows();
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n, board, row, solutionCount) {
  // handle exception cases
  if (n === 0 || n === 1) {
    return 1;
  }

  // use current board or make new board
  board = board || new Board({"n":n});
  // use current row or start at 0
  row = row || 0;
  // use current solution count or start at 0
  solutionCount = solutionCount || 0;

  // iterate through current row column indexes
  for (var col = 0; col < n; col++) {
    // if position is untoggled
    if (board.get(row)[col] === 0) {
      // toggle
      board.togglePiece(row, col);
      // if no conflicts
      if (!board.hasColConflictAt(col)) {
        // if next row does not exist
        if (row + 1 === n) {
          // increment solution count (solution + 1)
          // debugger;
          solutionCount += 1;
          // if next column does not exist
          if (col + 1 === n) {
            // return call stack (stack - 1)
            board.togglePiece(row, col);
            return solutionCount;
          } else {
            // untoggle
            board.togglePiece(row, col);
          }
        } else {
          // recurse to next row (row + 1, stack + 1)
          solutionCount = window.countNRooksSolutions(n, board, row + 1, solutionCount);
          // untoggle current column position
          board.togglePiece(row, col);
          // if next column does not exist
          if (col + 1 === n) {
            // return call stack (stack - 1)
            return solutionCount;
          }
        }
      } else {
        // untoggle piece
        board.togglePiece(row, col);
        // if next column does not exist
        if (col + 1 === n) {
          // return call stack (stack - 1)
          return solutionCount;
        }
      }
    }
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  // return solutions count
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  // console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
