function library(){ //This will start the game

    
    // **** START THE GAME ****
    //flagDic["story"] = "DAY 11 night";
    //flagDic["time"] = "day";
    //flagDic["DAY4CLASS BIRTHDAY come"] = true;
    //flagDic["DAY 11 HELPERS"] = "both confirm";
    //flagDic["DAY8OFFICE PROMISE kept"] = true;
    //flagDic["DAY9CLASS KATE yes"] = true;
    //flagDic["DAY 10 KATE"] = true;
    //flagDic["DAY 10 BET"] = true;
    //flagDic["DAY 10 POISON"] = "kate"
    //flagDic["DAY 11 ASHIDA"] = "slave";
    
    currLoc = ashida;
    player = smallplayer;
    player.appear(100,100);

    //katesheart.play();


    //goTo("ashidaclearing");



    if(seal == true){
        ctx.beginPath();
        ctx.fillStyle = "#000000";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.drawImage(graphicDic["anykey"]["image"],0,headerH);
        ctx.closePath(0);

        
        
    } else {
        titleseal = 0;
        currLoc = title;
        write(); // Start the "movie" of the game so to speak
    }
    //prologue.play();

    
}