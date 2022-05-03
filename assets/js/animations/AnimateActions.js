

function animateActions(actionList){
    let commandName;
    let totalTime = 0;


    for(let i = 0; i < actionList.length; i++){
        let delay;
        commandName = actionList[i].split('Command');
        switch (commandName[0]) {
            case 'moveTo':
                totalTime+=200;
                animateMovement(commandName[1], totalTime)
                break;

            case 'basicAttack':
                totalTime+=700;
                animateBasicAttack(totalTime, 700)
                

                break;
            default:
                break;
        }
        

    }
    setTimeout(function(){
        NextTurn();
    },totalTime)
    
}

function animateMovement(newLocation, totalTime){
    setTimeout(function(){
        mapTiles[parseInt(botEnem[turnOrder-1].Enemy.parentNode.id.split(/[Y,X]+/)[1])][parseInt(botEnem[turnOrder-1].Enemy.parentNode.id.split(/[Y,X]+/)[2])].tileid.innerHTML= '';
        document.getElementById(newLocation).appendChild(botEnem[turnOrder-1].Enemy);
        LocationList[turnOrder-1] = newLocation;
    },  totalTime)
    
}

function animateBasicAttack(totalTime, animateSpeed){
    let img;
    setTimeout(function(){
        MCharacter.HP -= botEnem[turnOrder-1].Strenght*(1-MCharacter.resistances.physical/100);
        img = document.createElement("img");
        img.src = "/assets/images/slash.png";
        img.id = "basicSlashAttack";
        img.style.position= 'absolute';
        img.style.zIndex = '100';
        document.getElementById(playerPosition).appendChild(img);
    },  totalTime-animateSpeed)
    setTimeout(function(){
        let angle = 0;
        let timer = setInterval(() => {
            angle+=3
            img.style.transform = `skewY(${angle}deg)`;
            if (angle==45){
                document.getElementById('basicSlashAttack').remove();
                clearInterval(timer);
            }
        }, animateSpeed/15);
    }, totalTime-animateSpeed)
}


function animateOffLineSkill(skill, actionList, direction){
    let img ;
    let limit = 0;
    let AnimationFullLenght = skill.AnimationSpeed*actionList.length;
    img = document.createElement("img");
    img.src = skill.Sprite;
    img.style.position= 'absolute';
    img.style.zIndex = '100';
    document.getElementById(playerPosition).appendChild(img);
    
    let timer = setInterval(() => {
        
        switch (direction){
            case 'up':
                img.style.top = img.offsetTop  - 8.51 + 'px';
                break;
            case 'down':
                img.style.top = img.offsetTop  + 0.6 + 'px';
                img.style.transform = "rotate(180deg)"
                break;
            case 'left':
                img.style.left = img.offsetLeft  - 8.51 + 'px';
                img.style.transform = "rotate(-90deg)"
            break;
            case 'right':

                img.style.left = img.offsetLeft  + 0.5 + 'px';
                img.style.transform = "rotate(90deg)"
                break;
            default:
                break;
        }
        
        if (limit ==actionList.length*10){
            clearInterval(timer);  
        }
        limit++;
    }, AnimationFullLenght/100);
    if(!skill.secondaryEffect){
        setTimeout(function(){
            for(let i = 0; i < actionList.length; i++){
                if(LocationList.includes(actionList[i].id)){
                    let enemyIndex = LocationList.indexOf(actionList[i].id);
                    botEnem[enemyIndex].HP = botEnem[enemyIndex].HP - currentSkill.damage*(1-botEnem[enemyIndex].resistances[`${currentSkill.damageType}`]/100);
                    characterStatus();
                    
            
                }
            }
    
            img.remove();
        }, AnimationFullLenght+100);
    }
    else{
        setTimeout(function(){
            for(let i = 0; i < actionList.length; i++){
                if(LocationList.includes(actionList[i].id)){
                    let enemyIndex = LocationList.indexOf(actionList[i].id);
                    botEnem[enemyIndex].HP = botEnem[enemyIndex].HP - currentSkill.damage*(1-botEnem[enemyIndex].resistances[`${currentSkill.damageType}`]/100);
                    characterStatus();
                    
            
                }
            }
            img.remove();
            animateoffLineSecondaryEffect(skill, actionList);
        }, AnimationFullLenght+100);
    }
    
      
}

