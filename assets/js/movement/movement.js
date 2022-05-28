var playerPosition;


function moveChoise(tile){
    choiseReset();
    var tileXY = tile.split(/[Y,X]+/);
    var YLocation = parseInt(tileXY[1]);
    var XLocation = parseInt(tileXY[2]);
    let possibleMovement=[];
    //MCharacter.movespeed+=5;
    
    if(MCharacter.ActionPoints>0){   
        for (let i = 1; i < MCharacter.movespeed+1 ; i++){


         
            if(mapTiles[YLocation+i]){
                let newpossibleMovement = [];
                //document.getElementById(mapTiles[YLocation+i][XLocation].tileid.id).style.backgroundColor= 'green'
                newpossibleMovement.push(Pathfinder('player', mapTiles[YLocation+i][XLocation]));
                for (let k = 0; k < MCharacter.movespeed; k++){
                    if(newpossibleMovement[0] && newpossibleMovement[0][k]){
                        possibleMovement.push(newpossibleMovement[0][k])
                    // console.log(newpossibleMovement[0])
                        //console.log(newpossibleMovement[0].length+' '+ MCharacter.movespeed) 
                    }
                    else{
                        break;
                    }

                }
                
            }

            if(mapTiles[YLocation-i]){
                let newpossibleMovement = [];
                //document.getElementById(mapTiles[YLocation-i][XLocation].tileid.id).style.backgroundColor= 'green'
                newpossibleMovement.push(Pathfinder('player', mapTiles[YLocation-i][XLocation]));
                for (let k = 0; k < MCharacter.movespeed; k++){
                    if(newpossibleMovement[0] && newpossibleMovement[0][k]){
                        possibleMovement.push(newpossibleMovement[0][k])
                    }
                    else{
                        break;
                    }

                }
                
            }
            if(mapTiles[YLocation][XLocation+i]){
                let newpossibleMovement = [];
                //document.getElementById(mapTiles[YLocation][XLocation+i].tileid.id).style.backgroundColor= 'green'
                newpossibleMovement.push(Pathfinder('player', mapTiles[YLocation][XLocation+i]));
                for (let k = 0; k < MCharacter.movespeed; k++){
                    if(newpossibleMovement[0] && newpossibleMovement[0][k]){
                        possibleMovement.push(newpossibleMovement[0][k])
                    }
                    else{
                        break;
                    }

                }
                
            }
            if(mapTiles[YLocation][XLocation-i]){
                let newpossibleMovement = [];
                //document.getElementById(mapTiles[YLocation][XLocation-i].tileid.id).style.backgroundColor= 'green'
                newpossibleMovement.push(Pathfinder('player', mapTiles[YLocation][XLocation-i]));
                for (let k = 0; k < MCharacter.movespeed; k++){
                    if(newpossibleMovement[0] && newpossibleMovement[0][k]){
                        possibleMovement.push(newpossibleMovement[0][k])
                        //console.log(newpossibleMovement[0][k])
                    }
                    else{
                        break;
                    }

                }
                
            }





            for(let j = 1; j < MCharacter.movespeed+1-i; j++){
                if(mapTiles[YLocation-i] &&  mapTiles[YLocation-i][XLocation+j]){
                    let newpossibleMovement = [];
                    //document.getElementById(mapTiles[YLocation-i][XLocation+j].tileid.id).style.backgroundColor= 'green'
                    newpossibleMovement.push(Pathfinder('player', mapTiles[YLocation-i][XLocation+j]));
                    for (let k = 0; k < MCharacter.movespeed; k++){
                        if(newpossibleMovement[0] && newpossibleMovement[0][k]){
                            possibleMovement.push(newpossibleMovement[0][k])
                        }
                        else{
                            break;
                        }

                    }
                    
                }
                if(mapTiles[YLocation+i] &&  mapTiles[YLocation+i][XLocation+j]){
                    let newpossibleMovement = [];
                    //document.getElementById(mapTiles[YLocation+i][XLocation+j].tileid.id).style.backgroundColor= 'green'
                    newpossibleMovement.push(Pathfinder('player', mapTiles[YLocation+i][XLocation+j]));
                    for (let k = 0; k < MCharacter.movespeed; k++){
                        if(newpossibleMovement[0] && newpossibleMovement[0][k]){
                            possibleMovement.push(newpossibleMovement[0][k])
                        }
                        else{
                            break;
                        }

                    }
                    
                }
                if(mapTiles[YLocation-i] &&  mapTiles[YLocation-i][XLocation-j]){
                    let newpossibleMovement = [];
                    //document.getElementById(mapTiles[YLocation-i][XLocation-j].tileid.id).style.backgroundColor= 'green'
                    newpossibleMovement.push(Pathfinder('player', mapTiles[YLocation-i][XLocation-j]));
                    for (let k = 0; k < MCharacter.movespeed; k++){
                        if(newpossibleMovement[0] && newpossibleMovement[0][k]){
                            possibleMovement.push(newpossibleMovement[0][k])
                        }
                        else{
                            break;
                        }

                    }
                    
                }
                if(mapTiles[YLocation+i] &&  mapTiles[YLocation+i][XLocation-j]){
                    let newpossibleMovement = [];
                    //document.getElementById(mapTiles[YLocation+i][XLocation-j].tileid.id).style.backgroundColor= 'green'
                    newpossibleMovement.push(Pathfinder('player', mapTiles[YLocation+i][XLocation-j]));
                    for (let k = 0; k < MCharacter.movespeed; k++){
                        if(newpossibleMovement[0] && newpossibleMovement[0][k]){
                            possibleMovement.push(newpossibleMovement[0][k])
                            

                        }
                        else{
                            break;
                        }

                    }
                    
                }
                


            }
        }

        possibleMovement = possibleMovement.filter(onlyUnique)
        //console.log(possibleMovement); 
        
        for(let i = 0; i < possibleMovement.length; i++){
            if(possibleMovement[i]){
                if(!LocationList.includes(possibleMovement[i]) && !blockedLocations.mountains.includes(possibleMovement[i])){
                    document.getElementById(possibleMovement[i]).style.backgroundColor= 'rgb(0, 128, 0, 0.5)';
                    document.getElementById(possibleMovement[i]).style.cursor= 'pointer';
                    document.getElementById(possibleMovement[i]).addEventListener("click", function() {
                        MoveToTile(tile, this.id);
                    });
                }   
            }
            
        }
        //MCharacter.movespeed-=5;
    } 
    else{
        alert('Out of movement')
    }   
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
} 

