const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
ctx.lineWidth = 2;
ctx.strokeStyle = "black";
const square_size = 50;
const start_point_x = 150;
const start_point_y = 150;
var board_len_in_squares = 10;
var rect_img = document.getElementById("rect_img");
var x_img = document.getElementById("x_img");
var empty_img = document.getElementById("empty_img");
var fill_img = rect_img; //the img that will replace the empty image of a square objefct when the player clicks on the square
var is_filled = true; //the bool value that will replace the square's bool value when the player clicks the square

//בניית הטבלה של המשחק
for (var i = start_point_x; i < 10 * square_size + 1 + start_point_x; i = i + square_size) {
    ctx.moveTo(i, start_point_y);
    ctx.lineTo(i, square_size * 10 + start_point_y);
    ctx.stroke();

}
for (var j = start_point_y; j < square_size * 10 + 1 + start_point_y; j = j + square_size) {
    ctx.moveTo(start_point_x, j);
    ctx.lineTo(square_size * 10 + start_point_x, j);
    ctx.stroke();
}

function createEmptyBoard()
{
    //יצירת מערך דו ממדי של אובייקט משבצת-הלוח
    var arrayOfSquares = new Array(10);
    for(var i = 0; i < 10; i++)
    {
        arrayOfSquares[i] = new Array(10);
        for(var j = 0; j < 10; j++ )
        {
            arrayOfSquares[i][j]= new Square( start_point_x + 50*i, start_point_y + 50*j, empty_img, false);
        } 
    }
    var boardGame;
    for(var i = 0; i < 10; i++)
    {
        for(var j = 0; j < 10; j++ )
        {   
            boardGame = new board(arrayOfSquares[i][j]);
        } 
    }
    return boardGame;
}
createEmptyBoard();

//מערך דו מימדי של המשחק
var array_name = [
    [false, false, false, false, true, true, false, false, false, false],
    [false, true, true, true, true, true, true, true, true, false],
    [false, true, false, false, false, false, false, false, true, false],
    [false, true, false, false, false, false, false, false, true, false],
    [false, true, false, false, false, false, false, false, true, false],
    [false, true, true, true, true, true, true, true, true, false],
    [false, false, true, false, false, false, false, true, false, false],
    [false, true, false, false, false, false, false, false, true, false],
    [true, true, true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true, true, true],
    
    
    
];
//הוספת המספרים לטבלה לפי שלב כללי
var counterx = 0;
var numberx = 0;
var countery1 = 0;
var numbery1 = 0;

for( j=9; j>-1; j--){
counterx = 0;
numberx = 0;
for( i=9; i>-1; i--){
if(array_name[j][i]){
if((i==0)&&(numberx<9)){
numberx++;
counterx++;
ctx.font = "30px Arial";
ctx.fillText(numberx, start_point_x - counterx*30, start_point_y+30 + j*50);
}

if((i==0)&&(numberx>8)){
numberx++;
counterx++;
ctx.font = "30px Arial";
ctx.fillText(numberx, start_point_x - counterx*30-18, start_point_y+30 + j*50);

}

numberx++;
}
else{
if((numberx!=0) && (numberx<10)){
counterx++;
ctx.font = "30px Arial";
ctx.fillText(numberx, start_point_x - counterx*30, start_point_y+30+ j*50);
numberx = 0;

}
//תנאי זה לא נחוץ במקרה שלנו באלס כיוון שאין מספר הגדול מ9 שלא נכנס באיף הראשון 
// אך כדי לאפשר לעשות משחק עם לוח גדול יותר זה כן נחוץ פה
if((numberx>9)&&(numberx!=0)){
counterx++;
ctx.font = "30px Arial";
ctx.fillText(numberx, start_point_x - counterx*30-30, start_point_y+30+ j*50);
numberx = 0;

}

}
}
}

