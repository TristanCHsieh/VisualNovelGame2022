



merge = function(left, right) {
    let arr = []
    // Break out of loop if any one of the array gets empty
    while (left.length && right.length) {
        
        var higherLine = getHigher(left[0],right[0]);
        
        // Pick the smaller among the smallest element of left and right sub arrays 
        if (higherLine == "a") {
            // push the first element of the "left" array onto arr
            arr.push(left.shift())  
        } else if (higherLine == "b" || higherLine == "none"){
            // push the first element of the "right" array onto arr
            arr.push(right.shift()) 
        }
    }
    
    // Concatenating the leftover elements
    // (in case we didn't go through the entire left or right array)
    // the ... unpacks the array 
    return [ ...arr, ...left, ...right ]
}



// given an array, this will sort the array 
mergeSort = function(array) {
  const half = array.length / 2
  
  // Base case or terminating case... its just one element 
  if(array.length < 2){
    return array
  }
  
  const left = array.splice(0, half)
  return merge(mergeSort(left),mergeSort(array))
}


//array = [4,6,9,7,6,6,5,8,5,5]

//array = mergeSort(array);

//console.log(array)















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

