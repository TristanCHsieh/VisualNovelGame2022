/*

    Add an item to your inventory. Feed it the item and an optional message.

*/

function obtainItem(item,message){
    audioDic["itemget"].currentTime = 0;
    audioDic["itemget"].play();
    
    
    if(message != false){
        say([[null,item.name + " added to your inventory!",function(){increaseScore(10);}]]);
    }
    
    
    item.obtained = true;
    inventory.push(item);
}