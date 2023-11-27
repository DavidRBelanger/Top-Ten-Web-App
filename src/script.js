// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-CZF0_CTG7NvUT4hcwMQvo4EZHyNWWXI",
  authDomain: "toptengame-7c8d3.firebaseapp.com",
  projectId: "toptengame-7c8d3",
  storageBucket: "toptengame-7c8d3.appspot.com",
  messagingSenderId: "118296975997",
  appId: "1:118296975997:web:9d85bb83a58c98ecab2f14",
  measurementId: "G-9TT0C0D9NG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('guessBox').focus();
    var cells = document.querySelectorAll('#gameTable td');
    cells.forEach(function (cell) {
        cell.classList.add('blur');
    });

    function revealCell(cell) {
        cell.classList.remove('blur');
        cell.classList.add('revealed');
    }

    function checkGuess(input) {
        cells.forEach(function (cell, index) {
            if (index % 2 === 0) { // Only check name cells
                var name = cell.textContent.trim();
                var valueCell = cell.nextElementSibling; // Get the next cell (value cell)
                var value = valueCell.textContent.trim();

                if (name.toLowerCase() === input.toLowerCase() && !cell.classList.contains('revealed')) {
                    revealCell(cell);
                    revealCell(valueCell);
                    document.getElementById('guessBox').value = "";
                }
            }
        });
    }

    document.getElementById('input-container').addEventListener('input', function (event) {
        checkGuess(event.target.value.trim());
    });
});
