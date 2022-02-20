/* **************************************************
   **************************************************
                     THE LIBRARY
   **************************************************
   ************************************************** */
// Here's how the graphicArr will work in real life.
// 1. Manually input all the sprites and backgrounds
// 2. With a for loop, input all the darkened sprites and backgrounds
// 3. Manually input all the rest of the images
// 4. With a double for loop, input all the letters and numbers for every color
// 5. With a single for loop, input all the special characters for every color
// (This might be able to be done with a double for loop and an array/dictionary)


// Put the names of all the still images in this list. Organized by file
/*

    {
        "file name":[
            "imagename",
            "secondimage"
        ],
        "file name":[
            ["image group name", # images in group],
            ["imagename", x offset, y offset],
            ["imagename", # images in group, x offset, y offset],
        ]
    }

*/

// Maybe find away to detect files within files. 

graphicNameDic = {
    "animations":[ 
        ["smallceleste/forward",6,-17,-27,true],
        ["smallceleste/away",6,-17,-27,true],
        ["smallceleste/left",8,-17,-27,true],
        ["smallceleste/right",8,-17,-27,true],
        
        ["smallceleste/forwardnight",6,-17,-27,true],
        ["smallceleste/awaynight",6,-17,-27,true],
        ["smallceleste/leftnight",8,-17,-27,true],
        ["smallceleste/rightnight",8,-17,-27,true],
        
        ["smallceleste/forwardred",6,-17,-27,true],
        ["smallceleste/awayred",6,-17,-27,true],
        ["smallceleste/leftred",8,-17,-27,true],
        ["smallceleste/rightred",8,-17,-27,true],
        
        ["miniceleste/forward",6,0,0,true],
        ["miniceleste/away",6,0,0,true],
        ["miniceleste/left",8,0,0,true],
        ["miniceleste/right",8,0,0,true],
        
        ["miniviolet/forward",6,0,0,true],
        ["miniviolet/away",6,0,0,true],
        ["miniviolet/left",8,-5,0,true],
        ["miniviolet/right",8,-3,0,true],
        
        ["celestesitting",2,-17,-87,true],
        
        ["bigceleste/forward",6,-16,-15,true],
        ["bigceleste/away",6,-16,-15,true],
        ["bigceleste/left",8,-16,-15,true],
        ["bigceleste/right",8,-16,-15,true],
        ["bigceleste/forwardnight",6,-16,-15,true],
        ["bigceleste/awaynight",6,-16,-15,true],
        ["bigceleste/leftnight",8,-16,-15,true],
        ["bigceleste/rightnight",8,-16,-15,true],
        ["bigceleste/forwardred",6,-16,-15,true],
        ["bigceleste/awayred",6,-16,-15,true],
        ["bigceleste/leftred",8,-16,-15,true],
        ["bigceleste/rightred",8,-16,-15,true],
        ["bigceleste/forwardgreen",6,-16,-15,true],
        ["bigceleste/awaygreen",6,-16,-15,true],
        ["bigceleste/leftgreen",8,-16,-15,true],
        ["bigceleste/rightgreen",8,-16,-15,true],
        
        ["celestedie",2,-24,0,true],
        ["celestediered",2,-24,0,true],
        
        ["celesteclonedie",3,0,-45,true],
        
        ["firstroomplayer/forward",6,-16,-15,true],
        ["firstroomplayer/away",6,-16,-15,true],
        ["firstroomplayer/left",8,-16,-15,true],
        ["firstroomplayer/right",8,-16,-15,true],
        
        ["astronautsmall/forward",6,0,0,true],
        ["astronautsmall/away",6,0,0,true],
        ["astronautsmall/left",8,-5,0,true],
        ["astronautsmall/right",8,-5,0,true],

        ["astronautsmall/forwardnight",6,0,0,true],
        ["astronautsmall/awaynight",6,0,0,true],
        ["astronautsmall/leftnight",8,-5,0,true],
        ["astronautsmall/rightnight",8,-5,0,true],
        
        ["ashidanbeast/forward",6,0,0,true],
        ["ashidanbeast/away",6,0,0,true],
        ["ashidanbeast/left",8,-5,0,true],
        ["ashidanbeast/right",8,-5,0,true],
        
        ["lexi/forward",6,-17,-25,true],
        ["lexi/away",6,-17,-27,true],
        ["lexi/left",8,-17,-27,true],
        ["lexi/right",8,-17,-27,true],
        
        ["lexibig/forward",6,0,-1,true],
        ["lexibig/away",6,0,-1,true],
        ["lexibig/left",8,-10,-1,true],
        ["lexibig/right",8,-10,-1,true],
        
        ["lexidie",2,-24,0,true],
        ["lexidiered",2,-24,0,true],
        
        ["lexi/forwardnight",6,-17,-25,true],
        ["lexi/awaynight",6,-17,-27,true],
        ["lexi/leftnight",8,-17,-27,true],
        ["lexi/rightnight",8,-17,-27,true],
        
        ["lexibig/forwardred",6,0,-1,true],
        ["lexibig/awayred",6,0,-1,true],
        ["lexibig/leftred",8,-10,-1,true],
        ["lexibig/rightred",8,-10,-1,true],
        
        ["lexibig/forwardgreen",6,0,-1,true],
        ["lexibig/awaygreen",6,0,-1,true],
        ["lexibig/leftgreen",8,-10,-1,true],
        ["lexibig/rightgreen",8,-10,-1,true],
        
        ["lexi/forwardred",6,-17,-25,true],
        ["lexi/awayred",6,-17,-27,true],
        ["lexi/leftred",8,-17,-27,true],
        ["lexi/rightred",8,-17,-27,true],
        
        ["lexibig/forwardnight",6,0,-1,true],
        ["lexibig/awaynight",6,0,-1,true],
        ["lexibig/leftnight",8,-10,-1,true],
        ["lexibig/rightnight",8,-10,-1,true],
        
        ["violet/forward",6,-14,-2,true],
        ["violet/away",6,-14,-2,true],
        ["violet/right",8,-15,-3,true],
        ["violet/left",8,-15,-3,true],
        
        ["violet/forwardred",6,-14,-2,true],
        ["violet/awayred",6,-14,-2,true],
        ["violet/rightred",8,-15,-3,true],
        ["violet/leftred",8,-15,-3,true],
        
        ["violet/forwardnight",6,-14,-2,true],
        ["violet/awaynight",6,-14,-2,true],
        ["violet/rightnight",8,-15,-3,true],
        ["violet/leftnight",8,-15,-3,true],
        
        ["violetdie",2,-24,0,true],
        ["violetdiered",2,-24,0,true],
        
        ["violetbig/forward",6,0,-1,true],
        ["violetbig/away",6,0,-1,true],
        ["violetbig/right",8,-10,-1,true],
        ["violetbig/left",8,-10,-1,true],
        
        ["violetbig/forwardnight",6,0,-1,true],
        ["violetbig/awaynight",6,0,-1,true],
        ["violetbig/rightnight",8,-10,-1,true],
        ["violetbig/leftnight",8,-10,-1,true],
        
        ["violetbig/forwardred",6,0,-1,true],
        ["violetbig/awayred",6,0,-1,true],
        ["violetbig/rightred",8,-10,-1,true],
        ["violetbig/leftred",8,-10,-1,true],
        
        ["violetbig/forwardgreen",6,0,-1,true],
        ["violetbig/awaygreen",6,0,-1,true],
        ["violetbig/rightgreen",8,-10,-1,true],
        ["violetbig/leftgreen",8,-10,-1,true],
        
        ["monstertwitch",3,0,0,true],
        ["monsterkillslexi",8,0,0,true],
        
        ["kate/forward",6,-15,-2,true],
        ["kate/away",6,-15,-3,true],
        ["kate/right",8,-15,-3,true],
        ["kate/left",8,-15,-3,true],
        
        ["kate/forwardnight",6,-15,-2,true],
        ["kate/awaynight",6,-15,-3,true],
        ["kate/rightnight",8,-15,-3,true],
        ["kate/leftnight",8,-15,-3,true],
        
        ["kate/forwardred",6,-15,-2,true],
        ["kate/awayred",6,-15,-3,true],
        ["kate/rightred",8,-15,-3,true],
        ["kate/leftred",8,-15,-3,true],
        
        
        ["katebig/forward",6,0,-1,true],
        ["katebig/away",6,0,-1,true],
        ["katebig/right",8,-10,-1,true],
        ["katebig/left",8,-10,-1,true],
        
        ["mrface/forward",6,0,-4,true],
        ["mrface/away",6,0,-4,true],
        ["mrface/right",8,-12,0,true],
        ["mrface/left",8,-14,0,true],
        
        ["aqsadie",3,0,0,true],
        
        ["demonspider/right",4,-19,-4,true],
        ["demonspider/left",4,-21,-4,true],
        ["demonspider/rightnight",4,-19,-4,true],
        ["demonspider/leftnight",4,-21,-4,true],
        ["demonspider/rightred",4,-19,-4,true],
        ["demonspider/leftred",4,-21,-4,true],
        
        ["katesanxiety/forward",2,0,-3,true],
        ["katesanxiety/away",2,0,-3,true],
        ["katesanxiety/right",2,0,-3,true],
        ["katesanxiety/left",2,0,-3,true],
        
        ["anxietydooropen",2,0,0,true],
        
        ["bedroomtrapclose",3,0,0,true],
        
        ["katestandup",3,0,-10,true],
        
        ["katedeath",2,0,0,true],
        
        ["smallastronaut",2,-299,-187,true],
        ["astronaut",2,0,0,true],
        
        ["violetsitdown",2,-16,-26,true],
        ["violetconsume",6,0,0,true],
        ["violetkilllexi",2,0,0,true],

        ["prologue_space",1,0,0,true],
        
        ["prologue",3,0,0,true],
        
        "0blank",
        
        ["debris",2,null,null,true],
        
        "carinside/day",
        "carinside/afternoon",
        "carinside/night",
        
        ["lextharappear",2],
        ["lexthartransform",8,-17,-31,true],
        
        ["sleepingviolet",2,0,0,true],
        
        ["ashidadoorappear",2,0,0,true],
        ["katesheart",8,0,0,true],
        
        ["mrfacedestroysvape",8,-26,-26,true],
        
        ["demonspiderkillaqsa",9,-25,-19,true],
        ["demonspiderkillceleste",9,-25,-19,true],
        ["demonspiderthrowup",8,-48-21,-14-4,true],
        ["celestegrowup",6,-48-21,-14-4,true],
        

        
        ["classroomdoor_openviolet",2,0,0,true],
        ["classroomdoor_close",2,0,0,true],
        
        ["noneuclidianeggplant",20,0,0,true],
        
        ["sunset",1,0,0,true],

        ["title",9,0,0,true],
        ["titlepressspace",2,0,0,true]
        
        
    ],
    "avatars":[
        "ashidanbeastav",
        "mrfaceav",
        "kateav",
        "violetav",
        "celesteav",
        "firstroomav",
        "lextharav",
        "lexiav",
        "aqsaav",
        "lextharbigav",
        "astronautav",
        "missioncontrolav",
        "ashidancashierav"
    ],
    "locations":[
        "0room",
        ["anxietyroom",2],
        ["anxietyroomnight",2],
        ["ashida",3],
        ["ashida2",3],
        ["ashida3",2],
        ["ashidaclearing",4],
        ["bedroomtrap",4],
        ["celestebedroom",4],
        ["celestebedroomnight",4],
        ["celestedownstairs",3],
        ["celestedownstairsnightinside",3],
        ["celestehouse",3],
        ["celestehousenight",3],
        ["celestekitchen",1],
        ["celestekitchennightinside",1],
        ["celesteupstairs",2],
        ["classroom",5],
        ["classroomnightinside",5],
        ["classroomtrap",5],
        ["closet",4],
        ["donutshop",5],
        ["field",3],
        ["firstroom",1],
        ["forest",6],
        ["forestnight",6],
        ["fountain",5],
        ["fountainnight",5],
        ["grubhigher",1],
        ["grublower",1],
        ["hallwayi",1],
        ["hallwayinightinside",1],
        ["hallwayii",2],
        ["jamies",6],
        ["jamiesnight",6],
        ["jamiesinterior",7],
        ["kateshouse",5],
        ["labyrinth",3],
        ["lexibedroom",2],
        ["lexihallway",1],
        ["leximainroom",6],
        ["leximainroomnightinside",6],
        ["lexishouse",5],
        ["lexishousenight",5],
        ["office",6],
        ["pumpkinpatch",2],
        ["school",5],
        ["schoolnight",4],
        ["secretroom",3],
        ["sector",1],
        "sector",
        ["violetbathroom",1],
        ["violetbedroom",6],
        ["violetdownstairs",3],
        
        ["ending",1]
    ],
    "objects":[
        
        ["ashidanbeastforward",0,0],
        ["ashidanbeastaway",0,0],
        ["ashidanbeastright",0,0],
        ["ashidanbeastleft",0,0],
        
        ["ashidancashier",0,0],
        
        ["bigcelesteforward",-16,-15],
        ["bigcelesteaway",-16,-15],
        ["bigcelesteleft",-16,-15],
        ["bigcelesteright",-16,-15],
        ["bigcelesteforwardnight",-16,-15],
        ["bigcelesteawaynight",-16,-15],
        ["bigcelesteleftnight",-16,-15],
        ["bigcelesterightnight",-16,-15],
        ["bigcelesteforwardred",-16,-15],
        ["bigcelesteawayred",-16,-15],
        ["bigcelesteleftred",-16,-15],
        ["bigcelesterightred",-16,-15],
        ["bigcelesteforwardgreen",-16,-15],
        ["bigcelesteawaygreen",-16,-15],
        ["bigcelesteleftgreen",-16,-15],
        ["bigcelesterightgreen",-16,-15],
        
        ["smallcelesteforward",-17,-27],
        ["smallcelesteaway",-17,-27],
        ["smallcelesteleft",-17,-27],
        ["smallcelesteright",-17,-27],
        
        ["smallcelesteforwardnight",-17,-27],
        ["smallcelesteawaynight",-17,-27],
        ["smallcelesteleftnight",-17,-27],
        ["smallcelesterightnight",-17,-27],
        
        ["smallcelesteforwardred",-17,-27],
        ["smallcelesteawayred",-17,-27],
        ["smallcelesteleftred",-17,-27],
        ["smallcelesterightred",-17,-27],
        
        ["minicelesteforward",3,0],
        ["minicelesteaway",3,0],
        ["minicelesteright",4,0],
        ["minicelesteleft",4,0],
        
        ["minivioletforward",0,0],
        ["minivioletaway",0,0],
        ["minivioletright",0,0],
        ["minivioletleft",0,0],
        
        ["violetforward",0,0],
        ["violetaway",0,0],
        ["violetright",0,0],
        ["violetleft",0,0],
        
        ["violetforwardnight",0,0],
        ["violetawaynight",0,0],
        ["violetrightnight",0,0],
        ["violetleftnight",0,0],
        
        ["violetforwardred",0,0],
        ["violetawayred",0,0],
        ["violetrightred",0,0],
        ["violetleftred",0,0],
        
        ["violetbigforward",0,0],
        ["violetbigaway",0,0],
        ["violetbigright",0,0],
        ["violetbigleft",0,0],
        
        ["violetbigforwardnight",0,0],
        ["violetbigawaynight",0,0],
        ["violetbigrightnight",0,0],
        ["violetbigleftnight",0,0],
        
        ["violetbigforwardred",0,0],
        ["violetbigawayred",0,0],
        ["violetbigrightred",0,0],
        ["violetbigleftred",0,0],
        
        ["violetbigforwardgreen",0,0],
        ["violetbigawaygreen",0,0],
        ["violetbigrightgreen",0,0],
        ["violetbigleftgreen",0,0],
        
        "violetsitting",
        
        ["violettub/empty",-91,-115],
        ["violettub/full",-12,-2],
        
        ["mrfaceforward",0,0],
        ["mrfaceaway",0,0],
        ["mrfaceright",0,0],
        ["mrfaceleft",0,0],
        "mrfacename",
        
        "firstroom_door",
        "firstroom_rightcomputer",
        "firstroom_rightcomputer_on",
        "firstroom_bed",
        
        ["firstroomplayerforward",-16,-15],
        ["firstroomplayeraway",-16,-15],
        ["firstroomplayerleft",-16,-15],
        ["firstroomplayerright",-16,-15],
        
        ["astronautsmallforward",0,0],
        ["astronautsmallaway",0,0],
        ["astronautsmallleft",0,0],
        ["astronautsmallright",0,0],
        
        ["astronautsmallforwardnight",0,0],
        ["astronautsmallawaynight",0,0],
        ["astronautsmallleftnight",0,0],
        ["astronautsmallrightnight",0,0],
        
        "sector_spaceship",
        "sector_smalldoor",

        "celestebedroom_door",
        "celestebedroom_doornight",
        "celestebedroom_bed",
        "celestebedroom_bednight",
        
        
        ["celestebedroom_fullbed",0,-3],
        ["celestebedroom_fullbedsitup",0,-18],
        
        "celestecar",
        "celestecarnight",
        
        "celestekitchentable/empty",
        "celestekitchentable/hw",
        ["celestekitchentable/full",0,-20],
        
        "celesteupstairs_rightdoor",
        
        "celestedownstairsdoor/closed",
        "celestedownstairsdoor/open",
        "celestedownstairsdoor/openkate",
        "celestedownstairsdoor/closednightinside",
        
        "celestehouse_door",
        "celestehouse_doornight",
        
        ["lexiforward",-17,-27],
        ["lexiaway",-17,-27],
        ["lexileft",-17,-27],
        ["lexiright",-17,-27],
        
        ["lexiforwardred",-17,-27],
        ["lexiawayred",-17,-27],
        ["lexileftred",-17,-27],
        ["lexirightred",-17,-27],
        
        ["lexiforwardnight",-17,-27],
        ["lexiawaynight",-17,-27],
        ["lexileftnight",-17,-27],
        ["lexirightnight",-17,-27],
        
        ["lexibigforward",0,0],
        ["lexibigaway",0,0],
        ["lexibigleft",0,0],
        ["lexibigright",0,0],
        "lexistudying",
        "lexisitting",
        
        ["lexibigforwardnight",0,0],
        ["lexibigawaynight",0,0],
        ["lexibigleftnight",0,0],
        ["lexibigrightnight",0,0],
        
        ["lexibigforwardred",0,0],
        ["lexibigawayred",0,0],
        ["lexibigleftred",0,0],
        ["lexibigrightred",0,0],
        
        ["lexibigforwardgreen",0,0],
        ["lexibigawaygreen",0,0],
        ["lexibigleftgreen",0,0],
        ["lexibigrightgreen",0,0],
        
        "lexistudyscene/full",
        "lexistudyscene/celeste",
        "lexistudyscene/nolexi",
        "lexistudyscene/katestanding",
        "lexistudyscene/celestelexi",
        
        
        "classroom_door",
        
        "classroomfirstrow",
        "classroomsecondrow",
        
        "hallwayi_classroomdoor",
        "hallwayi_closetdoor",
        "hallwayi_door",
        "hallwayi_doornightinside",
        "hallwayii_officedoor",
        "school_door",
        
        "grubfront",
        "grubback",
        "babygrub",
        "grubhigher_door",
        "classroomtrap_door",
        
        "jamies_door",
        "fountain_door",
        "fountain_doornight",
        "violetdownstairs_bedroomdoor",
        "violetsbedroom_leftdoor",
        "violetbathroom_door",
        
        "violetsmonster",
        
        ["kateforward",0,0],
        ["kateaway",0,0],
        ["kateright",0,0],
        ["kateleft",0,0],
        
        ["kateforwardnight",0,0],
        ["kateawaynight",0,0],
        ["katerightnight",0,0],
        ["kateleftnight",0,0],
        
        ["kateforwardred",0,0],
        ["kateawayred",0,0],
        ["katerightred",0,0],
        ["kateleftred",0,0],
        
        "katesitting",
        
        "katesanxietyforward",
        "katesanxietyaway",
        "katesanxietyleft",
        "katesanxietyright",
        
        ["katebigforward",0,0],
        ["katebigaway",0,0],
        ["katebigright",0,0],
        ["katebigleft",0,0],
        
        ["jamiesinterior_chair/empty",0,0],
        ["jamiesinterior_chair/full",0,-13],
        
        ["jamiesinterior_playerchair/empty",0,0],
        ["jamiesinterior_playerchair/full",0,-10],
        
        "aqsasideways",
        "aqsasitting",
        
        "demonspiderleft",
        "demonspiderright",
        "demonspiderleftnight",
        "demonspiderrightnight",
        "demonspiderleftred",
        "demonspiderrightred",

        "lexishouse_door",
        "lexishouse_doornight",
        "leximainroom_door",
        "lexihallway_door",
        "lexibedroom_door",

        
        ["labyrinth_forwarddoor",0,-6],
        "labyrinth_leftdoor",
        "labyrinth_rightdoor",
        
        "anxietydoor/door",
        "anxietydoor/doornight",
        "anxietydoorlocked/door",
        "anxietydoorlocked/doornight",
        
        "bedroomtrap_door",
        "donutshop_door",
        
        ["secretroom_forwarddoor",0,-6],
        "secretroom_leftdoor",
        "secretroom_rightdoor",
        
        
    ],
    "inventory":[
        "basiceggplant",
        "shinyeggplant",
        "shinyeggplantobj",
        "noneuclidianeggplant",
        "eggplantflower",
        "eggplantbush/0",
        "eggplantbush/0night",
        "eggplantbush/1",
        "eggplantbush/1night",
        "ashidanpumpkin",
        "ashidanpumpkinobj",
        "goldenbanana",
        "goldenbananaobj",
        "katesheart",
        "powder",
        "phone"
        
    ],
    "utility":[
        ["blinker",-1,-1],
        "blinkerinv",
        "reddot",
        "blackrec",
        "rightblink",
        "leftblink",
        "invbackground",
        "anykey"
    ],
    "cards":
    [
        
        "lextharsending",
        "katesending",
        "violetsending",
        "mrfacesending",
        "lexisending",
        "lonelyending",
        "deathending",
        
        ["june20",9,0,0,true],
        ["june21",9,0,0,true],
        ["june22",9,0,0,true],
        ["june23",9,0,0,true],
        ["june24",9,0,0,true],
        ["june25",9,0,0,true],
        ["june26",9,0,0,true],
        ["june27",9,0,0,true],
        ["june28",9,0,0,true],
        ["june29",9,0,0,true],
        ["june30",9,0,0,true],
        ["july1",9,0,0,true],
        ["calligraphy",9,0,0,true],
    ]
    
};

