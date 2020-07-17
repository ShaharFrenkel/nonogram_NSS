var myCanvas = document.getElementById("myCanvas");
var drawingContext = myCanvas.getContext("2d");
drawingContext.strokeStyle = "#000000";
ctx.lineWidth = 2;
for (var i=0;i < 11;i++){
    drawingContext.moveTo(i,0);
drawingContext.lineTo(i,822);
    }
    for (var j=0;j < 11;j++){
        drawingContext.moveTo(0,j);
    drawingContext.lineTo(882,j);
        }

drawingContext.stroke();