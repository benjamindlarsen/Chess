var board;



function Coordinate(x,y) {
	this.x = x;
	this.y = y;
}

//Parent Class Constructor: CHESSPIECE
//@param player: either "WHITE" or "BLACK"
function ChessPiece(x, y, player) {
	this.position = new Coordinate(x,y);
	this.player = player;
	
}

//Child Classes:


//KING
function King(x, y, player) {
	ChessPiece.call(this, x, y, player);
}
King.prototype = Object.create(ChessPiece.prototype);
King.prototype.constructor = King;

King.prototype.possibleMoves = function() {
	//returns array of possible moves
	var moves = [];
	var testPos = new Coordinate(this.position.x, this.position.y);
	var yArray = [-1,-1,-1,0,0,1,1,1]; //matching set of x,y offsets aligned with
	var xArray = [-1,0,1,-1,1,-1,0,1]  //the corresponding moves for the king
	for (i = 0; i < yArray.length; i++) {
		resetPos(testPos, this);
		testPos.x += xArray[i];
		testPos.y += yArray[i];
		//for each position, add it if it is a valid space and is either empty or occupied by an enemy
		if (!outOfBounds(testPos) && 
			(
				board.positions[testPos.y][testPos.x] == null || 
				board.positions[testPos.y][testPos.x].player != this.player
			)
			) {
			moves.push(new Coordinate(testPos.x, testPos.y));
		}
	}
	return moves;
}


//NOTE -- all check functions are currently unfinished and should not be called from the controller

/*

King.prototype.check = function() {
	//checks all other pieces to see if the king is in danger
	//returns a bool
	return checkAt(this.position);
}

//Returns an array of possible attack moves the king has,
//used when calculating attack range of an enemy king
King.prototype.attackMoves = function()	{
	var attacks = [];
	testPos = new Coordinate(this.position.x, this.position.y);
	var yArray = [-1,-1,-1,0,0,1,1,1]; //matching set of x,y offsets aligned with
	var xArray = [-1,0,1,-1,1,-1,0,1]  //the corresponding moves for the king
	for (i = 0; i < yArray.length; i++) {
		resetPos(testPos, this);
		testPos.x += xArray[i];
		testPos.y += yArray[i];
		//for each position, add it if it is a valid space and is empty
		if (!outOfBounds(testPos) && board.positions[j][i] == null) {
			attacks.push(new Coordinate(testPos.x, testPos.y));
		}
	}
	return attacks;
}

King.prototype.checkAt = function(pos) {

	//similar to check() except it takes a position as a parameters
	//used in possibleMoves() to check for unavailable movements
	for (j = 0; j < height; j++) {
		for (i = 0; i < width; i++) {
			var currPiece = board.positions[j][i];
			if (currPiece != null && currPiece != this && currPiece.player != this.player) {
				var moves;
				//check for enemy king
				if (currPiece instanceof King && currPiece.player != this.player) {
					moves = currPiece.attackMoves();
				}
				else moves = currPiece.possibleMoves();
				for (k = 0; k < moves.length; k++) {
					if (pos.x == moves[k].x &&
						pos.y == moves[k].y) {
						return true;
					}
				}
			}
		}
	}
	return false;
}

King.prototype.checkmate = function() {
	//@precondition: only called if check is true;
	//checks if there are any possible moves (calls possibleMoves())
	//return a bool
}
*/

//QUEEN
function Queen(x, y, player) {
	ChessPiece.call(this, x, y, player);
}

Queen.prototype = Object.create(ChessPiece.prototype);
Queen.prototype.constructor = Queen;

Queen.prototype.possibleMoves = function() {
	//returns array of possible moves
	var moves = [];
	var testPos = new Coordinate(this.position.x, this.position.y);
	//up
	straights(this, testPos, -1, "y", moves);
	//down
	resetPos(testPos, this);
	straights(this, testPos, 1, "y", moves);
	//right
	resetPos(testPos, this);
	straights(this, testPos, -1, "x", moves);
	//left
	resetPos(testPos, this);
	straights(this, testPos, 1, "x", moves);
	//up
	resetPos(testPos, this);
	straights(this, testPos, -1, "upDiagonal", moves);
	//down
	resetPos(testPos, this);
	straights(this, testPos, 1, "upDiagonal", moves);
	//right
	resetPos(testPos, this);
	straights(this, testPos, -1, "downDiagonal", moves);
	//left
	resetPos(testPos, this);
	straights(this, testPos, 1, "downDiagonal", moves);
	return moves;
}

