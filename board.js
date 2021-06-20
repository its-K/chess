
function Board(){
    this.matrix={};
    this.selectedPiece;
    this.curPlayerIsWhite=true;
    this.savedMoves=[];
    this.noOfMovesDone=0;
}

Board.prototype.initializeGame=function(){
    //black coins
    this.matrix[0+","+0]=new Rook(false,[0,0]);
    this.matrix[0+","+1]=new Knight(false,[0,1]);
    this.matrix[0+","+2]=new Bishop(false,[0,2]);
    this.matrix[0+","+3]=new Queen(false,[0,3]);
    this.matrix[0+","+4]=new King(false,[0,4]);
    this.matrix[0+","+5]=new Bishop(false,[0,5]);
    this.matrix[0+","+6]=new Knight(false,[0,6]);
    this.matrix[0+","+7]=new Rook(false,[0,7]);
    for(var i=0;i<8;i++) this.matrix[1+","+i]=new Pawn(false,[1,i]);
    
    //white coins
    this.matrix[7+","+0]=new Rook(true,[7,0]);
    this.matrix[7+","+1]=new Knight(true,[7,1]);
    this.matrix[7+","+2]=new Bishop(true,[7,2]);
    this.matrix[7+","+3]=new Queen(true,[7,3]);
    this.matrix[7+","+4]=new King(true,[7,4]);
    this.matrix[7+","+5]=new Bishop(true,[7,5]);
    this.matrix[7+","+6]=new Knight(true,[7,6]);
    this.matrix[7+","+7]=new Rook(true,[7,7]);
    for(var i=0;i<8;i++) this.matrix[6+","+i]=new Pawn(true,[6,i]);
}

Board.prototype.selectPiece=function(i,j){
    if(this.matrix[i+","+j]!=undefined && this.matrix[i+","+j].isWhite()==this.curPlayerIsWhite){
        this.selectedPiece=this.matrix[i+","+j];
        console.log("Coin selected");
        return true;
    }
    return false;
}

Board.prototype.moveSelectedPiece=function(i,j){
    var possibleMoves=this.selectedPiece.getPossibleMoves();
    var curPos=this.selectedPiece.position;
    var isPieceMoved=false;
    possibleMoves.forEach(move => {
        if(move[0]==i && move[1]==j){
            this.storeMoves([i,j],this.selectedPiece);

            if(this.selectedPiece.coinType=="King") this.selectedPiece.isMoved=true;
            if(this.selectedPiece.coinType=="Pawn") this.selectedPiece.noOfMoves+=1;
            
            this.checkAndDoEnPassant(i,j);
            this.selectedPiece.position=[i,j];
            this.matrix[i+","+j]=this.selectedPiece;
            delete this.matrix[curPos[0]+","+curPos[1]];
            
            this.checkSpecialMoves(i,j);
            if(Piece.prototype.checkKingUnderCheck(!this.selectedPiece.isWhite())) alert("Check");
            this.clearSelectedPiece();
            isPieceMoved=true;
            console.log("Coin moved");
            this.curPlayerIsWhite=!this.curPlayerIsWhite;
        }
    });
    if(!isPieceMoved){
        alert("Move not possible");
        return false;
    }
    return isPieceMoved;
}

Board.prototype.clearSelectedPiece=function(){
    this.selectedPiece=undefined;
}

Board.prototype.checkAndDoPawnPromotion=function(i,j,coin){
    if(this.matrix[i+","+j].coinType=="Pawn"){
        if(i==0 || i==7){
            var isWhite=this.matrix[i+","+j].isWhite();
            if(coin=="Queen") this.matrix[i+","+j]=new Queen(isWhite,[i,j]);
            else if(coin=="Rook") this.matrix[i+","+j]=new Rook(isWhite,[i,j]);
            else if(coin=="Bishop") this.matrix[i+","+j]=new Bishop(isWhite,[i,j]);
        }
    }
}

