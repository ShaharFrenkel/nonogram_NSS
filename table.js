const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
ctx.lineWidth = 1;
ctx.strokeStyle = "black";
const square_size = 50;
const start_point_x = 150;
const start_point_y = 150;
var board_len_in_squares = 10;
const example = document.getElementById("nonogram_example");
const button_img = document.getElementById("button_example");
const black_rect_img = document.getElementById("rect_img");
const black_x_img = document.getElementById("x_img");
const green_rect_img = document.getElementById("green");
const pink_rect_img = document.getElementById("pink");
const purple_rect_img = document.getElementById("purple");
const pastel_rect_img = document.getElementById("pastel");
const yellow_rect_img = document.getElementById("yellow");
const blue_rect_img = document.getElementById("blue");
const mix_of_color_rect_img = document.getElementById("mix_of_color");
const green_x_img = document.getElementById("green_x");
const pink_x_img = document.getElementById("pink_x");
const purple_x_img = document.getElementById("purple_x");
const pastel_x_img = document.getElementById("pastel_x");
const yellow_x_img = document.getElementById("yellow_x");
const mix_of_color_x_img = document.getElementById("mix_of_color_x");
const blue_x_img = document.getElementById("blue_x");
var rect_img = document.getElementById("rect_img");
var x_img = document.getElementById("x_img");
const empty_img = document.getElementById("empty_img");
const clean_button_img = document.getElementById("clean");
const finish_button_img = document.getElementById("finish");
const choose_color_button_img = document.getElementById("choose_color");
const map_button_img = document.getElementById("map_button");
const title = document.getElementById("title_img");
var fill_img = rect_img; //the img that will replace the empty image of a square objefct when the player clicks on the square
var is_filled = true; //the bool value that will replace the square's bool value when the player clicks the square
var first_board = new Board();
var openingTime = true; //bool that states if the player is currantly viewing the opening page where he can begin the game
var levelTime  = false;
var finishLTime = false;
var instractionTime = false;
var inInstructionScreen1 = false; //bool that states if the player is currantly viewing the instructions page 1
var inInstructionScreen2 = false; //bool that states if the player is currantly viewing the instructions page 2
var game_map_time = false;
var isClickRight = false; // Boolean variable At first it is assumed that if it is pressed on the screen it is incorrect and if it is a button or a square it is changed to correct, if it remains incorrect a message is sent to the player which buttons can be pressed
var chooseColorTime = false;//bool that states if the player is currantly viewing the choose color screen
var isChooseColor = false; // bool that check if the player choose the color
var chooseComeFromOpen = true; //bool that states if the choose color button was pressed from opening screen  
var instractionsWhereFrom = 'n';


//this.img = document.createElement("img"); 
//this.img.src = "img/title_black.png";
//var src = document.getElementById("blah");
//src.appendChild(img);
//blah.src = "img/X.png";
//title.src = "img/X.png";


function drawTable(){
    ctx.lineWidth = 1;
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
   

}

//מערך דו מימדי של המשחק
var first_level = [
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

var second_level = [
    [true, true, true, true, true, true, true, true, true, true],
    [true, false, false, false, false, false, false, false, false, true],
    [true, false, false, true, true, false, true, true, false, true],
    [true, false, false, false, true, false, true, false, false, true],
    [true, false, false, false, true, false, true, true, false, true],
    [true, false, true, false, true, false, false, true, false, true],
    [true, false, true, true, true, false, true, true, false, true],
    [true, true, false, false, false, false, false, false, true, true],
    [false, true, true, true, false, false, true, true, true, false],
    [false, false, false, true, true, true, true, false, false, false],
];

var third_level = [
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, true, true, false],
    [false, false, false, false, false, false, true, true, true, false],
    [false, true, false, false, false, true, true, true, true, false],
    [false, true, true, false, true, true, false, true, true, false],
    [false, true, false, true, true, false, false, true, true, false],
    [false, true, true, false, true, true, false, true, true, false],
    [false, true, false, false, false, true, true, true, true, false],
    [false, false, false, false, false, false, true, true, true, false],
    [false, false, false, false, false, false, false, true, true, false],
];

var fourth_level = [
    [false, false, false, true, false, false, false, true, false, false],
    [false, false, true, true, true, true, true, true, true, false],
    [false, false, true, true, false, false, false, true, true, false],
    [false, false, true, true, false, true, true, true, true, false],
    [false, false, true, true, false, true, false, true, true, false],
    [false, false, false, true, false, false, false, true, false, false],
    [true, false, false, false, true, true, true, false, false, false],
    [false, true, false, true, true, true, true, true, false, false],
    [false, false, true, true, true, true, true, true, false, false],
    [false, false, false, true, true, true, true, true, false, false],
];

var fifth_level = [
    [false, false, false, false, false, false, true, true, true, true],
    [false, false, false, false, false, false, true, false, false, true],
    [false, false, false, false, false, false, false, false, false, true],
    [true, false, false, false, false, false, true, false, false, true],
    [true, false, false, false, false, false, true, false, true, true],
    [true, true, false, true, false, true, true, false, true, true],
    [false, true, true, true, true, true, false, false, true, true],
    [false, false, false, false, false, false, false, false, false, true],
    [false, false, false, false, false, false, true, false, false, true],
    [false, false, false, false, false, false, true, true, true, true],
];