//ROOK
function Rook(x, y, player) {
	ChessPiece.call(this, x, y, player);
}

Rook.prototype = Object.create(ChessPiece.prototype);
Rook.prototype.constructor = Rook;

Rook.prototype.possibleMoves = function() {
	//returns array of possible moves
	var moves = [];
	var testPos = new Coordinate(this.position.x, this.position.y);
	//up
	straights(this, testPos, -1, "y", moves);
	//down
	resetPos(testPos, this);
	straights(this, testPos, 1, "y", moves);
	//right
	resetPos(testPos, this);
	straights(this, testPos, -1, "x", moves);
	//left
	resetPos(testPos, this);
	straights(this, testPos, 1, "x", moves);
	return moves;
}

	

//BISHOP
function Bishop(x, y, player) {
	ChessPiece.call(this, x, y, player);
}

Bishop.prototype = Object.create(ChessPiece.prototype);
Bishop.prototype.constructor = Bishop;

Bishop.prototype.possibleMoves = function() {
	//returns array of possible moves
	var moves = [];
	var testPos = new Coordinate(this.position.x, this.position.y);
	//up
	straights(this, testPos, -1, "upDiagonal", moves);
	//down
	resetPos(testPos, this);
	straights(this, testPos, 1, "upDiagonal", moves);
	//right
	resetPos(testPos, this);
	straights(this, testPos, -1, "downDiagonal", moves);
	//left
	resetPos(testPos, this);
	straights(this, testPos, 1, "downDiagonal", moves);
	return moves;
}


//KNIGHT
function Knight(x, y, player) {
	ChessPiece.call(this, x, y, player);
}

Knight.prototype = Object.create(ChessPiece.prototype);
Knight.prototype.constructor = Knight;

Knight.prototype.possibleMoves = function() {
	//returns array of possible moves
	var moves = [];
	var testPos = new Coordinate(this.position.x, this.position.y);
	var yArray = [-2,-2,-1,-1,1,1,2,2]; //matching set of x,y offsets aligned with
	var xArray = [-1,1,-2,2,-2,2,-1,1]  //the corresponding moves for the king
	for (i = 0; i < yArray.length; i++) {
		resetPos(testPos, this);
		testPos.x += xArray[i];
		testPos.y += yArray[i];
		//for each position, add it if it is a valid space and is either empty or occupied by an enemy
		if (!outOfBounds(testPos) && 
			(
				board.positions[testPos.y][testPos.x] == null || 
				board.positions[testPos.y][testPos.x].player != this.player
			)
			) {
			moves.push(new Coordinate(testPos.x, testPos.y));
		}
	}
	return moves;
}

//PAWN
function Pawn(x, y, player) {
	ChessPiece.call(this, x, y, player);
}

Pawn.prototype = Object.create(ChessPiece.prototype);
Pawn.prototype.constructor = Pawn;

Pawn.prototype.possibleMoves = function() {
	//returns array of possible moves
	var moves = [];
	var testPos = new Coordinate(this.position.x, this.position.y);
	var direction;
	if (this.player == "BLACK") direction = 1;
	else direction = -1;
	
	//test space in front of pawn
	testPos.y = testPos.y + direction;
	if (!outOfBounds(testPos) && playerOf(testPos) == null) {
		moves.push(new Coordinate(testPos.x, testPos.y));
		//add second forward space if pawnn is in starting position
		if ((direction == 1 && this.position.y == 1) ||
			(direction == -1 && this.position.y == 6)
			) {
				testPos.y = testPos.y + direction;
				if (playerOf(testPos) == null && !outOfBounds(testPos)) {
					moves.push(new Coordinate(testPos.x, testPos.y));
		}
			}
		
	}	
	
	//test diagonals
	testPos.x = this.position.x;   //reset testPos
	testPos.y = this.position.y;
	testPos.y = testPos.y + direction;
	testPos.x--;
	if (!outOfBounds(testPos) && 
		playerOf(testPos) != null && 
		playerOf(testPos) != this.player) {
		
		moves.push(new Coordinate(testPos.x, testPos.y));
	}
	
	testPos.x = this.position.x;   //reset testPos
	testPos.y = this.position.y;	testPos.y = testPos.y + direction;	
	testPos.x++;
	if (!outOfBounds(testPos) && 
		playerOf(testPos) != null && 
		playerOf(testPos) != this.player) {
		
		moves.push(new Coordinate(testPos.x, testPos.y));
	}
	return moves;
}