Board.prototype.checkAndDoCastling=function(j){
    if(this.selectedPiece.coinType=="King" && this.selectedPiece.isCastingAllowed){
        var xpos=this.selectedPiece.position[0];
        var ypos=this.selectedPiece.position[1];
        if(j==2){
            this.matrix[xpos+","+(ypos+1)]=this.matrix[xpos+","+(ypos-2)];
            delete this.matrix[xpos+","+(ypos-2)];
            this.matrix[xpos+","+(ypos+1)].position=[xpos,ypos+1];
            doCastling(this.matrix[xpos+","+(ypos+1)],[xpos,ypos-2]);
        }
        else if(j==6){
            this.matrix[xpos+","+(ypos-1)]=this.matrix[xpos+","+(ypos+1)];
            delete this.matrix[xpos+","+(ypos+1)];
            this.matrix[xpos+","+(ypos-1)].position=[xpos,ypos-1];
            doCastling(this.matrix[xpos+","+(ypos-1)],[xpos,ypos+1])
        }
    }
}

Board.prototype.checkAndDoEnPassant=function(i,j){
    if(this.selectedPiece.coinType=="Pawn" && this.selectedPiece.isEnPassantAllowed){
        if(this.selectedPiece.isWhite()){
            if(this.selectedPiece.position[1]!=j && this.matrix[i+","+j]==undefined) {
                delete this.matrix[(i+1)+","+(j)];
                doEnpassant([i+1,j]);
            }
        }
        else{
            if(this.selectedPiece.position[1]!=j && this.matrix[i+","+j]==undefined) {
                delete this.matrix[(i-1)+","+(j)];
                doEnpassant([i-1,j]);
            }
        }
    }
}

Board.prototype.checkSpecialMoves=function(i,j){
    this.checkAndDoPawnPromotion(i,j,"Queen");
    this.checkAndDoCastling(j);
}

Board.prototype.storeMoves=function(targetPos,sourcePiece){
    targetPiece=this.matrix[targetPos[0]+","+targetPos[1]];
    if(targetPiece!=undefined){
        var move=new Move(targetPos,targetPiece.coinType,targetPiece.isWhite(),sourcePiece.position,sourcePiece.coinType,sourcePiece.isWhite());
    }
    else{
        var move=new Move(targetPos,undefined,undefined,sourcePiece.position,sourcePiece.coinType,sourcePiece.isWhite());
    }
    this.savedMoves.push(move);
    this.noOfMovesDone+=1;
}

Board.prototype.redoMove=function(){
    if(this.savedMoves[this.noOfMovesDone]!=undefined){
        var move=this.savedMoves[this.noOfMovesDone];
        var targetPiece=this.createPiece(move.sourceCoinType,move.isSourcePieceWhite,move.targetPosition);
        var tPos=move.targetPosition;
        var sPos=move.sourcePosition;
        this.matrix[tPos[0]+","+tPos[1]]=targetPiece;
        delete this.matrix[sPos[0]+","+sPos[1]];
        this.noOfMovesDone+=1;
        return true;
    }
    return false;
}

Board.prototype.undoMove=function(){
    if(this.noOfMovesDone>0){
        this.noOfMovesDone-=1;
        var move=this.savedMoves[this.noOfMovesDone];
        var targetPiece=this.createPiece(move.sourceCoinType,move.isSourcePieceWhite,move.sourcePosition);
        tPos=move.sourcePosition;
        sPos=move.targetPosition;
        this.matrix[tPos[0]+","+tPos[1]]=targetPiece;
        if(move.targetCoinType==undefined){
            delete this.matrix[sPos[0]+","+sPos[1]];
        }
        else{
            var sourcePiece=this.createPiece(move.targetCoinType,move.isTargetPieceWhite,move.targetPosition);
            this.matrix[sPos[0]+","+sPos[1]]=sourcePiece;
        }
        return true;
    }
    return false;
}

Board.prototype.createPiece=function(coinType,isWhite,position){
    if(coinType=="King"){
        return new King(isWhite,position);
    }
    else if(coinType=="Queen"){
        return new Queen(isWhite,position);
    }
    else if(coinType=="Bishop"){
        return new Bishop(isWhite,position);
    }
    else if(coinType=="Knight"){
        return new Knight(isWhite,position);
    }
    else if(coinType=="Rook"){
        return new Rook(isWhite,position);
    }
    else if(coinType=="Pawn"){
        return new Pawn(isWhite,position);
    }
}