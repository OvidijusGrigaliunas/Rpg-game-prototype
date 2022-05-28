var currentSkill;
var skillDirection;
var selectionTiles = [];
function activateTheSkill(skill){
    choiseReset();
    if(document.getElementById('SkillInfo')){
        document.getElementById('SkillInfo').remove()
    }
    currentSkill = skill;
    switch (skill.type){
        case 'offensive':
            switch (skill.direction){
                case 'line':
                    if(MCharacter.ActionPoints >= skill.actionPointCost && MCharacter.MP >= skill.manaCost){
                    offLineSkill(skill);
                    }
                    break;
                case 'Selection':
                    if(MCharacter.ActionPoints >= skill.actionPointCost && MCharacter.MP >= skill.manaCost){
                        SelectionSkill(skill);
                        }
                    break;
            }
                
            break;
        default:
            break;
        

    }
    
}
function offLineSkill(skill){
    skillDirection = []
    
    let tileCounter=0;
    let tileXY = MCharacter.CModel.parentNode.id.split(/[Y,X]+/);;
    let YLocation = parseInt(tileXY[1]);
    let XLocation = parseInt(tileXY[2]);
    for(let i = 1; i< skill.range+1;i++){
        if(mapTiles[YLocation+i] && mapTiles[YLocation+i]){
            if(!blockedLocations.mountains.includes(mapTiles[YLocation+i][XLocation].tileid.id)){
                document.getElementById(mapTiles[YLocation+i][XLocation].tileid.id).style.backgroundColor = 'rgb(255, 0, 0, 0.5)';
                document.getElementById(mapTiles[YLocation+i][XLocation].tileid.id).style.cursor = 'pointer';
                document.getElementById(mapTiles[YLocation+i][XLocation].tileid.id).addEventListener('click', offLineSkillActivate)
                skillDirection[tileCounter] = {
                    'tile' : mapTiles[YLocation+i][XLocation].tileid.id,
                    'direction' : 'down',
                };
                tileCounter++;
                viableAttacks.push(mapTiles[YLocation+i][XLocation].tileid.id)
            }
            else{
                break;
            }
        }   
    }
    for(let i = 1; i<skill.range+1;i++){
        if(mapTiles[YLocation-i]){
            if(!blockedLocations.mountains.includes(mapTiles[YLocation-i][XLocation].tileid.id)){
                document.getElementById(mapTiles[YLocation-i][XLocation].tileid.id).style.backgroundColor = 'rgb(255, 0, 0, 0.5)';
                document.getElementById(mapTiles[YLocation-i][XLocation].tileid.id).style.cursor = 'pointer';
                document.getElementById(mapTiles[YLocation-i][XLocation].tileid.id).addEventListener('click', offLineSkillActivate)
               
                skillDirection[tileCounter] = {
                    'tile' : mapTiles[YLocation-i][XLocation].tileid.id,
                    'direction' : 'up',
                };
                tileCounter++;
                viableAttacks.push(mapTiles[YLocation-i][XLocation].tileid.id)
                
            }
            else{
                break;
            }
        }
    }
    for(let i = 1; i<skill.range+1;i++){
        if(mapTiles[YLocation][XLocation+i]){
            if(!blockedLocations.mountains.includes(mapTiles[YLocation][XLocation+i].tileid.id)){
                document.getElementById(mapTiles[YLocation][XLocation+i].tileid.id).style.backgroundColor = 'rgb(255, 0, 0, 0.5)';
                document.getElementById(mapTiles[YLocation][XLocation+i].tileid.id).style.cursor = 'pointer';
                document.getElementById(mapTiles[YLocation][XLocation+i].tileid.id).addEventListener('click', offLineSkillActivate)
                skillDirection[tileCounter] = {
                    'tile' : mapTiles[YLocation][XLocation+i].tileid.id,
                    'direction' : 'right',
                };
                tileCounter++;
                viableAttacks.push(mapTiles[YLocation][XLocation+i].tileid.id)
            }
            else{
                break;
        }}
    }
    for(let i = 1; i<skill.range+1;i++){
        if(mapTiles[YLocation][XLocation-i]){
            if(!blockedLocations.mountains.includes(mapTiles[YLocation][XLocation-i].tileid.id)){
                document.getElementById(mapTiles[YLocation][XLocation-i].tileid.id).style.backgroundColor = 'rgb(255, 0, 0, 0.5)';
                document.getElementById(mapTiles[YLocation][XLocation-i].tileid.id).style.cursor = 'pointer';
                document.getElementById(mapTiles[YLocation][XLocation-i].tileid.id).addEventListener('click', offLineSkillActivate)
                skillDirection[tileCounter] = {
                    'tile' : mapTiles[YLocation][XLocation-i].tileid.id,
                    'direction' : 'left',
                };
                tileCounter++;;
                viableAttacks.push(mapTiles[YLocation][XLocation-i].tileid.id)
            }
            else{
                break;
            }
        }
    }
    
    
}
function offLineSkillActivate(){
    let tileXY = MCharacter.CModel.parentNode.id.split(/[Y,X]+/);;
    let YLocation = parseInt(tileXY[1]);
    let XLocation = parseInt(tileXY[2]);
    let punchthrough = currentSkill.punchthrough+1;
    let attackDirection;
    let actionList=[];
    for(let i = 0; i < skillDirection.length; i++){
        if(this.id == skillDirection[i].tile){
            attackDirection = skillDirection[i].direction;
            
        }
    }
    switch (attackDirection){
        case 'down':
            for(let i = 1; i< currentSkill.range+1;i++){
                if(mapTiles[YLocation+i] && mapTiles[YLocation+i]){
                    if(!blockedLocations.mountains.includes(mapTiles[YLocation+i][XLocation].tileid.id) && punchthrough != 0){
                        actionList.push(mapTiles[YLocation+i][XLocation].tileid);
                        if(LocationList.includes(mapTiles[YLocation+i][XLocation].tileid.id)){
                            
                            punchthrough--;
                   
                        }   
                    }
                    else{
                        break;
                    }
                }   
            }
            break;

        case 'up':
            for(let i = 1; i< currentSkill.range+1;i++){
                if(mapTiles[YLocation-i] && mapTiles[YLocation-i]){
                    if(!blockedLocations.mountains.includes(mapTiles[YLocation-i][XLocation].tileid.id) && punchthrough != 0){
                        actionList.push(mapTiles[YLocation-i][XLocation].tileid);
                        if(LocationList.includes(mapTiles[YLocation-i][XLocation].tileid.id)){
                     
                            punchthrough--;
      
                                
                        }   
                    }
                    else{
                        break;
                    }
                }   
            }
            break;

        case 'left':
            for(let i = 1; i< currentSkill.range+1;i++){
                if(mapTiles[YLocation][XLocation-i]){
                    if(!blockedLocations.mountains.includes(mapTiles[YLocation][XLocation-i].tileid.id) && punchthrough != 0){
                        actionList.push(mapTiles[YLocation][XLocation-i].tileid);
                        if(LocationList.includes(mapTiles[YLocation][XLocation-i].tileid.id)){
     
                            punchthrough--;
                     
                        }   
                    }
                    else{
                        break;
                    }
                }   
            }
            break;

        case 'right':
            for(let i = 1; i< currentSkill.range+1;i++){
                if(mapTiles[YLocation][XLocation+i]){
                    if(!blockedLocations.mountains.includes(mapTiles[YLocation][XLocation+i].tileid.id)&& punchthrough != 0){
                        actionList.push(mapTiles[YLocation][XLocation+i].tileid);
                        if(LocationList.includes(mapTiles[YLocation][XLocation+i].tileid.id)){
                            
                            punchthrough--;
                            
                        }   
                    }
                    else{
                        break;
                    }
                }   
            }


            break;

        default:
            break;
            
    }
    MCharacter.MP -= currentSkill.manaCost;
    MCharacter.ActionPoints -= currentSkill.actionPointCost;
    updateBars();
    animateOffLineSkill(currentSkill, actionList, attackDirection)
    characterStatus();
    
    
}

