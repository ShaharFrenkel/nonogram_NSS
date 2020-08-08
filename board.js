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
    createArrayOfBool()
    { //יצירת מערך דו ממדי בוליאני של כל המשבצות 
        //לשנות את זה לפונקציית השוואה בין הבוליאני של המערך הזה למערך בוליאנים
        var arrayOfBool = new Array(10);
        for(var i = 0; i < 10; i++)
        {
            arrayOfBool[i] = new Array(10);
            for(var j = 0; j < 10; j++ )
            {   
                arrayOfBool[i][j] = this.arraySquares[i][j].boolean;  
            }
        } 
        return arrayOfBool;
    } 
    cleanBoard()
    {// מוחק לוח- התמונות של המשבצות ריקות, כל המשבצות false
        for(var i = 0; i < 10; i++)
        {
            for(var j = 0; j < 10; j++ )
            {   
                this.arraySquares[i][j].this.img = empty_img;
                this.arraySquares[i][j].this.boolean = false;
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
