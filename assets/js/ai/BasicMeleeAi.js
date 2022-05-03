function BasicMeleeAi (movespeed){
    let inRange = false;
    let actionList = [];
    Mainloop:
    while (botEnem[turnOrder-1].ActionPoints  > 0){
        for(let i = 0; i < mapTiles[parseInt(botEnem[turnOrder-1].Enemy.parentNode.id.split(/[Y,X]+/)[1])][parseInt(botEnem[turnOrder-1].Enemy.parentNode.id.split(/[Y,X]+/)[2])].neighbour.length; i++){
            if(mapTiles[parseInt(botEnem[turnOrder-1].Enemy.parentNode.id.split(/[Y,X]+/)[1])][parseInt(botEnem[turnOrder-1].Enemy.parentNode.id.split(/[Y,X]+/)[2])].neighbour[i].id == playerPosition){
                for(let i = 0; i < mapTiles[parseInt(botEnem[turnOrder-1].Enemy.parentNode.id.split(/[Y,X]+/)[1])][parseInt(botEnem[turnOrder-1].Enemy.parentNode.id.split(/[Y,X]+/)[2])].neighbour.length; i++){
                    if(mapTiles[parseInt(botEnem[turnOrder-1].Enemy.parentNode.id.split(/[Y,X]+/)[1])][parseInt(botEnem[turnOrder-1].Enemy.parentNode.id.split(/[Y,X]+/)[2])].neighbour[i].id == playerPosition){
                        if(botEnem[turnOrder-1].ActionPoints>1){
                            //MCharacter.HP-=botEnem[turnOrder-1].Strenght;
                            botEnem[turnOrder-1].ActionPoints -= 2;
                            inRange = true;
                            actionList.push('basicAttackCommand') 
                        }
                        else{
                            break Mainloop;
                        }           
                   }
                }
            }
        }
        if(inRange == false){
            let viableChoise = Pathfinder('ai');
            if (viableChoise && viableChoise != false){
                while (movespeed > 0){
                    if(viableChoise.length > movespeed - 1 && !document.getElementById(viableChoise[movespeed-1]).hasChildNodes()){
                        if(botEnem[turnOrder-1].ActionPoints>0){
                            for(let j = 0; j < movespeed; j++){
                                actionList.push('moveToCommand' + viableChoise[j])
                            }
                           // mapTiles[parseInt(botEnem[turnOrder-1].Enemy.parentNode.id.split(/[Y,X]+/)[1])][parseInt(botEnem[turnOrder-1].Enemy.parentNode.id.split(/[Y,X]+/)[2])].tileid.innerHTML= '';
                            //document.getElementById(viableChoise[movespeed-1]).appendChild(botEnem[turnOrder-1].Enemy);
                            LocationList[turnOrder-1] = viableChoise[movespeed-1];
                            break;
                        }
                        else{
                            break Mainloop;
                        }
                    }
                    else{
                        movespeed--;
                    }
            
                }
                botEnem[turnOrder-1].ActionPoints--;

            }
            else if(viableChoise != false){
                break Mainloop;
            }
        }
        


    }
    animateActions(actionList);
}
