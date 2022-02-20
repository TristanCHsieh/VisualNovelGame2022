writeDrawScore = function(){
    if(flagDic["story"] != "INSTRUCTIONS"){
        ctx.fillStyle = "#000000";
        ctx.fillRect(0,0,canvas.width,headerH);

        scoreString = "Score: " + currScore + " of " + maxScore;
        scoreXVal = headerLeftBuffer;

        for(i = 0; i < scoreString.length; i ++){
            if(scoreString[i] != " "){
                // Draw the letter if there is one,
                ctx.drawImage(graphicDic[scoreString[i] + "ㅏ"]["image"], scoreXVal, headerBufferH);
            }
            //update the score
            scoreXVal += letterSize + letterSpace;
        }
    }

}