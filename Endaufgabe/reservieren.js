"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let Objekte;
initialisieren();
function auswahlAnzeigen() {
    let anzeigen = "";
    for (let i = 1; i <= 9; i++) {
        if (sessionStorage.getItem("objekt" + i + "ausgewaehlt") == "true") {
            let ausleihObjektObjekt = Objekte.objekte[i - 1];
            let ausleihName = ausleihObjektObjekt.objektname;
            anzeigen += ausleihName + "<br>";
        }
    }
    ausleihKostenBerechnen();
    document.getElementById("reserviertArtikel").innerHTML = "Ihre Auswahl:" + "<br>" + anzeigen;
}
function ausleihKostenBerechnen() {
    let gesamtkosten = 0;
    for (let i = 1; i <= 9; i++) {
        if (sessionStorage.getItem("objekt" + i + "ausgewaehlt") == "true") {
            let ausleihObjektObjekt = Objekte.objekte[i - 1];
            let ausleihPreis = ausleihObjektObjekt.preis;
            gesamtkosten += ausleihPreis;
        }
    }
    document.getElementById("ausleihKosten").innerHTML = "Ausleihkosten:" + gesamtkosten;
}
async function initialisieren() {
    let response = await fetch("http://localhost:8100/objekte");
    Objekte = await response.json();
    auswahlAnzeigen();
}
async function reservierenServer() {
    let urlAnfang = "http://localhost:8100/reservieren";
    let name = document.getElementById("reserviertName").value;
    let serveranfrage = "name=" + name + "&";
    for (let i = 1; i <= 9; i++) {
        if (sessionStorage.getItem("objekt" + i + "ausgewaehlt") == "true") {
            let ausleihObjektObjekt = Objekte.objekte[i - 1];
            let ausleihName = ausleihObjektObjekt.objektname;
            serveranfrage += "objekt=" + ausleihName + "&";
        }
    }
    let url = urlAnfang + '/?' + serveranfrage.slice(0, -1);
    let response = await fetch(url);
    let result = await response.text();
    result = result.replaceAll("%20", " ");
    alert(result);
    window.open("./index.html", "_self");
}
document.getElementById("reserviertReservieren").addEventListener("click", reservierenServer);
//# sourceMappingURL=reservieren.js.map