var sixth_level = [
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, true, true, true, true, true, true],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, true, true, true, true, true, true, false],
    [true, false, false, false, false, false, false, false, false, false],
    [true, false, true, true, true, true, true, true, false, true],
    [true, false, false, false, false, false, false, false, false, true],
    [true, false, true, true, true, true, true, true, false, true],
    [true, false, false, false, false, false, false, false, false, true],
    [true, true, true, true, true, true, true, true, true, true],
];

var seventh_level = [
    [true, true, true, true, false, false, false, false, false, false],
    [true, false, false, false, false, false, false, false, false, false],
    [true, false, false, false, false, false, false, false, false, false],
    [true, false, false, false, false, false, false, false, false, false],
    [true, false, false, false, false, false, true, false, true, false],
    [true, false, false, false, false, true, true, true, true, true],
    [true, true, true, true, false, false, true, false, true, false],
    [false, false, false, false, false, false, true, false, true, false],
    [false, false, false, false, false, true, true, true, true, true],
    [false, false, false, false, false, false, true, false, true, false],
];

var eighth_level = [
    [false, false, false, false, true, false, false, true, false, false],
    [false, false, false, true, false, false, true, false, false, false],
    [false, false, false, true, false, false, true, false, false, false],
    [false, true, false, false, true, false, false, true, false, false],
    [true, false, false, false, false, false, false, false, true, true],
    [true, true, true, true, true, true, true, true, true, true],
    [false, true, true, true, true, true, true, true, false, true],
    [false, false, true, true, true, true, true, true, true, true],
    [true, true, false, false, true, true, false, false, false, false],
    [true, true, true, true, true, true, true, true, true, true],
];

var ninth_level = [
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, true, true, true, true, false, false],
    [false, false, false, true, true, true, false, true, true, false],
    [false, false, true, true, true, true, true, true, false, false],
    [false, false, true, true, false, false, false, false, false, false],
    [false, false, true, true, false, false, false, false, false, false],
    [false, true, true, true, true, true, true, true, true, false],
    [false, true, true, true, true, true, true, true, true, false],
    [true, true, true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true, true, true],
];

var tenth_level = [
    [false, false, false, false, false, false, true, false, false, false],
    [false, false, false, false, false, true, false, false, false, false],
    [false, false, false, false, true, true, true, true, false, false],
    [false, false, false, true, true, true, true, true, true, false],
    [false, false, true, true, true, true, true, true, false, false],
    [false, true, true, true, true, true, true, false, false, false],
    [false, true, true, true, true, true, true, true, false, false],
    [false, false, true, true, true, true, true, true, true, false],
    [false, false, false, true, true, true, true, true, false, false],
    [false, false, false, false, true, true, true, false, false, false],
];

var Levels = [first_level, second_level, third_level, fourth_level, fifth_level, sixth_level, seventh_level, eighth_level, ninth_level, tenth_level];
counter_level = 0;


function writeSideNumbers(boolArray)
{
    //הוספת המספרים לטבלה לפי שלב כללי
    ctx.fillStyle = "black";
    var counterx = 0;
    var numberx = 0;
    var countery1 = 0;
    var numbery1 = 0;

    for( j=9; j>-1; j--)
    {   
        counterx = 0;
        numberx = 0;
        for( i=9; i>-1; i--)
        {       
            if(boolArray[j][i])
            {
                numberx++;
                if((i==0)&&(numberx<10))
                {
                    counterx++;
                    ctx.font = "30px Arial";
                    ctx.fillText(numberx, start_point_x - counterx*30, start_point_y+30 + j*50);
                }
                if((i==0)&&(numberx>9))
                {
                    counterx++;
                    ctx.font = "30px Arial";
                    ctx.fillText(numberx, start_point_x - counterx*30, start_point_y+30 + j*50);
                }
            }
            else   
            {
                if((numberx!=0) && (numberx<10))
                {
                    counterx++;
                    ctx.font = "30px Arial";
                    ctx.fillText(numberx, start_point_x - counterx*30, start_point_y+30+ j*50);
                    numberx = 0;
                }
                //תנאי זה לא נחוץ במקרה שלנו באלס כיוון שאין מספר הגדול מ9 שלא נכנס באיף הראשון 
                // אך כדי לאפשר לעשות משחק עם לוח גדול יותר זה כן נחוץ פה
                if((numberx>9)&&(numberx!=0))
                {
                    counterx++;
                    ctx.font = "30px Arial";
                    ctx.fillText(numberx, start_point_x - counterx*30-18, start_point_y+30+ j*50);
                    numberx = 0;
                }
            }
        }
    }

    for(j=9; j>-1; j--)
    {
        countery1 = 0;
        numbery1 = 0;
        for(i=9; i>-1; i--)
        {
            if(boolArray[i][j])
            {
                numbery1++;
                if((i==0)&&(numbery1<10))
                {
                    countery1++;
                    ctx.font = "30px Arial";
                    ctx.fillText(numbery1, start_point_x+35 + j*50,  start_point_y -countery1*30+15 );
                }
                if((i==0)&&(numbery1>9))
                {
                    countery1++;
                    ctx.font = "30px Arial";
                    ctx.fillText(numbery1, start_point_x+20 + j*50,  start_point_y -countery1*30+15 );
                }
                
            }
            else
                {
                if((numbery1!=0)&&(numbery1<10))
                {
                    countery1++;
                    ctx.font = "30px Arial";
                    ctx.fillText(numbery1, start_point_x+35 + j*50, start_point_y -countery1*30 +15);
                    numbery1 = 0;
                }
                //תנאי זה לא נחוץ במקרה שלנו באלס כיוון שאין מספר הגדול מ9 שלא נכנס באיף הראשון 
                // אך כדי לאפשר לעשות משחק עם לוח גדול יותר זה כן נחוץ פה

                if((numbery1!=0)&&(numbery1>9)){
                    countery1++;
                    ctx.font = "30px Arial";
                    ctx.fillText(numbery1, start_point_x+20+ j*50, start_point_y -countery1*30+15);
                    numbery1 = 0;
                }

            }
        }
    }
}

