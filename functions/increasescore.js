/*

    Increase the score by [amount]...

*/

function increaseScore(amount){
    currScore += amount;
    audioDic["select"].pause();
    audioDic["point"].currentTime = 0;
    audioDic["point"].play();
}
