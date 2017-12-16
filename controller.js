function isChessPiece(pos) {
	if (board.positions[pos.y][pos.x] == null) return false;
	else return true;
}

function getPossibleMoves(pos) {
	var posMoves = [];
	if (!isChessPiece(pos)) return posMoves;
	var posMoves = board.positions[pos.y][pos.x].possibleMoves();
	return posMoves;
}

function initBoard() {
	board = new Board(initState);
}

function move(pos1, pos2) {
	//update html table
	var pic1 = document.getElementById(pos1.x + "." + pos1.y).lastChild;
	var pic2 = document.getElementById(pos2.x + "." + pos2.y).lastChild;
	pic1.src = "";
	pic2.src = "Chess_Pieces/" + playerAt(pos1).toLowerCase();
	pic2.src += "_" + chessPieceAt(pos1).toLowerCase() + ".png";
	
	//update board object
	var movingPiece = board.positions[pos1.y][pos1.x];
	board.positions[pos1.y][pos1.x] = null;
	board.positions[pos2.y][pos2.x] = new movingPiece.constructor(pos2.x, pos2.y, movingPiece.player);
}

//returns the owner of the piece at the given positions
//or null if the position is empty
function playerAt(pos) {
	var piece;
	if (board.positions[pos.y][pos.x] == null) return null;
	return board.positions[pos.y][pos.x].player;
}

//returns the type of chess piece at the given position
//or null if it is empty
function chessPieceAt(pos) {
	if (board.positions[pos.y][pos.x] == null) return null;
	if (board.positions[pos.y][pos.x] instanceof King) { return "King"};
	if (board.positions[pos.y][pos.x] instanceof Queen) { return "Queen"};
	if (board.positions[pos.y][pos.x] instanceof Rook) { return "Rook"};
	if (board.positions[pos.y][pos.x] instanceof Knight) { return "Knight"};
	if (board.positions[pos.y][pos.x] instanceof Bishop) { return "Bishop"};
	if (board.positions[pos.y][pos.x] instanceof Pawn) { return "Pawn"};
}

//returns the current player
function whosTurn() {return board.turn;}


//switches turn
function nextTurn() {
	if (board.turn == "WHITE") board.turn = "BLACK";
	else board.turn = "WHITE";
}