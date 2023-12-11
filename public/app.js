
document.addEventListener("DOMContentLoaded", event => {
    
    const app = firebase.app();

    const db = firebase.firestore();

    const list = db.collection('mainLists').doc("12-22-2023");
    const tableElement = document.getElementById("myTable");
    var nameList;
    var valueList;
    var title;
    var source;

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
            console.log(source);
            for (let i = 0; i < nameList.length; i++) {
                const rowElement = document.createElement("tr");
                const nameCellElement = document.createElement("td");
                const valueCellElement = document.createElement("td");
              
                nameCellElement.textContent = nameList[i];
                valueCellElement.textContent = valueList[i];
                
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


    
    
