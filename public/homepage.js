document.addEventListener("DOMContentLoaded", event => {
    
    const app = firebase.app();

    const db = firebase.firestore();

    const list = db.collection('mainLists').doc('test'); //gets a random list to do.

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

            // Sort leaderboard by score
            leaderList.sort((a, b) => b.score - a.score);

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
                if (i > 10) {
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


function getRandomList() {
    return "list" + Math.floor(Math.random()*76) + 1;
}