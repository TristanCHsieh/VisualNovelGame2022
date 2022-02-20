/*
    Sorts the priority array of diagonal lines instead of one dimensional values. The proccess is a little more complex.

*/


function prioritySort(arr){

    
    retArr = [];
    
    psCount = 0;

    
    while (arr.length > 0){
        if(retArr.length == 0){ // there's nothing in retArr, nothing to test
            retArr.push(arr.shift());
        } else {
            foundAnswer = false;
            for(psIdx2 = 0; psIdx2 < retArr.length; psIdx2 ++){
                
                
                tempAnswer = getHigher(arr[0], retArr[psIdx2]) // calculate the relationship between the value in question and the current retValue
                
                
                if(tempAnswer == "b" || tempAnswer == "none" ){ // retArr value is equal or higher, place the arr value right before 
                    retArr.splice(psIdx2, 0, arr.shift());
                    foundAnswer = true;
                    break;
                } else if(tempAnswer == "a"){ // retValue is still lower, check to see the other issues.
                    // if you get through the whole array without finding a higher value just tack the value onto the end 
                    if(psIdx2 == (retArr.length - 1)){
                        retArr.push(arr.shift());
                        foundAnswer = true;
                        break;
                    } else { // if you encounter an a early, you know you can just 
                        foundAnswer = true;
                    }
                    
                    
                } else if(psIdx2 == (retArr.length - 1)){ // been through the entire array, and the value hasn't been added... two possibilities:
                    
                    if(foundAnswer == false){ // there was not a single clue, so put the arr value on the backburner
                        arr.push(arr.shift());
                        break;
                    } else if(foundAnswer == true){ // arr was higher than all of the retArr values in the array that you know of. Stick it on the end
                        retArr.push(arr.shift());
                        break;
                    }
                    
                }
                
            }
            
        }
    
        
        psCount ++;
        if(psCount == 100){ // this should never happen, but if a line gets put on the back burner infinitely, exit the loop.
            console.log("ERROR: Priority line is impossible to place. Function \"prioritySort\"");
            console.log(retArr);
            break;
        }
    }

    
    return retArr 
}




/*

    Given two diagonal lines, determine which line is higher, or if they're both equal, or if it's impossible to tell

*/


findMinMax = function(a, b){
    if(a > b){
        return {
            "min": b,
            "max": a
        }
    } else {
        return {
            "min": a,
            "max": b
        }
    }
}


findIneq = function(a){
    var tempM = (a[0][1] - a[1][1])/(a[0][0] - a[1][0]); // you need m to find b

    return {
        "m": tempM,
        "b": a[0][1] - (tempM * a[0][0])
    }

}

getHigher = function(a, b){

    
    // Set the variables equal to their corrisponding dimensions
    a = a[3];
    b = b[3];

    
    

    aMinMax = findMinMax(a[0][0], a[1][0]);
    bMinMax = findMinMax(b[0][0], b[1][0]);
    
    aHigher = "a";
    bHigher = "b";
    noneHigher = "none";


    // In the case where the lines are outside of eachothers ranges - sometimes its ambiguous which 

    aIneq = findIneq(a);


    var retArr = []; //keeps track of which points are behind or ahead 


    if(b[0][1] > aIneq["m"] * b[0][0] + aIneq["b"]){
        retArr.push(b[0]);
    }

    if(b[1][1] > aIneq["m"] * b[1][0] + aIneq["b"]){
        retArr.push(b[1]);
    }


    if(bMinMax["min"] > aMinMax["max"] || bMinMax["max"] < aMinMax["min"]){
        return undefined //if they're outside eachother's range, you don't have to sort them

    } else {

        if(retArr.length == 2){ // both are below
            return bHigher //b is higher;
        } else if(retArr.length == 1){ // one is above one is below, find out if its the same for the other line

            bIneq = findIneq(b);

            retArr = []; 


            if(a[0][1] > bIneq["m"] * a[0][0] + bIneq["b"]){
                retArr.push(a[0]);
            }

            if(a[1][1] > bIneq["m"] * a[1][0] + bIneq["b"]){
                retArr.push(a[1]);
            }


            if(retArr.length == 2){ // both are below
                return aHigher; //a is higher
            } else if(retArr.length == 1){ // one is above one is below, return error
                return noneHigher; //none is higher
            } else if(retArr.length == 0){ // both are above
                return bHigher; //b is higher
            } else {
                return noneHigher;
            }




        } else if(retArr.length == 0){ // both are above
            return aHigher; //a is higher
        } else {
            return noneHigher;
        }
    
    }


}

