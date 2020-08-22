const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
ctx.lineWidth = 1;
ctx.strokeStyle = "black";
const square_size = 50;
const start_point_x = 150;
const start_point_y = 150;
var board_len_in_squares = 10;
const example = document.getElementById("nonogram_example");
const button_img = document.getElementById("button_example")
const rect_img = document.getElementById("rect_img");
const x_img = document.getElementById("x_img");
const empty_img = document.getElementById("empty_img");
var fill_img = rect_img; //the img that will replace the empty image of a square objefct when the player clicks on the square
var is_filled = true; //the bool value that will replace the square's bool value when the player clicks the square
var first_board = new Board();
var openingTime = true; //bool that states if the player is currantly viewing the opening page where he can begin the game
var levelTime  = false;
var finishLTime = false;
var instractionTime = false;
var inInstructionScreen1 = false; ////bool that states if the player is currantly viewing the instructions page 1
var inInstructionScreen2 = false; ////bool that states if the player is currantly viewing the instructions page 2
var game_map_time = false;

var instractionsWhereFrom = 'n';

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
    [true, false, false, false, false, false, false, false, false, true],
    [true, false, false, false, false, false, false, false, false, true],
    [true, false, false, false, false, false, false, false, false, true],
    [true, false, false, false, false, false, false, false, false, true],
    [true, false, false, false, false, false, false, false, false, true],
    [true, false, false, false, false, false, false, false, false, true],
    [true, false, false, false, false, false, false, false, false, true],
    [true, true, true, true, true, true, true, true, true, true],
];

var Levels = [first_level, second_level];
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