graphicArr = [];
animationDic = {}; // The program will automatically generate animations if you tell it to.

// Compile the dictionary into an array of graphic objects to be rendered
for(let i in graphicNameDic){
    for(j = 0; j < graphicNameDic[i].length; j ++){
        
        // check what kind of information the program is given
        if(typeof(graphicNameDic[i][j]) == "string"){ 
            //It's a single image
            graphicArr.push(new Graphic(
                graphicNameDic[i][j],
                "images/" + i + "/" + graphicNameDic[i][j] + ".png",
                0,
                0
            ));
        } else if(graphicNameDic[i][j].length == 2){
            //It's a group of images
            for(k = 0; k < graphicNameDic[i][j][1]; k ++){
                graphicArr.push(new Graphic(
                    k + "" + graphicNameDic[i][j][0],
                    "images/" + i + "/" + graphicNameDic[i][j][0] + "/" + k + ".png",
                    0,
                    0
                ));
            }
        } else if(graphicNameDic[i][j].length == 3){
            // it has a built in set of x & y values;
            graphicArr.push(new Graphic(
                graphicNameDic[i][j][0],
                "images/" + i + "/" + graphicNameDic[i][j][0] + ".png",
                graphicNameDic[i][j][1],
                graphicNameDic[i][j][2]
            ));
        } else if(graphicNameDic[i][j].length == 4){
            //It's a group of images AND it has a built in set of x & y values;
            for(k = 0; k < graphicNameDic[i][j][1]; k ++){
                graphicArr.push(new Graphic(
                    k + "" + graphicNameDic[i][j][0],
                    "images/" + i + "/" + graphicNameDic[i][j][0] + "/" + k + ".png",
                    graphicNameDic[i][j][2],
                    graphicNameDic[i][j][3]
                ));
            }
        } else if(graphicNameDic[i][j].length == 5){
            //It's an animation
            
            
            for(k = 0; k < graphicNameDic[i][j][1]; k ++){
                graphicArr.push(new Graphic(
                    k + "" + graphicNameDic[i][j][0],
                    "images/" + i + "/" + graphicNameDic[i][j][0] + "/" + k + ".png",
                    graphicNameDic[i][j][2], 
                    graphicNameDic[i][j][3]
                ));
            }
            
            animationDic[graphicNameDic[i][j][0]] = new Animation(
                graphicNameDic[i][j][0],
                graphicNameDic[i][j][1],
                true,
                null
            );
            
        }
    }
}


