function skillSelection(){
    let skillPopup = document.createElement("div");
    skillPopup.id = 'skillSelectionWindow';
    document.getElementById('GameScreen').appendChild(skillPopup);
    for(let i = 0 ;i < 15; i++){
        let skillIcon = document.createElement("div");
        skillIcon.id = `SkillTile${i}`;
        skillIcon.className = 'SkillTile';
        document.getElementById('skillSelectionWindow').appendChild(skillIcon);
    }
    for(let i = 0 ;i < MCharacter.SkillList.length; i++){
        CalcsSkillDamage(MCharacter.SkillList[i])
        let skillIcon = document.createElement("img");
        skillIcon.src = MCharacter.SkillList[i].Icon;
        skillIcon.id = MCharacter.SkillList[i].name;
        skillIcon.className = 'SkillIcon';
        document.getElementById(`SkillTile${i}`).appendChild(skillIcon);
        document.getElementById(MCharacter.SkillList[i].name).addEventListener('click', function() {
            document.getElementById('skillSelectionWindow').remove();
            activateTheSkill(MCharacter.SkillList[i]);
        });
        document.getElementById(MCharacter.SkillList[i].name).addEventListener('mousemove',function(e){
            showSkillInfo(e, MCharacter.SkillList[i])
        });
        document.getElementById(MCharacter.SkillList[i].name).addEventListener('mouseleave', hideShowSkillInfo);
    }
    
    
    document.addEventListener('mouseup', function(e) {
        let container = document.getElementById('skillSelectionWindow');
        if (container && !container.contains(e.target)) {
            container.remove();
        }
    });

}

function showSkillInfo(e, skill){
    if(document.getElementById('SkillInfo')){
        document.getElementById('SkillInfo').remove()
    }
    
    let newDiv = document.createElement('div');
    newDiv.className = 'SkillInfo'
    newDiv.id = 'SkillInfo'
    // reikia atimti styliaus width/2+borders ir height + langelio dydis
    newDiv.style.left = e.pageX - 93 + 'px';
    newDiv.style.top = e.pageY - 350 + 'px';
    document.getElementById('GameScreen').appendChild(newDiv)
    let skillName = document.createElement('h1');
    skillName.innerText = skill.name;
    newDiv.appendChild(skillName)
    let skilldamage = document.createElement('p');
    skilldamage.innerText = 'Damage: ' + Math.round(skill.damage * 10)/10 ;
    newDiv.appendChild(skilldamage)
    let skilldescription = document.createElement('p');
    skilldescription.innerText = skill.description;
    newDiv.appendChild(skilldescription)
    
}
function hideShowSkillInfo(e){
    if(document.getElementById('SkillInfo')){
        document.getElementById('SkillInfo').remove()
    }
}