//var board_for_open = [[new Square(335, 360, empty_img, false),new Square(400, 360, empty_img, false)],[new Square(335, 425, empty_img, false),new Square(400, 425, empty_img, false)]];
function openingPage(){
    openingTime = true;
    ctx.clearRect(0,0,c.width,c.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, c.width ,c.height);
    ctx.textAlign = "center";
    ctx.font = "70px Arial";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";
    ctx.fillText("משחק שחור ופתור", 400, 200);
    ctx.font = "40px Arial";
    ctx.fillText("מבית שחר, שקד ונרי",400,270);
    ctx.lineWidth = 5;
    ctx.strokeRect(200,540,400,150);
    ctx.strokeRect(710,20,70,70);        
    ctx.font = "30px Arial";
    ctx.fillText("לחצו", 400, 590);
    ctx.fillText("להתחלת המשחק", 400, 660);
    ctx.fillText("מפה",745,65);
    open_img = document.getElementById("nono_img");
    down_arrow = document.getElementById("downArrow_img");
    ctx.drawImage(open_img, 100, 300 , 600, 25);
    ctx.drawImage(open_img, 100, 100 , 600, 25);
    ctx.drawImage(open_img, 100, 100, 25, 225);
    ctx.drawImage(open_img, 675, 100, 25, 225);
   // ctx.drawImage(down_arrow, 350, 360, 100, 150);
    ctx.lineWidth = 3;
    ctx.strokeRect(335,360,130,130);
    ctx.moveTo(335, 425);
    ctx.lineTo(465, 425);
    ctx.stroke();
    ctx.moveTo(400, 360);
    ctx.lineTo(400, 490);
    ctx.stroke();
    ctx.fillRect(335,360,65,65);
    ctx.fillRect(400,425,65,65);

    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    first_board.cleanBoard();
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    instructionButton();
    chooseColor();
}
//openingPage();

function FinishLevel(isok, ininstruct)
{
    ctx.fillStyle = "#000000";
    if(isok)
    {
        levelTime = false;
        finishLTime = true;
        if(!ininstruct){
            counter_level++;
        }
        
        ctx.clearRect(0,0,c.width,c.height);
        
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, c.width ,c.height);
        ctx.strokeStyle = "white";
       /* ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.strokeText("you completed the level", 400, 150);
        ctx.strokeText("good job", 400, 250);
        ctx.strokeRect(200,400,400,150);
        ctx.strokeText("click", 400, 450);
        ctx.fillText("for the next level", 400, 520);
        */
        ctx.textAlign = "center";
        ctx.font = "70px Arial";
        ctx.fillStyle = "white";
        ctx.strokeStyle = "white";
        ctx.fillText("!!!! כל הכבוד", 400, 200);
        ctx.font = "40px Arial";
        ctx.fillText("סיימת את שלב מספר",400,270);
        ctx.textAlign = "left";
        ctx.fillText(counter_level,200,270);
        ctx.textAlign = "center";
        ctx.lineWidth = 5;
        ctx.strokeRect(710,20,70,70); 
        ctx.strokeRect(200,540,400,150);
        ctx.font = "30px Arial";
        ctx.fillText("לחצו", 400, 590);
        ctx.fillText("לשלב הבא", 400, 660);
        ctx.fillText("מפה",745,65);
        open_img = document.getElementById("nono_img");
        down_arrow = document.getElementById("downArrow_img");
        ctx.drawImage(open_img, 100, 300 , 600, 25);
        ctx.drawImage(open_img, 100, 100 , 600, 25);
        ctx.drawImage(open_img, 100, 100, 25, 225);
        ctx.drawImage(open_img, 675, 100, 25, 225);
        for(i=0; i<10; i++){

            if(counter_level > i)
            {
            ctx.fillRect(50 + i *70, 400, 50, 50);
            }
            else
            {
            ctx.strokeRect(50 + i*70, 400, 50, 50);
            }
        }
       
       /* var rectX = 50;
        var rectY = 50;
        var rectWidth = 50;
        var rectHeight = 50;
        var cornerRadius = 20;

// Set faux rounded corners
        context.lineJoin = "round";
        context.lineWidth = cornerRadius;

// Change origin and dimensions to match true size (a stroke makes the shape a bit larger)
        context.strokeRect(rectX+(cornerRadius/2), rectY+(cornerRadius/2), rectWidth-cornerRadius, rectHeight-cornerRadius);
        context.fillRect(rectX+(cornerRadius/2), rectY+(cornerRadius/2), rectWidth-cornerRadius, rectHeight-cornerRadius);
        */
        ctx.strokeStyle = "black";
        ctx.fillStyle = "black";
        first_board.cleanBoard();
        instructionButton();
        chooseColor();
    
    }

    else
    {
        alert("זאת לא התשובה הנכונה, נסו שוב!");

    }
    
}
function map_button()
{
    ctx.strokeStyle = "white";
    ctx.strokeRect = (770,30,70,70);
}


