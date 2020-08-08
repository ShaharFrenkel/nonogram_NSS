class board {
    constructor(arraySquare) {
    this.arraySquare = arraySquare;
    }
    createArrayOfBool()
    { //יצירת מערך דו ממדי בוליאני של כל המשבצות 
        var arrayOfBool = new Array(10);
        for(var i = 0; i < 10; i++)
        {
            arrayOfBool[i] = new Array(10);
            for(var j = 0; j < 10; j++ )
            {   
                 arrayOfBool[i][j] = this.arraySquare[i][j].this.boolean;  
            }
        } 
        return arrayOfBool;
    } 
}
