/*

    A set of commands that trigger every time the player enters a door

*/

function enterDoor(location,x,y,newPlay,face){
    audioDic["dooropen"].currentTime = 0;
    audioDic["dooropen"].play();
    
    fadeOut(function(){
        changeLocation(location,x,y,newPlay);
        player.halt();
        player.changeFace(face);
    });
}
