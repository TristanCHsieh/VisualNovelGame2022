/*

    A function that returns a if there is a value, b as a backup.

*/


alternate = function(a,b){

    if(a == null || a == undefined){
        return b
    } else {
        return a + headerH // I'm adding headerH right here because this function is really only being used to account for forced priorities... I will remove it later if I need to
    }

}