function writeDrawScreen(){
    priority = [];

    if(currLoc.firstTime == false){
        // Appear all of the inherant objects. The objects that will never
        // *not be on the screen
        for(i = 0; i <  currLoc.inherantObjects.length; i ++){
            currLoc.inherantObjects[i][0].appear(currLoc.inherantObjects[i][1],currLoc.inherantObjects[i][2]);
        }
        currLoc.firstTime = true;
    }
    if(start == false){ 
        // This function will only play once and then will wait for the location to change
        // (When the location changes, start will be set to false again)
        currLoc.events();
        start = true;
    }




    if([school,forest].includes(currLoc)){
        // The current location has diagonal priority lines
        for(i = 0; i < currLoc.graphArr.length; i ++){ // Add the background to the priority array

            if(typeof(currLoc.graphArr[i][1]) == "object"){
                
                
                priority.push([
                    currLoc.graphArr[i][0],
                    0,
                    headerH,
                    [
                        [currLoc.graphArr[i][1][0][0], currLoc.graphArr[i][1][0][1] + headerH],
                        [currLoc.graphArr[i][1][1][0], currLoc.graphArr[i][1][1][1] + headerH]
                    ]
                ]);
            } else {
                priority.push([currLoc.graphArr[i][0],0,headerH,
                   [
                        [0, 
                         currLoc.graphArr[i][1] + headerH],
                        [canvas.width, 
                         currLoc.graphArr[i][1] + headerH]
                   ]
                ]);
            }


            // Append a new version of the location's graphic Array to priority where 0 is added
            // as an X cordinate. format (title,x,y,priority)
        }


        for(i = 0; i < currLoc.appeared.length; i ++){
            priority.push([currLoc.appeared[i].giveFace(),
                            currLoc.appeared[i].x,
                            currLoc.appeared[i].y + headerH,
                            [
                                [currLoc.appeared[i].x + currLoc.appeared[i].block[0][0], 
                                 currLoc.appeared[i].y + currLoc.appeared[i].block[0][1]],
                                [currLoc.appeared[i].x + currLoc.appeared[i].block[1][0], 
                                 currLoc.appeared[i].y + currLoc.appeared[i].block[1][1]]
                            ]
                            //currLoc.appeared[i].y + currLoc.appeared[i].block[0][1]
                ]
            );
        }

        //Now let's sort the priority array by priority values, ascending... a different function is used
        priority = prioritySort(priority);

    } else {

        for(i = 0; i < currLoc.graphArr.length; i ++){ // Add the background to the priority array
            priority.push([currLoc.graphArr[i][0],0,headerH,currLoc.graphArr[i][1] + headerH]); 
            // Append a new version of the location's graphic Array to priority where 0 is added
            // as an X cordinate. format (title,x,y,priority)
        }

        for(i = 0; i < currLoc.appeared.length; i ++){
            priority.push([currLoc.appeared[i].giveFace(),
                           currLoc.appeared[i].x,
                           currLoc.appeared[i].y + headerH,
                           //currLoc.appeared[i].y + currLoc.appeared[i].block[0][1]

                           alternate( // take into account forcedP, if applicable. Otherwise don't worry about it
                               currLoc.appeared[i].forcedP,
                               currLoc.appeared[i].y + currLoc.appeared[i].block[0][1]
                           )
                           ]//block already accounts for headerH,forcedP does not
            );
            // Go through each object that has appeared and add it to the priority array (title,x,y,priority)
            // judging priority based on the line of interaction

        }

        //Now let's sort the priority array by priority values, ascending
        priority.sort(function(a,b){ return a[3] - b[3] }); // The compare function tells the program to only sort by Y values

    }

    if(currLoc.forcedReorderArray != null && currLoc.forcedReorderArray != undefined){
        forceReorder(priority,currLoc.forcedReorderArray);
    }



    if(currLoc.filterTag == "day/night"){
        if(flagDic["time"] == "night"){
            filterTag = "night";
        } else {
            filterTag = ""
        }
    } else if(currLoc.filterTag == "day/nightinside"){
        if(flagDic["time"] == "night"){
            filterTag = "nightinside";
        } else {
            filterTag = ""
        }
    } else {
        filterTag = currLoc.filterTag;
    }

    for(i = 0; i < priority.length; i ++){ // Now draw all the images
        // Draw the regular version if fadeOutPhase is 0, otherwise draw the darker versions
        if(fadeOutPhase == 0){

            try {
                ctx.drawImage(graphicDic[priority[i][0] + filterTag]["image"],priority[i][1] + graphicDic[priority[i][0]]["xOr"],priority[i][2] + graphicDic[priority[i][0]]["yOr"]);
            } catch (error) {
                ctx.drawImage(graphicDic[priority[i][0]]["image"],priority[i][1] + graphicDic[priority[i][0]]["xOr"],priority[i][2] + graphicDic[priority[i][0]]["yOr"]);
            }




        } else if(fadeOutPhase == 1 || fadeOutPhase == 3){
            //ctx.drawImage(graphicDic[priority[i][0] + "dark"]["image"],priority[i][1],priority[i][2]);

            try {
                ctx.drawImage(graphicDic[priority[i][0] + filterTag]["image"],priority[i][1] + graphicDic[priority[i][0]]["xOr"],priority[i][2] + graphicDic[priority[i][0]]["yOr"]);
            } catch (error) {
                ctx.drawImage(graphicDic[priority[i][0]]["image"],priority[i][1] + graphicDic[priority[i][0]]["xOr"],priority[i][2] + graphicDic[priority[i][0]]["yOr"]);

            }
        }

        // Shows a line at the priority value            
        if(debugDic["priority"] == true){

            if(typeof(priority[i][3]) == "number"){
                ctx.fillStyle = "#88FF99";
                ctx.fillRect(0,priority[i][3],canvas.width,1);
            } else {
                ctx.strokeStyle = "#88FF99";
                ctx.moveTo(priority[i][3][0][0],priority[i][3][0][1]);
                ctx.lineTo(priority[i][3][1][0],priority[i][3][1][1]);
                ctx.stroke();
            }

        }
    }

    // Get rid of this VVV when you actually have the dark images
    if(fadeOutPhase == 1 || fadeOutPhase == 3){
        ctx.globalAlpha = .5;
        ctx.fillStyle = "#000000";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.globalAlpha = 1;
    }

    // Now progress the fadeOutAnimation, if in progress
    if(fadeOutPhase == 1){
        fadeOutWait ++;
        if(fadeOutWait == fadeOutTime){
            fadeOutWait = 0;
            fadeOutPhase ++;
        }
    } else if(fadeOutPhase == 3){
        fadeOutWait ++;
        if(fadeOutWait == fadeOutTime){
            fadeOutWait = 0;
            fadeOutPhase = 0;
        }
    }

}