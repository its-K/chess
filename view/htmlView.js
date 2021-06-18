
function HtmlGame(){
    this.windowWidth=window.innerWidth;
    this.windowHeight=window.innerHeight;
    this.perBoxHeightWidth=0;
    this.coinSize=0;
}

HtmlGame.prototype.createBoard=function(){
    this.calculateBoardSize();
    document.querySelector('body').innerHTML=`<div class="chessboard" style="height:${this.windowHeight}px;width:${this.windowWidth}px">`;
    var chessboard=document.querySelector('.chessboard');
    for(var i=0;i<8;i++){
        for(var j=0;j<8;j++){
            var color=((i+j)%2==0) ? "white":"black";
            chessboard.insertAdjacentHTML('beforeend',`<div id="${i},${j}" class="${color} piece" style="height:${this.perBoxHeightWidth}px;width:${this.perBoxHeightWidth}px;font-size:${this.coinSize}px;"></div>`)
        }
    }
    this.placePieces()
}

HtmlGame.prototype.calculateBoardSize=function(){
    if(this.windowHeight<=900 && this.windowWidth<=900){
        var minValue=(this.windowHeight>this.windowWidth) ? this.windowWidth:this.windowHeight;
        minValue-=80;
        var outerBox=Math.round(minValue/8)*8;
        this.windowHeight=outerBox;
        this.windowWidth=outerBox;
        this.perBoxHeightWidth=outerBox/8;
        this.coinSize=Math.round(this.perBoxHeightWidth/10)*8;
    }
    else{
        this.windowHeight=800;
        this.windowWidth=800;
        this.perBoxHeightWidth=100;
        this.coinSize=Math.round(this.perBoxHeightWidth/10)*8;
    }
}

HtmlGame.prototype.placePieces=function(){
    for(key in game.matrix){
        var element=game.matrix[key];
        var piece=getPieceUrl(element.coinType,element.isWhite());
        document.getElementById(key).textContent=piece;
    }
}

HtmlGame.prototype.setWindowHeightWidth=function(height,width){
    this.windowHeight=height;
    this.windowWidth=width;
}

HtmlGame.prototype.setPiece=function(element){
    var piece=getPieceUrl(element.coinType,element.isWhite());
    var pos=element.position;
    document.getElementById(`${pos[0]},${pos[1]}`).textContent=piece;
}

HtmlGame.prototype.removePiece=function(i,j){
    var piece=document.getElementById(`${i},${j}`)
    piece.classList.remove("highlight");
    piece.innerHTML="";
}

HtmlGame.prototype.selectAndHighlightPiece=function(piece){
    if(game.selectedPiece==undefined){
        var pos=piece.id.split(",");
        if(game.selectPiece(Number(pos[0]),Number(pos[1]))){
            piece.classList.add("highlight");
            this.highlightPossibleMoves(game.selectedPiece.getPossibleMoves())
        }
    }
    else if(game.selectedPiece==game.matrix[piece.id]){
        piece.classList.remove("highlight");
        this.removeHighlightedMoves(game.selectedPiece.getPossibleMoves())
        game.clearSelectedPiece();
    }
    else{
        var sourcepiece=Object.assign({},game.selectedPiece)
        var sourcePossibleMoves=game.selectedPiece.getPossibleMoves()
        this.movePiece(piece,sourcepiece,sourcePossibleMoves);
    }
}

HtmlGame.prototype.highlightPossibleMoves=function(possibleMoves){
    for (var i = 0; i < possibleMoves.length; i++) {
        var move=possibleMoves[i];
        var Pieces=document.getElementById(`${move[0]},${move[1]}`);
        Pieces.classList.add("highlight");
    }
}

HtmlGame.prototype.removeHighlightedMoves=function(possibleMoves){
    for (var i = 0; i < possibleMoves.length; i++) {
        var move=possibleMoves[i];
        var Pieces=document.getElementById(`${move[0]},${move[1]}`);
        Pieces.classList.remove("highlight");
    }
}

HtmlGame.prototype.movePiece=function(tagetpiece,sourcepiece,sourcePossibleMoves){
    var pos=tagetpiece.id.split(",");
    console.log(sourcepiece)
    if(game.moveSelectedPiece(Number(pos[0]),Number(pos[1]))){
        this.removeHighlightedMoves(sourcePossibleMoves)
        var element=game.matrix[tagetpiece.id]
        this.setPiece(element);
        this.removePiece(sourcepiece.position[0],sourcepiece.position[1]);
    }
}