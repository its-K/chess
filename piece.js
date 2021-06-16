function Piece(type){
    this.coinType;
    this.position;
    this.white=type;
}
Piece.prototype.isWhite=function(){
    return this.white;
}

Piece.prototype.getPossibleMoves=function(){};

Piece.prototype.checkMoveValid=function(i,j){
    var oppPiece=game.matrix[i+","+j];
    var selectedPiecePos=game.selectedPiece.position;
    game.selectedPiece.position=[i,j];
    game.matrix[i+","+j]=game.selectedPiece;
    delete game.matrix[selectedPiecePos[0]+","+selectedPiecePos[1]];
    var king;
    var canMove=true;
    for(key in game.matrix){
        ele=game.matrix[key];
        if(ele.coinType=="King" && ele.isWhite()==game.selectedPiece.isWhite()){
            king=ele;
        }
    }
    if(isCheck(king.position[0],king.position[1])) canMove=false;
    if(oppPiece!=undefined) game.matrix[i+","+j]=oppPiece;
    else delete game.matrix[i+","+j];
    game.selectedPiece.position=selectedPiecePos;
    game.matrix[selectedPiecePos[0]+","+selectedPiecePos[1]]=game.selectedPiece;
    return canMove;
}