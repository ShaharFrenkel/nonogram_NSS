class Board {
    constructor() {
        //יצירת מערך דו ממדי של אובייקט משבצת-הלוח
        this.arraySquares = new Array(10);
        for(var i = 0; i < 10; i++)
        {
            arraySquares[i] = new Array(10);
            for(var j = 0; j < 10; j++ )
            {
                arraySquares[i][j]= new Square( start_point_x + 50*i, start_point_y + 50*j, empty_img, false);
            } 
        }
    }
    compareBool(arrayOfBool)
    { //יצירת מערך דו ממדי בוליאני של כל המשבצות 
        //לשנות את זה לפונקציית השוואה בין הבוליאני של המערך הזה למערך בוליאנים
        var isEqual = true;
        for(var i = 0; i < 10; i++)
        {
            for(var j = 0; j < 10; j++ )
            {   
                if(arrayOfBool[i][j] != this.arraySquares[i][j].boolean)
                {
                    isEqual = false;
                    i = 10;
                }  
            }
        } 
        return isEqual;
    } 
    cleanBoard()
    {// מוחק לוח- התמונות של המשבצות ריקות, כל המשבצות false
        for(var i = 0; i < 10; i++)
        {
            for(var j = 0; j < 10; j++ )
            {   
                this.arraySquares[i][j].img = empty_img;
                this.arraySquares[i][j].boolean = false;
            }
        }     
    }
    showBoard() 
    {//הפונקציה עוברת על המערך של המשבצות ומפעילה על כל משבצת את פונקצית show
        for(var i = 0; i < 10; i++)
        {
            for(var j = 0; j < 10; j++ )
            {   
                this.arraySquares[i][j].show(); 
            }
        }     
    }
}
