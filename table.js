const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
ctx.lineWidth = 1;
ctx.strokeStyle = "black";
const squareSize = 50;
const startPointX = 150;
const startPointY = 150;
var boardLenInSquares = 10;
const openImg = document.getElementById("nono_img");
const downArrow = document.getElementById("downArrow_img");
const coverImg = document.getElementById("cover");
const finish1Img = document.getElementById("finish_1");
const finish2Img = document.getElementById("finish_2");
const example = document.getElementById("nonogram_example");
const buttonImg = document.getElementById("button_example");
const blackRectImg = document.getElementById("rect_img");
const blackXImg = document.getElementById("x_img");
const greenRectImg = document.getElementById("green");
const pinkRectImg = document.getElementById("pink");
const purpleRectImg = document.getElementById("purple");
const pastelRectImg = document.getElementById("pastel");
const yellowRectImg = document.getElementById("yellow");
const blueRectImg = document.getElementById("blue");
const mixOfColorRectImg = document.getElementById("mix_of_color");
const greenXImg = document.getElementById("green_x");
const pinkXImg = document.getElementById("pink_x");
const purpleXImg = document.getElementById("purple_x");
const pastelXImg = document.getElementById("pastel_x");
const yellowXImg = document.getElementById("yellow_x");
const mixOfColorXImg = document.getElementById("mix_of_color_x");
const blueXImg = document.getElementById("blue_x");
var rectImg = document.getElementById("rect_img");
var xImg = document.getElementById("x_img");
const emptyImg = document.getElementById("empty_img");
const cleanButtonImg = document.getElementById("clean");
const finishButtonImg = document.getElementById("finish");
const chooseColorButtonImg = document.getElementById("choose_color");
const mapButtonImg = document.getElementById("map_button");
const title = document.getElementById("title_img");
var fillImg = rectImg; //the img that will replace the empty image of a square objefct when the player clicks on the square
var isFilled = true; //the bool value that will replace the square's bool value when the player clicks the square
var gameBoard = new Board();
var openingTime = true; //bool that states if the player is currantly viewing the opening page where he can begin the game
var levelTime  = false;
var finishLTime = false;
var instractionTime = false;
var inInstructionScreen1 = false; //bool that states if the player is currantly viewing the instructions page 1
var inInstructionScreen2 = false; //bool that states if the player is currantly viewing the instructions page 2
var gameMapTime = false;
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
    for (var i = startPointX; i < 10 * squareSize + 1 + startPointX; i = i + squareSize) {
        ctx.beginPath();
        ctx.moveTo(i, startPointY);
        ctx.lineTo(i, squareSize * 10 + startPointY);
        ctx.stroke();
    
    }
    for (var j = startPointY; j < squareSize * 10 + 1 + startPointY; j = j + squareSize) {
        ctx.beginPath();
        ctx.moveTo(startPointX, j);
        ctx.lineTo(squareSize * 10 + startPointX, j);
        ctx.stroke();
    }
   

}

