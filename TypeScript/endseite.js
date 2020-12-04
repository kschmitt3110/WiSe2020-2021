"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function aktualisiereAuswahl() {
    let jsonData = null;
    let response = await fetch("./data.json");
    jsonData = await response.json();
    let cookieString;
    let gesamtPreis = 0;
    cookieString = document.cookie;
    let cookieBestandteile = cookieString.split(";");
    let auswahlKopf;
    let auswahlOberkoerper;
    let auswahlUnterkoerper;
    let i = 0;
    for (i = 0; i < cookieBestandteile.length; i++) {
        if (cookieBestandteile[i].search("kopf") != -1) {
            let x = cookieBestandteile[i].search("=");
            auswahlKopf = cookieBestandteile[i].substring(x + 1);
        }
        else if (cookieBestandteile[i].search("oberkoerper") != -1) {
            let x = cookieBestandteile[i].search("=");
            auswahlOberkoerper = cookieBestandteile[i].substring(x + 1);
        }
        else {
            let x = cookieBestandteile[i].search("=");
            auswahlUnterkoerper = cookieBestandteile[i].substring(x + 1);
        }
    }
    let bildKopf;
    if (auswahlKopf == "bild1") {
        bildKopf = jsonData.Koepfe.Option1.bild;
        gesamtPreis += jsonData.Koepfe.Option1.preis;
    }
    else if (auswahlKopf == "bild2") {
        bildKopf = jsonData.Koepfe.Option2.bild;
        gesamtPreis += jsonData.Koepfe.Option2.preis;
    }
    else if (auswahlKopf == "bild3") {
        bildKopf = jsonData.Koepfe.Option3.bild;
        gesamtPreis += jsonData.Koepfe.Option3.preis;
    }
    else {
        bildKopf = "./bilder/auswahl.png";
    }
    let vorschauKopf = document.getElementById("AuswahlKopf");
    vorschauKopf.src = bildKopf;
    let bildOberkoerper;
    if (auswahlOberkoerper == "bild1") {
        bildOberkoerper = jsonData.Oberkoerper.Option1.bild;
        gesamtPreis += jsonData.Oberkoerper.Option1.preis;
    }
    else if (auswahlOberkoerper == "bild2") {
        bildOberkoerper = jsonData.Oberkoerper.Option2.bild;
        gesamtPreis += jsonData.Oberkoerper.Option2.preis;
    }
    else if (auswahlOberkoerper == "bild3") {
        bildOberkoerper = jsonData.Oberkoerper.Option3.bild;
        gesamtPreis += jsonData.Oberkoerper.Option3.preis;
    }
    else {
        bildOberkoerper = "./bilder/auswahl.png";
    }
    let vorschauOberkoerper = document.getElementById("AuswahlOberkoerper");
    vorschauOberkoerper.src = bildOberkoerper;
    let bildUnterkoerper;
    if (auswahlUnterkoerper == "bild1") {
        bildUnterkoerper = jsonData.Unterkoerper.Option1.bild;
        gesamtPreis += jsonData.Unterkoerper.Option1.preis;
    }
    else if (auswahlUnterkoerper == "bild2") {
        bildUnterkoerper = jsonData.Unterkoerper.Option2.bild;
        gesamtPreis += jsonData.Unterkoerper.Option2.preis;
    }
    else if (auswahlUnterkoerper == "bild3") {
        bildUnterkoerper = jsonData.Unterkoerper.Option3.bild;
        gesamtPreis += jsonData.Unterkoerper.Option3.preis;
    }
    else {
        bildUnterkoerper = "./bilder/auswahl.png";
    }
    let vorschauUnterkoerper = document.getElementById("AuswahlUnterkoerper");
    vorschauUnterkoerper.src = bildUnterkoerper;
    if (auswahlKopf != "unbekannt" || auswahlOberkoerper != "unbekannt" || auswahlUnterkoerper != "unbekannt") {
        document.getElementById("willkommen").innerHTML = "Hier sehen Sie ihre Auswahl:";
        document.getElementById("GesamtPreis").innerHTML = "Gesamtpreis: " + gesamtPreis;
    }
    else {
        document.getElementById("willkommen").innerHTML = "Willkommen! Stellen Sie ihre Figur zusammen:";
        document.getElementById("GesamtPreis").innerHTML = "";
    }
    sendeDatenAnServer(jsonData);
}
async function sendeDatenAnServer(_daten) {
    let url = "https://gis-communication.herokuapp.com";
    let responseText;
    let query = new URLSearchParams(_daten);
    url = url + "?" + query.toString();
    await fetch(url).then((response) => response.json().then((parsedJson) => responseText = JSON.stringify(parsedJson)));
    if (responseText.substring(0, 9) == "{\"error\":") {
        document.getElementById("ServerAntwort").style.color = "red";
        document.getElementById("ServerAntwort").innerHTML = "Fehler: ";
    }
    else {
        document.getElementById("ServerAntwort").style.color = "green";
        document.getElementById("ServerAntwort").innerHTML = "Serverantwort: ";
    }
    document.getElementById("ServerAntwort").innerHTML += responseText.substring(responseText.indexOf(":") + 2, responseText.length - 2);
}
aktualisiereAuswahl();
//# sourceMappingURL=endseite.js.map