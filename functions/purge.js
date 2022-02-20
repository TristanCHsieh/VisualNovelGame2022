/*

    Clears all rooms and resets variables

*/


function purge(){
    
    purge_arr = 
    [
        ashida,
        ashida2,
        ashida3,
        ashidaclearing,
        bedroomtrap,
        celestebedroom,
        celestedownstairs,
        celestehouse,
        celestekitchen,
        celesteupstairs,
        classroom,
        classroomtrap,
        closet,
        donutshop,
        firstroom,
        field,
        forest,
        fountain,
        grubhigher,
        grublower,
        hallwayi,
        hallwayii,
        jamies,
        jamiesinterior,
        kateshouse,
        labyrinth,
        lexibedroom,
        lexihallway,
        leximainroom,
        lexishouse,
        office,
        pumpkinpatch,
        school,
        secretroom,
        sector,
        violetbathroom,
        violetbedroom,
        violetdownstairs
    ];
    
    purgeObjArr = 
    [
        lexi,
        violet,
        kate,
        mrface
    ];
    
    for(purgeIdx = 0; purgeIdx < purge_arr.length; purgeIdx ++){
        purge_arr[purgeIdx].appeared = [];
        purge_arr[purgeIdx].firstTime = false;
        purge_arr[purgeIdx].hasEvent = true;
    }
    
    // Reset the sector coordinates so that the background doesn't "jump" to its last position during the fadeout
    sectorOriginX = 0;
    sectorOriginY = 0;
    sectorOriginTempX = 0;
    sectorOriginTempY = 0;

    
    for(purgeIdx = 0; purgeIdx < purgeObjArr.length; purgeIdx ++){
        purgeObjArr[purgeIdx].changeFace("stillforward");
        purgeObjArr[purgeIdx].phase = 0;
    }
}