sunset = new Cutscene(
    "sunset",
    [
        ["sunset",10],
        ["0sunset","Eventually the sun sets. You begin to get tired and realize it is almost your bed time."]
    ],
    function(){
        changeLocation(this.tempLoc,this.tempX,this.tempY,this.tempPlayer); 
        flagDic["time"] = "night";
        player.halt();
    }
);


playEvening = function(time){
    playWaitFunction(function(){
        fadeOut(function(){
            sunset.tempLoc = currLoc;
            sunset.tempX = player.x;
            sunset.tempY = player.y;
            sunset.tempPlayer = player;

            sunset.play();
        });
    },time);
}