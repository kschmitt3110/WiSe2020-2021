"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function aktualisiereAuswahl() {
    let jsonData = null;
    let response = await fetch("./data.json");
    jsonData = await response.json();
    let cookieString;
    cookieString = document.cookie;
    let cookieBestandteile = cookieString.split(";");
    console.log(cookieBestandteile);
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
        bildKopf = jsonData.Koepfe.Kopf1.bild;
    }
    else if (auswahlKopf == "bild2") {
        bildKopf = jsonData.Koepfe.Kopf2.bild;
    }
    else if (auswahlKopf == "bild3") {
        bildKopf = jsonData.Koepfe.Kopf3.bild;
    }
    else {
        bildKopf = "";
    }
    let vorschauKopf = document.getElementById("AuswahlKopf");
    vorschauKopf.src = bildKopf;
    let bildOberkoerper;
    if (auswahlOberkoerper == "bild1") {
        bildOberkoerper = jsonData.Oberkoerper.Oberkoerper1.bild;
    }
    else if (auswahlOberkoerper == "bild2") {
        bildOberkoerper = jsonData.Oberkoerper.Oberkoerper2.bild;
    }
    else if (auswahlOberkoerper == "bild3") {
        bildOberkoerper = jsonData.Oberkoerper.Oberkoerper3.bild;
    }
    else {
        bildOberkoerper = "";
    }
    let vorschauOberkoerper = document.getElementById("AuswahlOberkoerper");
    vorschauOberkoerper.src = bildOberkoerper;
    let bildUnterkoerper;
    if (auswahlUnterkoerper == "bild1") {
        bildUnterkoerper = jsonData.Unterkoerper.Unterkoerper1.bild;
    }
    else if (auswahlUnterkoerper == "bild2") {
        bildUnterkoerper = jsonData.Unterkoerper.Unterkoerper2.bild;
    }
    else if (auswahlUnterkoerper == "bild3") {
        bildUnterkoerper = jsonData.Unterkoerper.Unterkoerper3.bild;
    }
    else {
        bildUnterkoerper = "";
    }
    let vorschauUnterkoerper = document.getElementById("AuswahlUnterkoerper");
    vorschauUnterkoerper.src = bildUnterkoerper;
    console.log(auswahlUnterkoerper);
    console.log(auswahlKopf);
    console.log(auswahlOberkoerper);
    if (auswahlKopf != "unbekannt" || auswahlOberkoerper != "unbekannt" || auswahlUnterkoerper != "unbekannt") {
        document.getElementById("willkommen").innerHTML = "Hier sehen Sie ihre Auswahl:";
    }
    else {
        document.getElementById("willkommen").innerHTML = "Willkommen! Stellen Sie ihre Figur zusammen:";
    }
    let url = "https://gis-communication.herokuapp.com";
    let query = new URLSearchParams(document.cookie);
    url = url + "?" + query.toString();
    response = await fetch(url);
    console.log("Response", await response);
}
aktualisiereAuswahl();
//# sourceMappingURL=endseite.js.map