//writeSideNumbers(first_level);

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
    // Displays the canvas delete button
    ctx.fillStyle = "black";
    ctx.fillRect(650, 20, 130, 70);
    ctx.lineWidth = 3;    
    ctx.strokeRect(650, 20, square_size+80, square_size+20);
    ctx.font = "25px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("נקה לוח",712,63);
} 
function chooseColor()
{
    // Displays the canvas choose color button
    ctx.fillStyle = "#ff0088";
    ctx.fillRect(320,10,140,80);
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.font = "25px Arial";
    ctx.fillText("בחירת צבע",390,58);
}
function finishButton()
{
    ctx.fillStyle = "black";
    ctx.strokeRect(600, 670, 150, 100);
    ctx.textAlign = "center";
    ctx.fillText("סיום השלב", 675, 730);

}

//fill_button(true);
//cleanButten();
//finishButton();

function clickEvent(event) {
    //gets the coordenits of the mouse click and the canvas position on screen and detirmins x and y within canvas
    var rect = c.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    isClickRight = false;
       if(instractionsWhereFrom == 'l'){
        if(inInstructionScreen1){
            if(x<730 && x>700 && y<100 && y>70){
                inInstructionScreen1 = false;
                levelTime = true;
                draw_game_screen();
                isClickRight = true;
            }
            if(x<70 && x>60 && y<420 && y>380){
                inInstructionScreen1 = false;
                draw_game_screen();
                instructionsScreen2();
                isClickRight = true;
            }
        }
        if(inInstructionScreen2){
            if(x<730 && x>700 && y<100 && y>70){
                inInstructionScreen2 = false;
                levelTime = true;
                draw_game_screen();
                isClickRight = true;
            }
            if(x<745 && x>735 && y<420 && y>380){
                inInstructionScreen2 = false;
                instructionsScreen1();
                isClickRight = true;
            }
        }
    }
    if(chooseColorTime)
    {
        if(x > 275 && x < 525 && y > 650 && y < 770 && isChooseColor && chooseComeFromOpen)
        {
            // If we click on the confirm("אשר") button which is a color selected and select a color and the selection comes from the opening screen then you will return to the opening screen when the color fill is changed
            openingPage();  
            openingTime = true;
            chooseColorTime = false;
            isClickRight = true;
        }
        if(x > 275 && x < 525 && y > 650 && y < 770 && isChooseColor && !chooseComeFromOpen)
        {
            // If we click on the confirm("אשר") button which is a color selected and the selection does not come from the opening screen (says the selection comes from a step-end screen) then you will return to the end-of-stage screen when the color fill is changed
            finishLTime = true;
            FinishLevel(true, true);
            chooseColorTime = false;
            isClickRight = true;
        }
        if( x > 125 && x < 225 && y > 300 && y < 400)
        {  
            // If you press the black color button the change to fill the square will be black
            ctx.clearRect(start_point_x,start_point_y, 500, 500);
            screenChooseColor();
            ctx.lineWidth = 5;
            ctx.strokeRect(125 , 300, square_size + 50, square_size + 50); 
            rect_img = black_rect_img ;
            x_img = black_x_img;
            isClickRight = true;
            isChooseColor = true;  
            title.src = "img/title_black.png"; 
        }
        if( x > 275 && x < 375 && y > 300 && y < 400)
        {   
            // If we press the green color button the square fill change will be green
            ctx.clearRect(start_point_x,start_point_y, 500, 500);
            screenChooseColor();
            ctx.lineWidth = 5;
            ctx.strokeRect(275 , 300, square_size + 50, square_size + 50); 
            fill_img = green_rect_img;
            rect_img = green_rect_img ;
            x_img = green_x_img;
            isClickRight = true;
            isChooseColor = true;
            title.src = "img/title_green.png"; 
        }
        if( x > 425 && x < 525 && y > 300 && y < 400)
        {   
            // If we press the pink color button the change in the square fill will be pink
            ctx.clearRect(start_point_x,start_point_y, 500, 500);
            screenChooseColor(); 
            ctx.lineWidth = 5;
            ctx.strokeRect(425 , 300, square_size + 50, square_size + 50); 
            fill_img = pink_rect_img;
            rect_img = pink_rect_img ;
            x_img = pink_x_img;
            isClickRight = true;
            isChooseColor = true;
            title.src = "img/title_pink.png";   
        }
        if( x > 575 && x < 675 && y > 300 && y < 400)
        {  
            // If you press the purple color button, the square fill will change to purple  
            ctx.clearRect(start_point_x,start_point_y, 500, 500);
            screenChooseColor();
            ctx.lineWidth = 5;
            ctx.strokeRect(575 , 300, square_size + 50, square_size + 50); 
            fill_img = purple_rect_img;
            rect_img = purple_rect_img ;
            x_img = purple_x_img;
            isClickRight = true;
            isChooseColor = true; 
            title.src = "img/title_purple.png";  
        }
        if( x > 125 && x < 225 && y > 500 && y < 600)
        {    
            // If you press the blue color button the change in the fill of the square will be blue
            ctx.clearRect(start_point_x,start_point_y, 500, 500);
            screenChooseColor();
            ctx.lineWidth = 5;
            ctx.strokeRect(125 , 500, square_size + 50, square_size + 50); 
            fill_img = blue_rect_img;
            rect_img = blue_rect_img ;
            x_img = blue_x_img;
            isClickRight = true;
            isChooseColor = true; 
            title.src = "img/title_blue.png";
        }
        if( x > 275 && x < 375 && y > 500 && y < 600)
        { 
            // If we press the pastel color button changing the fill of the square will be pastel
            ctx.clearRect(start_point_x,start_point_y, 500, 500);
            screenChooseColor();
            ctx.lineWidth = 5;
            ctx.strokeRect(275 , 500, square_size + 50, square_size + 50);  
            fill_img = pastel_rect_img;
            rect_img = pastel_rect_img ;
            x_img = pastel_x_img;
            isClickRight = true;
            isChooseColor = true;  
            title.src = "img/title_pastel.png";
        }
        if( x > 425 && x < 525 && y > 500 && y < 600)
        {    
            // If you press the yellow color button, the square fill will change to yellow
            ctx.clearRect(start_point_x,start_point_y, 500, 500);
            screenChooseColor(); 
            ctx.lineWidth = 5;
            ctx.strokeRect(425 , 500, square_size + 50, square_size + 50); 
            fill_img = yellow_rect_img;
            rect_img = yellow_rect_img ;
            x_img = yellow_x_img;
            isClickRight = true;
            isChooseColor = true; 
            title.src = "img/title_yellow.png";
        }
        if( x > 575 && x < 675 && y > 500 && y < 600)
        {    
            // If you press the mix of color button, the square fill will change to mix of color
            ctx.clearRect(start_point_x,start_point_y, 500, 500);
            screenChooseColor();
            ctx.lineWidth = 5;
            ctx.strokeRect(575 , 500, square_size + 50, square_size + 50);
            fill_img = mix_of_color_rect_img;
            rect_img = mix_of_color_rect_img ;
            x_img = mix_of_color_x_img;
            isClickRight = true;
            isChooseColor = true;  
            title.src = "img/title_mixOfColors.png";
        }
    }
    if(instractionsWhereFrom == 'o'){
        if(inInstructionScreen1){
            if(x<730 && x>700 && y<100 && y>70){
                inInstructionScreen1 = false;
                openingTime = true;
                openingPage();
                isClickRight = true;
            }
            if(x<70 && x>60 && y<420 && y>380){
                inInstructionScreen1 = false;
                openingPage();
                openingTime = false;
                instructionsScreen2();
                isClickRight = true;
            }
        }
        if(inInstructionScreen2){
            if(x<730 && x>700 && y<100 && y>70){
                inInstructionScreen2 = false;
                openingTime = true;
                openingPage();
                isClickRight = true;
            }
            if(x<745 && x>735 && y<420 && y>380){
                inInstructionScreen2 = false;
                openingPage()
                instructionsScreen1();
                isClickRight = true;
            }
        }
    }
    if(instractionsWhereFrom == 'f'){
        if(inInstructionScreen1){
            if(x<730 && x>700 && y<100 && y>70){
                inInstructionScreen1 = false;
                finishLTime = true;
                FinishLevel(true, true);
                isClickRight = true;
            }
            if(x<70 && x>60 && y<420 && y>380){
                inInstructionScreen1 = false;
                FinishLevel(true, true);
                instructionsScreen2();
                isClickRight = true;
            }
        }
        if(inInstructionScreen2){
            if(x<730 && x>700 && y<100 && y>70){
                inInstructionScreen2 = false;
                finishLTime = true;
                FinishLevel(true, true);
                isClickRight = true;
            }
            if(x<745 && x>735 && y<420 && y>380){
                inInstructionScreen2 = false;
                FinishLevel(true, true);
                instructionsScreen1();
                isClickRight = true;
            }
        }
    }
    if(levelTime)
    {
        //instractions button
        if (x > 10 && x < 160 && y > 10 && y < 90){
            isClickRight = true;
            draw_game_screen();
            instructionsScreen1();
            levelTime = false;
            instractionsWhereFrom = 'l';
        }

        //x/fill button
        if (x >= 150 && x < 210 && y >= 700 && y < 760){
            fill_button(true);
            fill_img = rect_img;
            is_filled = true;
            isClickRight = true;
        }
        if (x >= 210 && x < 270 && y >= 700 && y < 760){
            fill_button(false);
            fill_img = x_img;
            is_filled = false;
            isClickRight = true;
        }
        //clean board button
        if(x >= 650 && x < 780 && y >= 20 && y < 120 && !isClickRight)
        {
            first_board.cleanBoard();
            isClickRight = true;
        }
        
        //check if player clicked on a square, if so change its img and bool value acording to the button pressed in the fill/x option bottom of the screen
        var clicked_on_the_board = x>start_point_x && x<start_point_x+board_len_in_squares*square_size && y>start_point_y && y<start_point_y+board_len_in_squares*square_size;
        var found_clicked_square = false;
        var line = 0;
        var column = 0;
    
        //check if player clicked on a square, if so change its img and bool value acording to the button pressed in the fill/x option bottom of the screen

        if(clicked_on_the_board)
        {
            
            //runs on the array and finds the square the player clicked on by comparing the coordonites with each square
            
            for(line = 0; line<first_board.arraySquares.length; line++){
                for(column = 0; column<first_board.arraySquares[0].length; column++){
                    if (x>first_board.arraySquares[line][column].x && x<first_board.arraySquares[line][column].x+square_size && y>first_board.arraySquares[line][column].y && y<first_board.arraySquares[line][column].y+square_size){
                        isClickRight = true;
                        //checks if the square has already been clicked on with the same img the player currently has, if so, it earases the square
                        if(first_board.arraySquares[line][column].img == fill_img){
                            first_board.arraySquares[line][column].img = empty_img;
                            first_board.arraySquares[line][column].boolean = false;
                            column = first_board.arraySquares[0].length;
                            line = first_board.arraySquares.length;
                        }
                        //else, it paints the sqaure with the img
                        else{
                            first_board.arraySquares[line][column].img = fill_img;
                            first_board.arraySquares[line][column].boolean = is_filled;
                            column = first_board.arraySquares[0].length;
                            line = first_board.arraySquares.length;
                        }
                    }
                }
            }

        }
    
        if(x > 600 && x < 750 && y > 670 && y < 770){
           
            FinishLevel(first_board.compareBool(Levels[counter_level]), false);
            isClickRight =true;
        }
    }

    if(openingTime){
        
        //instractions button
        if (x > 10 && x < 160 && y > 10 && y < 110){
            isClickRight = true;
            openingPage();
            instructionsScreen1();
            openingTime = false;
            instractionsWhereFrom = 'o';
        }
        
        //start game button
        if(x > 200 && x < 600 && y > 540 && y < 690 &&!isClickRight)
        {
            openingTime = false;
            levelTime= true;
            draw_game_screen();
            isClickRight = true;


        }
        if(x>710 && x<780 && y>20 && y<90)
        {
            if(!isClickRight){
                isClickRight = true;
                game_map_time = true;
                openingTime = false;
                ctx.clearRect(0,0,c.width,c.height);
                map_for_game();
            }
            
            
        }
        //choose color button
        if(x > 320 && x < 460  && y > 10 && y < 220)
        {
            openingTime = false;
            isClickRight = true;
            screenChooseColor(); 
            chooseComeFromOpen = true;
        }
        
    }

    if(finishLTime)
    {
        //instractions button
        if (x > 10 && x < 160 && y > 10 && y < 110){
            isClickRight = true;
            FinishLevel(true, true);
            finishLTime = false;
            inInstructionScreen1 = true;
            instructionsScreen1();
            instractionsWhereFrom = 'f';
            isClick = true;
        }
        // start level button
        if(x > 200 && x < 600 && y > 540 && y < 690 && !isClickRight)
        {
            finishLTime = false;
            levelTime= true;
            draw_game_screen();
            isClickRight = true;


        }
        if(x>710 && x<780 && y>20 && y<90 && !isClickRight)
        {
            isClickRight = true;
            game_map_time = true;
            finishLTime = false;
            ctx.clearRect(0,0,c.width,c.height);
            map_for_game();
    
        }
        if(x > 320 && x < 460  && y > 10 && y < 220 )
        {
            ctx.clearRect(0,0,c.width,c.height);
            screenChooseColor(); 
            openingTime = false;
            isClickRight = true;
            chooseComeFromOpen = false;
        }
    }
    if(game_map_time)
    {
        for(var i = 0; i<3; i++)
        {
            if(x>150 && x<250 && y>150 + 200*i  && y< 250 + 200*i )
            {
                if(counter_level >= i)
                {
                    isClickRight = true;
                    counter_level = i;
                    game_map_time = false;
                    levelTime = true;
                    draw_game_screen();
                 
                }
                else
                {
                    isClickRight = true;
                    alert("עוד לא עברתם את השלבים הקודמים הנחוצים לשלב זה");
                }
            }
           
            if(x>550 && x<650 && y>150 + 200*i  && y< 250 + 200*i )
                {
                    if(counter_level >= i+7){

                        isClickRight = true;
                            counter_level = i+7;
                            game_map_time = false;
                            levelTime = true;
                            draw_game_screen();
                    }
                        else{
                            isClickRight = true;
                            alert("עוד לא עברתם את השלבים הקודמים הנחוצים לשלב זה");
                        }
                    
                
                }
           
           
            
               
                
            }
           
            
            
           
        

        for(var i = 0; i<4; i++)
        {
            if(x>350 && x<450 && y>50 + 200*i  && y< 150 + 200*i )
            {
                if(counter_level >= i+3){

                    isClickRight = true;
                        counter_level = i+3;
                        game_map_time = false;
                        levelTime = true;
                        draw_game_screen();
    
                }
                else{
                    isClickRight = true;
                    alert("עוד לא עברתם את השלבים הקודמים הנחוצים לשלב זה");
                }

            }
            
            
           
        }
        
        
        
    }
    
        
    if(!isClickRight)
    {
        // If the player clicks the mouse on a place that should not be clicked, writes a message informing him of what he needs to click on
        alert("לחצתם על מקום עם העכבר- לא קשור למשחק לחצתם על מקש מקלדת- לא קשור למשחק, השתמשו בכפתורי המשחק (לחץ על כפתור נקה לוח/ בחר מילוי משבצת ללוח/ לחץ על המשבצת הרצויה לצביעה בצבע או איקס/ לחץ על משבצת צבועה שהתחרטת ואת/ה רוצה שהמשבצת תיהיה לבנה/ סיום משחק");
    }
    else
    {
        if(finishLTime || inInstructionScreen1 || inInstructionScreen2 || game_map_time || openingTime || chooseColorTime){
            ctx.linewitdh = 1;
        }
        else{
            redraw_borad();
        }
    
    }
}

