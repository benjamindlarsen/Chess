currPos = new Coordinate(null, null);
var possibleMoves = [];
var currX;
var currY;
var clickedAtLeastOnce = false;
var width = 8;
var height = 8;

window.onload = function() {
	var welcomeEl = document.getElementById("welcome");
	welcomeEl.innerHTML = localStorage.cs2550timestamp;
	var clearEl = document.getElementById("clear");
	clearEl.onclick = function() {
		localStorage.clear();
	}
	initBoard();
	renderBoard();
	addClickHandlers();
	updatePlayerEl();
}

function renderBoard() {
	var gridDiv = document.getElementById("grid");
	gridDiv.innerHTML = gridHTML();
}

function gridHTML() {
	var html = "";
	html += "<table id=\"table\">\n"
	for (j = 0; j < height; j++) {
		html += "<tr id=\"row " + j + "\">\n";
		for (i = 0; i < width; i++) {
			var count = i;
			if (j%2 == 1) count ++;
			html += "<td id=\"" + i + "." + j + "\" class=\"";
			if (count%2 == 1) html += "light";
			else html += "dark";
			html += "\">";
			var currSpace = new Coordinate(i,j);
			var currPiece = chessPieceAt(currSpace);
			html += "<img src=\"";
			if (currPiece != null) {
				var owner = playerAt(currSpace);
				if (currPiece == "King" && owner == "WHITE") {
					html+= "Chess_Pieces/white_king.png";
				} 
				if (currPiece == "King" && owner == "BLACK") {
					html+= "Chess_Pieces/black_king.png";
				} 
				if (currPiece == "Queen" && owner == "WHITE") {
					html+= "Chess_Pieces/white_queen.png";
				} 
				if (currPiece == "Queen" && owner == "BLACK") {
					html+= "Chess_Pieces/black_queen.png";
				} 
				if (currPiece == "Rook" && owner == "WHITE") {
					html+= "Chess_Pieces/white_rook.png";
				} 
				if (currPiece == "Rook" && owner == "BLACK") {
					html+= "Chess_Pieces/black_rook.png";
				} 
				if (currPiece == "Knight" && owner == "WHITE") {
					html+= "Chess_Pieces/white_knight.png";
				} 
				if (currPiece == "Knight" && owner == "BLACK") {
					html+= "Chess_Pieces/black_knight.png";
				} 
				if (currPiece == "Bishop" && owner == "WHITE") {
					html+= "Chess_Pieces/white_bishop.png";
				} 
				if (currPiece == "Bishop" && owner == "BLACK") {
					html+= "Chess_Pieces/black_bishop.png";
				} 
				if (currPiece == "Pawn" && owner == "WHITE") {
					html+= "Chess_Pieces/white_pawn.png";
				} 
				if (currPiece == "Pawn" && owner == "BLACK") {
					html+= "Chess_Pieces/black_pawn.png";
				} 
				
			}
			else {html += "//:0"}
			html += "\"/>";
			html += "</td>\n";
		}
		html+= "</tr>\n";
	}
	html += "</table>"
	return html;
}

function addClickHandlers() {
	var cells = document.getElementsByTagName("td");
	for (i = 0; i < cells.length; i++) {
		cells[i].onclick = function() {
			var thisPos = new Coordinate(this.cellIndex, this.parentNode.rowIndex);
			if (isMove(this) && playerAt(currPos) == whosTurn()) {
				move(currPos, thisPos);
				erasePossHighlights();
				eraseCurrHighlight();
				possibleMoves = [];
				nextTurn();
				updatePlayerEl();
			}
			else if (isChessPiece(thisPos)) {
				highlightCurr(this);
				highlightPossibleMoves(this);
			}
		};
	}
}

function isMove(td) {
	for (i = 0; i < possibleMoves.length; i++) {
		var curr = possibleMoves[i];
		if (curr.x == td.cellIndex && curr.y == td.parentNode.rowIndex) return true;
	}
	return false;
}

function highlightCurr(td) {
	eraseCurrHighlight()
	currPos.x = td.cellIndex;
	currPos.y = td.parentNode.rowIndex;
	td.style.backgroundColor = "blue";
}

function eraseCurrHighlight() {
	if (clickedAtLeastOnce) {
		var revertCell = document.getElementById("table").rows[currPos.y].cells[currPos.x];
		revertCell.style.backgroundColor = "";
	}
	else {clickedAtLeastOnce = true;}
}



function highlightPossibleMoves(td) {
	erasePossHighlights();
	possibleMoves = getPossibleMoves(currPos);
	for (i = 0; i < possibleMoves.length; i++) {
		var posToHighlight = possibleMoves[i];
		var cellToHighlight = document.getElementById("table").rows[posToHighlight.y].cells[posToHighlight.x];
		if (playerAt(currPos) == whosTurn()) {
			cellToHighlight.style.backgroundColor = "green";
		}
		else {
			cellToHighlight.style.backgroundColor = "red";
		}
	}
}

function erasePossHighlights() {
	for (i = 0; i < possibleMoves.length; i++) {
		var posToErase = possibleMoves[i];
		if (!(posToErase.x == currPos.x && posToErase.y == currPos.y)) {
			var cellToErase = document.getElementById("table").rows[posToErase.y].cells[posToErase.x];
			cellToErase.style.backgroundColor = "";
		}
	}
}

function updatePlayerEl() {
	var playerBox = document.getElementById("turn");
	playerBox.innerHTML = whosTurn() + "'S MOVE";
	playerBox.style.backgroundColor = whosTurn().toLowerCase();
	if (whosTurn() == "BLACK") playerBox.style.color = "white";
	else playerBox.style.color = "black"
	
}