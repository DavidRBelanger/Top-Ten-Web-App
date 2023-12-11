var nameList;
var valueList;
var title;
var source;
var totalLives;
document.addEventListener("DOMContentLoaded", event => {
    
    const app = firebase.app();

    const db = firebase.firestore();

    const list = db.collection('mainLists').doc("12-22-2023");
    const tableElement = document.getElementById("main-table");

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
              
                numberCellElement.textContent = i+1;
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

function guessName(guess) {
    for (var i = 0; i < nameList.length; i++) {
        console.log(`does ${cleanGuess(nameList[i])} === ${cleanGuess(guess)}??`)
        if (cleanGuess(guess) === cleanGuess(nameList[i])) {
            var td = document.getElementById(i);
            td.classList.remove("hidden");
            td.classList.add("shown");
            document.getElementById('text-field').value="";
            console.log("correct guess")
            return;
        }
    }
    for (var i = totalLives - 1; i > 0; i--) {
        const button = document.getElementById("life" + i);
        if (button.classList.contains("active-life")) {
            button.classList.add("inactive-life");
            button.classList.remove("active-life");
            return;
        }
    }
    const button = document.getElementById("life" + i);
    button.classList.add("inactive-life");
    button.classList.remove("active-life");
    revealNames();
    console.log("Out of lives...");
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