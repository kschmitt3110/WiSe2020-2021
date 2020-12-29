"use strict";
async function sendeDaten() {
    let vorname = document.getElementById("vorname").value;
    let nachname = document.getElementById("nachname").value;
    let email = document.getElementById("mailadresse").value;
    let adresse = document.getElementById("adresse").value;
    let url = 'http://localhost:8100/html/?vorname=' + vorname + '&nachname=' + nachname + '&mailadresse=' + email + '&adresse=' + adresse;
    let response = await fetch(url);
    let result = await response.text();
    result = result.replaceAll("%20", " ");
    document.getElementById("serverantwort").innerHTML = result;
}
document.getElementById("button").addEventListener("click", sendeDaten);
//# sourceMappingURL=serveranfrage.js.map