function keyDownHandler(event)
{
    alert(" לחצתם על מקש מקלדת- לא קשור למשחק לחצתם על מקש מקלדת- לא קשור למשחק, השתמשו בכפתורי המשחק (לחץ על כפתור נקה לוח/ בחר מילוי משבצת ללוח/ לחץ על המשבצת הרצויה לצביעה בצבע או איקס/ לחץ על משבצת צבועה שהתחרטת ואת/ה רוצה שהמשבצת תיהיה לבנה/ סיום משחק");
}
//the event listener activates the right functions according to the place on the canvas the user clicked and the boolain veriables which determine the cerrunt geaphics of the screen
c.addEventListener("click", clickEvent);

document.addEventListener("keydown", keyDownHandler, false);

function redraw_borad(){
    ctx.clearRect(start_point_x,start_point_y, 500, 500);
    first_board.showBoard();
    ctx.linewitdh = 1;
    drawTable();
}

function draw_game_screen(){
    ctx.clearRect(0,0,800,800);
    redraw_borad();
    writeSideNumbers(Levels[counter_level]);
    fill_button(is_filled);
    cleanButten();
    finishButton();
    instructionButton();
}

function instructionsScreen1(){
    inInstructionScreen1 = true;
    ctx.beginPath();
    ctx.globalAlpha = 0.95;
    ctx.fillStyle = "#BDCFDF";
    ctx.fillRect(50, 50, 700, 700);
    ctx.fill();
    ctx.fillStyle = "#000000";
    ctx.moveTo(70, 380);
    ctx.lineTo(70, 420);
    ctx.lineTo(60, 400);
    ctx.fill();
    ctx.drawImage(x_img, 700, 70, 30, 30)
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "70px Tahoma Bold";
    ctx.textAlign = "center";
    ctx.fillText('הוראות המשחק',400,150);
    ctx.fillStyle = "#000000";
    ctx.font = "30px Times New Roman";
    ctx.fillText('שחור ופתור הוא משחק חשיבה בו עליכם לצבוע משבצות',400,200);
    ctx.fillText('מסוימות על לוח המשחק, על פי החוקים, על מנת לקבל תמונה',400,230);
    ctx.font = "25px Times New Roman";
    ctx.textAlign = "right";
    ctx.fillText('.בתחילת המשחק מופיע מולכם לוח משחק ריק',730,270);
    ctx.fillText('בצדו השמאלי של הלוח ומעליו מופיעים מספרים המייצגים רצפים של משבצות',730,300);
    ctx.fillText('.שעליכם לצבוע על מנת להגיע לפתרון',730,330);
    ctx.fillText('.על המשבצות על הלוח להתאים לכל רצפי המספרים המופיעים מחוץ ללוח',730,360);
    ctx.fillText('כל רצף מספרים מופיע על פי הסדר שמצופה מכם לסמן על הלוח',730,390);
    ctx.fillText('(לדוגמה, בשורה הראשונה כתובים המספרים אחד ושלוש, ומסומנים בהתאם)',730,420);
    ctx.fillText('.בין כל רצף מספרים חייבת להיות לפחות משבצת אחת ריקה',730,450);
    ctx.drawImage(example, 100, 470);
}

