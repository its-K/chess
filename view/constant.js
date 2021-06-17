var whiteKing="♔";
var blackKing="♚";
var whiteQueen="♕";
var blackQueen="♛";
var whiteBishop="♗";
var blackBishop="♝";
var whiteKnight="♘";
var blackKnight="♞";
var whiteRook="♖";
var blackRook="♜";
var whitePawn="♙";
var blackPawn="♟";

function getPieceUrl(type,isWhite){
    if(type=="Pawn"){
        return (isWhite)? whitePawn:blackPawn;
    }
    else if (type=="Rook"){
        return (isWhite)? whiteRook:blackRook;
    }
    else if (type=="Knight"){
        return (isWhite)? whiteKnight:blackKnight;
    }
    else if (type=="Bishop"){
        return (isWhite)? whiteBishop:blackBishop;
    }
    else if (type=="Queen"){
        return (isWhite)? whiteQueen:blackQueen;
    }
    else if (type=="King"){
        return (isWhite)? whiteKing:blackKing;
    }
}