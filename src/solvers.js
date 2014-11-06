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
window.countNRooksSolutions = function(n, board, row, solutions) {
  if (n === 0 || n === 1) {
    return 1;
  }
  debugger;

  // set up current board, current row, and total solutions counted
  board = board || new Board({'n': n});
  row = row || 0;
  solutions = solutions || 0;

  // iterate through col positions of current row
  for (var col = 0; col < n; col++) {
    // check if any col position is toggled
    if (board.rows()[row][col] === 1) {
      board.togglePiece(row, col);
      if (col + 1 === n && row + n === n) {
        return solutions;
      } else if (col +  1 === n) {
        solutions = window.countNRooksSolutions(n, board, row-1, solutions);
      }
      col += 1;
    }
    // toggle cell
    board.togglePiece(row, col);
    // if no row or column conflicts exist
    if (!board.hasAnyRooksConflicts()) {
      // if next row does not exist
      if (row + 1 === n) {
        // increment total solutions
        debugger;
        solutions += 1;
        // check if next col exists
        if (col + 1 === n) {
          board.togglePiece(row, col);
          // recursion
          solutions = window.countNRooksSolutions(n, board, row-1, solutions);
        } else {
          board.togglePiece(row, col);
          // col += 1;
        }
      } else {
        // else recursively pass in n, board, row+1, and solutions
        solutions = window.countNRooksSolutions(n, board, row+1, solutions);
      }
    } else {
      // else untoggle cell
      board.togglePiece(row, col);
      // check if next col exists
      if (col + 1 === n) {
        solutions = window.countNRooksSolutions(n, board, row-1, solutions);
      }
    }
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutions);
  // return solutions count
  return solutions;
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
