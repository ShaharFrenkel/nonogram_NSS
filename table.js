var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.lineWidth = 2;
ctx.strokeStyle = "black";
var square_size = 50;
var start_point_x = 150;
var start_point_y = 150;
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