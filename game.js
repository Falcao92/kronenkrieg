let game = JSON.parse(localStorage.getItem("kronenkrieg"));

if (!game) {

    game = {

        round: 1,

        resources: {
            wood: 500,
            stone: 500,
            iron: 500
        },

        buildings: {
            lumberjack: 1,
            quarry: 1,
            mine: 1,
            barracks: 1
        },

        troops: {
            spears: 10
        },

        log: [
            "Willkommen in Kronenkrieg!"
        ]
    };

    saveGame();
}

function saveGame() {

    localStorage.setItem(
        "kronenkrieg",
        JSON.stringify(game)
    );

    updateUI();
}

function updateUI(){

    document.getElementById("round").textContent =
        game.round;

    document.getElementById("wood").textContent =
        game.resources.wood;

    document.getElementById("stone").textContent =
        game.resources.stone;

    document.getElementById("iron").textContent =
        game.resources.iron;

    document.getElementById("lumberjack").textContent =
        game.buildings.lumberjack;

    document.getElementById("quarry").textContent =
        game.buildings.quarry;

    document.getElementById("mine").textContent =
        game.buildings.mine;

    document.getElementById("barracks").textContent =
        game.buildings.barracks;

    document.getElementById("spears").textContent =
        game.troops.spears;

    document.getElementById("log").innerHTML =
        game.log.map(x => `<p>${x}</p>`).join("");
}

function nextRound(){

    const woodGain =
        game.buildings.lumberjack * 50;

    const stoneGain =
        game.buildings.quarry * 40;

    const ironGain =
        game.buildings.mine * 30;

    game.resources.wood += woodGain;
    game.resources.stone += stoneGain;
    game.resources.iron += ironGain;

    game.round++;

    game.log.unshift(
        `Runde ${game.round}: +${woodGain} Holz, +${stoneGain} Stein, +${ironGain} Eisen`
    );

    saveGame();
}

function upgradeBuilding(type){

    const costWood = 100;
    const costStone = 100;
    const costIron = 100;

    if(
        game.resources.wood < costWood ||
        game.resources.stone < costStone ||
        game.resources.iron < costIron
    ){
        game.log.unshift(
            "Nicht genügend Ressourcen."
        );

        saveGame();
        return;
    }

    game.resources.wood -= costWood;
    game.resources.stone -= costStone;
    game.resources.iron -= costIron;

    game.buildings[type]++;

    game.log.unshift(
        `${type} wurde ausgebaut.`
    );

    saveGame();
}

function recruitSpears(){

    if(
        game.resources.wood < 50 ||
        game.resources.iron < 30
    ){
        game.log.unshift(
            "Nicht genügend Ressourcen für Speerträger."
        );

        saveGame();
        return;
    }

    game.resources.wood -= 50;
    game.resources.iron -= 30;

    game.troops.spears += 5;

    game.log.unshift(
        "5 Speerträger rekrutiert."
    );

    saveGame();
}

updateUI();
