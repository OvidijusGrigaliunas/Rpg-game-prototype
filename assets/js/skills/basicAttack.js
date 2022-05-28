var viableAttacks= [];
function meleeAttack(){
    choiseReset();
    if (MCharacter.ActionPoints > 1){    
        var tileXY = MCharacter.CModel.parentNode.id.split(/[Y,X]+/);
        var YLocation = parseInt(tileXY[1]);
        var XLocation = parseInt(tileXY[2]);
        for(let i = 1; i<MCharacter.AttackRange+1;i++){
            if(mapTiles[YLocation+i]){
                if(LocationList.includes(mapTiles[YLocation+i][XLocation].tileid.id)){
                    document.getElementById(mapTiles[YLocation+i][XLocation].tileid.id).style.backgroundColor = 'rgb(255, 0, 0, 0.5)';
                    document.getElementById(mapTiles[YLocation+i][XLocation].tileid.id).style.cursor = 'pointer';
                    viableAttacks.push(mapTiles[YLocation+i][XLocation].tileid.id)
                    document.getElementById(mapTiles[YLocation+i][XLocation].tileid.id).addEventListener('click', attackTarget)
                }
                else if(!blockedLocations.mountains.includes(mapTiles[YLocation][XLocation-i].tileid.id) && !LocationList.includes(mapTiles[YLocation][XLocation-i].tileid.id)){
                    break;
                }
            }   
        }
        for(let i = 1; i<MCharacter.AttackRange+1;i++){
            if(mapTiles[YLocation-i]){
                if(LocationList.includes(mapTiles[YLocation-i][XLocation].tileid.id)){
                    document.getElementById(mapTiles[YLocation-i][XLocation].tileid.id).style.backgroundColor = 'rgb(255, 0, 0, 0.5)';
                    document.getElementById(mapTiles[YLocation-i][XLocation].tileid.id).style.cursor = 'pointer';
                    viableAttacks.push(mapTiles[YLocation-i][XLocation].tileid.id)
                    document.getElementById(mapTiles[YLocation-i][XLocation].tileid.id).addEventListener('click', attackTarget)
                }
                else if(!blockedLocations.mountains.includes(mapTiles[YLocation][XLocation-i].tileid.id) && !LocationList.includes(mapTiles[YLocation][XLocation-i].tileid.id)){
                    break;
                }
            }
        }
        for(let i = 1; i<MCharacter.AttackRange+1;i++){
            if(mapTiles[YLocation][XLocation+i]){
                if(LocationList.includes(mapTiles[YLocation][XLocation+i].tileid.id)){
                    document.getElementById(mapTiles[YLocation][XLocation+i].tileid.id).style.backgroundColor = 'rgb(255, 0, 0, 0.5)';
                    document.getElementById(mapTiles[YLocation][XLocation+i].tileid.id).style.cursor = 'pointer';
                    viableAttacks.push(mapTiles[YLocation][XLocation+i].tileid.id)
                    document.getElementById(mapTiles[YLocation][XLocation+i].tileid.id).addEventListener('click', attackTarget)
                }
                else if(!blockedLocations.mountains.includes(mapTiles[YLocation][XLocation-i].tileid.id) && !LocationList.includes(mapTiles[YLocation][XLocation-i].tileid.id)){
                    break;
            }}
        }
        for(let i = 1; i<MCharacter.AttackRange+1;i++){
            if(mapTiles[YLocation][XLocation-i]){
                if(LocationList.includes(mapTiles[YLocation][XLocation-i].tileid.id)){
                    document.getElementById(mapTiles[YLocation][XLocation-i].tileid.id).style.backgroundColor = 'rgb(255, 0, 0, 0.5)';
                    document.getElementById(mapTiles[YLocation][XLocation-i].tileid.id).style.cursor = 'pointer';
                    viableAttacks.push(mapTiles[YLocation][XLocation-i].tileid.id)
                    document.getElementById(mapTiles[YLocation][XLocation-i].tileid.id).addEventListener('click', attackTarget)
                }
                else if(!blockedLocations.mountains.includes(mapTiles[YLocation][XLocation-i].tileid.id) && !LocationList.includes(mapTiles[YLocation][XLocation-i].tileid.id)){
                    break;
                }
            }
        }
    }
    else{
        alert('Out of action points')
    }

}
function attackTarget(){
    let enemyIndex = LocationList.indexOf(this.id);
    botEnem[enemyIndex].HP = botEnem[enemyIndex].HP - MCharacter.Strenght/(1-botEnem[enemyIndex].resistances.physical/100);
    characterStatus();
    choiseReset();
    MCharacter.ActionPoints-= 2;
    updateBars();
    
    
}