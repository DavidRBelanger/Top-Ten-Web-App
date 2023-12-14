var nameList;
var valueList;
var title;
var source;
var totalLives;
var score = 0;
var app;

var db;

var list;
const tableElement = document.getElementById("main-table");

document.addEventListener("DOMContentLoaded", event => {
    score = 0;
    app = firebase.app();
    db = firebase.firestore();
    list = db.collection('mainLists').doc('test');
    list.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            nameList = doc.data().itemNames;
            valueList = doc.data().itemValues;
            title = doc.data().title;
            source = doc.data().source;
            totalLives = doc.data().totalLives;

            const titleElement = document.getElementById('listTitle');
            titleElement.textContent = title;

            const sourceElement = document.getElementById('source-text');
            sourceElement.textContent = source;
            for (let i = 0; i < nameList.length; i++) {
                const rowElement = document.createElement("tr");
                const numberCellElement = document.createElement("td");
                const nameCellElement = document.createElement("td");
                const valueCellElement = document.createElement("td");

                numberCellElement.textContent = i + 1;
                nameCellElement.id = i;
                nameCellElement.textContent = nameList[i];
                valueCellElement.textContent = valueList[i];

                nameCellElement.className = "hidden";
                rowElement.appendChild(numberCellElement);
                rowElement.appendChild(nameCellElement);
                rowElement.appendChild(valueCellElement);

                tableElement.appendChild(rowElement);
            }

            const div = document.getElementById('lives-box');
            for (let i = 0; i < totalLives; i++) {
                const button = document.createElement("button");
                button.id = "life" + i;
                button.classList.add("active-life");
                div.appendChild(button);
            }


        } else {
            console.log("No Such Document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
});

textField.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        guessName(textField.value);
    }
})


function guessName(guess) {
    var scored = false;
    document.getElementById("text-field").focus();
    for (var i = 0; i < nameList.length; i++) {
        if (cleanGuess(guess) === cleanGuess(nameList[i])) {
            var td = document.getElementById(i);
            td.classList.remove("hidden");
            td.classList.add("shown");
            document.getElementById('text-field').value = "";
            score++;
            scored = true;
            break;
        }
    }
    if (checkWin()) {
        console.log('game won');
        document.getElementById('leaderboard-popup').style.display = "block";
        document.getElementById("result").textContent = score + " points!"
        document.getElementById("leaderboardInput").focus();
    } else if (!scored) {
        for (var i = totalLives - 1; i > 0; i--) {
            const button = document.getElementById("life" + i);
            if (button.classList.contains("active-life")) {
                button.classList.add("inactive-life");
                button.classList.remove("active-life");
                return;
            }
        }
        document.getElementById('leaderboard-popup').style.display = "block";
        document.getElementById("result").textContent = score + " points!"

    }
}

    function revealNames() {
        for (let i = 0; i < nameList.length; i++) {
            var td = document.getElementById(i);
            td.classList.remove("hidden");
            td.classList.add("shown");
        }
    }

    function checkWin() {
        for (let i = 0; i < nameList.length; i++) {
            var td = document.getElementById(i);
            if (td.classList.contains("hidden"))
                return false;
        }
        return true;
    }


    function cleanGuess(guess) {
        // Remove trailing spaces
        guess = guess.trimRight();

        // Convert to lowercase
        guess = guess.toLowerCase();

        // Remove colons
        guess = guess.replace(/:/g, "");

        // Remove leading spaces
        guess = guess.trimLeft();

        return guess;
    }

    function addToLeaderboard(name) {
        const player = createPlayer(name, score);
        console.log(player);
        // Get the current leaderboard
        list.get()
            .then((doc) => {
                const existingLeaderboard = doc.data().leaderboard || [];
                existingLeaderboard.push(player);

                // Update the document with the updated leaderboard
                list.update({ leaderboard: existingLeaderboard })
                    .then(() => {
                        console.log('Player added to leaderboard successfully!');
                    })
                    .catch((error) => {
                        console.error('Error adding player to leaderboard:', error);
                    });
            })
            .catch((error) => {
                console.error('Error getting leaderboard:', error);
            });
        document.getElementById('leaderboard-popup').style.display = "none";
    }
    function createPlayer(name, score) {
        return {
            name: name,
            score: score,
        };
    }

    function getFormattedDate() {
        // Get today's date object
        const today = new Date();

        // Extract year, month, and day (remember, months start at 0 in JavaScript)
        const year = today.getFullYear();
        let month = today.getMonth() + 1; // Add 1 to get actual month
        let day = today.getDate();

        // Pad month and day if less than 10
        if (month < 10) month = `0${month}`;
        if (day < 10) day = `0${day}`;

        // Build and return the formatted date string
        return `${month}-${day}-${year}`;
    }