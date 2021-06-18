
var game=new Board();
window.addEventListener("resize",function(){
    view.setWindowHeightWidth(window.innerHeight,window.innerWidth);
    view.createBoard();
});

var view=new HtmlGame();
view.createBoard();

//for adding click event
var Pieces=document.querySelectorAll(".piece");
for (var i = 0; i < Pieces.length; i++) {
    Pieces[i].addEventListener('click', function() {
        view.selectAndHighlightPiece(this);
    });
}