function FinishLevel(isok)
{
    ctx.fillStyle = "#000000";
    if(isok)
    {
        levelTime=false;
        finishLTime = true;
        counter_level++;
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
        chooseColor();
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
    // Create gradient
    var grd = ctx.createLinearGradient(350,0,450,0);
    grd.addColorStop(0,"#ffff80");
    grd.addColorStop(0.25,"#00cc99");
    grd.addColorStop(0.5,"#66a3ff");
    grd.addColorStop(1,"#e066ff");
    // Fill with gradient
    ctx.fillStyle = grd;
    ctx.fillRect(320,700,140,80);
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.font = "25px Arial";
    ctx.fillText("בחירת צבע",390,748);

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
    var isClickRight = false; // Boolean variable At first it is assumed that if it is pressed on the screen it is incorrect and if it is a button or a square it is changed to correct, if it remains incorrect a message is sent to the player which buttons can be pressed
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
                FinishLevel();
                isClickRight = true;
            }
            if(x<70 && x>60 && y<420 && y>380){
                inInstructionScreen1 = false;
                FinishLevel();
                instructionsScreen2();
                isClickRight = true;
            }
        }
        if(inInstructionScreen2){
            if(x<730 && x>700 && y<100 && y>70){
                inInstructionScreen2 = false;
                finishLTime = true;
                FinishLevel();
                isClickRight = true;
            }
            if(x<745 && x>735 && y<420 && y>380){
                inInstructionScreen2 = false;
                FinishLevel();
                instructionsScreen1();
                isClickRight = true;
            }
        }
    }
    
    if(levelTime)
    {
        //instractions button
        if (x > 10 && x < 160 && y > 10 && y < 110){
            isClickRight = true;
            draw_game_screen();
            instructionsScreen1();
            levelTime = false;
            instractionsWhereFrom = 'l'
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
        if(x >= 650 && x < 780 && y >= 20 && y < 120 )
        {
            first_board.cleanBoard();
            isClickRight = true;
        }
        
        //check if player clicked on a square, if so change its img and bool value acording to the button pressed in the fill/x option bottom of the screen
        var clicked_on_the_board = x>start_point_x && x<start_point_x+board_len_in_squares*square_size && y>start_point_y && y<start_point_y+board_len_in_squares*square_size;
        var found_clicked_square = false;
        var line = 0;
        var column = 0;
        //alert("x="+x+" y="+y+" "+ first_board.arraySquares[line][coulmn].x);
    
        //check if player clicked on a square, if so change its img and bool value acording to the button pressed in the fill/x option bottom of the screen
        //alert("x="+x+" y="+y+" "+ first_board.arraySquares[line][column].x);

        if(clicked_on_the_board)
        {
            //runs on the array and finds the square the player clicked on by comparing the coordonites with each square
            while(!found_clicked_square){
                //in this ine the console shows an error but the action
                //found_clicked_square = true;
                //coulmn++;
                //alert(coulmn);
                if (x>first_board.arraySquares[line][column].x && x<first_board.arraySquares[line][column].x+square_size && y>first_board.arraySquares[line][column].y && y<first_board.arraySquares[line][column].y+square_size){
                    isClickRight = true;
                    found_clicked_square = true;
                    //checks if the square has already been clicked on with the same img the player currently has, if so, it earases the square
                    if(first_board.arraySquares[line][column].img == fill_img){
                        first_board.arraySquares[line][column].img = empty_img;
                        first_board.arraySquares[line][column].boolean = false;
                    }
                    //else, it paints the sqaure with the img
                    else{
                        first_board.arraySquares[line][column].img = fill_img;
                        first_board.arraySquares[line][column].boolean = is_filled;
                    }
                }
                if(column<first_board.arraySquares[0].length-1){
                    column++;
                }
                else{
                    column = 0;
                    line++;
                }
            }

        }
    
        if(x > 600 && x < 750 && y > 670 && y < 770){
           
            FinishLevel(first_board.compareBool(Levels[counter_level]));
            isClickRight =true;
        }
    }

    if(openingTime){
        
        //instractions button
        if (x > 10 && x < 160 && y > 10 && y < 110){
            isClick = true;
            openingPage();
            instructionsScreen1();
            openingTime = false;
            instractionsWhereFrom = 'o'
        }
        
        
        if(x > 200 && x < 600 && y > 540 && y < 690)
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
        
    }

    if(finishLTime)
    {
        //instractions button
        if (x > 10 && x < 160 && y > 10 && y < 110){
            isClickRight = true;
            FinishLevel();
            finishLTime = false;
            instructionsScreen1();
            instractionsWhereFrom = 'f'
        }

        if(x > 200 && x < 600 && y > 540 && y < 690)
        {
            finishLTime = false;
            levelTime= true;
            draw_game_screen();
            isClickRight = true;


        }
        if(x>710 && x<780 && y>20 && y<90)
        {
            isClickRight = true;
            game_map_time = true;
            finishLTime = false;
            ctx.clearRect(0,0,c.width,c.height);
            map_for_game();
    
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
        if(finishLTime || inInstructionScreen1 || inInstructionScreen2 || game_map_time || openingTime){
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
    ctx.fillText('תוכלו לבחור האם לסמן באיקס או בריבוע על ידי לחיצה על הכפתור בתחתית',730,260);
    ctx.fillText('אם תרצו למחוק משבצת מלאה, לחצו עליה כאשר הכפתור בתחתית עומד על',730,290);
    ctx.fillText('(הציור שנמצא במשבצת זו (ריבוע או איקס',730,320);
    ctx.drawImage(button_img, 100, 330, 140, 70);
    ctx.fillText('.בכל שלב של המשחק תוכלו ללחוץ על כפתור "נקה לוח" ולהתחיל מחדש',730,430);
    ctx.fillText('"כשסיימתם למלא את כל המשבצות הנדרשות, לחצו על כפתור "סיים משחק',730,560);
}
func

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
    ctx.rect(10, 10, 150, 100);
    ctx.fill();
    ctx.textAlign = "center";
    ctx.fillStyle = "#000000";
    ctx.fillText("הוראות", 85, 50);
    ctx.fillText("המשחק", 85, 80);
}


openingPage();