//Make small additions to the animations if you need to
animationDic["smallastronaut"].graphArr[0][1] = 40;
animationDic["smallastronaut"].graphArr[1][1] = 20;

animationDic["astronaut"].graphArr[0][1] = 40;
animationDic["astronaut"].graphArr[1][1] = 20;

animationDic["violetconsume"].graphArr[0][1] = 5;
animationDic["violetconsume"].graphArr[1][1] = 2;
animationDic["violetconsume"].graphArr[2][1] = 2;
animationDic["violetconsume"].graphArr[3][1] = 5;
animationDic["violetconsume"].graphArr[4][1] = 2;
animationDic["violetconsume"].graphArr[5][1] = 5;


// This imputs all the letters. Shouldn't need to be changed unless you add more colors than white and grey.

nameArr = [
    ["A","A"],
    ["B","B"],
    ["C","C"],
    ["D","D"],
    ["E","E"],
    ["F","F"],
    ["G","G"],
    ["H","H"],
    ["I","I"],
    ["J","J"],
    ["K","K"],
    ["L","L"],
    ["M","M"],
    ["N","N"],
    ["O","O"],
    ["P","P"],
    ["Q","Q"],
    ["R","R"],
    ["S","S"],
    ["T","T"],
    ["U","U"],
    ["V","V"],
    ["W","W"],
    ["X","X"],
    ["Y","Y"],
    ["Z","Z"],
    ["_a","a"],
    ["_b","b"],
    ["_c","c"],
    ["_d","d"],
    ["_e","e"],
    ["_f","f"],
    ["_g","g"],
    ["_h","h"],
    ["_i","i"],
    ["_j","j"],
    ["_k","k"],
    ["_l","l"],
    ["_m","m"],
    ["_n","n"],
    ["_o","o"],
    ["_p","p"],
    ["_q","q"],
    ["_r","r"],
    ["_s","s"],
    ["_t","t"],
    ["_u","u"],
    ["_v","v"],
    ["_w","w"],
    ["_x","x"],
    ["_y","y"],
    ["_z","z"],
    ["1","1"],
    ["2","2"],
    ["3","3"],
    ["4","4"],
    ["5","5"],
    ["6","6"],
    ["7","7"],
    ["8","8"],
    ["9","9"],
    ["0","0"],
    ["!","!"],
    ["question","?"],
    ["(","("],
    [")",")"],
    ["dot","."],
    ["open","“"],
    ["close","”"],
    ["&","&"],
    ["*","*"],
    ["colon",":"],
    [",",","],
    ["'","'"],
    ["dash","-"]
];

