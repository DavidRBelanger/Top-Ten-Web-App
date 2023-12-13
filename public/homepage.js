document.addEventListener("DOMContentLoaded", event => {
    
    const app = firebase.app();

    const db = firebase.firestore();

    const list = db.collection('mainLists').doc('test'); //gets today's 

    const th1 = document.createElement('th');
    th1.textContent = 'Name';
    const th2 = document.createElement('th');
    th2.textContent = 'Score';
    var leaderboardTable = document.getElementById("leaderboard-table");
    const headerRow = document.createElement('tr');
    headerRow.appendChild(th1);
    headerRow.appendChild(th2);
    leaderboardTable.appendChild(headerRow);
    console.log(list);
    list.get().then((doc) => {
        if (doc.exists) {
            console.log('doc exists');
            const leaderList = doc.data().leaderboard;
            const todayTitle = doc.data().title;
            document.getElementById('todayTitle').textContent += todayTitle;
            //analyse this code
            for (var i = 0; i < leaderList.length; i++) {
                const tr = document.createElement('tr');
                const td1 = document.createElement('td');
                const td2 = document.createElement('td');
                td1.textContent = leaderList[i].name;
                td2.textContent = leaderList[i].score;
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.classList.add("transistion");
                leaderboardTable.appendChild(tr);
                if (i> 10) {
                    break;
                }
            }
            console.log(leaderList);
        } else {
            console.log("No Such Document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
});


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
  
