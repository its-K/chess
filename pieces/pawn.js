
function Pawn(type,position){
    Piece.call(this,type);
    this.coinType="Pawn";
    this.position=position;
    this.isEnPassantAllowed=false;
}

Pawn.prototype.getPossibleMoves=function(){
    var xpos=this.position[0];
    var ypos=this.position[1];
    moves=[];
    if(this.isWhite()){
        this.checkDownToUpAndAdd(moves,xpos,ypos);
    }
    else this.checkUpToDownAndAdd(moves,xpos,ypos);
    this.checkEnPasant(moves,xpos,ypos);
    return moves;
}

Pawn.prototype.checkUpToDownAndAdd=function(moves,i,j){
    if(!((i+1)+","+j in game.matrix)){
        if(this.checkMoveValid(i+1,j)) moves.push([i+1,j]);
        if(i==1 && !((i+2)+","+j in game.matrix)){
            if(this.checkMoveValid(i+2,j)) moves.push([i+2,j]);
        }
    }

    if((i+1)+","+(j+1) in game.matrix && game.matrix[(i+1)+","+(j+1)].isWhite()!=game.matrix[i+","+j].isWhite()){
        if(this.checkMoveValid(i+1,j+1)) moves.push([i+1,j+1]);
    }
    if((i+1)+","+(j-1) in game.matrix && game.matrix[(i+1)+","+(j-1)].isWhite()!=game.matrix[i+","+j].isWhite()){
        if(this.checkMoveValid(i+1,j-1)) moves.push([i+1,j-1]);
    }
}

Pawn.prototype.checkDownToUpAndAdd=function(moves,i,j){
    if(!((i-1)+","+j in game.matrix)){
        if(this.checkMoveValid(i-1,j)) moves.push([i-1,j]);
        if(i==6 && !((i-2)+","+j in game.matrix)){
            if(this.checkMoveValid(i-2,j)) moves.push([i-2,j]);
        }
    }

    if((i-1)+","+(j+1) in game.matrix && game.matrix[(i-1)+","+(j+1)].isWhite()!=game.matrix[i+","+j].isWhite()){
        if(this.checkMoveValid(i-1,j+1)) moves.push([i-1,j+1]);
    }
    if((i-1)+","+(j-1) in game.matrix && game.matrix[(i-1)+","+(j-1)].isWhite()!=game.matrix[i+","+j].isWhite()){
        if(this.checkMoveValid(i-1,j-1)) moves.push([i-1,j-1]);
    }
}

Pawn.prototype.checkEnPasant=function(moves,i,j){
    //for white coin
    if(game.matrix[i+","+j].isWhite() && i==3){
        if(j-1>=0){
            if(i+","+(j-1) in game.matrix && game.matrix[i+","+(j-1)].coinType=="Pawn" && !((i-1)+","+(j-1) in game.matrix)){
                moves.push([i-1,j-1]);
                this.isEnPassantAllowed=true;
            }
            else this.isEnPassantAllowed=false;
        }
    }
    //for black coin
    if(!game.matrix[i+","+j].isWhite() && i==4){
        if(j+1<8){
            if(i+","+(j+1) in game.matrix && game.matrix[i+","+(j+1)].coinType=="Pawn" && !((i+1)+","+(j+1) in game.matrix)){
                moves.push([i+1,j+1]);
                this.isEnPassantAllowed=true;
            }
            else this.isEnPassantAllowed=false;
        }
    }

}

Pawn.prototype=Object.assign({},Piece.prototype,Pawn.prototype)
