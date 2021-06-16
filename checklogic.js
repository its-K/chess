
function isCheck(i,j){
    //for vertical moves
    for(let a=i-1;a>=0;a--){
        if(a+","+j in game.matrix){
            if(game.matrix[a+","+j].isWhite()!=game.matrix[i+","+j].isWhite()){
                if(game.matrix[a+","+j].coinType=="Rook" || game.matrix[a+","+j].coinType=="Queen" ){
                    return true;
                }
                break;
            }
            else if(game.matrix[a+","+j].isWhite()==game.matrix[i+","+j].isWhite()) break;
        }
    }
    for(let a=i+1;a<8;a++){
        if(a+","+j in game.matrix){
            if(game.matrix[a+","+j].isWhite()!=game.matrix[i+","+j].isWhite()){
                if(game.matrix[a+","+j].coinType=="Rook" || game.matrix[a+","+j].coinType=="Queen"){
                    return true;
                }
                break;
                }
            else if(game.matrix[a+","+j].isWhite()==game.matrix[i+","+j].isWhite()) break;
        }
    }
    //for horizontal moves
    for(let a=j-1;a>=0;a--){
        if(i+","+a in game.matrix){
            if(game.matrix[i+","+a].isWhite()!=game.matrix[i+","+j].isWhite()){
                if(game.matrix[i+","+a].coinType=="Rook" || game.matrix[i+","+a].coinType=="Queen"){
                    return true;
                }
                break;
            }
            else if(game.matrix[i+","+a].isWhite()==game.matrix[i+","+j].isWhite()) break;
        }
    }
    for(let a=j+1;a<8;a++){
        if(i+","+a in game.matrix){
            if(game.matrix[i+","+a].isWhite()!=game.matrix[i+","+j].isWhite()){
                if(game.matrix[i+","+a].coinType=="Rook" || game.matrix[i+","+a].coinType=="Queen"){
                    return true;
                }
                break;
            }
            else if(game.matrix[i+","+a].isWhite()==game.matrix[i+","+j].isWhite()) break;
        }
    }

    //for vertical diagonal
    let a=i+1;
    let b=j+1;
    while(a<8 && b<8){
        if(a+","+b in game.matrix){
            if(game.matrix[a+","+b].isWhite()!=game.matrix[i+","+j].isWhite()){
                if(game.matrix[a+","+b].coinType=="Bishop" || game.matrix[a+","+b].coinType=="Queen"){
                    return true;
                }
                break;
            }
            else if(game.matrix[a+","+b].isWhite()==game.matrix[i+","+j].isWhite()) break;
        }
        a++;
        b++;
    }

    a=i-1;
    b=j-1;
    while(a>=0 && b>=0){
        if(a+","+b in game.matrix){
            if(game.matrix[a+","+b].isWhite()!=game.matrix[i+","+j].isWhite()){
                if(game.matrix[a+","+b].coinType=="Bishop" || game.matrix[a+","+b].coinType=="Queen"){
                    return true;
                }
                break;
            }
            else if(game.matrix[a+","+b].isWhite()==game.matrix[i+","+j].isWhite()) break;
        }
        a--;
        b--;
    }
    //for horizontal diagonal
    a=i-1;
    b=j+1;
    while(a>=0 && b<8){
        if(a+","+b in game.matrix){
            if(game.matrix[a+","+b].isWhite()!=game.matrix[i+","+j].isWhite()){
                if(game.matrix[a+","+b].coinType=="Bishop" || game.matrix[a+","+b].coinType=="Queen"){
                    return true;
                }
                break;
            }
            else if(game.matrix[a+","+b].isWhite()==game.matrix[i+","+j].isWhite()) break;
        }
        a--;
        b++;
    }

    a=i+1;
    b=j-1;
    while(a<8 && b>=0){
        if(a+","+b in game.matrix){
            if(game.matrix[a+","+b].isWhite()!=game.matrix[i+","+j].isWhite()){
                if(game.matrix[a+","+b].coinType=="Bishop" || game.matrix[a+","+b].coinType=="Queen"){
                    return  true;
                }
                break;
            }
            else if(game.matrix[a+","+b].isWhite()==game.matrix[i+","+j].isWhite()) break;
        }
        a++;
        b--;
    }

    //for l movement
    if(i+2<8 && j+1<8){
        if(((i+2)+","+(j+1) in game.matrix) && game.matrix[(i+2)+","+(j+1)].isWhite()!=game.matrix[i+","+j].isWhite()) {
            if(game.matrix[(i+2)+","+(j+1)].coinType=="Knight") return true;
        }
    }
    if(i+2<8 && j-1>=0){
        if(((i+2)+","+(j-1) in game.matrix) && game.matrix[(i+2)+","+(j-1)].isWhite()!=game.matrix[i+","+j].isWhite()){
            if(game.matrix[(i+2)+","+(j-1)].coinType=="Knight") return true;
        }
    }
    if(i-2>=0 && j+1<8){
        if(((i-2)+","+(j+1) in game.matrix) && game.matrix[(i-2)+","+(j+1)].isWhite()!=game.matrix[i+","+j].isWhite()){
            if(game.matrix[(i-2)+","+(j+1)].coinType=="Knight") return true;
        }
    }
    if(i-2>=0 && j-1>=0){
        if(((i-2)+","+(j-1) in game.matrix) && game.matrix[(i-2)+","+(j-1)].isWhite()!=game.matrix[i+","+j].isWhite()){
            if(game.matrix[(i-2)+","+(j-1)].coinType=="Knight") return true;
        }
    }

    if(i+1<8 && j+2<8){
        if(((i+1)+","+(j+2) in game.matrix) && game.matrix[(i+1)+","+(j+2)].isWhite()!=game.matrix[i+","+j].isWhite()) {
            if(game.matrix[(i+1)+","+(j+2)].coinType=="Knight") return true;
        }
    }
    if(i-1>=0 && j+2<8){
        if(((i-1)+","+(j+2) in game.matrix) && game.matrix[(i-1)+","+(j+2)].isWhite()!=game.matrix[i+","+j].isWhite()){
            if(game.matrix[(i-1)+","+(j+2)].coinType=="Knight") return true;
        }
    }
    if(i+1<8 && j-2>=0){
        if(((i+1)+","+(j-2) in game.matrix) && game.matrix[(i+1)+","+(j-2)].isWhite()!=game.matrix[i+","+j].isWhite()){
            if(game.matrix[(i+1)+","+(j-2)].coinType=="Knight") return true;
        }
    }
    if(i-1>=0 && j-2>=0){
        if(((i-1)+","+(j-2) in game.matrix) && game.matrix[(i-1)+","+(j-2)].isWhite()!=game.matrix[i+","+j].isWhite()){
            if(game.matrix[(i-1)+","+(j-2)].coinType=="Knight") return true;
        }
    }
    //for pawn moves
    if(game.matrix[i+","+j].isWhite()){
        if(i+1<8 && j+1<8){
            if(game.matrix[(i+1)+","+(j+1)].isWhite()!=game.matrix[i+","+j].isWhite()){
                if(game.matrix[(i+1)+","+(j+1)]=="Pawn") return true;
            }
        }
        if(i+1<8 && j-1>=0){
            if(game.matrix[(i+1)+","+(j-1)].isWhite()!=game.matrix[i+","+j].isWhite()){
                if(game.matrix[(i+1)+","+(j-1)]=="Pawn") return true;
            }
        }
    }
    if(!game.matrix[i+","+j].isWhite()){
        if(i-1>=0 && j-1>=0){
            if(game.matrix[(i-1)+","+(j-1)].isWhite()!=game.matrix[i+","+j].isWhite()){
                if(game.matrix[(i-1)+","+(j-1)]=="Pawn") return true;
            }
        }
        if(i-1>=0 && j+1<8){
            if(game.matrix[(i-1)+","+(j+1)].isWhite()!=game.matrix[i+","+j].isWhite()){
                if(game.matrix[(i-1)+","+(j+1)]=="Pawn") return true;
            }
        }
    }
    return false;
}