function animateOffSelectionSkill(skill, AffectedTiles, isSecondary){
    
    let img ;
    let AnimationFullLenght = skill.AnimationSpeed;
    img = document.createElement("img");
    
    img.src = skill.Sprite;
    img.style.width = 200*skill.explosionRange+'px';
    img.style.height = 200*skill.explosionRange+'px';
    document.getElementById(AffectedTiles[0]).appendChild(img);
    img.style.position= 'absolute';
    img.style.zIndex = '100';
    img.style.left =  img.offsetLeft- ((180+180*(skill.explosionRange-1)-40)/2)+'px';
    img.style.top = img.offsetTop- ((180+180*(skill.explosionRange-1)-40)/2)+'px';
    img.style.width = 180+180*(skill.explosionRange-1)+'px';
    img.style.height = 180+180*(skill.explosionRange-1)+'px';
    let deg = 0;

    let timer = setInterval(() => {
        deg+=5
        img.style.transform = `rotate(${deg}deg)`
    }, 10);

    setTimeout(function(){
        clearInterval(timer);  
        for(let i = 0; i < AffectedTiles.length; i++){
            if(LocationList.includes(AffectedTiles[i])){
                let enemyIndex = LocationList.indexOf(AffectedTiles[i]);
                botEnem[enemyIndex].HP = botEnem[enemyIndex].HP - currentSkill.damage*(1-botEnem[enemyIndex].resistances[`${currentSkill.damageType}`]/100);
                characterStatus();                 }
            else if( AffectedTiles[i]==playerPosition && currentSkill.FriendlyFire==true){
                MCharacter.HP-= currentSkill.damage*(1-MCharacter.resistances[`${currentSkill.damageType}`]/100);
                updateBars();
                characterStatus();
            }
        }
        img.remove();
    }, AnimationFullLenght+200);
}

