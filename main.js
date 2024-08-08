let legalsquares = [];
let isWhiteTurn=true;
const boardSquares = document.getElementsByClassName("square");
const pieces=document.getElementsByClassName("piece");
const piecesImages=document.getElementsByTagName("img");

function setBoardSquares(){
    for(let i =0; i<boardSquares.length;i++){
        boardSquares[i].addEventListener("dragover",allowDrop);
        boardSquares[i].addEventListener("drop", drop);
        let row=8-Math.floor(i/8);
        let column=String.fromCharCode(97+(i%8));
        let square=boardSquares[i];
        square.id=column+row;

    }
}

function setupPieces(){
    for(let i=0; i<pieces.length; i++){
        pieces[i].addEventListener("dragstart", drag);
        pieces[i].setAttribute("draggable", true);
        pieces[i].id=pieces[i].className.split(" ")[1]+pieces[i].parentElement.id
    }
    for(let i=0; i<piecesImages.length; i++){
        pieces[i].setAttribute("draggable", false);
      
    }
}


function allowDrop(ev){
    ev.preventDefault();
}
function drag(ev){
    const piece=ev.target;
    const pieceColor=piece.getAttribute("color")
    if((isWhiteTurn && pieceColor=="white")||(!isWhiteTurn && pieceColor=="black"))
    ev.dataTransfer.setData("text",piece.id); 
const startingSquareId = piece.parendNode.id;
getPossibleMoves(startingSquareId,piece);
}
function drop(){
    ev.preventDefault();
    let data=ev.dataTransfer.getData("text");
    const piece=document.getElementById(data);
    const destinationSquare=ev.currentTarget;
    let destinationSquareId=destinationSquare.id;
    if((isSquareOccupided(destinationSquare)="blank")&&(legalsquares.includes
        (destinationSquareId)) ){
    destinationSquare.appendChild(piece);
    isWhiteTurn=!isWhiteTurn
    legalsquares.length=0;
    return;
    }
    if((isSquareOccupided(destinationSquare)!="blank")&&(legalsquares.includes
        (destinationSquareId))){
        while (destinationSquare.firstChild){
            destinationSquare.removeChild(destinationSquare.firstChild)
        }
        destinationSquare.appendChild(piece);
        isWhiteTurn=!isWhiteTurn;
        legalsquares.length=0;
        return;
    }
}


function isSquareOccupided(square){
    if(square.querySelector(".piece")) {
        const color = square.querySelector(".piece").getAttribute("color");
        return color;
    } else {
        return "blank";
    }
}