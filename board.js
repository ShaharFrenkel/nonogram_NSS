class Board {
    constructor() {
        //Create a two-dimensional array of the object square - this is the board
        this.arraySquares = new Array(10);
        for(var i = 0; i < 10; i++)
        {
            this.arraySquares[i] = new Array(10);
            for(var j = 0; j < 10; j++ )
            {
                this.arraySquares[i][j]= new Square(start_point_x + 50*j, start_point_y + 50*i, empty_img, false);
            } 
        }
    }
    compareBool(arrayOfBool)
    {
        // Function compares the two-dimensional Boolean array it received (step solution) to the Boolean property of the squares array
        var isEqual = true;
        for(var i = 0; i < 10; i++)
        {
            for(var j = 0; j < 10; j++)
            {   
                if(arrayOfBool[i][j] != this.arraySquares[i][j].boolean)
                {
                    isEqual = false;
                    i = 10;
                    j = 10;
                }  
            }
        } 
        return isEqual;
    } 
    cleanBoard()
    {// Delete board -on click of a button Clear board all the pictures of squares becomes empty, the Boolean feature of the squares becomes false
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
    {
        // The function goes over the array of squares and activates the show function on each square
        for(var i = 0; i < 10; i++)
        {
            for(var j = 0; j < 10; j++ )
            {   
                this.arraySquares[i][j].show(); 
            }
        }     
    }
}
