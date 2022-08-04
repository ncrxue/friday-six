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

const synergyList = [
    {players: ["Anthony", "Mateus"], bonus: 1},
    {players: ["Anthony", "Ethan"], bonus: 1},
    {players: ["Ethan", "Vihan"], bonus: 1}
]

let alphabetizedDict = {};

function generateCheckboxes() {
    alphabetizeDictionary();
    for (let key in alphabetizedDict) {
        createCheckbox(key);
    }
}

function generateTeams() {
    let players = [];

    for (let key in playerDict) { // gets players from checkboxes
        let checkbox = document.querySelector('#' + key);
        if (checkbox.checked) {
            players.push(key);
        }
    }

    let team1 = []; // creates two teams randomly
    let team2 = [];
    let originalLength = players.length;

    while (players.length * 2 > originalLength) {
        let player = Math.floor(Math.random() * players.length);
        team1.push(players[player]);
        players.splice(player, 1);
    }
    team2 = players;

    // randomly swaps around to balance teams
    while (Math.abs(getTeamValue(team1) - getTeamValue(team2)) > 1) { 
        swapPlayers(team1, team2);
    }


    document.getElementById("teamOne").innerHTML = "Team One: " + beautifyTeams(team1); // displays teams
    document.getElementById("teamTwo").innerHTML = "Team Two: " + beautifyTeams(team2);
}

function getTeamValue(team) {
    let value = 0;
    team.forEach(p => value += playerDict[p]);

    for (let i = 0; i < synergyList.length; i++) {
        if (synergyList[i].players.every(val => team.includes(val))) {
            value += synergyList[i].bonus;
        }
    }

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
    let name = document.getElementById('newName').value.toLowerCase();
    let rating = document.getElementById('newRating').value;

    name = name.charAt(0).toUpperCase() + name.slice(1);

    if (name == 'yasaswi') {
        window.alert("unable to create player 'yasaswi'. failed to create an instance where player \"pulls up\"");
    } else {
        playerDict[name] = parseInt(rating);
        createCheckbox(name);
    }
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

function alphabetizeDictionary () {
    let tempArray = [];
    for (const [key, value] of Object.entries(playerDict)) {
        tempArray.push(key);
    }
    tempArray.sort();
    
    alphabetizedDict = {};
    tempArray.forEach(name => alphabetizedDict[name] = playerDict[name]);
}

generateCheckboxes();