colorNameArr = [
    ["white","ㅏ"],
    ["darkgrey","ㅅ"]
];

for(clrIdx = 0; clrIdx < colorNameArr.length; clrIdx ++){
    for(k = 0; k < nameArr.length; k++){
        graphicArr.push(new Graphic(nameArr[k][1] + colorNameArr[clrIdx][1],"images/letters/" + colorNameArr[clrIdx][0] + "/" + nameArr[k][0] + ".png"));
    }
}

audioDic = { // This will contain all the audio files and their titles
    "dialoguebeep": new Audio("audio/talkbeepultralowloud.wav"),
    "select": new Audio("audio/select.wav"),
    "dooropen": new Audio("audio/dooropen.wav"),
    "point": new Audio("audio/pointtinder.wav"),
    "celestetheme": new Audio("audio/celestetheme.wav"),
    "lextharstheme": new Audio("audio/lextharstheme.wav"),
    "invopen": new Audio("audio/invopen.wav"),
    "invclose": new Audio("audio/invclose.wav"),
    "choose": new Audio("audio/choose.wav"),
    "debrissound": new Audio("audio/debrissound.wav"),
    "debriscrash": new Audio("audio/debriscrash.wav"),
    "firstroomcrash": new Audio("audio/firstroomcrash.wav"),
    "sector": new Audio("audio/sectorii.wav"),
    "disgusting": new Audio("audio/disgusting.wav"),
    "itemget": new Audio("audio/itemget.wav"),
    "ending": new Audio("audio/ending.wav"),
    "violeteat": new Audio("audio/violeteat.wav")
}

// AUDIO FILES ADDITIONAL ATTRIBUTES

graphicDic = {}; // Will store all the loaded images as Image objects
loadCounter = 0; // Determines how many images have been loaded
player = null; // Player will contain an object that can be controlled by the arrow keys
currLoc = null; // currLoc will contain a location that the player is currently on

window.onload = function(){ // Waits until the window has loaded
    for(i = 0; i < graphicArr.length; i ++){ // Tells all images to start loading
        graphicArr[i].loadImg(i); 
        //The parameter i is the index of the image that's loading, 
        //which will be useful when working inside the onload function
    }
}
