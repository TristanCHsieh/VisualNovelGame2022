/*

    Takes two lines, returns true if they intersect, false if they do not. Used for
    detecting collisions between objects, players, and the location's collision
    lines

*/

function hitTest(lineOne,lineTwo){
    // This technically works, but it needs to be cleaned up
    //Uncomment to visualize lines of collision
    
    if(debugDic["collision"] == true){
        ctx.beginPath();
        ctx.strokeStyle = "#FF00FF";
        ctx.moveTo(lineOne[0][0],lineOne[0][1]);
        ctx.lineTo(lineOne[1][0],lineOne[1][1]);
        ctx.stroke();

        ctx.moveTo(lineTwo[0][0],lineTwo[0][1]);
        ctx.lineTo(lineTwo[1][0],lineTwo[1][1]);
        ctx.stroke();
        ctx.closePath();
    }
    
    // Check if... all the x values are equal, all the y values are equal, both of the lines are verticle,
    // one of the lines is verticle, or they're both sloped.

    if(lineOne[0][0] == lineOne[1][0] && lineOne[1][0] == lineTwo[0][0] && lineTwo[0][0] == lineTwo[1][0]){ 
        //If all the x values are equal... find which of the xvals are bigger on one of the lines
        if(lineTwo[0][1] > lineTwo[1][1]){ // If the first point is bigger
            lineTwoBigger = lineTwo[0][1];
            lineTwoSmaller = lineTwo[1][1];
        } else if(lineTwo[0][1] < lineTwo[1][1]){
            lineTwoBigger = lineTwo[1][1];
            lineTwoSmaller = lineTwo[0][1];
        }

        //Then check to see if the lines overlap
        if(lineTwoSmaller <= lineOne[0][1] && lineOne[0][1] <= lineTwoBigger){
            return true;
        } else if(lineTwoSmaller <= lineOne[1][1] && lineOne[1][1] <= lineTwoBigger){
            return true;
        } else {
            return false;
        }
    } else if(lineOne[0][1] == lineOne[1][1] && lineOne[1][1] == lineTwo[0][1] && lineTwo[0][1] == lineTwo[1][1]){
        //If all the y values are equal... find which of the xvals are bigger on one of the lines
        if(lineTwo[0][0] > lineTwo[1][0]){ // If the first point is bigger
            lineTwoBigger = lineTwo[0][0];
            lineTwoSmaller = lineTwo[1][0];
        } else if(lineTwo[0][0] < lineTwo[1][0]){
            lineTwoBigger = lineTwo[1][0];
            lineTwoSmaller = lineTwo[0][0];
        }

        //Then check to see if the lines overlap
        if(lineTwoSmaller <= lineOne[0][0] && lineOne[0][0] <= lineTwoBigger){
            return true;
        } else if(lineTwoSmaller <= lineOne[1][0] && lineOne[1][0] <= lineTwoBigger){
            return true;
        } else {
            return false;
        }
    } else if(lineOne[0][0] == lineOne[1][0] && lineTwo[0][0] == lineTwo[1][0]){ //If both lines are verticle
        return false;

    } else if(lineOne[0][0] == lineOne[1][0]){ // If one of the lines are verticle... the rules are different
        return hitTestVerticle(lineOne,lineTwo);

    } else if(lineTwo[0][0] == lineTwo[1][0]){
        return hitTestVerticle(lineTwo,lineOne);

    } else { // If no lines are verticle...

        // Find the rightmost and the left most points on each line
        if(lineOne[0][0] > lineOne[1][0]){ // If the first point is bigger
            lineOneBigger = lineOne[0][0];
            lineOneSmaller = lineOne[1][0];
        } else if(lineOne[0][0] < lineOne[1][0]){ //If the second point is bigger
            lineOneBigger = lineOne[1][0];
            lineOneSmaller = lineOne[0][0];
        }

        // Now for line two
        if(lineTwo[0][0] > lineTwo[1][0]){ // If the first point is bigger
            lineTwoBigger = lineTwo[0][0];
            lineTwoSmaller = lineTwo[1][0];
        } else if(lineTwo[0][0] < lineTwo[1][0]){
            lineTwoBigger = lineTwo[1][0];
            lineTwoSmaller = lineTwo[0][0];
        }

        //Find the slope and yint of both lines
        slopeOne = 
                (lineOne[0][1] - lineOne[1][1])/ //Delta Y
                (lineOne[0][0] - lineOne[1][0]); // Over Delta X
        yintOne = lineOne[0][1] - (slopeOne * (lineOne[0][0])); // If y = mx+b, then b = y - mx

        slopeTwo = 
                (lineTwo[0][1] - lineTwo[1][1])/ //Delta Y
                (lineTwo[0][0] - lineTwo[1][0]); // Over Delta X
        yintTwo = lineTwo[0][1] - (slopeTwo * (lineTwo[0][0])); // If y = mx+b, then b = y - mx

        newX = (yintOne-yintTwo)/(slopeTwo-slopeOne); 
        //This is how you find the x-coord of the 
        // intersection of two lines... (b1-b2)/(m2-m1)

        if(lineOneSmaller <= newX && newX <= lineOneBigger && lineTwoSmaller <= newX && newX <= lineTwoBigger){
            // If the lines coordinates are in the right places, then the lines intersect
            return true;
        } else {
            // Otherwise the lines do not intersect
            return false;
        }

    }

    function hitTestVerticle(vertLine, regLine){ // Finds out if two lines intersect, one being verticle
        //Find the bigger Y value in the verticle line
        
        if(vertLine[0][1] > vertLine[1][1]){ // If the first point is bigger
            yBigger = vertLine[0][1];
            ySmaller = vertLine[1][1];
        } else if(vertLine[0][1] < vertLine[1][1]){ //If the second point is bigger
            yBigger = vertLine[1][1];
            ySmaller = vertLine[0][1];
        }

        //Find the bigger X Value in the non-Verticle line
        if(regLine[0][0] > regLine[1][0]){ // If the first point is bigger
            xBigger = regLine[0][0];
            xSmaller = regLine[1][0];
        } else if(regLine[0][0] < regLine[1][0]){ //If the second point is bigger
            xBigger = regLine[1][0];
            xSmaller = regLine[0][0];
        }

        newX = vertLine[0][0]; //The X value is gonna be the X value of the verticle line

        //Find the slope and y int of the non-Verticle line 
        slope = 
                (regLine[0][1] - regLine[1][1])/ //Delta Y
                (regLine[0][0] - regLine[1][0]); // Over Delta X
        yint = regLine[0][1] - (slope * (regLine[0][0])); // If y = mx+b, then b = y - mx

        newY = (slope * newX) + yint;

        if(xSmaller <= newX && newX <= xBigger && ySmaller <= newY && newY <= yBigger){
            // If the lines coordinates are in the right places, then the lines intersect
            return true;
        } else {
            // Otherwise the lines do not intersect
            return false;
        }
    }
}