function animateoffLineSecondaryEffect(skill, actionList){
   for(let i = 0; i < skill.secondaryEffect.length;i++){
       switch (skill.secondaryEffect[i]){
           case 'explosion':
                let explosionTile = actionList[actionList.length-1].id;
                let tileXY = actionList[actionList.length-1].id.split(/[Y,X]+/);;
                let YLocation = parseInt(tileXY[1]);
                let XLocation = parseInt(tileXY[2]);
                for (let i = 1; i < currentSkill.explosionRange+1 ; i++){
                    
                    if(mapTiles[YLocation+i]){
                        actionList.push(mapTiles[YLocation+i][XLocation].tileid);
         
                    }
                    if(mapTiles[YLocation-i]){
                        actionList.push(mapTiles[YLocation-i][XLocation].tileid);
                    }
                    if(mapTiles[YLocation][XLocation+i]){
                        actionList.push(mapTiles[YLocation][XLocation+i].tileid); 
                    }
                    if(mapTiles[YLocation][XLocation-i]){
                        actionList.push(mapTiles[YLocation][XLocation-i].tileid);
                    }
            
                    for(let j = 1; j < currentSkill.explosionRange+1-i; j++){
                        if(mapTiles[YLocation-i] &&  mapTiles[YLocation-i][XLocation+j]){                        
                            actionList.push(mapTiles[YLocation-i][XLocation+j].tileid);
                        }
                        if(mapTiles[YLocation+i] &&  mapTiles[YLocation+i][XLocation+j]){                           
                            actionList.push(mapTiles[YLocation+i][XLocation+j].tileid);
                        }
                        if(mapTiles[YLocation-i] &&  mapTiles[YLocation-i][XLocation-j]){
                            actionList.push(mapTiles[YLocation-i][XLocation-j].tileid);   
                        }
                        if(mapTiles[YLocation+i] &&  mapTiles[YLocation+i][XLocation-j]){
                            actionList.push(mapTiles[YLocation+i][XLocation-j].tileid);
                        }
                        
            
            
                    }
                }
                let img ;
                let AnimationFullLenght = skill.AnimationSpeed;
                img = document.createElement("img");
                switch (skill.damageType){
                    case 'fire':
                        img.src = Ignition.Sprite;
                        break;
                    case 'lightning':
                        img.src = "/assets/images/lightningExplosion.png";
                        break;
                    default:
                        img.src = Ignition.Sprite;
                        break;
                }
               
                img.style.width = 200*skill.explosionRange+'px';
                img.style.height = 200*skill.explosionRange+'px';
                document.getElementById(explosionTile).appendChild(img);
                img.style.position= 'absolute';
                img.style.zIndex = '100';
                img.style.left =  img.offsetLeft- ((180+180*(skill.explosionRange-1)-40)/2)+'px';
                img.style.top = img.offsetTop- ((180+180*(skill.explosionRange-1)-40)/2)+'px';
                img.style.width = 180+180*(skill.explosionRange-1)+'px';
                img.style.height = 180+180*(skill.explosionRange-1)+'px';
                let deg = 0;

                let timer = setInterval(() => {
                    deg+=5
                    img.style.transform = `rotate(${deg}deg)`
                }, 10);

                setTimeout(function(){
                    clearInterval(timer);  
                    for(let i = 0; i < actionList.length; i++){
                        if(LocationList.includes(actionList[i].id)){
                            let enemyIndex = LocationList.indexOf(actionList[i].id);
                            botEnem[enemyIndex].HP = botEnem[enemyIndex].HP - currentSkill.damage*(1-botEnem[enemyIndex].resistances[`${currentSkill.damageType}`]/100);
                            characterStatus();                 }
                        else if( actionList[i].id==playerPosition && currentSkill.FriendlyFire==true){
                            MCharacter.HP-= currentSkill.damage*(1-MCharacter.resistances[`${currentSkill.damageType}`]/100);
                            updateBars();
                            characterStatus();
                        }
                    }
                    img.remove();
                }, AnimationFullLenght*10+200);
                break;
            default:
                break;

       }
   }
}
function animateChaos(currentSkill, AffectedTiles){
    for(let i = 1; i < 16; i++){
        setTimeout(function(){
            animateChaosOrb(currentSkill, AffectedTiles);
        }, 50*i);
    }
    
}
function animateChaosOrb(currentSkill, AffectedTiles){
    
    let circle = document.createElement("canvas");
    circle.width = '50';
    circle.height = '50';
    let leftCord = document.getElementById(AffectedTiles[0]).offsetLeft+40+(Math.random()* 2 - 1)*15;
    let rightCord = document.getElementById(AffectedTiles[0]).offsetTop+30+(Math.random()* 2 - 1)*15;
    circle.style.left = leftCord+'px';
    circle.style.top =rightCord+'px';
    circle.style.position = 'absolute';
    circle.style.zIndex = '100';
    document.getElementById('GameScreen').appendChild(circle);
    var ctx = circle.getContext("2d");
    let a = 0.0;
    var grd = ctx.createRadialGradient(25,25, 2, 25, 25, 10);
    grd.addColorStop(0,"red");
    grd.addColorStop(1,"purple");
    ctx.fillStyle = grd;
    let timer = setInterval(function(){
        a+=0.1;
        ctx.beginPath();

        ctx.arc(25, 25, a, 0, a * Math.PI);
        ctx.fill();
    }, 10)
    setTimeout(function(){
        clearInterval(timer);  
        let timer2 = setInterval(function(){
            circle.style.left = leftCord-15+Math.random()*30+'px';
            circle.style.top = rightCord-15+Math.random()*30+'px';
        }, 50)
        setTimeout(function(){
            clearInterval(timer2);  
            circle.remove();
            if(LocationList.includes(AffectedTiles[0])){
                let enemyIndex = LocationList.indexOf(AffectedTiles[0]);
                botEnem[enemyIndex].HP = botEnem[enemyIndex].HP - (currentSkill.damage*(1-botEnem[enemyIndex].resistances[`${currentSkill.damageType}`]/100))/15;
                characterStatus();                 
            }
            else if( AffectedTiles[0]==playerPosition && currentSkill.FriendlyFire==true){
                MCharacter.HP-= (currentSkill.damage*(1-MCharacter.resistances[`${currentSkill.damageType}`]/100))/15;
                updateBars();
                characterStatus();
            }
        }, 3000);
        
        
        
    }, 1000);

    
    
}



function createHiPPICanvas(w, h) {
    let ratio = window.devicePixelRatio*2;
    let cv = document.createElement("canvas");
    cv.width = w * ratio;
    cv.height = h * ratio;
    cv.style.width = w  + "px";
    cv.style.height = h + "px";
    cv.getContext("2d").scale(ratio, ratio);
    return cv;
}

