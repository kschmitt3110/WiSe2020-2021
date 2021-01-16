"use strict";
async function sendeDaten() {
    let vorname = document.getElementById("vorname").value;
    let nachname = document.getElementById("nachname").value;
    let email = document.getElementById("mailadresse").value;
    let adresse = document.getElementById("adresse").value;
    let passwort = document.getElementById("passwort").value;
    let urlAnfang = "https://katharinasserver.herokuapp.com/erstelleaccount";
    let url = urlAnfang + '/?vorname=' + vorname + '&nachname=' + nachname + '&mailadresse=' + email + '&adresse=' + adresse + '&passwort=' + passwort;
    let response = await fetch(url);
    let result = await response.text();
    result = result.replaceAll("%20", " ");
    document.getElementById("serverantwort").innerHTML = result;
}
document.getElementById("registrieren").addEventListener("click", sendeDaten);
//# sourceMappingURL=serveranfrage.js.map