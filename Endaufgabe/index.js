"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let Objekte;
initialiserung();
async function initialiserung() {
    sessionStorage.setItem("objekt1", "VERFUEGBAR" /* VERFUEGBAR */);
    sessionStorage.setItem("objekt2", "VERFUEGBAR" /* VERFUEGBAR */);
    sessionStorage.setItem("objekt3", "VERFUEGBAR" /* VERFUEGBAR */);
    sessionStorage.setItem("objekt4", "VERFUEGBAR" /* VERFUEGBAR */);
    sessionStorage.setItem("objekt5", "VERFUEGBAR" /* VERFUEGBAR */);
    sessionStorage.setItem("objekt6", "VERFUEGBAR" /* VERFUEGBAR */);
    sessionStorage.setItem("objekt7", "VERFUEGBAR" /* VERFUEGBAR */);
    sessionStorage.setItem("objekt8", "VERFUEGBAR" /* VERFUEGBAR */);
    sessionStorage.setItem("objekt9", "VERFUEGBAR" /* VERFUEGBAR */);
    for (let i = 1; i <= 9; i++) {
        sessionStorage.setItem("objekt" + i + "ausgewaehlt", "false");
    }
    let response = await fetch("https://katharinasserver.herokuapp.com/objekte");
    Objekte = await response.json();
    for (let i = 1; i <= 9; i++) {
        let ausleihObjektObjekt = Objekte.objekte[i - 1];
        let ausleihObjektname = ausleihObjektObjekt.objektname;
        let ausleihPreis = ausleihObjektObjekt.preis;
        let ausleihBeschreibug = ausleihObjektObjekt.beschreibung;
        let ausleibBild = ausleihObjektObjekt.bild;
        document.getElementById("objekt" + i).innerHTML = "<img class=ausleihBild src=" + ausleibBild + "> <br>" + ausleihObjektname + " preis:" + ausleihPreis + "<br>" + ausleihBeschreibug;
    }
    for (let i = 1; i <= 9; i++) {
        let ausleihObjektObjekt = Objekte.objekte[i - 1];
        let ausleihObjektname = ausleihObjektObjekt.objektname;
        let url = "https://katharinasserver.herokuapp.com/verfuegbar";
        response = await fetch(url + "/?" + "objekt=" + ausleihObjektname);
        let responseText = await response.text();
        if (responseText.includes("verfuegbar")) {
            sessionStorage.setItem("objekt" + i, "VERFUEGBAR" /* VERFUEGBAR */);
        }
        else {
            sessionStorage.setItem("objekt" + i, "NICHTVERFUEGBAR" /* NICHTVERFUEGBAR */);
        }
    }
    applyHighlights();
}
function highlightObjekt(index) {
    if (sessionStorage.getItem("objekt" + index) == "VERFUEGBAR" /* VERFUEGBAR */) {
        var zustand = sessionStorage.getItem("objekt" + index + "ausgewaehlt");
        if (zustand == "true") {
            sessionStorage.setItem("objekt" + index + "ausgewaehlt", "false");
        }
        else {
            sessionStorage.setItem("objekt" + index + "ausgewaehlt", "true");
        }
    }
    else {
        alert("Der ausgewählte Gegenstand ist nicht verfügbar!");
    }
    applyHighlights();
}
document.getElementById("objekt1").addEventListener("click", () => (highlightObjekt(1)));
document.getElementById("objekt2").addEventListener("click", () => (highlightObjekt(2)));
document.getElementById("objekt3").addEventListener("click", () => (highlightObjekt(3)));
document.getElementById("objekt4").addEventListener("click", () => (highlightObjekt(4)));
document.getElementById("objekt5").addEventListener("click", () => (highlightObjekt(5)));
document.getElementById("objekt6").addEventListener("click", () => (highlightObjekt(6)));
document.getElementById("objekt7").addEventListener("click", () => (highlightObjekt(7)));
document.getElementById("objekt8").addEventListener("click", () => (highlightObjekt(8)));
document.getElementById("objekt9").addEventListener("click", () => (highlightObjekt(9)));
document.getElementById("reservieren").addEventListener("click", reservieren);
function reservieren() {
    let objektAusgewaehlt = false;
    for (let i = 0; i <= 9; i++) {
        if (sessionStorage.getItem("objekt" + i + "ausgewaehlt") == "true") {
            objektAusgewaehlt = true;
            break;
        }
    }
    if (objektAusgewaehlt) {
        window.open("./reservieren.html", "_self");
    }
    else {
        alert("Sie haben nichts zum Reservieren ausgewählt");
    }
}
function applyHighlights() {
    for (let i = 1; i <= 9; i++) {
        if (sessionStorage.getItem("objekt" + i) == "NICHTVERFUEGBAR" /* NICHTVERFUEGBAR */) {
            document.getElementById("objekt" + i).style.backgroundColor = "DimGray";
        }
        else {
            if (sessionStorage.getItem("objekt" + i + "ausgewaehlt") == "true") {
                document.getElementById("objekt" + i).style.backgroundColor = "red";
            }
            else {
                document.getElementById("objekt" + i).style.backgroundColor = "transparent";
            }
        }
    }
    ausleihKostenBerechnen();
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
    document.getElementById("kosten").innerHTML = "Ausleihkosten:" + gesamtkosten;
}
//# sourceMappingURL=index.js.map