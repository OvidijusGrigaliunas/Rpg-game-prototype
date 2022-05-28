function showEnemyStatInfoHandler(e){
    for (let i = 0; i < botEnem.length; i++){
        if(botEnem[i].Enemy == (this)){
            showEnemyStatInfo(e, botEnem[i])
        }
        
    }
}


function showEnemyStatInfo(e, enemy){
    if(document.getElementById('EnemyInfo')){
        document.getElementById('EnemyInfo').remove()
    }

    let newDiv = document.createElement('div');
    newDiv.className = 'EnemyInfo'
    newDiv.id = 'EnemyInfo'
    // reikia atimti styliaus width/2 ir height + langelio dydis
    newDiv.style.left = e.pageX - 77 + 'px';
    newDiv.style.top = e.pageY - 240 + 'px';
    document.getElementById('GameScreen').appendChild(newDiv)
    let enemyName = document.createElement('h1');
    enemyName.innerText = enemy.Name;
    newDiv.appendChild(enemyName)
    let enemyHP = document.createElement('p');
    enemyHP.innerText = 'HP: ' +  Math.round(enemy.HP * 10) / 10 +'/'+ enemy.MaxHP;
    newDiv.appendChild(enemyHP)
    

}

function hideEnemyStatInfo(){
    if(document.getElementById('EnemyInfo')){
       document.getElementById('EnemyInfo').remove()
    }
}