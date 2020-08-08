class board {
    constructor(arraySquares) {
    this.arraySquares = arraySquares;
    }
    createArrayOfBool()
    { //יצירת מערך דו ממדי בוליאני של כל המשבצות 
        var arrayOfBool = new Array(10);
        for(var i = 0; i < 10; i++)
        {
            arrayOfBool[i] = new Array(10);
            for(var j = 0; j < 10; j++ )
            {   
                 arrayOfBool[i][j] = this.arraySquares[i][j].this.boolean;  
            }
        } 
        return arrayOfBool;
    } 

    showBorad() 
    {
        for(var i = 0; i < 10; i++)
        {
            for(var j = 0; j < 10; j++ )
            {   
                this.arraySquares[i][j].show(); 
            }
        }     
        
    }
}
