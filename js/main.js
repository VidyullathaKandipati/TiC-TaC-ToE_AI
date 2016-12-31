$(document).ready(function(){
  $('.col-md-3').on('click',updateGame);
  $('#start').on('click',startNewGame);
  $('#reset').on('click',resetScores);

  //Function that is called everytime there is a click on the game board
  //This function updates the text on the game board on the relevant position
  //only if the cell is not occupied and game is not over
  function updateGame(){
    //Checking if the game is Over already
    if (!game.gameOver){
      //Getting cell position from its id
      var i = +($(this).attr('id').charAt(0));
      var j = +($(this).attr('id').charAt(1));

      //Checking if the cell has already been occupied
      if (game.board[i][j] === 0)
      {
        //This is for the player X, who starts the game always
        if (game.moves%2 !== 0 ){
          game.player = 'X';
          //Displays on the html page
          game.updateBoard(i,j);

          //Now its computer's turn
          game.player = 'O';
          game.makeMove(i,j);
        }
        //Is there a win for player X (which is highly impossible :P)
        if(game.isGameOver('X') === 'win'){
          game.xWins++;
          game.updateScores();
          return;
        }
        //Is there a win for computer (Probably)
        if(game.isGameOver('O') === 'win'){
          game.oWins++;
          game.updateScores();
          return;
        }

        //Is the game a draw (Most likely)
        if (game.moves === 10){
          game.draws++;
          game.updateScores();
          return;
        }
      }
    }
  }

  //Resets the game board and game
  function startNewGame(){
    game.moves = 1;
    game.gameOver = false;
    game.initBoard();
  }

  //Resets game board, game and also scores
  function resetScores(){
    game.xWins = 0;
    game.oWins = 0;
    game.draws = 0;
    game.updateScores();
    startNewGame();
  }

});
