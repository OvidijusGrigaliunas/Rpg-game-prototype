var battlemap = document.getElementById('battlemap');
var botEnem = [];
var mapTiles = [];
var MCspeed = 4;
var LocationList = [];
var blockedLocations = {
    "mountains" : [],
};

window.addEventListener('load', (event) => {
    loadBattleMap()
});

function loadBattleMap(){
    for (var i = 0 ; i< 12; i++){
            mapTiles[i] = [];
            for (var j = 0 ; j< 25; j++){
                var g = document.createElement('div');
                g.id = `TileY${i}X${j}`
                g.className = 'mapTile';
                document.getElementById('battlemap').appendChild(g);
                mapTiles[i][j]= {
                    'tileid' : g,
                    'neighbour' : [],
                    'F_value' : 0,
                    'G_value' : 0,
                    'daddy' : '',
                    
                };                
        }
    }
    MCharacter.CModel = document.createElement("img");
    MCharacter.CModel.src = "/assets/images/character.png";
    MCharacter.CModel.id = "MCharacter";
    
    MCharacter.MCLocation = 'TileY6X12';
    document.getElementById( MCharacter.MCLocation).appendChild(MCharacter.CModel);
 

    botEnem[0] = {};
    Object.assign(botEnem[0], Devil) ;
    botEnem[0].Enemy = document.createElement("img");
    botEnem[0].Enemy.src = botEnem[0].imgSrc;
    LocationList.push('TileY9X20')
    document.getElementById('TileY9X20').appendChild(botEnem[0].Enemy);
    
    
    botEnem[1] = {};
    Object.assign(botEnem[1], Devil) ;
    botEnem[1].Enemy = document.createElement("img");
    botEnem[1].Enemy.src = botEnem[1].imgSrc;
    LocationList.push('TileY6X0')
    document.getElementById('TileY6X0').appendChild(botEnem[1].Enemy);
 

    botEnem[2] = {};
    Object.assign(botEnem[2], Devil) ;
    botEnem[2].Enemy = document.createElement("img");
    botEnem[2].Enemy.src = botEnem[2].imgSrc;
    LocationList.push('TileY0X15')
    document.getElementById('TileY0X15').appendChild(botEnem[2].Enemy);
   

    botEnem[3] = {};
    Object.assign(botEnem[3], Devil) ;
    botEnem[3].Enemy = document.createElement("img");
    botEnem[3].Enemy.src = botEnem[3].imgSrc;
    LocationList.push('TileY1X15')
    document.getElementById('TileY1X15').appendChild(botEnem[3].Enemy);
   

    botEnem[4] = {};
    Object.assign(botEnem[4], Devil) ;
    botEnem[4].Enemy = document.createElement("img");
    botEnem[4].Enemy.src = botEnem[4].imgSrc;
    LocationList.push('TileY8X15')
    document.getElementById('TileY8X15').appendChild(botEnem[4].Enemy);
    

    botEnem[5] = {};
    Object.assign(botEnem[5], Devil) ;
    botEnem[5].Enemy = document.createElement("img");
    botEnem[5].Enemy.src = botEnem[5].imgSrc;
    LocationList.push('TileY3X20')
    document.getElementById('TileY3X20').appendChild(botEnem[5].Enemy);
   

    for(let i = 0; i < botEnem.length; i++){
        botEnem[i].Enemy.addEventListener('mousemove', showEnemyStatInfoHandler);
        botEnem[i].Enemy.addEventListener('mouseleave', hideEnemyStatInfo);
    }
    
    for (let i = 0; i<11; i++){
        let img = document.createElement("img");
        img.id = 'mountain'
        img.src = "/assets/images/mountain.png";
        document.getElementById(`TileY${i}X10`).appendChild(img)
        blockedLocations.mountains.push(`TileY${i}X10`)
    }
    for (let i = 0; i<11; i++){
        let img = document.createElement("img");
        img.id = 'mountain'

        img.src = "/assets/images/mountain.png";
        document.getElementById(`TileY${11-i}X8`).appendChild(img)
        blockedLocations.mountains.push(`TileY${11-i}X8`)
    }
    for (let i = 0; i<7; i++){
        let img = document.createElement("img");
        img.src = "/assets/images/mountain.png";
        img.id = 'mountain'

        document.getElementById(`TileY${2}X${7-i}`).appendChild(img)
        blockedLocations.mountains.push(`TileY${2}X${7-i}`)
    }
   
    //console.log(botEnem)
    
    findNeighbours(mapTiles.length, mapTiles[0].length);
    
}