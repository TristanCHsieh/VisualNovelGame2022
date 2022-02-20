/*forceReorder(
    [
        ["1a",1,1,1],
        ["1b",2,1,1],
        ["1c",3,1,1],
        ["1d",4,1,1],
        ["1e",5,1,1]
    ],
    ["e","b","c"]
)*/



/*

    Takes an array (probably the priority array), and reorders the values according to the second array given. Use the above problem for an example.

*/

function contWithSubstring (tempArr, str){
    /*
    
    Does the set contain any strings that are a substring of value? For example, if value is "a" and tempSet is ("a1","b1","c1") then its true
    
    */

   
    for(cwsIdx = 0; cwsIdx < tempArr.length; cwsIdx ++){
        if(str.includes(tempArr[cwsIdx])){
            return {
                doesContain: true,
                containerValue: tempArr[cwsIdx]
            };
        }
    }
    
    
    return false;
    
}

function forceReorder(totalArr, valueArr){
    
    var tempDic = {}
    var tempName
    
    for(frIdx = 0; frIdx < totalArr.length; frIdx ++){
        tempName = totalArr[frIdx][0]
        tempInfoDic = contWithSubstring(valueArr,tempName)
        
        if(tempInfoDic["doesContain"]){
            tempDic[tempInfoDic["containerValue"]] = totalArr[frIdx]; // remember the object
            totalArr[frIdx] = "x";
        }
    }
    
    vaIdx = 0;
    for(frIdx = 0; frIdx < totalArr.length; frIdx ++){

        if(totalArr[frIdx] == "x"){
            totalArr[frIdx] = tempDic[valueArr[vaIdx]];
            vaIdx ++;
        }
    }
    
    
    return totalArr
}

