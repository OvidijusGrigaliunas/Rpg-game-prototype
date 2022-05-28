var enemyCount;
var turnOrder = 0;


window.addEventListener('load', (event) => {
    if (MCharacter.CModel){
        //MCharacter.CModel.addEventListener("click", moveChoiseEvent);
        playerPosition = MCharacter.CModel.parentNode.id;
        enemyCount = botEnem.length
        MCharacter.ActionPoints += MCharacter.ActionPointsRegen;
        updateBars();
    }
    
});
function NextTurn(){
    document.getElementById('moveButton').removeEventListener('click', moveChoiseEvent);
    document.getElementById('attackButton').removeEventListener('click', meleeAttack);
    document.getElementById('skillSelectionButton').removeEventListener('click', skillSelection);
    document.getElementById('nextTurnButton').removeEventListener('click', NextTurn);
    characterStatus();
    //console.log(LocationList)
    //if(document.getElementById(playerPosition).childElementCount > 1){
       // document.getElementById(playerPosition).innerHTML='';
       // document.getElementById(playerPosition).append(MCharacter.CModel);

    //}
    turnOrder++
    updateBars();
    if(MCharacter.HP <1){
        alert('gameover')
    }
    enemyCount = botEnem.length
    if (turnOrder <= enemyCount){
        
        botEnem[turnOrder-1].ActionPoints += botEnem[turnOrder-1].ActionPointsRegen;
        if(botEnem[turnOrder-1].ActionPoints >  botEnem[turnOrder-1].maxActionPoints){
            ActionPoints =  botEnem[turnOrder-1].maxActionPoints;
        }
        switch (botEnem[turnOrder-1].AiType) {
            case 'BasicMeleeAi':
                BasicMeleeAi(botEnem[turnOrder-1].movespeed);
                break;
            default:
                console.log(botEnem[turnOrder-1].AiType + ' AI not found')
                break;
        }
    }
    else{
        document.getElementById('moveButton').addEventListener('click', moveChoiseEvent);
        document.getElementById('attackButton').addEventListener('click', meleeAttack);
        document.getElementById('skillSelectionButton').addEventListener('click', skillSelection);
        document.getElementById('nextTurnButton').addEventListener('click', NextTurn);
        MCharacter.ActionPoints += MCharacter.ActionPointsRegen;
        if(MCharacter.ActionPoints > MCharacter.maxActionPoints){
            MCharacter.ActionPoints = MCharacter.maxActionPoints;
        }
        turnOrder = 0;
        updateBars();
        return;
    }
    
    
   
}
function characterStatus(){
    hideEnemyStatInfo()
    for (let i = 0; i < botEnem.length; i++){
        if(botEnem[i].HP < 1){
            for(let j = 0; j < botEnem[i].ingredientDrops.length; j++){
                if(Math.floor(Math.random() * 100) > 100-botEnem[i].ingredientDropRate[j]){               
                    playerInventoryList.Ingredients[`${botEnem[i].ingredientDrops[j]}`].Count++
                    console.log(playerInventoryList.Ingredients)
                }
            }
            for(let j = 0; j < botEnem[i].equipmentDrops.length; j++){
                if(Math.floor(Math.random() * 100) > 100-botEnem[i].equipmentDropRate[j]){               
                    playerInventoryList.Equipment.push(botEnem[i].equipmentDrops)                    
                    console.log(playerInventoryList.Equipment)
                }
            }
            document.getElementById(botEnem[i].Enemy.parentNode.id).innerHTML = '';
            botEnem.splice(i, 1)
            LocationList.splice(i, 1)
            
        }
    }
    for(let i = 0; i <  botEnem.length; i++){
        botEnem[i].Enemy.removeEventListener('mousemove', showEnemyStatInfoHandler);
        botEnem[i].Enemy.addEventListener('mousemove', showEnemyStatInfoHandler);
    }
    choiseReset()
}