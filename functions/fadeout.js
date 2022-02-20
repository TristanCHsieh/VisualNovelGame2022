/*

    Makes a fadeout transition on the screen, then plays the end function and fades back in

*/

function fadeOut(endFunc){

    // If not already fading out, fade out and execute the end function
    if(fadeOutPhase == 0){
        fadeOutPhase ++;
        fadeOutFunction = endFunc;
    }

    /* Some notes on how this function works. It sets the end function to the function given
    as a parameter. Then it sets fadeOutPhase to 1, meaning all the images are in dark mode.
    in this mode, all the images are drawn darkly in wait, and fadeOutWait starts to increase
    when fadeOutWait reaches the appropriate number, it goes to fadeOutPhase 2, where everything
    is black. fadeOutWait is reset and increases again till it reaches the appropriate number.
    Then the endFunc is played, and all the fadeOut variables are reset. None of the controls
    should work during fadeOutPhases 1-3, the blinkers should not appear, and the animations 
    will not update this function also relies on there being a dark version for every sprite 
    (except for avatars, text and blinkers). These dark sprites should be labeled "(SPRITENAME)dark"
    and can be derived from a for loop
    */
}