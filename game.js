class Piece{
    #color;
    #type;
    #row;
    #col;

    /**
     * creates a piece object given the color, type and position
     * @param {*} color a string for the color of the piece
     * @param {*} type a string for the type of piece (normal, king, empty)
     * @param {*} row the row the piece is in
     * @param {*} col the column the piece is in
     */
    constructor(color, type, row, col) {
        this.#color = color;
        this.#type = type;
        this.#row = row;
        this.#col = col;
    }
    
    /**
     * gets the color of the piece
     */
    get color(){
        return this.#color;
    }
    /**
     * gets the color of the piece
     */
    get type(){
        return this.#type;
    }
    /**
     * gets the color of the piece
     */
    get rowIndex(){
        return this.#row;
    }
    /**
     * gets the color of the piece
     */
    get colIndex(){
        return this.#col;
    }

    /**
     * gets the color of the piece
     */
    setRowIndex(r){
        this.#row = r;
    }
    /**
     * gets the color of the piece
     */
    setColIndex(c){
        this.#col = c;
    }
}

const LETTERS = "ABCDEFGH"
class Board{
    #array
    /**
     * creates the board object
     * fills the 2d array with empty pieces
     * the colors will be in a checkerboard pattern
     */
    constructor(){
        this.#array = []
        for(let r=0; r<8; r++){

            let row = []
            for(let c=0; c<8; c++){
                let piece = new Piece("colorOne", "empty", r, c);
                if(r%2==0){
                    if(c%2==0)
                        piece = new Piece("colorOne", "empty", r, c)
                    else
                        piece = new Piece("colorTwo", "empty", r, c)
                }
                else{
                    if(c%2==0)
                        piece = new Piece("colorTwo", "empty", r, c)
                    else
                        piece = new Piece("colorOne", "empty", r, c)
                }
                row.push(piece)
            }
            this.#array.push(row);
        }
    }
    /**
     * gets the number of rows in the array
     */
    get numRows(){
        return this.#array.length;
    }

    /**
     * gets the number of columns in the array
     */
    get numCols(){
        return this.#array[0].length;
    }
    
    
    /**
     * gets the Piece element at [r][c]
     * @param {*} r the row index
     * @param {*} c the column index
     * @returns the Piece object at position [r][c]
     */
    getPiece(r, c){
        return this.#array[r][c];
    }

    getRow(letterCoordinate){
        return LETTERS.indexOf(letterCoordinate.charAt(0)+"")
    }
    getColumn(letterCoordinate){
        return parseInt(letterCoordinate.substring(1))-1
    }

    getLetterCoordinate(r, c){
        let letter = LETTERS.charAt(r)
        let number = c+1
        return letter+number;
    }

    setPiece(piece){
        this.#array[piece.rowIndex][piece.colIndex] = piece;
    }

}

let board = new Board();
createBoard()

function createBoard(){
    colorBoard()
    addCheckerPieces()
    for(let r=0;r<board.numRows; r++){
        for(let c=0; c<board.numCols; c++){
            let piece = board.getPiece(r,c);
            assignClasses(piece)
        }
    }
}

function colorBoard(){
    for(let r=0;r<board.numRows; r++){
        for(let c=0; c<board.numCols; c++){
            let piece = board.getPiece(r,c);
            let id = board.getLetterCoordinate(piece.rowIndex, piece.colIndex)
            if(piece.color=="colorOne")
                $("#"+id).addClass("empty-one");
            else
                $("#"+id).addClass("empty-two");
        }
    }
}

function assignClasses(piece){
    let id = board.getLetterCoordinate(piece.rowIndex, piece.colIndex)
    $("#button"+id).removeClass();
    if(piece.type=="empty"){
        if(piece.color=="colorOne"){
            $("#button"+id).addClass("empty-one");
            
            document.getElementById("button"+id).innerHTML = id;
        }
            
        else{
            $("#button"+id).addClass("empty-two");
            document.getElementById("button"+id).disabled = true;
        }
            
    }
    else if(piece.type=="normal"){
        if(piece.color=="colorOne"){
            $("#button"+id).addClass("piece-one");
            document.getElementById("button"+id).innerHTML = "/ᐠ. ̫ .ᐟ\\";
        }
        else{
            $("#button"+id).addClass("piece-two");
            document.getElementById("button"+id).innerHTML = "/ᐠ.ꞈ.ᐟ\\";
        }
    }
}

function addCheckerPieces(){
    let piece = null;
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 8; j++){
            if(board.getPiece(i, j).color == "colorOne"){
                piece = new Piece("colorOne", "normal", i, j);
                board.setPiece(piece)
            }
        }
    }
    for(let i = 5; i < 8; i++){
        for(let j = 0; j < 8; j++){
            if(board.getPiece(i, j).color == "colorOne"){
                piece = new Piece("colorTwo", "normal", i, j);
                board.setPiece(piece);
            }
        }
    }
}