function animateFrostBlades(currentSkill, AffectedTiles){
    let circle = createHiPPICanvas(500, 500);
    let leftCord;
    let rightCord;
    leftCord = document.getElementById(AffectedTiles[0]).offsetLeft-184;
    rightCord =document.getElementById(AffectedTiles[0]).offsetTop-200;
    
    circle.style.left = leftCord+'px';
    circle.style.top = rightCord+'px';
    circle.style.position = 'absolute';
    circle.style.zIndex = '100';
    document.getElementById('GameScreen').appendChild(circle);
    let ctx = circle.getContext("2d");
    let a = 0.0;
    let grd = ctx.createRadialGradient(250,250, 5, 250, 250, 50);
    grd.addColorStop(0,"#00e6e6");
    grd.addColorStop(0.1, "white")
    grd.addColorStop(0.7,"white");
    grd.addColorStop(0.8,"#00e6e6");
    grd.addColorStop(1,"#ccffff");
    ctx.fillStyle = grd;
    let timer = setInterval(function(){
        a+=0.1;
        ctx.beginPath();
        ctx.arc(250, 250, a, 0, 2 * Math.PI);
        ctx.fill();
    }, 10)
    setTimeout(function(){
        ctx.closePath();
        clearInterval(timer);  
        a=0;
        ctx.lineWidth = 1;
        ctx.strokeStyle = grd;
        let explosionRangeMulti;
        switch (currentSkill.explosionRange){
            case 1 : 
                explosionRangeMulti=0;
                break;
            case 2 : 
                explosionRangeMulti=0.5;

                break;
            case 3:
                explosionRangeMulti = 1;

                break;
            case 4: 
                explosionRangeMulti = 1.55;

                break;
            default:
                break;
        }
        if(currentSkill.explosionRange==1){

        }
        let rainDown = setInterval(function(){
            a+=(20*(1+explosionRangeMulti));
            console.log(a)
            ctx.beginPath();
            ctx.moveTo(250,250);
            ctx.quadraticCurveTo(250, 230, 250+a, 250)
            ctx.moveTo(250,250);
            ctx.quadraticCurveTo(250, 270, 250+a, 250)
            ctx.stroke();
            ctx.moveTo(250,250);
            ctx.quadraticCurveTo(250, 270, 250-a, 250)
            ctx.stroke();
            ctx.moveTo(250,250);
            ctx.quadraticCurveTo(250, 230, 250-a, 250)
            ctx.stroke();
            ctx.moveTo(250,250);
            ctx.quadraticCurveTo(230, 250, 250, 250+a)
            ctx.stroke();
            ctx.moveTo(250,250);
            ctx.quadraticCurveTo(270, 250, 250, 250+a)
            ctx.stroke();
            ctx.moveTo(250,250);
            ctx.quadraticCurveTo(230, 250, 250, 250-a)
            ctx.stroke();
            ctx.moveTo(250,250);
            ctx.quadraticCurveTo(270, 250, 250, 250-a)
            ctx.stroke();
            ctx.closePath();


        }, 30)
        setTimeout(function(){ 
            a=1;
            
            clearInterval(rainDown);
            setTimeout(function(){ 
                let timer3 = setInterval(function(){
                    ctx.save();
                    circle.style.transform = "rotate("+a+"deg)";
                    ctx.fillStyle = "rgba(193, 66, 66, 0.0)";
                    a+= 1*a/15;
                    ctx.beginPath();
                    ctx.arc(250, 250, a/10000, 0, 2 * Math.PI);                
                    ctx.clip();
                    ctx.clearRect(0,0,5000,5000);
                    ctx.restore();
                    

                }, 10)
               
                setTimeout(function(){ 
                    clearInterval(timer3);
                    circle.remove();
                    for(let i = 0; i < AffectedTiles.length; i++){
                        
                        if(LocationList.includes(AffectedTiles[i])){
                            let enemyIndex = LocationList.indexOf(AffectedTiles[i]);
                            botEnem[enemyIndex].HP = botEnem[enemyIndex].HP - currentSkill.damage*(1-botEnem[enemyIndex].resistances[`${currentSkill.damageType}`]/100);
                            characterStatus(); 
                
                        }
                        else if( AffectedTiles[i]==playerPosition && currentSkill.FriendlyFire==true){
                            MCharacter.HP-= currentSkill.damage*(1-MCharacter.resistances[`${currentSkill.damageType}`]/100);
                            updateBars();
                            characterStatus();

                        }
                    }
                },2300)
                
                
            }, 500);
        }, 149);
        
        
        
    }, 1000);

    
    
}