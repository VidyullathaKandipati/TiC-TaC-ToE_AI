var game = {
  moves: 1,
  player: '',
  gameOver: false,
  xWins: 0,
  oWins: 0,
  draws: 0,
  row: -1,
  col: -1,
  xScoreText: 'Player X: ',
  oScoreText: 'Computer (O): ',
  drawsText: 'Draw: ',
  board: [[0,0,0],
          [0,0,0],
          [0,0,0]],
  updateBoard: function(i,j){
    //Updates the HTML page and num of moves
    var id = '#'+i+j;
    this.moves++;
    this.board[i][j] = this.player;
    $(id).text(this.player);
  },
  isGameOver: function(p){
    //Checks for win condition and I did this seperately to highlight the winning cells.
    if (this.board[0][0] === p && this.board[0][1] === p && this.board[0][2] === p) {
      $('#00, #01, #02').addClass("win"); //start with the frst
      return "win";
    }
    if (this.board[1][0] === p && this.board[1][1] === p && this.board[1][2] === p) {
      $('#10, #11, #12').addClass("win");
      return "win";
    }
    if (this.board[2][0] === p && this.board[2][1] === p && this.board[2][2] === p){
      $('#20, #21, #22').addClass("win");
      return "win";
    }
    //Check for win in 3 Columns
    if (this.board[0][0] === p && this.board[1][0] === p && this.board[2][0] === p){
      $('#00, #10, #20').addClass("win");
      return "win";
    }
    if (this.board[0][1] === p && this.board[1][1] === p && this.board[2][1] === p){
      $('#01, #11, #21').addClass("win");
      return "win";
    }
    if (this.board[0][2] === p && this.board[1][2] === p && this.board[2][2] === p){
      $('#02, #12, #22').addClass("win");
      return "win";
    }
    //Check for win Diagonally
    if (this.board[0][0] === p && this.board[1][1] === p && this.board[2][2] === p){
      $('#00, #11, #22').addClass("win");
      return "win";
    }
    if (this.board[0][2] === p && this.board[1][1] === p && this.board[2][0] === p){
      $('#02, #11, #20').addClass("win");
      return "win";
    }
    return;
  },
  updateScores: function(p){
    //Updates scores of the players and draws and this is called only
    //if the game is over, hence updating the gameOver to true
    $('#playerX').text(this.xScoreText+this.xWins);
    $('#computer').text(this.oScoreText+this.oWins);
    $('#draws').text(this.drawsText+this.draws);
    this.gameOver = true;
  },
  initBoard: function(){
    //Initialises the game variables.
    $('.col-md-3').text('');
    $('.col-md-3').removeClass('win');
    this.board = [[0,0,0],
                  [0,0,0],
                  [0,0,0]];
  },
  makeMove: function(i,j){
    // logic for computer's moves

    if (this.moves === 10) {
      // return if there is draw already, there is no point
      return;
    }

    // If it is Computer's first move, it always starts with center,
    // as there is high probablity for win or block
    // If the center is already taken by the player X (as he starts the game)
    // Computer takes top left position
    if (this.moves === 2) {
      if (this.board[1][1] === 0) {
        this.row = 1;
        this.col = 1;
      }
      else{
        this.row = 0;
        this.col = 0;
      }
    }

    // If it is not Computer's first move
    else {
      // Now that we have enough moves we check for winning conditions
      if (this.winnable('O')){
        // Checking for computers win
      }
      else if (this.winnable('X')){
        // If there is no win for Computer(O), Check for player X's win to block
      }
      else if (this.checkAndFillOppCorners()) {
        // If there is no winning Conditions for any of the players,
        // lets check for opposite corners to block the win for player X
      }
      else if (this.checkAndFillOppSides()) {
        // If there is no winning Conditions for any of the players, and no OppositeCorners
        // lets check for opposite sides to block the win for player X
      }
      else if (this.checkAndFillAnyCorners()) {
        // Otherwise, lets just any of the corners available
      }
      else if (this.checkAndFillAnySides()) {
        // If any of the corners are not available, fill any of the available sides
      }
      else if (this.moves < 10) {
        // To check if there is any condition, which computer might have missed.
        console.log("No condition has met. No move has made.");
      }
    }
    //Finally update the board, with the already finalised move
    this.updateBoard(this.row,this.col);
  },
  checkAndFillOppCorners: function(){
    // Checks for the opposite corners and updates row and col with the available cell.
    var returnVal = false;
    if (this.board[0][0] === 'X' && this.board[2][2] === 0) {
      this.row = 2;
      this.col = 2;
      returnVal = true;
    }
    else if (this.board[2][2] === 'X' && this.board[0][0] === 0) {
      this.row = 0;
      this.col = 0;
      returnVal = true;
    }
    else if (this.board[0][2] === 'X' && this.board[2][0] === 0) {
      this.row = 2;
      this.col = 0;
      returnVal = true;
    }
    else if (this.board[2][0] === 'X' && this.board[0][2] === 0) {
      this.row = 0;
      this.col = 2;
      returnVal = true;
    }
    return returnVal;
  },
  checkAndFillOppSides: function(){
    // Checks for the opposite sides and updates row and col with the available cell.
    var returnVal = false;
    if (this.board[1][0] === 'X' && this.board[1][2] === 0) {
      this.row = 1;
      this.col = 2;
      returnVal = true;
    }
    else if (this.board[1][2] === 'X' && this.board[1][0] === 0) {
      this.row = 1;
      this.col = 0;
      returnVal = true;
    }
    else if (this.board[0][1] === 'X' && this.board[2][1] === 0) {
      this.row = 2;
      this.col = 1;
      returnVal = true;
    }
    else if (this.board[2][1] === 'X' && this.board[0][1] === 0) {
      this.row = 0;
      this.col = 1;
      returnVal = true;
    }
    return returnVal;
  },
  checkAndFillAnyCorners: function() {
    // Checks for the any corners and updates row and col with the available cell.
    var returnVal = false;
    if (this.board[0][0] === 0) {
      this.row = 0;
      this.col = 0;
      returnVal = true;
    }
    else if (this.board[0][2] === 0) {
      this.row = 0;
      this.col = 2;
      returnVal = true;
    }
    else if (this.board[2][0] === 0) {
      this.row = 2;
      this.col = 0;
      returnVal = true;
    }
    else if (this.board[2][2] === 0) {
      this.row = 2;
      this.col = 2;
      returnVal = true;
    }
    return returnVal;
  },
  checkAndFillAnySides: function(){
    // Checks for the any sides and updates row and col with the available cell.
    var returnVal = false;
    if (this.board[0][1] === 0) {
      this.row = 0;
      this.col = 1;
      returnVal = true;
    }
    else if (this.board[1][2] === 0) {
      this.row = 1;
      this.col = 2;
      returnVal = true;
    }
    else if (this.board[2][1] === 0) {
      this.row = 2;
      this.col = 1;
      returnVal = true;
    }
    else if (this.board[1][0] === 0) {
      this.row = 1;
      this.col = 0;
      returnVal = true;
    }
    return returnVal;
  },
  winnable: function(key){
      // Checks for winnable in all the rows, cols & diagonals and this is huge function
      // Thankfully this is being reused to check winnable conditions for both 'O' and 'X' by passing
      // player key as the argument.
      
      //Row 1
      var returnVal = false;
      if(this.board[0][0] === key && this.board[0][1] === key && this.board[0][2] === 0){
        this.row = 0;
        this.col = 2;
        returnVal = true;
        // this.board[0][2] = key;
      }
      if(this.board[0][1] === key && this.board[0][2] === key && this.board[0][0] === 0){
        this.row = 0;
        this.col = 0;
        returnVal = true;
        // this.board[0][0] = key;
      }
      if(this.board[0][0] === key && this.board[0][2] === key && this.board[0][1] === 0){
        this.row = 0;
        this.col = 1;
        returnVal = true;
        // this.board[0][1] = key;
      }
      //Row2
      if(this.board[1][0] === key && this.board[1][1] === key && this.board[1][2] === 0){
        this.row = 1;
        this.col = 2;
        returnVal = true;
        // this.board[1][2] = key;
      }
      if(this.board[1][1] === key && this.board[1][2] === key && this.board[1][0] === 0){
        this.row = 1;
        this.col = 0;
        returnVal = true;
        // this.board[1][0] = key;
      }
      if(this.board[1][0] === key && this.board[1][2] === key && this.board[1][1] === 0){
        this.row = 1;
        this.col = 1;
        returnVal = true;
        // this.board[1][1] = key;
      }
      //Row3
      if(this.board[2][0] === key && this.board[2][1] === key && this.board[2][2] === 0){
        this.row = 2;
        this.col = 2;
        returnVal = true;
        // this.board[2][2] = key;
      }
      if(this.board[2][1] === key && this.board[2][2] === key && this.board[2][0] === 0){
        this.row = 2;
        this.col = 0;
        returnVal = true;
        // this.board[2][0] = key;
      }
      if(this.board[2][0] === key && this.board[2][2] === key && this.board[2][1] === 0){
        this.row = 2;
        this.col = 1;
        returnVal = true;
        // this.board[2][1] = key;
      }
      //Col1
      if(this.board[0][0] === key && this.board[1][0] === key && this.board[2][0] === 0){
        this.row = 2;
        this.col = 0;
        returnVal = true;
        // this.board[2][0] = key;
      }
      if(this.board[0][0] === key && this.board[2][0] === key && this.board[1][0] === 0){
        this.row = 1;
        this.col = 0;
        returnVal = true;
        // this.board[1][0] = key;
      }
      if(this.board[1][0] === key && this.board[2][0] === key && this.board[0][0] === 0){
        this.row = 0;
        this.col = 0;
        returnVal = true;
        // this.board[0][0] = key;
      }
      //Col2
        if(this.board[0][1] === key && this.board[1][1] === key && this.board[2][1] === 0){
          this.row = 2;
          this.col = 1;
          returnVal = true;
        // this.board[2][1] = key;
      }
      if(this.board[0][1] === key && this.board[2][1] === key && this.board[1][1] === 0){
        this.row = 1;
        this.col = 1;
        returnVal = true;
        // this.board[1][1] = key;
      }
      if(this.board[1][1] === key && this.board[2][1] === key && this.board[0][1] === 0){
        this.row = 0;
        this.col = 1;
        returnVal = true;
        // this.board[0][1] = key;
      }
      //Col3
      if(this.board[0][2] === key && this.board[1][2] === key && this.board[2][2] === 0){
        this.row = 2;
        this.col = 2;
        returnVal = true;
        // this.board[2][2] = key;
      }
      if(this.board[0][2] === key && this.board[2][2] === key && this.board[1][2] === 0){
        this.row = 1;
        this.col = 2;
        returnVal = true;
        // this.board[1][2] = key;
      }
      if(this.board[1][2] === key && this.board[2][2] === key && this.board[0][2] === 0){
        this.row = 0;
        this.col = 2;
        returnVal = true;
        // this.board[0][2] = key;
      }
      //D1
      if(this.board[0][0] === key && this.board[1][1] === key && this.board[2][2] === 0){
        this.row = 2;
        this.col = 2;
        returnVal = true;
        // this.board[2][2] = key;
      }
      if(this.board[0][0] === key && this.board[2][2] === key && this.board[1][1] === 0){
        this.row = 1;
        this.col = 1;
        returnVal = true;
        // this.board[1][1] = key;
      }
      if(this.board[1][1] === key && this.board[2][2] === key && this.board[0][0] === 0){
        this.row = 0;
        this.col = 0;
        returnVal = true;
        // this.board[0][0] = key;
      }
      //D2
      if(this.board[0][2] === key && this.board[1][1] === key && this.board[2][0] === 0){
        this.row = 2;
        this.col = 0;
        returnVal = true;
        // this.board[2][0] = key;
      }
      if(this.board[0][2] === key && this.board[2][0] === key && this.board[1][1] === 0){
        this.row = 1;
        this.col = 1;
        returnVal = true;
        // this.board[1][1] = key;
      }
      if(this.board[1][1] === key && this.board[2][0] === key && this.board[0][2] === 0){
        this.row = 0;
        this.col = 2;
        returnVal = true;
        // this.board[0][2] = key;
      }
      return returnVal;
  }

};