function moveChoiseEvent(){
    moveChoise(MCharacter.CModel.parentNode.id)
}
function MoveToTile(curTile, movTile){
    
    document.getElementById(curTile).innerHTML='';
    var newelement = document.getElementById(movTile).cloneNode(true);
    document.getElementById(movTile).parentNode.replaceChild(newelement, document.getElementById(movTile));
    document.getElementById(movTile).style.backgroundColor='';
    document.getElementById(movTile).style.cursor='default';
    document.getElementById(movTile).appendChild(MCharacter.CModel);
    playerPosition = MCharacter.CModel.parentNode.id;
    choiseReset();
    MCharacter.ActionPoints--;
    updateBars();
}
function choiseReset(){
    for (var i = 0; i< 20; i++){
        for (var j = 0; j< 40; j++){
            if(document.getElementById(`TileY${i}X${j}`) && !document.getElementById(`TileY${i}X${j}`).hasChildNodes()){
                var newelement = document.getElementById(`TileY${i}X${j}`).cloneNode(true);
                document.getElementById(`TileY${i}X${j}`).parentNode.replaceChild(newelement, document.getElementById(`TileY${i}X${j}`));
                document.getElementById(`TileY${i}X${j}`).style.backgroundColor='';
                document.getElementById(`TileY${i}X${j}`).style.cursor='default';

            }
            if(viableAttacks.includes(`TileY${i}X${j}`) || selectionTiles.includes(`TileY${i}X${j}`)){
                document.getElementById(`TileY${i}X${j}`).style.backgroundColor='';
                document.getElementById(`TileY${i}X${j}`).style.cursor='default';
                document.getElementById(`TileY${i}X${j}`).removeEventListener('click', attackTarget);
                document.getElementById(`TileY${i}X${j}`).removeEventListener('click', offLineSkillActivate);
                document.getElementById(`TileY${i}X${j}`).removeEventListener("click", activateSelectionSkill);
                document.getElementById(`TileY${i}X${j}`).removeEventListener("mouseover", showExplosionRadius);
            }
            
        }
    }
    
    viableAttacks = [];
    selectionTiles = [];
    

   
}
