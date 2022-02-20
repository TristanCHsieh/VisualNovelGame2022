grubfront = new Object(
    "grubfront",
    "grubfront",
    function(){
        //initialize relX and relY
        if(this.relX == undefined){
            this.relX = this.x - sectorOriginX;
        }
        if(this.relY == undefined){
            this.relY = this.y - sectorOriginY;
        }
        
        
        // move right VERY slowly
        if(this.grubCount == undefined){
            this.grubCount = 0;
        }
        this.grubCount ++;
        
        if(this.grubCount == 20){
            this.relX += 1;
            this.grubCount = 0;
        }
        
        
        this.relocate(sectorOriginX + this.relX,sectorOriginY + this.relY);
        
    },
    function(){
        pauseGame();
        this.isSucking = true; 
        // is the player getting sucked into the grub? 
        // if this is true then the program should stop checking if the player is
        // touching the grub so that they don't get completely absorbed
        
        /*if(player.y > grubfront.y + ((253/3) * 2) ){ // below grub, go up
            player.minSpeed = 2;
            player.deltaY = -1;
        } else if(player.y < grubfront.y + 253/3 ){ // above grub, go down
            player.minSpeed = 2;
            player.deltaY = 1;
        }*/
        
        
        
        currLoc.activate(
            [
                [function(){say([
                    [null,"There is a small crevice in the creature's flesh. As you investigate it, it's muscles grab ahold of you and pull you in. To your horror, you cannot escape.",function(){increaseScore(30);}]
                ]);},1],
                //[function(){},50],
                [function(){
                    fadeOut(function(){
                        player.minSpeed = .25;
                        gamePause = false;
                        changeLocation(grublower,120,174,smallastronaut);
                        
                        player.direction = null;
                        player.deltaX = 0;
                        player.deltaY =  -1;
                        player.delta = 0;
                        player.accelaration = 0;
                    });
                },null]
            ]
        );
    },
    [[0,1000],[1,1000]],
    "none"
    //[60,27,346,154]
    //[215,166,20,10]
    //[138,37,271,140]
);

grubback = new Object(
    "grubback",
    "grubback",
    function(){
        //initialize relX and relY
        if(this.relX == undefined){
            this.relX = this.x - sectorOriginX;
        }
        if(this.relY == undefined){
            this.relY = this.y - sectorOriginY;
        }
        
        
        // move right VERY slowly
        if(this.grubCount == undefined){
            this.grubCount = 0;
        }
        this.grubCount ++;
        
        if(this.grubCount == 20){
            this.relX += 1;
            this.grubCount = 0;
        }
        
        
        this.relocate(sectorOriginX + this.relX,sectorOriginY + this.relY);
    },
    function(){}
    [[0,0],[1,0]],
);