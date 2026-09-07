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
            lumberjack: 1
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

function updateUI() {

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

    document.getElementById("log").innerHTML =
        game.log.map(
            entry => `<p>${entry}</p>`
        ).join("");
}

function nextRound() {

    let woodIncome =
        game.buildings.lumberjack * 50;

    game.resources.wood += woodIncome;

    game.round++;

    game.log.unshift(
        `Runde ${game.round}: +${woodIncome} Holz`
    );

    saveGame();
}

function upgradeLumberjack() {

    if (game.resources.wood < 100) {

        game.log.unshift(
            "Zu wenig Holz."
        );

        saveGame();
        return;
    }

    game.resources.wood -= 100;

    game.buildings.lumberjack++;

    game.log.unshift(
        "Holzfäller ausgebaut."
    );

    saveGame();
}

updateUI();