for(j=9; j>-1; j--){
countery1 = 0;
numbery1 = 0;
for(i=9; i>-1; i--){
if(array_name[i][j]){
if((i==0)&&(numbery1<9)){
numbery1++;
countery1++;
ctx.font = "30px Arial";
ctx.fillText(numbery1, start_point_x+15 + j*50,  start_point_y -countery1*30+15 );
}
if((i==0)&&(numbery1>8)){
numbery1++;
countery1++;
ctx.font = "30px Arial";
ctx.fillText(numbery1, start_point_x+7 + j*50,  start_point_y -countery1*30+15 );
}


numbery1++;
}
else{
if((numbery1!=0)&&(numbery1<10)){
countery1++;
ctx.font = "30px Arial";
ctx.fillText(numbery1, start_point_x+15 + j*50, start_point_y -countery1*30 +15);
numbery1 = 0;
}
//תנאי זה לא נחוץ במקרה שלנו באלס כיוון שאין מספר הגדול מ9 שלא נכנס באיף הראשון 
// אך כדי לאפשר לעשות משחק עם לוח גדול יותר זה כן נחוץ פה

if((numbery1!=0)&&(numbery1>9)){
countery1++;
ctx.font = "30px Arial";
ctx.fillText(numbery1, start_point_x+7 + j*50, start_point_y -countery1*30+15);
numbery1 = 0;
}

}
}
}

//display of a x/rect button
function fill_button(is_rect_pressed){
    //is_rect_pressed is bool - true if the rectengel is pressed, false if the X pressed
    ctx.clearRect(145,695,130,130)
    ctx.beginPath();
    if(is_rect_pressed){
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(150, 700, 60, 60);
        ctx.lineWidth = 5;
        ctx.strokeRect(150, 700, square_size+10, square_size+10);
        ctx.lineWidth = 1;
        ctx.strokeRect(210, 700, square_size+10, square_size+10);
        
    }
    else{
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(210, 700,60, 60);
        ctx.lineWidth = 5;
        ctx.strokeRect(210, 700, square_size+10, square_size+10);
        ctx.lineWidth = 1;
        ctx.strokeRect(150, 700, square_size+10, square_size+10);
    }
    ctx.drawImage(rect_img, 155, 705, square_size, square_size);
    ctx.drawImage(x_img, 215, 705, square_size, square_size);
    ctx.stroke();
}

function cleanButten()
{
    //מציג את כפתור מחיקת קנבס
    ctx.fillStyle = "black";
    ctx.fillRect(650, 20, 130, 100);
    ctx.lineWidth = 3;    
    ctx.strokeRect(650, 20, square_size+80, square_size+50);
    ctx.font = "25px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("נקה לוח",772,80);
} 

fill_button(true);
cleanButten();

function clickEvent(event) {
    //gets the coordenits of the mouse click and the canvas position on screen and detirmins x and y within canvas
    var rect = c.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    if (x >= 150 && x <= 210 && y >= 700 && y < 760){
        fill_button(true);
        fill_img = rect_img;
        is_filled = true;
    }
    if (x >= 210 && x <= 270 && y >= 700 && y < 760){
        fill_button(false);
        fill_img = x_img;
        is_filled = false;
    }
    if(x >= 650 && x <= 780 && y >= 20 && y <= 120 )
    {
        boardGame.cleanBoard();
    }
    
    //check if player clicked on a square, if so change its img and bool value acording to the button pressed in the fill/x option bottom of the screen
    var found_clicked_square = false;
    var clicked_on_the_board = x>start_point_x && x<start_point_x+board_len_in_squares*square_size && y>start_point_y && y<start_point_y+board_len_in_squares*square_size;
    var line = 0;
    var coulmn = 0;
    //an array for example to check my code, will later on be replaced by the array of the board
    const temp_array = [
        [new Square(start_point_x, start_point_y, empty_img, false),new Square(start_point_x+square_size,start_point_y, empty_img, false)],
        [new Square(start_point_x, start_point_y+square_size, empty_img, false),new Square(start_point_x+square_size,start_point_y+square_size, empty_img, false)]
    ];
    //alert("x="+x+" y="+y+" "+ temp_array[line][coulmn]);

    if(clicked_on_the_board){
        while(!found_clicked_square){
            //in this ine the console shows an error but the action
            if(x>temp_array[line][coulmn].x && x<temp_array[line][coulmn].x+square_size && y>temp_array[line][coulmn].y && y<temp_array[line][coulmn].y+square_size){
                temp_array[line][coulmn].img = fill_img;
                temp_array[line][coulmn].boolean = is_filled;
                temp_array[line][coulmn].show();
                found_clicked_squre = true;
            }
            if(coulmn<temp_array[0].length-1){
                coulmn++;
            }
            else{
                coulmn = 0;
                line++;
            }
        }
    }
}

//the event listener activates the right functions according to the place on the canvas the user clicked and the boolain veriables which determine the cerrunt geaphics of the screen
c.addEventListener("click", clickEvent)
