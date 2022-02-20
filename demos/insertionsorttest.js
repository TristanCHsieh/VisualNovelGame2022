

function getHigher(a,b){
    if(a > b){
        return "a"
    } else if(a < b){
        return "b"
    } else if(a == b){
        return "none"
    } else {
        return undefined
    }
}




function prioritySort(arr){

    
    retArr = [];

    
    while (arr.length > 0){
        if(retArr.length == 0){ // there's nothing in retArr, nothing to test
            retArr.push(arr.shift());
        } else {
            for(psIdx2 = 0; psIdx2 < retArr.length; psIdx2 ++){
                tempAnswer = getHigher(arr[0], retArr[psIdx2])
                
                
                
                if(tempAnswer == "b" || tempAnswer == "none"){ 
                    // first retArr value is equal or higher, place the arr value right before 
                    retArr.splice(psIdx2, 0, arr.shift());
                    break;
                } else if(tempAnswer == "a" && psIdx2 == (retArr.length - 1)){ 
                    // if you get through the whole array without finding a higher value just tack the value onto the end 
                    retArr.push(arr.shift());
                    break;
                }
                
            }
            
        }
    
    }
    
    
    
    
    return retArr 
}


testArray = [4,6,9,7,6,6,5,8,5,5]

console.log(prioritySort(testArray));