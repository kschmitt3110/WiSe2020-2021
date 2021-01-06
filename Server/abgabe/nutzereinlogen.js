"use strict";
async function einlogen() {
    let email = document.getElementById("einlogMail").value;
    let passwort = document.getElementById("einlogPasswort").value;
    let urlAnfang = "https://katharinasserver.herokuapp.com/einlogen";
    let url = urlAnfang + '&mailadresse=' + email + '&passwort=' + passwort;
    let response = await fetch(url);
    let result = await response.text();
    result = result.replaceAll("%20", " ");
    document.getElementById("serverantwort").innerHTML = result;
}
document.getElementById("einlogen").addEventListener("click", einlogen);
//# sourceMappingURL=nutzereinlogen.js.map