function SelectionSkill(skill){
    
    let tileXY = MCharacter.CModel.parentNode.id.split(/[Y,X]+/);;
    let YLocation = parseInt(tileXY[1]);
    let XLocation = parseInt(tileXY[2]);
    let possibleMovement=[];    
    for (let i = 1; i < skill.range+1 ; i++){
        
        if(mapTiles[YLocation+i]){
            let newpossibleMovement = [];
            newpossibleMovement.push(Pathfinder('player', mapTiles[YLocation+i][XLocation], 'skill'));
            for (let k = 0; k < skill.range; k++){
                if(newpossibleMovement[0] && newpossibleMovement[0][k]){
                    possibleMovement.push(newpossibleMovement[0][k])
           
                }
                else{
                    break;
                }

            }
            
        }

        if(mapTiles[YLocation-i]){
            let newpossibleMovement = [];
            newpossibleMovement.push(Pathfinder('player', mapTiles[YLocation-i][XLocation], 'skill'));
            for (let k = 0; k < skill.range; k++){
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
            newpossibleMovement.push(Pathfinder('player', mapTiles[YLocation][XLocation+i], 'skill'));
            for (let k = 0; k < skill.range; k++){
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
            newpossibleMovement.push(Pathfinder('player', mapTiles[YLocation][XLocation-i], 'skill'));
            for (let k = 0; k < skill.range; k++){
                if(newpossibleMovement[0] && newpossibleMovement[0][k]){
                    possibleMovement.push(newpossibleMovement[0][k])
                }
                else{
                    break;
                }

            }
            
        }
        for(let j = 1; j < skill.range+1-i; j++){
            if(mapTiles[YLocation-i] &&  mapTiles[YLocation-i][XLocation+j]){
                let newpossibleMovement = [];
                newpossibleMovement.push(Pathfinder('player', mapTiles[YLocation-i][XLocation+j], 'skill'));
                for (let k = 0; k < skill.range; k++){
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
                newpossibleMovement.push(Pathfinder('player', mapTiles[YLocation+i][XLocation+j], 'skill'));
                for (let k = 0; k < skill.range; k++){
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
                newpossibleMovement.push(Pathfinder('player', mapTiles[YLocation-i][XLocation-j], 'skill'));
                for (let k = 0; k < skill.range; k++){
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
                newpossibleMovement.push(Pathfinder('player', mapTiles[YLocation+i][XLocation-j], 'skill'));
                for (let k = 0; k < skill.range; k++){
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
    
    for(let i = 0; i < possibleMovement.length; i++){
        if(possibleMovement[i]){
                if(!blockedLocations.mountains.includes(possibleMovement[i].id)){
                    document.getElementById(possibleMovement[i]).style.backgroundColor= 'rgb(0, 128, 0, 0.5)';
                    document.getElementById(possibleMovement[i]).style.cursor= 'pointer';
                    viableAttacks.push(possibleMovement[i]);
                    document.getElementById(possibleMovement[i]).addEventListener("click", activateSelectionSkill);
                    document.getElementById(possibleMovement[i]).addEventListener("mouseover", showExplosionRadius);
                }
                
            
        }
        
    }
    document.getElementById(playerPosition).style.backgroundColor = 'rgb(0, 128, 0, 0.5)';
    document.getElementById(playerPosition).style.cursor= 'pointer';
    viableAttacks.push(playerPosition);
    
    document.getElementById(playerPosition).addEventListener("click", activateSelectionSkill);
    document.getElementById(playerPosition).addEventListener("mouseover", showExplosionRadius);
}
function showExplosionRadius(){
    for(let i = 0; i < selectionTiles.length; i++){
        document.getElementById(selectionTiles[i]).style.backgroundColor = '';
    }
    for(let i = 0; i < viableAttacks.length; i++){
        document.getElementById( viableAttacks[i]).style.backgroundColor = 'rgb(0, 128, 0, 0.5)';
    }  
    selectionTiles=[];
    let tileXY = this.id.split(/[Y,X]+/);;
    let YLocation = parseInt(tileXY[1]);
    let XLocation = parseInt(tileXY[2]);
    document.getElementById(this.id).style.backgroundColor = 'rgb(255, 0, 0, 0.5)';
    if(currentSkill.name != "Frost blades"){    
        for (let i = 1; i < currentSkill.explosionRange+1 ; i++){
            
            if(mapTiles[YLocation+i]){
                document.getElementById(mapTiles[YLocation+i][XLocation].tileid.id).style.backgroundColor = 'rgb(255, 0, 0, 0.5)';
                selectionTiles.push(mapTiles[YLocation+i][XLocation].tileid.id);
                
                    
            }

            if(mapTiles[YLocation-i]){
                document.getElementById(mapTiles[YLocation-i][XLocation].tileid.id).style.backgroundColor = 'rgb(255, 0, 0, 0.5)';
                selectionTiles.push(mapTiles[YLocation-i][XLocation].tileid.id);
    
            }
            if(mapTiles[YLocation][XLocation+i]){
                document.getElementById(mapTiles[YLocation][XLocation+i].tileid.id).style.backgroundColor = 'rgb(255, 0, 0, 0.5)';
                selectionTiles.push(mapTiles[YLocation][XLocation+i].tileid.id);
                
            }
            if(mapTiles[YLocation][XLocation-i]){
                document.getElementById(mapTiles[YLocation][XLocation-i].tileid.id).style.backgroundColor = 'rgb(255, 0, 0, 0.5)';
                selectionTiles.push(mapTiles[YLocation][XLocation-i].tileid.id);
                
            }

            for(let j = 1; j < currentSkill.explosionRange+1-i; j++){
                if(mapTiles[YLocation-i] &&  mapTiles[YLocation-i][XLocation+j]){
                    document.getElementById(mapTiles[YLocation-i][XLocation+j].tileid.id).style.backgroundColor = 'rgb(255, 0, 0, 0.5)';
                    selectionTiles.push(mapTiles[YLocation-i][XLocation+j].tileid.id);

                    
                }
                if(mapTiles[YLocation+i] &&  mapTiles[YLocation+i][XLocation+j]){
                    document.getElementById(mapTiles[YLocation+i][XLocation+j].tileid.id).style.backgroundColor = 'rgb(255, 0, 0, 0.5)';
                    selectionTiles.push(mapTiles[YLocation+i][XLocation+j].tileid.id);

                }
                if(mapTiles[YLocation-i] &&  mapTiles[YLocation-i][XLocation-j]){
                    document.getElementById(mapTiles[YLocation-i][XLocation-j].tileid.id).style.backgroundColor = 'rgb(255, 0, 0, 0.5)';
                    selectionTiles.push(mapTiles[YLocation-i][XLocation-j].tileid.id);

                    
                }
                if(mapTiles[YLocation+i] &&  mapTiles[YLocation+i][XLocation-j]){
                    document.getElementById(mapTiles[YLocation+i][XLocation-j].tileid.id).style.backgroundColor = 'rgb(255, 0, 0, 0.5)';
                    selectionTiles.push(mapTiles[YLocation+i][XLocation-j].tileid.id);

                    
                }
                


            }
        }
    }
    else if(currentSkill.name == "Frost blades"){    
        for (let i = 1; i < currentSkill.explosionRange+1 ; i++){
            
            if(mapTiles[YLocation+i]){
                document.getElementById(mapTiles[YLocation+i][XLocation].tileid.id).style.backgroundColor = 'rgb(255, 0, 0, 0.5)';
                selectionTiles.push(mapTiles[YLocation+i][XLocation].tileid.id);
                
                    
            }

            if(mapTiles[YLocation-i]){
                document.getElementById(mapTiles[YLocation-i][XLocation].tileid.id).style.backgroundColor = 'rgb(255, 0, 0, 0.5)';
                selectionTiles.push(mapTiles[YLocation-i][XLocation].tileid.id);
    
            }
            if(mapTiles[YLocation][XLocation+i]){
                document.getElementById(mapTiles[YLocation][XLocation+i].tileid.id).style.backgroundColor = 'rgb(255, 0, 0, 0.5)';
                selectionTiles.push(mapTiles[YLocation][XLocation+i].tileid.id);
                
            }
            if(mapTiles[YLocation][XLocation-i]){
                document.getElementById(mapTiles[YLocation][XLocation-i].tileid.id).style.backgroundColor = 'rgb(255, 0, 0, 0.5)';
                selectionTiles.push(mapTiles[YLocation][XLocation-i].tileid.id);
                
            }

            for(let j = 1; j < currentSkill.explosionRange+2-i; j++){
                if(mapTiles[YLocation-i] &&  mapTiles[YLocation-i][XLocation+j]){
                    document.getElementById(mapTiles[YLocation-i][XLocation+j].tileid.id).style.backgroundColor = 'rgb(255, 0, 0, 0.5)';
                    selectionTiles.push(mapTiles[YLocation-i][XLocation+j].tileid.id);

                    
                }
                if(mapTiles[YLocation+i] &&  mapTiles[YLocation+i][XLocation+j]){
                    document.getElementById(mapTiles[YLocation+i][XLocation+j].tileid.id).style.backgroundColor = 'rgb(255, 0, 0, 0.5)';
                    selectionTiles.push(mapTiles[YLocation+i][XLocation+j].tileid.id);

                }
                if(mapTiles[YLocation-i] &&  mapTiles[YLocation-i][XLocation-j]){
                    document.getElementById(mapTiles[YLocation-i][XLocation-j].tileid.id).style.backgroundColor = 'rgb(255, 0, 0, 0.5)';
                    selectionTiles.push(mapTiles[YLocation-i][XLocation-j].tileid.id);

                    
                }
                if(mapTiles[YLocation+i] &&  mapTiles[YLocation+i][XLocation-j]){
                    document.getElementById(mapTiles[YLocation+i][XLocation-j].tileid.id).style.backgroundColor = 'rgb(255, 0, 0, 0.5)';
                    selectionTiles.push(mapTiles[YLocation+i][XLocation-j].tileid.id);

                    
                }
                


            }
        }
    }

}

function activateSelectionSkill(){
    
    let tileXY = this.id.split(/[Y,X]+/);;
    let YLocation = parseInt(tileXY[1]);
    let XLocation = parseInt(tileXY[2]);
    let AffectedTiles=[]; 
    AffectedTiles.push(this.id)   
    choiseReset();
    if(currentSkill.name != "Frost blades"){
        for (let i = 1; i < currentSkill.explosionRange+1 ; i++){
            
            if(mapTiles[YLocation+i]){
                AffectedTiles.push(mapTiles[YLocation+i][XLocation].tileid.id)     
            }
            if(mapTiles[YLocation-i]){
                AffectedTiles.push(mapTiles[YLocation-i][XLocation].tileid.id)
    
            }
            if(mapTiles[YLocation][XLocation+i]){
                AffectedTiles.push(mapTiles[YLocation][XLocation+i].tileid.id)
                
            }
            if(mapTiles[YLocation][XLocation-i]){
                AffectedTiles.push(mapTiles[YLocation][XLocation-i].tileid.id)
                
            }
            for(let j = 1; j < currentSkill.explosionRange+1-i; j++){
                if(mapTiles[YLocation-i] &&  mapTiles[YLocation-i][XLocation+j]){
                    AffectedTiles.push(mapTiles[YLocation-i][XLocation+j].tileid.id)
                    
                }
                if(mapTiles[YLocation+i] &&  mapTiles[YLocation+i][XLocation+j]){
                    AffectedTiles.push(mapTiles[YLocation+i][XLocation+j].tileid.id)
                    
                }
                if(mapTiles[YLocation-i] &&  mapTiles[YLocation-i][XLocation-j]){
                    AffectedTiles.push(mapTiles[YLocation-i][XLocation-j].tileid.id)
                    
                }
                if(mapTiles[YLocation+i] &&  mapTiles[YLocation+i][XLocation-j]){
                    AffectedTiles.push(mapTiles[YLocation+i][XLocation-j].tileid.id)
                    
                }
                


            }
        }
    }
    
    else if(currentSkill.name == "Frost blades"){
        for (let i = 1; i < currentSkill.explosionRange+1; i++){
            
            if(mapTiles[YLocation+i]){
                AffectedTiles.push(mapTiles[YLocation+i][XLocation].tileid.id)     
                AffectedTiles.push(mapTiles[YLocation+i][XLocation].tileid.id)     

            }
            if(mapTiles[YLocation-i]){
                AffectedTiles.push(mapTiles[YLocation-i][XLocation].tileid.id)
                AffectedTiles.push(mapTiles[YLocation-i][XLocation].tileid.id)

    
            }
            if(mapTiles[YLocation][XLocation+i]){
                AffectedTiles.push(mapTiles[YLocation][XLocation+i].tileid.id)
                AffectedTiles.push(mapTiles[YLocation][XLocation+i].tileid.id)

                
            }
            if(mapTiles[YLocation][XLocation-i]){
                AffectedTiles.push(mapTiles[YLocation][XLocation-i].tileid.id)
                AffectedTiles.push(mapTiles[YLocation][XLocation-i].tileid.id)

                
            }
            for(let j = 1; j < currentSkill.explosionRange+2-i; j++){
                if(mapTiles[YLocation-i] &&  mapTiles[YLocation-i][XLocation+j]){
                    AffectedTiles.push(mapTiles[YLocation-i][XLocation+j].tileid.id)
                    
                }
                if(mapTiles[YLocation+i] &&  mapTiles[YLocation+i][XLocation+j]){
                    AffectedTiles.push(mapTiles[YLocation+i][XLocation+j].tileid.id)
                    
                }
                if(mapTiles[YLocation-i] &&  mapTiles[YLocation-i][XLocation-j]){
                    AffectedTiles.push(mapTiles[YLocation-i][XLocation-j].tileid.id)
                    
                }
                if(mapTiles[YLocation+i] &&  mapTiles[YLocation+i][XLocation-j]){
                    AffectedTiles.push(mapTiles[YLocation+i][XLocation-j].tileid.id)
                    
                }
            }
        }
    }
    switch (currentSkill.type){
        case 'offensive':
            switch (currentSkill.name){
                case 'Ignition':
                    animateOffSelectionSkill(currentSkill, AffectedTiles);
                    break;
                case 'Chaos orbs':
                    animateChaos(currentSkill, AffectedTiles);
                    break;
                case 'Frost blades':
                    animateFrostBlades(currentSkill, AffectedTiles);
                    break;
                default:
                    break;
            }
           
            break;
        default:
            break;
    }
    MCharacter.MP -= currentSkill.manaCost;
    MCharacter.ActionPoints -= currentSkill.actionPointCost;
    updateBars();
    characterStatus();

}