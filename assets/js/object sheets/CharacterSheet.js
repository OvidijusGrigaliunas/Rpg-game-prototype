var MCharacter;
var Devil;
window.addEventListener('load', (event) => {
    loadCharacterInfo();
});
function loadCharacterInfo(){
    MCharacter = {
        'CModel' : '',
        'MCLocation' : '',
        'SkillList': [Lightningspear, Ignition, chaosOrbs, frostBlades],
        'HP' : 100,
        'MaxHP' : 100,
        'MP' : 100,
        'MaxMP' : 100,
        'Strenght' : 3,
        'Int' : 1,
        'DamageTypeIncrease': {
            'lightning' : 10,
            'fire' : 0,
        },
        'AttackRange' : 1,
        'movespeed' : 5,
        'ActionPoints' : 0,
        'ActionPointsRegen' : 10,
        'maxActionPoints': 10,
        'resistances' : {
            'physical' : 0,
            'fire' : 0,
            'lightning' : 0,
        },
    };
    Devil = {
            'Name' : 'Devil',
            'Enemy' :  '',
            'imgSrc' : "/assets/images/devil.png",
            'HP' : 100,
            'MaxHP' : 100,
            'MP' : 0,
            'MaxMP' : 0,
            'Strenght' : 2,
            'Int' : 1,
            'AttackRange' : 1,
            'movespeed' : 3,
            'ActionPoints' : 0,
            'ActionPointsRegen' : 2,
            'maxActionPoints': 3,
            'AiType' : "BasicMeleeAi",
            'ingredientDrops' : ['DevilHorn', 'DevilTail'],
            'ingredientDropRate' : [40, 20],
            'equipmentDrops' : [fireTalisman],
            'equipmentDropRate' : [5],
            'resistances' : {
                'fire' : 50,
                'physical' : 0,
                'lightning' : 10,
            },
    };
    
    
}