function instructionsScreen2(){
    inInstructionScreen2 = true;
    ctx.beginPath();
    ctx.globalAlpha = 0.95;
    ctx.fillStyle = "#BDCFDF";
    ctx.fillRect(50, 50, 700, 700);
    ctx.fill();
    ctx.fillStyle = "#000000";
    ctx.moveTo(735, 380);
    ctx.lineTo(735, 420);
    ctx.lineTo(745, 400);
    ctx.fill();
    ctx.drawImage(x_img, 700, 70, 30, 30)
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "70px Tahoma Bold";
    ctx.textAlign = "center";
    ctx.fillText('הוראות המשחק',400,150);
    ctx.fillStyle = "#000000";
    ctx.font = "25px Times New Roman";
    ctx.textAlign = "right";
    ctx.fillText('במהלך המשחק תוכלו לסמן באיקס משבצות שאתם בטוחים שלא ימולאו בהמשך',730,200);
    ctx.fillText('(למשל משבצת אחת בסיום כל רצף)',730,230);
    ctx.fillText('תוכלו לבחור האם לסמן באיקס או בריבוע על ידי',730,270);
    ctx.fillText('לחיצה על הכפתור בתחתית',730,300);
    ctx.fillText(' אם תרצו למחוק משבצת מלאה, לחצו עליה כאשר הכפתור עומד על הציור',730,340);
    ctx.fillText('(שנמצא במשבצת זו (ריבוע או איקס',730,370);
    ctx.drawImage(button_img, 100, 240, 140, 70);
    ctx.fillText('בכל שלב של המשחק תוכלו ללחוץ על כפתור',730,420);
    ctx.fillText('."נקה לוח" ולהתחיל מחדש',730,450);
    ctx.drawImage(clean_button_img, 100, 395, 130, 60);
    ctx.fillText('כשסיימתם למלא את כל המשבצות הנדרשות,',730,510);
    ctx.fillText('"לחצו על כפתור "סיים משחק',730,540);
    ctx.drawImage(finish_button_img, 100, 490, 130, 60);
    ctx.fillText('במסך הפתיחה ובסיום כל שלב תוכלו לשנות את',730,600);
    ctx.fillText('"צבע סימון המשבצות בכפתור "בחר צבע',730,630);
    ctx.drawImage(choose_color_button_img, 100, 580, 130, 60);
    ctx.fillText('במסך הפתיחה ובסיום כל שלב תוכלו להסתכל על',730,690);
    ctx.fillText('"מפת שלבי המשחק בכפתור "מפה',730,720);
    ctx.drawImage(map_button_img, 100, 670, 100, 60);

}
function screenChooseColor()
{
    ctx.fillStyle = "#a6a6a6";
    ctx.fillRect(0, 0, 800, 800);
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.font = "65px Aharoni";
    ctx.fillText("בחירת צבע",390,100);
    ctx.font = "30px Arial";
    ctx.fillStyle = "#002b80";
    ctx.fillText(": לבחירת מילוי המשבצות לחץ על הצבע הרצוי ועל המשך",390,200);
    ctx.drawImage(black_rect_img, 125, 300, 100, 100 );
    ctx.drawImage(green_rect_img, 275, 300, 100, 100 );
    ctx.drawImage(pink_rect_img, 425, 300, 100, 100 );
    ctx.drawImage(purple_rect_img, 575, 300, 100, 100 );
    ctx.drawImage(blue_rect_img, 125, 500, 100, 100 );
    ctx.drawImage(pastel_rect_img, 275, 500, 100, 100 );
    ctx.drawImage(yellow_rect_img, 425, 500,100, 100 );
    ctx.drawImage(mix_of_color_rect_img, 575, 500, 100, 100 );
    ctx.lineWidth = 1;   
    ctx.strokeRect(125 , 300, square_size + 50, square_size + 50); 
    ctx.strokeRect(275 , 300, square_size + 50, square_size + 50);   
    ctx.strokeRect(425 , 300, square_size + 50, square_size + 50); 
    ctx.strokeRect(575 , 300, square_size + 50, square_size + 50); 
    ctx.strokeRect(125 , 500, square_size + 50, square_size + 50); 
    ctx.strokeRect(275 , 500, square_size + 50, square_size + 50);   
    ctx.strokeRect(425 , 500, square_size + 50, square_size + 50); 
    ctx.strokeRect(575 , 500, square_size + 50, square_size + 50); 
    ctx.fillStyle = "black";
    ctx.fillRect(275, 650, 250, 120);
    ctx.fillStyle = "white";
    ctx.font = "45px Arial";
    ctx.fillText("אשר",400,720);
    chooseColorTime = true;

}
 //instructionsScreen1();
