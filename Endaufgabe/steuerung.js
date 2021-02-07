"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let Objekte;
initialiserung();
async function initialiserung() {
    let response = await fetch("https://katharinasserver.herokuapp.com/objekte");
    Objekte = await response.json();
    for (let i = 1; i <= 9; i++) {
        let ausleihObjektObjekt = Objekte.objekte[i - 1];
        let ausleihObjektname = ausleihObjektObjekt.objektname;
        let ausleihPreis = ausleihObjektObjekt.preis;
        document.getElementById("Objekt" + i).innerHTML = ausleihObjektname + " - Preis:" + ausleihPreis;
    }
    for (let i = 1; i <= 9; i++) {
        let ausleihObjektObjekt = Objekte.objekte[i - 1];
        let ausleihObjektname = ausleihObjektObjekt.objektname;
        let url = "https://katharinasserver.herokuapp.com/verfuegbar";
        response = await fetch(url + "/?" + "objekt=" + ausleihObjektname);
        let responseText = await response.text();
        if (responseText.includes("verfuegbar")) {
            document.getElementById("Status" + i).innerHTML = "Verfügbar";
            document.getElementById("Auslgeliehen" + i).disabled = true;
            document.getElementById("Verfuegbar" + i).disabled = true;
        }
        else if (responseText.includes("reserviert")) {
            let antworten = responseText.split("&");
            let nutzer = antworten[1].split("=")[1];
            document.getElementById("Status" + i).innerHTML = "Reserviert - " + nutzer;
            document.getElementById("Auslgeliehen" + i).disabled = false;
            document.getElementById("Verfuegbar" + i).disabled = false;
        }
        else if (responseText.includes("ausgeliehen")) {
            let antworten = responseText.split("&");
            let nutzer = antworten[1].split("=")[1];
            document.getElementById("Status" + i).innerHTML = "Ausgeliehen - " + nutzer;
            document.getElementById("Auslgeliehen" + i).disabled = true;
            document.getElementById("Verfuegbar" + i).disabled = false;
        }
    }
    for (let i = 1; i <= 9; i++) {
        document.getElementById("Auslgeliehen" + i).addEventListener("click", () => { ausgeliehen(i); });
        document.getElementById("Verfuegbar" + i).addEventListener("click", () => { verfuegbar(i); });
    }
}
async function ausgeliehen(index) {
    let objektname;
    objektname = Objekte.objekte[index - 1].objektname;
    let urlAnfang = "https://katharinasserver.herokuapp.com/ausgeliehen";
    await fetch(urlAnfang + "/?" + "objektname=" + objektname);
    initialiserung();
}
async function verfuegbar(index) {
    let objektname;
    objektname = Objekte.objekte[index - 1].objektname;
    let urlAnfang = "https://katharinasserver.herokuapp.com/zurueckgeben";
    await fetch(urlAnfang + "/?" + "objektname=" + objektname);
    initialiserung();
}
//# sourceMappingURL=steuerung.js.map