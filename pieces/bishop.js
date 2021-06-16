
function Bishop(type,position){
    Piece.call(this,type);
    this.coinType="Bishop";
    this.position=position;
}
Bishop.prototype.getPossibleMoves=function(){
    var xpos=this.position[0];
    var ypos=this.position[1];
    moves=[];
    this.checkRightDiagonalAndAdd(moves,xpos,ypos);
    this.checkLeftDiagonalAndAdd(moves,xpos,ypos);
    return moves;
}

Bishop.prototype.checkRightDiagonalAndAdd=function(moves,i,j){
    let a=i+1;
    let b=j+1;
    while(a<8 && b<8){
        if(!(a+","+b in game.matrix)){
            if(this.checkMoveValid(a,b)) moves.push([a,b]);
            a++;
            b++;
        }
        else if(game.matrix[a+","+b].isWhite()!=game.matrix[i+","+j].isWhite()){
            if(this.checkMoveValid(a,b)) moves.push([a,b]);
            break;
        }
        else break;
    }
    a=i-1;
    b=j-1;
    while(a>=0 && b>=0){
        if(!(a+","+b in game.matrix)){
            if(this.checkMoveValid(a,b)) moves.push([a,b]);
            a--;
            b--;
        }
        else if(game.matrix[a+","+b].isWhite()!=game.matrix[i+","+j].isWhite()){
            if(this.checkMoveValid(a,b)) moves.push([a,b]);
            break;
        }
        else break;
    }
    return moves;
}

Bishop.prototype.checkLeftDiagonalAndAdd=function(moves,i,j){
    a=i-1;
    b=j+1;
    while(a>=0 && b<8){
        if(!(a+","+b in game.matrix)){
            if(this.checkMoveValid(a,b)) moves.push([a,b]);
            a--;
            b++;
        }
        else if(game.matrix[a+","+b].isWhite()!=game.matrix[i+","+j].isWhite()){
            if(this.checkMoveValid(a,b)) moves.push([a,b]);
            break;
        }
        else break;
    }
    a=i+1;
    b=j-1;
    while(a<8 && b>=0){
        if(!(a+","+b in game.matrix)){
            if(this.checkMoveValid(a,b)) moves.push([a,b]);
            a++;
            b--;
        }
        else if(game.matrix[a+","+b].isWhite()!=game.matrix[i+","+j].isWhite()){
            if(this.checkMoveValid(a,b)) moves.push([a,b]);
            break;
        }
        else break;
    }
    return moves;
}

Bishop.prototype=Object.assign({},Piece.prototype,Bishop.prototype)
