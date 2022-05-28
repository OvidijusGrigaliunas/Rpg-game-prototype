var hValue;
function Pathfinder(AiOrPlayer, moveTarget, moveORSkill){
    let openSet = [];
    let openSetid = [];
    let closedSet = [];
    let targetLocation;
    let startLocation;
    let targetid = MCharacter.CModel.id;
    let ignoreUnit = false;
    findNeighbours(mapTiles.length, mapTiles[0].length);
    if(moveORSkill == 'skill'){
        ignoreUnit = true;
    }
    if(AiOrPlayer== 'ai'){
       
        startLocation = mapTiles[parseInt(LocationList[turnOrder-1].split(/[Y,X]+/)[1])][parseInt(LocationList[turnOrder-1].split(/[Y,X]+/)[2])];
        targetLocation = mapTiles[parseInt(playerPosition.split(/[Y,X]+/)[1])][parseInt(playerPosition.split(/[Y,X]+/)[2])];
     
    }
    else {
        startLocation = mapTiles[parseInt(playerPosition.split(/[Y,X]+/)[1])][parseInt(playerPosition.split(/[Y,X]+/)[2])];
        targetLocation = moveTarget;

    }
    
    openSet.push(startLocation)
    openSetid.push(startLocation.tileid.id)
    let currentLocation = startLocation;
    
    var limit=0;

    mainloop:
    while (openSet.length > 0){
        
        var bestPath = 0;
        for (let i = 0; i<openSet.length;i++){
            if (openSet[i].F_value < openSet[bestPath].F_value) {
                
                bestPath = i;                
            }
   
        }
        currentLocation = openSet[bestPath];
        closedSet.push(currentLocation.tileid.id)
        
        let index = openSet.indexOf(currentLocation)
        openSet.splice(index, 1);
        for(let i = 0; i < currentLocation.neighbour.length; i++){
            
           if(!blockedLocations.mountains.includes(currentLocation.neighbour[i].id)  || (moveORSkill && LocationList.includes(currentLocation.neighbour[i].id)) || currentLocation.neighbour[i].children[0].id == targetid){
               if(!LocationList.includes(currentLocation.neighbour[i].id) || moveORSkill){
                   
                    if(!closedSet.includes(currentLocation.neighbour[i].id)){    
                        if(!openSetid.includes(currentLocation.neighbour[i].id)){
                        
                            let YLocation = parseInt(currentLocation.neighbour[i].id.split(/[Y,X]+/)[1]);
                            let XLocation = parseInt(currentLocation.neighbour[i].id.split(/[Y,X]+/)[2]);
                            mapTiles[YLocation][XLocation].daddy = currentLocation.tileid.id;
                            mapTiles[YLocation][XLocation].G_value = calcGscore(mapTiles[YLocation][XLocation].tileid, currentLocation.tileid) + currentLocation.G_value;
                            mapTiles[YLocation][XLocation].F_value = calcHscore(mapTiles[YLocation][XLocation].tileid,  targetLocation.tileid) +  mapTiles[YLocation][XLocation].G_value;                       
                            openSet.push(mapTiles[YLocation][XLocation])
                            openSetid.push(mapTiles[YLocation][XLocation].tileid.id);
                 
                        }
                    }
                }
            }
        }
        if(targetLocation == currentLocation){    
            return findPath(currentLocation, startLocation);
        }
        if(limit==1000){
            return false;
        }
        limit++;
    }   

    
}
function findPath(currentLocation, startLocation){
    let totalPath = [];
    let YLocation = parseInt(currentLocation.tileid.id.split(/[Y,X]+/)[1]);
    let XLocation = parseInt(currentLocation.tileid.id.split(/[Y,X]+/)[2]);
    let i = 1;
    totalPath.push(mapTiles[YLocation][XLocation].tileid.id)
    while (mapTiles[YLocation][XLocation] != startLocation){
        totalPath.push(mapTiles[YLocation][XLocation].daddy)
        //document.getElementById(mapTiles[YLocation][XLocation].tileid.id).style.backgroundColor = 'red';
        YLocation = parseInt(totalPath[i].split(/[Y,X]+/)[1]);
        XLocation = parseInt(totalPath[i].split(/[Y,X]+/)[2]);
        i++;
    }
    totalPath.pop();
    return totalPath.reverse();
}

function calcHscore(neighbour, targetLocation){

    hValue = Math.abs(parseInt(neighbour.id.split(/[Y,X]+/)[1]) - parseInt(targetLocation.id.split(/[Y,X]+/)[1])) + Math.abs(parseInt(neighbour.id.split(/[Y,X]+/)[2]) - parseInt(targetLocation.id.split(/[Y,X]+/)[2]));
    return hValue;
}
function calcGscore(neighbour, startingLocation){
    let gValueToN = Math.abs(parseInt(startingLocation.id.split(/[Y,X]+/)[1]) - parseInt(neighbour.id.split(/[Y,X]+/)[1])) + Math.abs(parseInt(startingLocation.id.split(/[Y,X]+/)[2]) - parseInt(neighbour.id.split(/[Y,X]+/)[2]));
    return gValueToN;
}
function calcFscore(neighbour, startingLocation, targetLocation){
    let fValue = calcGscore(neighbour, startingLocation)+calcHscore(neighbour, targetLocation);
    return fValue;
}

function findNeighbours(ylenght, xlenght){

    for(var i = 0 ; i < ylenght; i++){
        for(var j = 0 ; j < xlenght; j++){
            let x = 0;
            
            if(mapTiles[i][j+1]){
                mapTiles[i][j].neighbour[x]= mapTiles[i][j+1].tileid;
                x++;
            }
            if(mapTiles[i][j-1]){
                mapTiles[i][j].neighbour[x]= mapTiles[i][j-1].tileid;
                x++;
            }
            if(mapTiles[i+1]){
                mapTiles[i][j].neighbour[x]= mapTiles[i+1][j].tileid;
                x++;
            }
            if(mapTiles[i-1]){
                mapTiles[i][j].neighbour[x]= mapTiles[i-1][j].tileid;
            }
            
        }
    } 
}

