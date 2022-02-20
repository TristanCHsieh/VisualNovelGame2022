/*

    Debug functions. For example, allows you to change location or point within the story on command

*/

function goTo(location){

    debugLocDic = {
        "anxietyroom": [anxietyroom,100,100,bigplayer],
        "ashida": [ashida,100,100,smallplayer],
        "ashida2": [ashida2,100,100,smallplayer],
        "ashida3": [ashida3,100,100,smallplayer],
        "ashidaclearing": [ashidaclearing,100,100,smallplayer],
        "bedroomtrap": [bedroomtrap,80,100,bigplayer],
        "celestebedroom": [celestebedroom,80,100,bigplayer],
        "celestedownstairs": [celestedownstairs,217,100,bigplayer],
        "celestehouse": [celestehouse,100,100,smallplayer],
        "celestekitchen": [celestekitchen,100,100,bigplayer],
        "celesteupstairs": [celesteupstairs,200,100,bigplayer],
        "classroom": [classroom,200,100,smallplayer],
        "classroomtrap": [classroomtrap,200,100,astronautsmall],
        "closet": [closet,120,80,bigplayer],
        "donutshop": [donutshop,100,100,bigplayer],
        "firstroom": [firstroom,138,80,firstroomplayer],
        "field": [field,138,80,astronautsmall],
        "forest": [forest,100,100,bigplayer],
        "fountain": [fountain,100,100,bigplayer],
        "grubhigher": [grubhigher,120,12,smallastronaut],
        "grublower": [grublower,110,115,smallastronaut],
        "hallwayi": [hallwayi,100,100,smallplayer],
        "hallwayii": [hallwayii,100,100,smallplayer],
        "jamies": [jamies,100,100,bigplayer],
        "jamiesinterior": [jamiesinterior,120,100,smallplayer],
        "kateshouse": [kateshouse,100,100,smallplayer],
        "labyrinth": [labyrinth,100,100,bigplayer],
        "lexibedroom": [lexibedroom,100,100,bigplayer],
        "lexihallway": [lexihallway,100,100,bigplayer],
        "leximainroom": [leximainroom,100,100,bigplayer],
        "lexishouse": [lexishouse,100,100,smallplayer],
        "office": [office,100,125,smallplayer],
        "pumpkinpatch": [pumpkinpatch,100,100,smallplayer],
        "room": [room,100,100,reddot],
        "school": [school,100,100,smallplayer],
        "secretroom": [secretroom,100,100,bigplayer],
        "violetbathroom": [violetbathroom,60,100,smallplayer],
        "violetbedroom": [violetbedroom,100,100,bigplayer],
        "violetdownstairs": [violetdownstairs,120,100,miniplayer]
    }
    
    
    
    if(location == "sector"){
        changeLocationSector();
    } else {
        changeLocation(
            debugLocDic[location][0],
            debugLocDic[location][1],
            debugLocDic[location][2],
            debugLocDic[location][3]
        );
        player.halt();
        player.changeFace("still");
    }
}

function changeStory(label){
    debugStoryDic = {
        "PROLOGUE": "night",
        "PROLOGUE exit": "night",
        "PROLOGUE explore": "night",
        "DAY 1": "day",
        "DAY 1 class": "night",
        "DAY 2": "day",
        "DAY 2 class": "night",
        "DAY 3": "day",
        "DAY 3 class": "night",
        "DAY 4": "day",
        "DAY 4 violet": "night",
        "DAY 4 night": "night",
        "DAY 5": "day",
        "DAY 5 violet": "night",
        "DAY 5 night": "night",
        "DAY 6": "day",
        "DAY 6 night": "night",
        "DAY 7": "day",
        "DAY 7 kate": "night",
        "DAY 7 night": "night",
        "DAY 8": "day",
        "DAY 8 mrface": "night",
        "DAY 8 office": "night",
        "DAY 8 night": "night",
        "DAY 9": "day",
        "DAY 9 violet": "night",
        "DAY 9 hangout": "night",
        "DAY 9 night": "night",
        "DAY 10": "day",
        "DAY 10 lexi": "night",
        "DAY 10 texts": "night",
        "DAY 10 kate": "night",
        "DAY 10 night": "night",
        "DAY 11": "day",
        "DAY 11 lexi": "night",
        "DAY 11 night": "night",
        "LABYRINTH": "night",
        "DAY 11 night 2": "night",
        "DAY 12": "day",
        "DAY 12 class": "night",
        "ABANDON": "night",
        "ISOLATION DREAM": "night",
        "ISOLATION": "day",
    }
    
    flagDic["story"] = label;
    flagDic["time"] = debugStoryDic[label];
}