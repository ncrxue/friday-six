const playerDict = {
    "Harry": 7,
    "Mateus": 7,
    "Anthony": 6,
    "Ryan": 6,
    "Anirudh": 6,
    "Kevin": 6,
    "Michael": 5,
    "Ethan": 5,
    "Andrew": 5,
    "Pranav": 5,
    "Dinesh": 5,
    "Eyaad": 4,
    "Abhijay": 4,
    "Gaurish": 4,
    "Charlie": 4,
    "Saurav": 4,
    "Devam": 4,
    "Vihan": 4,
    "Neil": 3,
    "Nick": 3,
    "Allen": 2,
    "Praveen": 2,
    "Nash": 2
}

function generateCheckboxes() {
    for (let key in playerDict) {
        createCheckbox(key);
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

function addPlayer() {
    let name = document.getElementById('newName').value;
    let rating = document.getElementById('newRating').value;

    playerDict[name] = parseInt(rating);
    createCheckbox(name);
}

function createCheckbox(name) { //creates checkbox
    const playerSelector = document.getElementById("playerSelector");

    let listElement = document.createElement('li');

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = name;
    checkbox.id = name;
    checkbox.setAttribute("class", "checkbox");
    checkbox.value = playerDict[name];

    let label = document.createElement("label");
    label.innerHTML = name;

    listElement.appendChild(checkbox);
    listElement.appendChild(label);

    playerSelector.appendChild(listElement);
}

// function pleaseWorkICANT() {
//     console.log("Hellow world");

// }

// pleaseWorkICANT();

generateCheckboxes();