function checkMovable(piece){
    let movable;
    if(piece.type=="empty"){
        return false;
    }
    if(piece.type=="king"){
        if(piece.colIndex == 0){
            //check if top color piece
            if(piece.color == "colorOne"){
                // check if board empty at location
                if(board.getPiece(piece.rowIndex++, piece.colIndex++).type == "empty"||
                board.getPiece(piece.rowIndex--, piece.colIndex++).type == "empty" ){
                    movable = true;
                    //piece.setRowIndex(piece.rowIndex += 1);
                    //piece.setColIndex(piece.colIndex += 1);
                } else if(board.getPiece(piece.rowIndex++, piece.colIndex++).color == "colorOne") {
                    movable = false;
                    //piece.setRowIndex(piece.rowIndex += 2);
                    //piece.setColIndex(piece.colIndex += 2);
                }
            } else {
                // check if board empty at location
                if(board.getPiece(piece.rowIndex--, piece.colIndex++).type == "empty"){
                    movable = true;
                    //piece.setRowIndex(piece.rowIndex -= 1);
                    //piece.setColIndex(piece.colIndex += 1);
                } else if(board.getPiece(piece.rowIndex--, piece.colIndex++).color == "colorTwo") {
                    movable = false;
                    //piece.setRowIndex(piece.rowIndex -= 2);
                    //piece.setColIndex(piece.colIndex += 2);
                }
            }
        }
    }
    //check if at left border
    if(piece.colIndex == 0){
        //check if top color piece
        if(piece.color == "colorOne"){
            // check if board empty at location
            if(board.getPiece(piece.rowIndex++, piece.colIndex++).type == "empty"){
                movable = true;
                //piece.setRowIndex(piece.rowIndex += 1);
                //piece.setColIndex(piece.colIndex += 1);
            } else if(board.getPiece(piece.rowIndex++, piece.colIndex++).color == "colorOne") {
                movable = false;
                //piece.setRowIndex(piece.rowIndex += 2);
                //piece.setColIndex(piece.colIndex += 2);
            }
        } else {
            // check if board empty at location
            if(board.getPiece(piece.rowIndex--, piece.colIndex++).type == "empty"){
                movable = true;
                //piece.setRowIndex(piece.rowIndex -= 1);
                //piece.setColIndex(piece.colIndex += 1);
            } else if(board.getPiece(piece.rowIndex--, piece.colIndex++).color == "colorTwo") {
                movable = false;
                //piece.setRowIndex(piece.rowIndex -= 2);
                //piece.setColIndex(piece.colIndex += 2);
            }
        }
    }
    // check if at right border
    if(piece.colIndex == 7){
        //check if top color piece
        if(piece.color == "colorOne"){
            // check if board empty at location
            if(board.getPiece(piece.rowIndex++, piece.colIndex--).type == "empty"){
                movable = true;
                //piece.setRowIndex(piece.rowIndex += 1);
                //piece.setColIndex(piece.colIndex -= 1);
            } else if(board.getPiece(piece.rowIndex++, piece.colIndex--).color == "colorOne") {
                movable = false;
                //piece.setRowIndex(piece.rowIndex += 2);
                //piece.setColIndex(piece.colIndex -= 2);
            }
        } else {
            // check if board empty at location
            if(board.getPiece(piece.rowIndex--, piece.colIndex--).type == "empty"){
                movable = true;
                //piece.setRowIndex(piece.rowIndex -= 1);
                //piece.setColIndex(piece.colIndex -= 1);
            } else if(board.getPiece(piece.rowIndex--, piece.colIndex--).color == "colorTwo") {
                movable = false;
                //piece.setRowIndex(piece.rowIndex -= 2);
                //piece.setColIndex(piece.colIndex -= 2);
            }
        }
    }
    return movable;
    //board.setPiece(piece)
}

function checkSpace(){
    let empty = false;
    if(board.getPiece(piece.rowIndex, piece.colIndex) == "empty"){
        empty = true;
    }
    return empty;
}

// check if king type to king
function checkPiece(){
    if(board.getPiece(piece.rowIndex, piece.colIndex).color == "colorOne"){
        if(piece.rowIndex == 7){
            piece.type = "king";
        }
    }
    if(board.getPiece(piece.rowIndex, piece.colIndex).color == "colorTwo"){
        if(piece.rowIndex == 0){
            piece.type = "king";
        }
    }
}

function disableInvalidPieces(){
    for(let i=0; i<board.numRows; i++){
        for(let j=0; j<board.numCols; j++){
            piece = board.getPiece(i, j)
            let id = board.getLetterCoordinate(piece.rowIndex, piece.colIndex)
            if(!checkMovable(piece))
                document.getElementById("button"+id).disabled = true;
        }
    }
}
//disableInvalidPieces()

function instructionsToggle(){
    if(document.getElementById("instructions-button").value=="OFF"){
        $("#instructions").css('visibility', 'visible')
        document.getElementById("instructions-button").value="ON"
    }
    else if(document.getElementById("instructions-button").value=="ON"){
        $("#instructions").css('visibility', 'hidden')
        document.getElementById("instructions-button").value="OFF"
    }

}

let pieces = []

function clicked(id){
    
    let letterCoordinate = id.substring(6)
    piece = board.getPiece(board.getRow(letterCoordinate), board.getColumn(letterCoordinate))
    if(pieces.length%2==1){
        let color = pieces[0].color;
        let type = pieces[0].type;
        let r = piece.rowIndex;
        let c = piece.colIndex;
        piece = new Piece(color, type, r, c)
        board.setPiece(piece)
        assignClasses(piece)
        piece = new Piece("colorOne", "empty", pieces[0].rowIndex, pieces[0].colIndex)
        board.setPiece(piece)
        assignClasses(piece)
        pieces = [];
    }
    else{
        pieces.push(piece);
    }
    toDoList()
}

function toDoList(){
    let one = ""
    let two = ""
    for(let r=0; r<board.numRows; r++){
        for(let c=0; c<board.numCols; c++){
            if(board.getPiece(r,c).color=='colorOne' && board.getPiece(r,c).type!='empty')
                one+=board.getLetterCoordinate(r,c)+"<br>"
            if(board.getPiece(r,c).color=='colorTwo' && board.getPiece(r,c).type!='empty')
                two+=board.getLetterCoordinate(r,c)+"<br>"

        }
    }
    document.getElementById("list1-content").innerHTML=one
    document.getElementById("list2-content").innerHTML=two
}
toDoList()

function meme(){
    
}