//instructionsScreen2();

function map_for_game()
{
ctx.clearRect(0,0,c.width,c.height);
ctx.fillStyle = "black";
ctx.fillRect(0,0,c.width,c.height);
ctx.fillStyle = "white";
ctx.strokeStyle = "white";
cover_img = document.getElementById("cover");
finish1_img = document.getElementById("finish_1");
finish2_img = document.getElementById("finish_2");
ctx.drawImage(finish1_img, 150, 150, 100, 100);
ctx.drawImage(finish2_img, 150, 350, 100, 100);   
for(var i = 0; i<3; i++){
        ctx.strokeRect(150, 150 +200*i, 100,100);
        ctx.fillText(i+1,200,130 + 200*i);
     
       if(!(counter_level>i))
       {
           ctx.drawImage(cover_img,150, 150 +200*i, 100,100);
       }
    }
    for(var i = 0; i<3; i++){
        ctx.strokeRect(550, 150 +200*i, 100,100);
        ctx.fillText(i+8,600,130 + 200*i);

        if(!(counter_level>i+7))
        {
            ctx.drawImage(cover_img,550, 150 +200*i, 100,100);
        }
    }
    
    for(var i = 0; i<4; i++){
        ctx.strokeRect(350, 50 +200*i, 100,100);
        ctx.fillText(i+4,400,30 + 200*i);
        if(!(counter_level>i+3))
        {
            ctx.drawImage(cover_img,350, 50 +200*i, 100,100);
        } 
    }
ctx.fillStyle = "black";
ctx.strokeStyle = "black";
}
//map_for_game();
function instructionButton(){
    ctx.beginPath();
    ctx.fillStyle = "#FFFFFF";
    start_point_x.lineWidth = 1;
    ctx.rect(10, 10, 150, 80);
    ctx.fill();
    ctx.textAlign = "center";
    ctx.fillStyle = "#000000";
    ctx.fillText("הוראות", 85, 40);
    ctx.fillText("המשחק", 85, 72);
}


openingPage();
