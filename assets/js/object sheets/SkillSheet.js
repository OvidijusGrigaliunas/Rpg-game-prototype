var Lightningspear = {
    'name' : 'Lightning Spear',
    'description' : 'Throw lightning spear at enemies in straight line',
    'range' : 6,
    'explosionRange': 0,
    'type' : 'offensive',
    'direction' : 'line',
    'punchthrough' : 2,
    'baseDamage' : 4,
    'damage': 0,
    'manaCost' : 3,
    'actionPointCost' : 2,
    'damageScaling' : '(Lightningspear.baseDamage+MCharacter.Int*1)*(1+MCharacter.DamageTypeIncrease.lightning/100)',
    'damageType' : 'lightning',
    'Icon' : '/assets/images/lightningSpear.png',
    'Sprite' : '/assets/images/LightningSpearSprite.png',
    'AnimationSpeed' : 50,
    'FriendlyFire' : true,
  
}
var Ignition = {
    'name' : 'Ignition',
    'description' : 'Conjure fire vortex to damage everyone in its range',
    'range' : 2,
    'explosionRange': 1,
    'type' : 'offensive',
    'direction' : 'Selection',
    'punchthrough' : 100,
    'baseDamage' : 3,
    'damage': 0,
    'manaCost' : 2,
    'actionPointCost' : 3,
    'damageScaling' : '(Ignition.baseDamage+MCharacter.Int*1.5)*(1+MCharacter.DamageTypeIncrease.fire/100)',
    'damageType' : 'fire',
    'Icon' : '/assets/images/Ignition.png',
    'Sprite' : '/assets/images/IgnitionSprite.png',
    'AnimationSpeed' : 1000,
    'FriendlyFire' : true,
  
}
var chaosOrbs = {
    'name' : 'Chaos orbs',
    'description' : 'Conjure ten chaos orb to obliterate a foe',
    'range' : 4,
    'explosionRange': 0,
    'type' : 'offensive',
    'direction' : 'Selection',
    'punchthrough' : 100,
    'baseDamage' : 5,
    'damage': 0,
    'manaCost' : 3,
    'actionPointCost' : 2,
    'damageScaling' : '(chaosOrbs.baseDamage+MCharacter.Int*2)*(1+MCharacter.DamageTypeIncrease.fire/100)',
    'damageType' : 'fire',
    'Icon' : '/assets/images/chaosOrb.png',
    'Sprite' : 'none',
    'AnimationSpeed' : 1000,
    'FriendlyFire' : true,
  
}
var frostBlades = {
    'name' : 'Frost blades',
    'description' : 'Conjure frost blades, which after impaling enemies starts rotating, slashing everyone in its range. Impaled enemies take twice as much damage',
    'range' : 4,
    'explosionRange': 4,
    'type' : 'offensive',
    'direction' : 'Selection',
    'punchthrough' : 100,
    'baseDamage' : 3,
    'damage': 0,
    'manaCost' : 5,
    'actionPointCost' : 4,
    'damageScaling' : '(chaosOrbs.baseDamage+MCharacter.Int*1.5)*(1+MCharacter.DamageTypeIncrease.fire/100)',
    'damageType' : 'fire',
    'Icon' : '/assets/images/frostBlades.png',
    'Sprite' : 'none',
    'AnimationSpeed' : 1000,
    'FriendlyFire' : true,
  
}
