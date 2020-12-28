"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
function setzeCookie(_bild) {
    if (modus == ANZEIGEMODUS.KOEPFE) {
        document.cookie = "kopf=" + _bild;
    }
    else if (modus == ANZEIGEMODUS.OBERKOERPER) {
        document.cookie = "oberkoerper=" + _bild;
    }
    else {
        document.cookie = "unterkoerper=" + _bild;
    }
}
function highlightBild(_bilder) {
    // Setze Rahmenfarbe auf rot
    highlightZuruecksetzen();
    _bilder.style.borderColor = "black";
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
function modusWechseln(_setzeAufModus) {
    modus = _setzeAufModus;
    highlightZuruecksetzen();
    let optionen;
    if (modus == ANZEIGEMODUS.KOEPFE)
        optionen = jsonData.Koepfe;
    else if (modus == ANZEIGEMODUS.OBERKOERPER)
        optionen = jsonData.Oberkoerper;
    else
        optionen = jsonData.Unterkoerper;
    document.getElementById("text1").innerHTML = "Name: " + optionen.Option1.name + "</br> Preis: " + optionen.Option1.preis + "</br> Farbe: " + optionen.Option1.farbe;
    document.getElementById("text2").innerHTML = "Name: " + optionen.Option2.name + "</br> Preis: " + optionen.Option2.preis + "</br> Farbe: " + optionen.Option2.farbe;
    document.getElementById("text3").innerHTML = "Name: " + optionen.Option3.name + "</br> Preis: " + optionen.Option3.preis + "</br> Farbe: " + optionen.Option3.farbe;
    let image1 = document.getElementById("image1");
    let image2 = document.getElementById("image2");
    let image3 = document.getElementById("image3");
    image1.src = optionen.Option1.bild;
    image2.src = optionen.Option2.bild;
    image3.src = optionen.Option3.bild;
    document.getElementById("ueberschrift1").innerHTML = optionen.Option1.name;
    document.getElementById("ueberschrift2").innerHTML = optionen.Option2.name;
    document.getElementById("ueberschrift3").innerHTML = optionen.Option3.name;
}
document.getElementById("AuswahlKopf").addEventListener("click", () => modusWechseln(ANZEIGEMODUS.KOEPFE));
document.getElementById("AuswahlOberkoerper").addEventListener("click", () => modusWechseln(ANZEIGEMODUS.OBERKOERPER));
document.getElementById("AuswahlUnterkoerper").addEventListener("click", () => modusWechseln(ANZEIGEMODUS.UNTERKOERPER));
function aktualisiereAuswahl() {
    let cookieString;
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
    if (auswahlKopf == "bild1")
        bildKopf = jsonData.Koepfe.Option1.bild;
    else if (auswahlKopf == "bild2")
        bildKopf = jsonData.Koepfe.Option2.bild;
    else if (auswahlKopf == "bild3")
        bildKopf = jsonData.Koepfe.Option3.bild;
    else
        bildKopf = "./bilder/auswahl.png";
    let vorschauKopf = document.getElementById("AuswahlKopf");
    vorschauKopf.src = bildKopf;
    let bildOberkoerper;
    if (auswahlOberkoerper == "bild1")
        bildOberkoerper = jsonData.Oberkoerper.Option1.bild;
    else if (auswahlOberkoerper == "bild2")
        bildOberkoerper = jsonData.Oberkoerper.Option2.bild;
    else if (auswahlOberkoerper == "bild3")
        bildOberkoerper = jsonData.Oberkoerper.Option3.bild;
    else
        bildOberkoerper = "./bilder/auswahl.png";
    let vorschauOberkoerper = document.getElementById("AuswahlOberkoerper");
    vorschauOberkoerper.src = bildOberkoerper;
    let bildUnterkoerper;
    if (auswahlUnterkoerper == "bild1")
        bildUnterkoerper = jsonData.Unterkoerper.Option1.bild;
    else if (auswahlUnterkoerper == "bild2")
        bildUnterkoerper = jsonData.Unterkoerper.Option2.bild;
    else if (auswahlUnterkoerper == "bild3")
        bildUnterkoerper = jsonData.Unterkoerper.Option3.bild;
    else
        bildUnterkoerper = "./bilder/auswahl.png";
    let vorschauUnterkoerper = document.getElementById("AuswahlUnterkoerper");
    vorschauUnterkoerper.src = bildUnterkoerper;
}
function buttonWeiter() {
    if (modus == ANZEIGEMODUS.KOEPFE) {
        modusWechseln(ANZEIGEMODUS.OBERKOERPER);
    }
    else if (modus == ANZEIGEMODUS.OBERKOERPER) {
        modusWechseln(ANZEIGEMODUS.UNTERKOERPER);
    }
    else {
        window.open("./endseite.html", "_self");
    }
}
document.getElementById("weiter").addEventListener("click", buttonWeiter);
function buttonZurueck() {
    if (modus == ANZEIGEMODUS.OBERKOERPER) {
        modusWechseln(ANZEIGEMODUS.KOEPFE);
    }
    else if (modus == ANZEIGEMODUS.UNTERKOERPER) {
        modusWechseln(ANZEIGEMODUS.OBERKOERPER);
    }
}
document.getElementById("zurueck").addEventListener("click", buttonZurueck);
function buttonAnfang() {
    cookieZuruecksetzen();
    modusWechseln(ANZEIGEMODUS.KOEPFE);
    aktualisiereAuswahl();
}
document.getElementById("anfang").addEventListener("click", buttonAnfang);
//# sourceMappingURL=unterseite.js.map