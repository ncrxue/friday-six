const playerDict = {
    "Harry": 4,
    "Mateus": 4,
    "Eyaad": 3,
    "Abhijay": 2,
    "Anthony": 2,
    "Vihan": 2,
    "Neil": 1,
    "Pranav": 1,
    "Nick": 1,
    "Praveen": 0
}

function generateCheckboxes() {
    const playerSelector = document.getElementById("playerSelector");
    for (let key in playerDict) {
        let listElement = document.createElement('li');

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = key;
        checkbox.id = key;
        checkbox.value = playerDict[key];

        let label = document.createElement("label");
        label.innerHTML = key;

        listElement.appendChild(checkbox);
        listElement.appendChild(label);

        playerSelector.appendChild(listElement);
    }
}

function generateTeams() {
    let players = [];

    for (let key in playerDict) {
        let checkbox = document.querySelector('#' + key);
        if (checkbox.checked) {
            players.push(key);
        }
    }

    let team1 = [];
    let team2 = [];
    let originalLength = players.length;

    while (players.length * 2 > originalLength) {
        let player = Math.floor(Math.random() * players.length);
        team1.push(players[player]);
        players.splice(player, 1);
    }
    team2 = players;

    while (Math.abs(getTeamValue(team1) - getTeamValue(team2)) > 1) {
        swapPlayers(team1, team2);
    }

    document.getElementById("teamOne").innerHTML = "Team One: " + beautifyTeams(team1);
    document.getElementById("teamTwo").innerHTML = "Team Two: " + beautifyTeams(team2);
}

function getTeamValue(team) {
    let value = 0;
    team.forEach(p => value += playerDict[p]);
    return value;
}

function swapPlayers(team1, team2) {
    let indexOne = Math.floor(Math.random() * team1.length);
    let indexTwo = Math.floor(Math.random() * team2.length);

    team1.push(team2[indexTwo]);
    team2.push(team1[indexOne]);

    team1.splice(indexOne, 1);
    team2.splice(indexTwo, 1);
}

function beautifyTeams(team) {
    let final = "";
    for (let i = 0; i < team.length; i++) {
        if (i != team.length - 1) {
            final = final + team[i] + ", ";
        } else {
            final = final + team[i];
        }
    }
    return final;
}

generateCheckboxes();