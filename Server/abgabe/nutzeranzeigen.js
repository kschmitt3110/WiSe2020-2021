"use strict";
async function ladeBenutzer() {
    let url = "https://katharinasserver.herokuapp.com/benutzerladen";
    let response = await fetch(url, { method: "GET" });
    let result = await response.text();
    result = result.replaceAll("%20", " ");
    document.getElementById("output").innerHTML = result;
}
document.getElementById("anzeigen").addEventListener("click", ladeBenutzer);
//# sourceMappingURL=nutzeranzeigen.js.map