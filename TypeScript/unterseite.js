"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Funktion um  json Datei vom Server zu Laden 
let iface = new XMLHttpRequest();
let jsonData = null;
iface.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        jsonData = JSON.parse(this.responseText);
    }
};
iface.open("GET", "./data.json", true);
iface.send();
cookieZuruecksetzen();
var ANZEIGEMODUS;
(function (ANZEIGEMODUS) {
    ANZEIGEMODUS[ANZEIGEMODUS["KOEPFE"] = 0] = "KOEPFE";
    ANZEIGEMODUS[ANZEIGEMODUS["OBERKOERPER"] = 1] = "OBERKOERPER";
    ANZEIGEMODUS[ANZEIGEMODUS["UNTERKOERPER"] = 2] = "UNTERKOERPER";
})(ANZEIGEMODUS || (ANZEIGEMODUS = {}));
let modus = ANZEIGEMODUS.KOEPFE;
function cookieZuruecksetzen() {
    document.cookie = "kopf= unbekannt";
    document.cookie = "oberkoerper= unbekannt";
    document.cookie = "unterkoerper= unbekannt";
}
function waehleBild1() {
    setzeCookie("bild1");
    highlightBild(document.getElementById("bild1"));
}
function waehleBild2() {
    setzeCookie("bild2");
    highlightBild(document.getElementById("bild2"));
}
function waehleBild3() {
    setzeCookie("bild3");
    highlightBild(document.getElementById("bild3"));
}
function setzeCookie(bild) {
    if (modus == ANZEIGEMODUS.KOEPFE) {
        document.cookie = "kopf=" + bild;
    }
    else if (modus == ANZEIGEMODUS.OBERKOERPER) {
        document.cookie = "oberkoerper=" + bild;
    }
    else {
        document.cookie = "unterkoerper=" + bild;
    }
}
function highlightBild(bilder) {
    // Setze Rahmenfarbe auf rot
    highlightZuruecksetzen();
    bilder.style.borderColor = "black";
    aktualisiereAuswahl();
}
function highlightZuruecksetzen() {
    document.getElementById("bild1").style.borderColor = "red";
    document.getElementById("bild2").style.borderColor = "red";
    document.getElementById("bild3").style.borderColor = "red";
}
document.getElementById("bild1").addEventListener("click", waehleBild1);
document.getElementById("bild2").addEventListener("click", waehleBild2);
document.getElementById("bild3").addEventListener("click", waehleBild3);
function modusWechselnKopf() {
    modus = ANZEIGEMODUS.KOEPFE;
    highlightZuruecksetzen();
    document.getElementById("text1").innerHTML = "Name: " + jsonData.Koepfe.Kopf1.name + "</br> Preis: " + jsonData.Koepfe.Kopf1.preis + "</br> Farbe: " + jsonData.Koepfe.Kopf1.farbe;
    document.getElementById("text2").innerHTML = "Name: " + jsonData.Koepfe.Kopf2.name + "</br> Preis: " + jsonData.Koepfe.Kopf2.preis + "</br> Farbe: " + jsonData.Koepfe.Kopf2.farbe;
    document.getElementById("text3").innerHTML = "Name: " + jsonData.Koepfe.Kopf3.name + "</br> Preis: " + jsonData.Koepfe.Kopf3.preis + "</br> Farbe: " + jsonData.Koepfe.Kopf3.farbe;
    let image1 = document.getElementById("image1");
    let image2 = document.getElementById("image2");
    let image3 = document.getElementById("image3");
    image1.src = jsonData.Koepfe.Kopf1.bild;
    image2.src = jsonData.Koepfe.Kopf2.bild;
    image3.src = jsonData.Koepfe.Kopf3.bild;
    document.getElementById("ueberschrift1").innerHTML = jsonData.Koepfe.Kopf1.name;
    document.getElementById("ueberschrift2").innerHTML = jsonData.Koepfe.Kopf2.name;
    document.getElementById("ueberschrift3").innerHTML = jsonData.Koepfe.Kopf3.name;
}
function modusWechselnOberkoerper() {
    modus = ANZEIGEMODUS.OBERKOERPER;
    highlightZuruecksetzen();
    document.getElementById("text1").innerHTML = "Name: " + jsonData.Oberkoerper.Oberkoerper1.name + "</br> Preis: " + jsonData.Oberkoerper.Oberkoerper1.preis + "</br> Farbe: " + jsonData.Oberkoerper.Oberkoerper1.farbe;
    document.getElementById("text2").innerHTML = "Name: " + jsonData.Oberkoerper.Oberkoerper2.name + "</br> Preis: " + jsonData.Oberkoerper.Oberkoerper2.preis + "</br> Farbe: " + jsonData.Oberkoerper.Oberkoerper2.farbe;
    document.getElementById("text3").innerHTML = "Name: " + jsonData.Oberkoerper.Oberkoerper3.name + "</br> Preis: " + jsonData.Oberkoerper.Oberkoerper3.preis + "</br> Farbe: " + jsonData.Oberkoerper.Oberkoerper3.farbe;
    let image1 = document.getElementById("image1");
    let image2 = document.getElementById("image2");
    let image3 = document.getElementById("image3");
    image1.src = jsonData.Oberkoerper.Oberkoerper1.bild;
    image2.src = jsonData.Oberkoerper.Oberkoerper2.bild;
    image3.src = jsonData.Oberkoerper.Oberkoerper3.bild;
    document.getElementById("ueberschrift1").innerHTML = jsonData.Oberkoerper.Oberkoerper1.name;
    document.getElementById("ueberschrift2").innerHTML = jsonData.Oberkoerper.Oberkoerper2.name;
    document.getElementById("ueberschrift3").innerHTML = jsonData.Oberkoerper.Oberkoerper3.name;
}
function modusWechselnUnterkoerper() {
    modus = ANZEIGEMODUS.UNTERKOERPER;
    highlightZuruecksetzen();
    document.getElementById("text1").innerHTML = "Name: " + jsonData.Unterkoerper.Unterkoerper1.name + "</br> Preis: " + jsonData.Unterkoerper.Unterkoerper1.preis + "</br> Farbe: " + jsonData.Unterkoerper.Unterkoerper1.farbe;
    document.getElementById("text2").innerHTML = "Name: " + jsonData.Unterkoerper.Unterkoerper2.name + "</br> Preis: " + jsonData.Unterkoerper.Unterkoerper2.preis + "</br> Farbe: " + jsonData.Unterkoerper.Unterkoerper2.farbe;
    document.getElementById("text3").innerHTML = "Name: " + jsonData.Unterkoerper.Unterkoerper3.name + "</br> Preis: " + jsonData.Unterkoerper.Unterkoerper3.preis + "</br> Farbe: " + jsonData.Unterkoerper.Unterkoerper3.farbe;
    let image1 = document.getElementById("image1");
    let image2 = document.getElementById("image2");
    let image3 = document.getElementById("image3");
    image1.src = jsonData.Unterkoerper.Unterkoerper1.bild;
    image2.src = jsonData.Unterkoerper.Unterkoerper2.bild;
    image3.src = jsonData.Unterkoerper.Unterkoerper3.bild;
    document.getElementById("ueberschrift1").innerHTML = jsonData.Unterkoerper.Unterkoerper1.name;
    document.getElementById("ueberschrift2").innerHTML = jsonData.Unterkoerper.Unterkoerper2.name;
    document.getElementById("ueberschrift3").innerHTML = jsonData.Unterkoerper.Unterkoerper3.name;
}
document.getElementById("AuswahlKopf").addEventListener("click", modusWechselnKopf);
document.getElementById("AuswahlOberkoerper").addEventListener("click", modusWechselnOberkoerper);
document.getElementById("AuswahlUnterkoerper").addEventListener("click", modusWechselnUnterkoerper);
function aktualisiereAuswahl() {
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
}
function buttonWeiter() {
    if (modus == ANZEIGEMODUS.KOEPFE) {
        modusWechselnOberkoerper();
    }
    else if (modus == ANZEIGEMODUS.OBERKOERPER) {
        modusWechselnUnterkoerper();
    }
    else {
        window.open("./endseite.html", "_self");
    }
}
document.getElementById("weiter").addEventListener("click", buttonWeiter);
function buttonZurueck() {
    if (modus == ANZEIGEMODUS.OBERKOERPER) {
        modusWechselnKopf();
    }
    else if (modus == ANZEIGEMODUS.UNTERKOERPER) {
        modusWechselnOberkoerper();
    }
}
document.getElementById("zurueck").addEventListener("click", buttonZurueck);
function buttonAnfang() {
    cookieZuruecksetzen();
    modusWechselnKopf();
    aktualisiereAuswahl();
}
document.getElementById("anfang").addEventListener("click", buttonAnfang);
//# sourceMappingURL=unterseite.js.map