//arrays of the levels of the game
var firstLevel = [
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

var secondLevel = [
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

var thirdLevel = [
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

var fourthLevel = [
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

var fifthLevel = [
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

var sixthLevel = [
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

var seventhLevel = [
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

var eighthLevel = [
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

var ninthLevel = [
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

var tenthLevel = [
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

var Levels = [firstLevel, secondLevel, thirdLevel, fourthLevel, fifthLevel, sixthLevel, seventhLevel, eighthLevel, ninthLevel, tenthLevel];
var counterLevel = 0;


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
                    ctx.fillText(numberx, startPointX - counterx*30, startPointY+30 + j*50);
                }
                if((i==0)&&(numberx>9))
                {
                    counterx++;
                    ctx.font = "30px Arial";
                    ctx.fillText(numberx, startPointX - counterx*30, startPointY+30 + j*50);
                }
            }
            else   
            {
                if((numberx!=0) && (numberx<10))
                {
                    counterx++;
                    ctx.font = "30px Arial";
                    ctx.fillText(numberx, startPointX - counterx*30, startPointY+30+ j*50);
                    numberx = 0;
                }
                //תנאי זה לא נחוץ במקרה שלנו באלס כיוון שאין מספר הגדול מ9 שלא נכנס באיף הראשון 
                // אך כדי לאפשר לעשות משחק עם לוח גדול יותר זה כן נחוץ פה
                if((numberx>9)&&(numberx!=0))
                {
                    counterx++;
                    ctx.font = "30px Arial";
                    ctx.fillText(numberx, startPointX - counterx*30-18, startPointY+30+ j*50);
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
                    ctx.fillText(numbery1, startPointX+35 + j*50,  startPointY -countery1*30+15 );
                }
                if((i==0)&&(numbery1>9))
                {
                    countery1++;
                    ctx.font = "30px Arial";
                    ctx.fillText(numbery1, startPointX+20 + j*50,  startPointY -countery1*30+15 );
                }
                
            }
            else
                {
                if((numbery1!=0)&&(numbery1<10))
                {
                    countery1++;
                    ctx.font = "30px Arial";
                    ctx.fillText(numbery1, startPointX+35 + j*50, startPointY -countery1*30 +15);
                    numbery1 = 0;
                }
                //תנאי זה לא נחוץ במקרה שלנו באלס כיוון שאין מספר הגדול מ9 שלא נכנס באיף הראשון 
                // אך כדי לאפשר לעשות משחק עם לוח גדול יותר זה כן נחוץ פה

                if((numbery1!=0)&&(numbery1>9)){
                    countery1++;
                    ctx.font = "30px Arial";
                    ctx.fillText(numbery1, startPointX+20+ j*50, startPointY -countery1*30+15);
                    numbery1 = 0;
                }

            }
        }
    }
}

//var board_for_open = [[new Square(335, 360, empty_img, false),new Square(400, 360, empty_img, false)],[new Square(335, 425, empty_img, false),new Square(400, 425, empty_img, false)]];
function openingPage(){
    openingTime = true;
    ctx.beginPath();
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
    ctx.drawImage(openImg, 100, 300 , 600, 25);
    ctx.drawImage(openImg, 100, 100 , 600, 25);
    ctx.drawImage(openImg, 100, 100, 25, 225);
    ctx.drawImage(openImg, 675, 100, 25, 225);
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
    gameBoard.cleanBoard();
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
        if(counterLevel != 9)
        {
            if(!ininstruct){
            counterLevel++;
            levelTime = false;
            finishLTime = true;
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
        ctx.fillText(counterLevel,200,270);
        ctx.textAlign = "center";
        ctx.lineWidth = 5;
        ctx.strokeRect(710,20,70,70); 
        ctx.strokeRect(200,540,400,150);
        ctx.font = "30px Arial";
        ctx.fillText("לחצו", 400, 590);
        ctx.fillText("לשלב הבא", 400, 660);
        ctx.fillText("מפה",745,65);
        ctx.drawImage(openImg, 100, 300 , 600, 25);
        ctx.drawImage(openImg, 100, 100 , 600, 25);
        ctx.drawImage(openImg, 100, 100, 25, 225);
        ctx.drawImage(openImg, 675, 100, 25, 225);
        for(i=0; i<10; i++){

            if(counterLevel > i)
            {
            ctx.fillRect(50 + i *70, 400, 50, 50);
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
            ctx.fillText(counterLevel,200,270);
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
    
                if(counterLevel > i)
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
            gameBoard.cleanBoard();
            instructionButton();
            chooseColor();
        }
        }
        else
        {
            levelTime=false;
            finishLTime = true;
            counterLevel++;
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
            ctx.fillText(counterLevel,200,270);
            ctx.textAlign = "center";
            ctx.lineWidth = 5;
            ctx.strokeRect(710,20,70,70); 
            // ctx.strokeRect(200,540,400,150);
            ctx.font = "40px Arial";
            // ctx.fillText("לחצו", 400, 590);
            //ctx.fillText("לשלב הבא", 400, 660);
            ctx.fillText("!!!!השלמתם את כל השלבים",400,500);
            celeb_img = document.getElementById("cele_img");
            ctx.drawImage(celeb_img, 300, 550 , 200, 200);
            ctx.font = "30px Arial";
            ctx.fillText("מפה",745,65);
            open_img = document.getElementById("nono_img");
            down_arrow = document.getElementById("downArrow_img");
            ctx.drawImage(open_img, 100, 300 , 600, 25);
            ctx.drawImage(open_img, 100, 100 , 600, 25);
            ctx.drawImage(open_img, 100, 100, 25, 225);
            ctx.drawImage(open_img, 675, 100, 25, 225);
            /*for(i=0; i<10; i++){
    
                if(counter_level > i)
                {
                ctx.fillRect(50 + i *70, 400, 50, 50);
                }
                else
                {
                ctx.strokeRect(50 + i*70, 400, 50, 50);
                }
            }
            */
           
        }

    
    
    }

    else
    {
        alert("זאת לא התשובה הנכונה, נסו שוב!");

    }
    
}
function mapButton()
{
    ctx.strokeStyle = "white";
    ctx.strokeRect = (770,30,70,70);
}


//writeSideNumbers(first_level);

//display of a x/rect button
function fillButton(isRectPressed){
    //is_rect_pressed is bool - true if the rectengel is pressed, false if the X pressed
    ctx.clearRect(145,695,130,130)
    ctx.beginPath();
    if(isRectPressed){
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(150, 700, 60, 60);
        ctx.lineWidth = 5;
        ctx.strokeRect(150, 700, squareSize+10, squareSize+10);
        ctx.lineWidth = 1;
        ctx.strokeRect(210, 700, squareSize+10, squareSize+10);
        
    }
    else{
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(210, 700,60, 60);
        ctx.lineWidth = 5;
        ctx.strokeRect(210, 700, squareSize+10, squareSize+10);
        ctx.lineWidth = 1;
        ctx.strokeRect(150, 700, squareSize+10, squareSize+10);
    }
    ctx.drawImage(rectImg, 155, 705, squareSize, squareSize);
    ctx.drawImage(xImg, 215, 705, squareSize, squareSize);
    ctx.stroke();
}

function cleanButten()
{
    // Displays the canvas delete button
    ctx.fillStyle = "black";
    ctx.fillRect(650, 20, 130, 70);
    ctx.lineWidth = 3;    
    ctx.strokeRect(650, 20, squareSize+80, squareSize+20);
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

//fillButton(true);
//cleanButten();
//finishButton();

function clickEvent(event) {
    //gets the coordenits of the mouse click and the canvas position on screen and detirmins x and y within canvas
    var rect = c.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    isClickRight = false;
    //in the event that the player clicked instructions from level screen, the instructions appear above that screen
    if(instractionsWhereFrom == 'l'){
        if(inInstructionScreen1){
            //close instructions when player presses on the X button
            if(x<730 && x>700 && y<100 && y>70){
                inInstructionScreen1 = false;
                levelTime = true;
                drawGameScreen();
                isClickRight = true;
            }
            //go to instractions screen 2 when player presses the arrow on the side of the screen
            if(x<70 && x>60 && y<420 && y>380){
                inInstructionScreen1 = false;
                drawGameScreen();
                instructionsScreen2();
                isClickRight = true;
            }
        }
        if(inInstructionScreen2){
            //close instructions when player presses on the X button
            if(x<730 && x>700 && y<100 && y>70){
                inInstructionScreen2 = false;
                levelTime = true;
                drawGameScreen();
                isClickRight = true;
            }
            //go back to instractions screen 1 when player presses the arrow on the side of the screen
            if(x<745 && x>735 && y<420 && y>380){
                inInstructionScreen2 = false;
                instructionsScreen1();
                isClickRight = true;
            }
        }
    }
    //in the event that the player clicked instructions from openning screen, the instructions appear above that screen
    if(instractionsWhereFrom == 'o'){
        if(inInstructionScreen1){
            //close instructions when player presses on the X button
            if(x<730 && x>700 && y<100 && y>70){
                inInstructionScreen1 = false;
                openingTime = true;
                openingPage();
                isClickRight = true;
            }
            //go to instractions screen 2 when player presses the arrow on the side of the screen
            if(x<70 && x>60 && y<420 && y>380){
                inInstructionScreen1 = false;
                openingPage();
                openingTime = false;
                instructionsScreen2();
                isClickRight = true;
            }
        }
        if(inInstructionScreen2){
            //close instructions when player presses on the X button
            if(x<730 && x>700 && y<100 && y>70){
                inInstructionScreen2 = false;
                openingTime = true;
                openingPage();
                isClickRight = true;
            }
            //go back to instractions screen 1 when player presses the arrow on the side of the screen
            if(x<745 && x>735 && y<420 && y>380){
                inInstructionScreen2 = false;
                openingPage()
                instructionsScreen1();
                isClickRight = true;
            }
        }
    }
    //in the event that the player clicked instructions from final screen, the instructions appear above that screen
    if(instractionsWhereFrom == 'f'){
        if(inInstructionScreen1){
            //close instructions when player presses on the X button
            if(x<730 && x>700 && y<100 && y>70){
                inInstructionScreen1 = false;
                finishLTime = true;
                FinishLevel(true, true);
                isClickRight = true;
            }
            //go to instractions screen 2 when player presses the arrow on the side of the screen
            if(x<70 && x>60 && y<420 && y>380){
                inInstructionScreen1 = false;
                FinishLevel(true, true);
                instructionsScreen2();
                isClickRight = true;
            }
        }
        if(inInstructionScreen2){
            //close instructions when player presses on the X button
            if(x<730 && x>700 && y<100 && y>70){
                inInstructionScreen2 = false;
                finishLTime = true;
                FinishLevel(true, true);
                isClickRight = true;
            }
            //go back to instractions screen 1 when player presses the arrow on the side of the screen
            if(x<745 && x>735 && y<420 && y>380){
                inInstructionScreen2 = false;
                FinishLevel(true, true);
                instructionsScreen1();
                isClickRight = true;
            }
        }
    }
    //actions that happen while in choose color screen
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
        //in case the player pressed confirm before pressing on a certain color, an alert will pop up
        if(x > 275 && x < 525 && y > 650 && y < 770 && !isChooseColor)
        {
            isClickRight = true;
            alert("לחצתם במסך בחירת צבעים על הכפתור אשר אך אף צבע לא נבחר, בחרו צבע אם אתם לא רוצים לשנות לחצו שחור ואז לחצו שוב על הכפתור אשר");
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
            ctx.clearRect(startPointX,startPointY, 500, 500);
            screenChooseColor();
            ctx.lineWidth = 5;
            ctx.strokeRect(125 , 300, squareSize + 50, squareSize + 50); 
            rectImg = blackRectImg ;
            xImg = blackXImg;
            isClickRight = true;
            isChooseColor = true;  
            title.src = "img/title_black.png"; 
        }
        if( x > 275 && x < 375 && y > 300 && y < 400)
        {   
            // If we press the green color button the square fill change will be green
            ctx.clearRect(startPointX,startPointY, 500, 500);
            screenChooseColor();
            ctx.lineWidth = 5;
            ctx.strokeRect(275 , 300, squareSize + 50, squareSize + 50); 
            fillImg = greenRectImg;
            rectImg = greenRectImg ;
            xImg = greenXImg;
            isClickRight = true;
            isChooseColor = true;
            title.src = "img/title_green.png"; 
        }
        if( x > 425 && x < 525 && y > 300 && y < 400)
        {   
            // If we press the pink color button the change in the square fill will be pink
            ctx.clearRect(startPointX,startPointY, 500, 500);
            screenChooseColor(); 
            ctx.lineWidth = 5;
            ctx.strokeRect(425 , 300, squareSize + 50, squareSize + 50); 
            fillImg = pinkRectImg;
            rectImg = pinkRectImg ;
            xImg = pinkXImg;
            isClickRight = true;
            isChooseColor = true;
            title.src = "img/title_pink.png";   
        }
        if( x > 575 && x < 675 && y > 300 && y < 400)
        {  
            // If you press the purple color button, the square fill will change to purple  
            ctx.clearRect(startPointX,startPointY, 500, 500);
            screenChooseColor();
            ctx.lineWidth = 5;
            ctx.strokeRect(575 , 300, squareSize + 50, squareSize + 50); 
            fillImg = purpleRectImg;
            rectImg = purpleRectImg ;
            xImg = purpleXImg;
            isClickRight = true;
            isChooseColor = true; 
            title.src = "img/title_purple.png";  
        }
        if( x > 125 && x < 225 && y > 500 && y < 600)
        {    
            // If you press the blue color button the change in the fill of the square will be blue
            ctx.clearRect(startPointX,startPointY, 500, 500);
            screenChooseColor();
            ctx.lineWidth = 5;
            ctx.strokeRect(125 , 500, squareSize + 50, squareSize + 50); 
            fillImg = blueRectImg;
            rectImg = blueRectImg ;
            xImg = blueXImg;
            isClickRight = true;
            isChooseColor = true; 
            title.src = "img/title_blue.png";
        }
        if( x > 275 && x < 375 && y > 500 && y < 600)
        { 
            // If we press the pastel color button changing the fill of the square will be pastel
            ctx.clearRect(startPointX,startPointY, 500, 500);
            screenChooseColor();
            ctx.lineWidth = 5;
            ctx.strokeRect(275 , 500, squareSize + 50, squareSize + 50);  
            fillImg = pastelRectImg;
            rectImg = pastelRectImg ;
            xImg = pastelXImg;
            isClickRight = true;
            isChooseColor = true;  
            title.src = "img/title_pastel.png";
        }
        if( x > 425 && x < 525 && y > 500 && y < 600)
        {    
            // If you press the yellow color button, the square fill will change to yellow
            ctx.clearRect(startPointX,startPointY, 500, 500);
            screenChooseColor(); 
            ctx.lineWidth = 5;
            ctx.strokeRect(425 , 500, squareSize + 50, squareSize + 50); 
            fillImg = yellowRectImg;
            rectImg = yellowRectImg ;
            xImg = yellowXImg;
            isClickRight = true;
            isChooseColor = true; 
            title.src = "img/title_yellow.png";
        }
        if( x > 575 && x < 675 && y > 500 && y < 600)
        {    
            // If you press the mix of color button, the square fill will change to mix of color
            ctx.clearRect(startPointX,startPointY, 500, 500);
            screenChooseColor();
            ctx.lineWidth = 5;
            ctx.strokeRect(575 , 500, squareSize + 50, squareSize + 50);
            fillImg = mixOfColorRectImg;
            rectImg = mixOfColorRectImg ;
            xImg = mixOfColorXImg;
            isClickRight = true;
            isChooseColor = true;  
            title.src = "img/title_mixOfColors.png";
        }
    }
    
    if(levelTime)
    {
        //instractions button
        if (x > 10 && x < 160 && y > 10 && y < 90){
            isClickRight = true;
            drawGameScreen();
            instructionsScreen1();
            levelTime = false;
            instractionsWhereFrom = 'l';
        }

        //x/fill button
        if (x >= 150 && x < 210 && y >= 700 && y < 760){
            //the player chose rect
            fillButton(true);
            fillImg = rectImg;
            isFilled = true;
            isClickRight = true;
        }
        if (x >= 210 && x < 270 && y >= 700 && y < 760){
            //the player chose X
            fillButton(false);
            fillImg = xImg;
            isFilled = false;
            isClickRight = true;
        }
        //clean board button
        if(x >= 650 && x < 780 && y >= 20 && y < 120 && !isClickRight)
        {
            gameBoard.cleanBoard();
            isClickRight = true;
        }
        
        //check if player clicked on a square, if so change its img and bool value acording to the button pressed in the fill/x option bottom of the screen
        var clickedOnTheBoard = x>startPointX && x<startPointX+boardLenInSquares*squareSize && y>startPointY && y<startPointY+boardLenInSquares*squareSize;
        
        //check if player clicked on a square, if so change its img and bool value acording to the button pressed in the fill/x option bottom of the screen

        if(clickedOnTheBoard)
        {
            
            //runs on the array and finds the square the player clicked on by comparing the coordonites with each square
            
            for(line = 0; line<gameBoard.arraySquares.length; line++){
                for(column = 0; column<gameBoard.arraySquares[0].length; column++){
                    if (x>gameBoard.arraySquares[line][column].x && x<gameBoard.arraySquares[line][column].x+squareSize && y>gameBoard.arraySquares[line][column].y && y<gameBoard.arraySquares[line][column].y+squareSize){
                        isClickRight = true;
                        //checks if the square has already been clicked on with the same img the player currently has, if so, it earases the square
                        if(gameBoard.arraySquares[line][column].img == fillImg){
                            gameBoard.arraySquares[line][column].img = emptyImg;
                            gameBoard.arraySquares[line][column].boolean = false;
                            column = gameBoard.arraySquares[0].length;
                            line = gameBoard.arraySquares.length;
                        }
                        //else, it paints the sqaure with the img
                        else{
                            gameBoard.arraySquares[line][column].img = fillImg;
                            gameBoard.arraySquares[line][column].boolean = isFilled;
                            column = gameBoard.arraySquares[0].length;
                            line = gameBoard.arraySquares.length;
                        }
                    }
                }
            }

        }
        //finish level button
        if(x > 600 && x < 750 && y > 670 && y < 770){
           
            FinishLevel(gameBoard.compareBool(Levels[counterLevel]), false);
            isClickRight =true;
        }
    }
    //the actions that happen while in openning screen
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
            drawGameScreen();
            isClickRight = true;


        }
        //map button
        if(x>710 && x<780 && y>20 && y<90 && !isClickRight)
        {
            isClickRight = true;
            gameMapTime = true;
            openingTime = false;
            ctx.clearRect(0,0,c.width,c.height);
            mapForGame();
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
    //the actions that happen while in finish level screen
    if(finishLTime)
    {
        //instractions button
        if ((x > 10 && x < 160 && y > 10 && y < 110) && (counterLevel != 10)){
            isClickRight = true;
            FinishLevel(true, true);
            finishLTime = false;
            inInstructionScreen1 = true;
            instructionsScreen1();
            instractionsWhereFrom = 'f';
            isClickright = true;
        }

        if((x > 200 && x < 600 && y > 540 && y < 690) && (counterLevel != 10) && (!isClickRight))
        // start level button
        {
            finishLTime = false;
            levelTime= true;
            drawGameScreen();
            isClickRight = true;


        }
        //map button
        if(x>710 && x<780 && y>20 && y<90 && !isClickRight)
        {
            isClickRight = true;
            gameMapTime = true;
            finishLTime = false;
            ctx.clearRect(0,0,c.width,c.height);
            mapForGame();
    
        }
        //choose color button
        if(x > 320 && x < 460  && y > 10 && y < 220 )
        {
            ctx.clearRect(0,0,c.width,c.height);
            screenChooseColor(); 
            openingTime = false;
            isClickRight = true;
            chooseComeFromOpen = false;
        }
        
        
    }
    //the actions that happen while in game map screen
    if(gameMapTime)
    {

        for(var i = 0; i<3; i++)
        {
            if(x>150 && x<250 && y>150 + 200*i  && y< 250 + 200*i )
            {
                if(counterLevel >= i)
                {
                    isClickRight = true;
                    counterLevel = i;
                    gameMapTime = false;
                    levelTime = true;
                    drawGameScreen();
                    gameBoard.cleanBoard();
                 
                }
                else
                {
                    isClickRight = true;
                    alert("עוד לא עברתם את השלבים הקודמים הנחוצים לשלב זה");
                }
            }
           
            if(x>550 && x<650 && y>150 + 200*i  && y< 250 + 200*i )
            {
                if(counterLevel >= i+7)
                {

                    isClickRight = true;
                    counterLevel = i+7;
                    gameMapTime = false;
                    levelTime = true;
                    drawGameScreen();
                    gameBoard.cleanBoard();       
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
                if(x>350 && x<450 && y>50 + 200*i  && y< 150 + 200*i )
                {
                    if(counterLevel >= i+3)
                    {
                        isClickRight = true;
                        counterLevel = i+3;
                        gameMapTime = false;
                        levelTime = true;
                        drawGameScreen();
                        gameBoard.cleanBoard();
    
                    }
                    else{
                        isClickRight = true;
                        alert("עוד לא עברתם את השלבים הקודמים הנחוצים לשלב זה");
                    }

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
        //if the player is in the level screen and clicks on something the borad will update
        if(levelTime){
            redrawBorad();
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

//draws only the board of the game
function redrawBorad(){
    ctx.clearRect(startPointX,startPointY, 500, 500);
    gameBoard.showBoard();
    ctx.linewitdh = 1;
    drawTable();
}

//draws graphics of the main game screen
function drawGameScreen(){
    ctx.linewitdh = 1;
    ctx.clearRect(0,0,c.width,c.height);
    redrawBorad();
    writeSideNumbers(Levels[counterLevel]);
    fillButton(isFilled);
    cleanButten();
    finishButton();
    instructionButton();
}
//draws graphic of insturctoins screen 1
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
    ctx.drawImage(xImg, 700, 70, 30, 30)
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
//draws graphic of insturctoins screen 2
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
    ctx.drawImage(xImg, 700, 70, 30, 30)
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
    ctx.drawImage(buttonImg, 100, 240, 140, 70);
    ctx.fillText('בכל שלב של המשחק תוכלו ללחוץ על כפתור',730,420);
    ctx.fillText('."נקה לוח" ולהתחיל מחדש',730,450);
    ctx.drawImage(cleanButtonImg, 100, 395, 130, 60);
    ctx.fillText('כשסיימתם למלא את כל המשבצות הנדרשות,',730,510);
    ctx.fillText('"לחצו על כפתור "סיים משחק',730,540);
    ctx.drawImage(finishButtonImg, 100, 490, 130, 60);
    ctx.fillText('במסך הפתיחה ובסיום כל שלב תוכלו לשנות את',730,600);
    ctx.fillText('"צבע סימון המשבצות בכפתור "בחר צבע',730,630);
    ctx.drawImage(chooseColorButtonImg, 100, 580, 130, 60);
    ctx.fillText('במסך הפתיחה ובסיום כל שלב תוכלו להסתכל על',730,690);
    ctx.fillText('"מפת שלבי המשחק בכפתור "מפה',730,720);
    ctx.drawImage(mapButtonImg, 100, 670, 100, 60);

}
//draws graphics of choose color screen
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
    ctx.drawImage(blackRectImg, 125, 300, 100, 100 );
    ctx.drawImage(greenRectImg, 275, 300, 100, 100 );
    ctx.drawImage(pinkRectImg, 425, 300, 100, 100 );
    ctx.drawImage(purpleRectImg, 575, 300, 100, 100 );
    ctx.drawImage(blueRectImg, 125, 500, 100, 100 );
    ctx.drawImage(pastelRectImg, 275, 500, 100, 100 );
    ctx.drawImage(yellowRectImg, 425, 500,100, 100 );
    ctx.drawImage(mixOfColorRectImg, 575, 500, 100, 100 );
    ctx.lineWidth = 1;   
    ctx.strokeRect(125 , 300, squareSize + 50, squareSize + 50); 
    ctx.strokeRect(275 , 300, squareSize + 50, squareSize + 50);   
    ctx.strokeRect(425 , 300, squareSize + 50, squareSize + 50); 
    ctx.strokeRect(575 , 300, squareSize + 50, squareSize + 50); 
    ctx.strokeRect(125 , 500, squareSize + 50, squareSize + 50); 
    ctx.strokeRect(275 , 500, squareSize + 50, squareSize + 50);   
    ctx.strokeRect(425 , 500, squareSize + 50, squareSize + 50); 
    ctx.strokeRect(575 , 500, squareSize + 50, squareSize + 50); 
    ctx.fillStyle = "black";
    ctx.fillRect(275, 650, 250, 120);
    ctx.fillStyle = "white";
    ctx.font = "45px Arial";
    ctx.fillText("אשר",400,720);
    chooseColorTime = true;

}
//draws graphics of map screen
function mapForGame()
{
    ctx.clearRect(0,0,c.width,c.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,c.width,c.height);
    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";

    ctx.drawImage(finish1Img, 150, 150, 100, 100);
    ctx.drawImage(finish2Img, 150, 350, 100, 100);   
    for(var i = 0; i<3; i++){
        ctx.strokeRect(150, 150 +200*i, 100,100);
        ctx.fillText(i+1,200,130 + 200*i);
     
       if(!(counterLevel>i))
       {
           ctx.drawImage(coverImg,150, 150 +200*i, 100,100);
       }
    }
    for(var i = 0; i<3; i++){
        ctx.strokeRect(550, 150 +200*i, 100,100);
        ctx.fillText(i+8,600,130 + 200*i);

        if(!(counterLevel>i+7))
        {
            ctx.drawImage(coverImg,550, 150 +200*i, 100,100);
        }
    }
    
    for(var i = 0; i<4; i++){
        ctx.strokeRect(350, 50 +200*i, 100,100);
        ctx.fillText(i+4,400,30 + 200*i);
        if(!(counterLevel>i+3))
        {
            ctx.drawImage(coverImg,350, 50 +200*i, 100,100);
        } 
    }
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
}

//draws graphics of instructions button
function instructionButton(){
    ctx.beginPath();
    ctx.fillStyle = "#FFFFFF";
    startPointX.lineWidth = 1;
    ctx.rect(10, 10, 150, 80);
    ctx.fill();
    ctx.textAlign = "center";
    ctx.fillStyle = "#000000";
    ctx.fillText("הוראות", 85, 40);
    ctx.fillText("המשחק", 85, 72);
}

//we activate the game by calling the function thet shows openning screen
openingPage();
