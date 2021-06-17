
function Board(){
    this.matrix={};
    this.selectedPiece;
    this.curPlayerIsWhite=true;
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
    }
}

Board.prototype.moveSelectedPiece=function(i,j){
    var possibleMoves=this.selectedPiece.getPossibleMoves();
    var curPos=this.selectedPiece.position;
    var isPieceMoved=false;
    possibleMoves.forEach(move => {
        if(move[0]==i && move[1]==j){
            if(this.selectedPiece.coinType=="King") this.selectedPiece.isMoved=true;
            if(this.selectedPiece.coinType=="Pawn") this.selectedPiece.noOfMoves+=1;
            
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
    if(!isPieceMoved) alert("Move not possible");
}

Board.prototype.clearSelectedPiece=function(){
    this.selectedPiece=undefined;
}

Board.prototype.checkAndDoPawnPromotion=function(i,j,coin){
    if(this.matrix[i+","+j].coinType=="Pawn"){
        if(i==0 || i==7){
            var isWhite=this.matrix[i+","+j].isWhite();
            this.matrix[i+","+j]=new coin(isWhite,[i,j]);
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
        }
    }
}

Board.prototype.checkAndDoEnPassant=function(i,j){
    if(this.selectedPiece.coinType=="Pawn" && this.selectedPiece.isEnPassantAllowed){
        if(this.selectedPiece.isWhite()){
            if(this.selectedPiece.position[1]!=j && this.matrix[i+","+j]==undefined) {
                delete this.matrix[(i+1)+","+(j)];
            }
        }
        else{
            if(this.selectedPiece.position[1]!=j && this.matrix[i+","+j]==undefined) {
                delete this.matrix[(i-1)+","+(j+1)];
            }
        }
    }
}

Board.prototype.checkSpecialMoves=function(i,j){
    this.checkAndDoPawnPromotion(i,j,"Queen");
    this.checkAndDoCastling(j);
    this.checkAndDoEnPassant(i,j);
}