//recurssive helper function for rooks, bishops and queens
//@param origin: the chess piece that called this function
//@param testPos: our test position
//@param direction: 1 or -1 (for up and down)
//@param plane: "x" or "y" (horizontal or vertical)
//				or "upDiagonal" or "downDiagonal" (diagonals)
//@param moves: array of coordinates we are adding possible moves into	
//This function moves recursively in one direction, adding all possible moves
function straights(origin, testPos, direction, plane, moves) {
	//stopping case: when the pos is out of bounds or has a piece in it that is not the original
	if  ( outOfBounds(testPos) || 
			( board.positions[testPos.y][testPos.x] != null && 
				( testPos.x != origin.position.x || testPos.y != origin.position.y )
			) 	
		)								{
		//add this pos if it is not out of bounds and has an enemy piece
		if (!outOfBounds(testPos) && board.positions[testPos.y][testPos.x].player != origin.player) {
			moves.push(new Coordinate(testPos.x, testPos.y));
		}
		return;
	}
	//increment pos
	if (plane == "x") { 
		testPos.x += direction;
	}
	else if (plane == "y") {
		testPos.y += direction;
	}
	else if (plane == "upDiagonal") {
		testPos.y -= 1;
		testPos.x += direction;
	}
	else if (plane == "downDiagonal") {
		testPos.y += 1;
		testPos.x -= direction;
	}
	//if the space is empty, add it to the list
	if (!outOfBounds(testPos) && board.positions[testPos.y][testPos.x] == null) {
		moves.push(new Coordinate(testPos.x, testPos.y));
	}
	straights(origin, testPos, direction, plane, moves);
}


//helper function 
//@param pos : the position we want to find out about;
//returns owner of the space in question as a string, 
//or null if the space is empty
function playerOf(pos) {
	var pieceAtPos = board.positions[pos.y][pos.x];
	if (pieceAtPos != null) {
		var player = pieceAtPos.player;
		return player;
	}
	else return null;
}

//helper function
//@param pos : the position we want to find out about;
//returns true if the given position is out of bounds, false otherwise;
function outOfBounds(pos) {
	if (pos.x < 0 || pos.x >= board.width) return true;
	if (pos.y < 0 || pos.y >= board.height) return true;
	return false;
}

//helper function
//resets the test position to the original piece's position
function resetPos(pos, origin) {
	pos.x = origin.position.x;
	pos.y = origin.position.y
}

//object that contains all the positions of all chess pieces
//@param positions: for my purposes, this will be the 8x8 array given in the JSON starting file

function Board(saveState) {
	this.width = 8;
	this.height = 8;
	this.turn = saveState.turn;
	this.check = saveState.check;
	this.checkmate = saveState.checkmate;
	this.positions = [];
	for (j = 0; j < this.height; j++) { //Sets each position to its appropriate chesspiece
		this.positions[j] = [];
		for (i = 0; i < this.width; i++) {
			switch(saveState.board[j][i]) {
				case 0 :
					this.positions[j][i] = null;
					break;
				case 1 :
					this.positions[j][i] = new King(i, j, "BLACK");
					this.blackKing = this.positions[j][i];
					break;
				case 2 :
					this.positions[j][i] = new Queen(i, j, "BLACK");
					break;
				case 3 :
					this.positions[j][i] = new Rook(i, j, "BLACK");
					break;
				case 4 :
					this.positions[j][i] = new Bishop(i, j, "BLACK");
					break;
				case 5 :
					this.positions[j][i] = new Knight(i, j, "BLACK");
					break;
				case 6 :
					this.positions[j][i] = new Pawn(i, j, "BLACK");
					break;
				case -1 :
					this.positions[j][i] = new King(i, j, "WHITE");
					this.whiteKing = this.positions[j][i];
					break;
				case -2 :
					this.positions[j][i] = new Queen(i, j, "WHITE");
					break;
				case -3 :
					this.positions[j][i] = new Rook(i, j, "WHITE");
					break;
				case -4 :
					this.positions[j][i] = new Bishop(i, j, "WHITE");
					break;
				case -5 :
					this.positions[j][i] = new Knight(i, j, "WHITE");
					break;
				case -6 :
					this.positions[j][i] = new Pawn(i, j, "WHITE");
					break;
				default :
					this.positions[j][i] = null;
			}
		}
	}
}

var initState = {
	"board" : [
		[3,5,4,2,1,4,5,3],
		[6,6,6,6,6,06,6,6],
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0],
		[-6,-6,-6,-6,-6,-6,-6,-6],
		[-3,-5,-4,-2,-1,-4,-5,-3],
	],
	"turn" : "WHITE",
	"check" : false,
	"checkmate" : false
}