var nameList;
var valueList;
var title;
var source;
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
        } else {
            console.log("No Such Document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
});

function guessName(guess) {
    for (var i = 0; i < nameList.length; i++) {
        var answerWithoutColon = nameList[i].replace(':', '');
        if (answerWithoutColon.toLowerCase() === guess.toLowerCase() || nameList[i].toLowerCase() === guess.toLowerCase()) {
            var td = document.getElementById(i);
            td.classList.toggle("hidden");
            document.getElementById('text-field').value="";
            return;
        }
    }
    console.log('element not found');
}
