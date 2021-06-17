
var game=new Board();
window.addEventListener("resize",function(){
    view.setWindowHeightWidth(window.innerHeight,window.innerWidth);
    view.createBoard();
});

var view=new HtmlGame();