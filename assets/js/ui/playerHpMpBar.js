function updateBars(){
    
    document.getElementById('playerCurrentHpBar').style.width = MCharacter.HP/MCharacter.MaxHP*100 + '%';
    document.getElementById('playerCurrentMpBar').style.width = MCharacter.MP/MCharacter.MaxMP*100 + '%';
    document.getElementById('playerCurrentActionPoints').style.width = MCharacter.ActionPoints/MCharacter.maxActionPoints*100 + '%';
    document.getElementById('playerHpBarNumber').innerHTML = Math.round(MCharacter.HP * 10)/10 + '/' +Math.round(MCharacter.MaxHP * 10)/10;
    document.getElementById('playerMpBarNumber').innerHTML = Math.round(MCharacter.MP * 10)/10 + '/' + Math.round(MCharacter.MaxMP * 10)/10;
    document.getElementById('playerActionPointsNumber').innerHTML = MCharacter.ActionPoints + '/' + MCharacter.maxActionPoints;

}