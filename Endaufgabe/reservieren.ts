//Seite nur nach reservieren mind. 1 artikel
import {ausleihObjekte, ausleihObjekt} from "./ausleihObjekte";

let Objekte: ausleihObjekte;

initialisieren();

function auswahlAnzeigen (): void { 
    let anzeigen: string = "";

    for (let i: number = 1; i <= 9; i++ ) {
        if (sessionStorage.getItem("objekt" + i + "ausgewaehlt") == "true") { 
            let ausleihObjektObjekt: ausleihObjekt = Objekte.objekte[i-1];
            let ausleihName: string = ausleihObjektObjekt.objektname;
            anzeigen += ausleihName + "<br>";
        }
    }
    ausleihKostenBerechnen();
    document.getElementById("reserviertArtikel").innerHTML = "Ihre Auswahl:" + "<br>" + anzeigen; 
}

function ausleihKostenBerechnen (): void {
   let gesamtkosten: number = 0;
    for(let i: number = 1; i <= 9; i++){
        if (sessionStorage.getItem("objekt" + i + "ausgewaehlt") == "true") { 
            let ausleihObjektObjekt: ausleihObjekt = Objekte.objekte[i-1];
            let ausleihPreis: number = ausleihObjektObjekt.preis;
            gesamtkosten += ausleihPreis;
        }
    }

    document.getElementById("ausleihKosten").innerHTML = "Ausleihkosten:" + gesamtkosten;
}

async function initialisieren (): Promise<void> {
    let response: Response = await fetch("https://katharinasserver.herokuapp.com/objekte");
    Objekte = await response.json();
    auswahlAnzeigen();
}

async function reservierenServer (): Promise<void> {
    let urlAnfang: string = "https://katharinasserver.herokuapp.com/reservieren";
    let name: string = (<HTMLInputElement>document.getElementById("reserviertName")).value; 

    let serveranfrage: string = "name=" + name + "&";

    for (let i: number = 1; i <= 9; i++ ) {

        if (sessionStorage.getItem("objekt" + i + "ausgewaehlt") == "true") { 
            let ausleihObjektObjekt: ausleihObjekt = Objekte.objekte[i-1];
            let ausleihName: string = ausleihObjektObjekt.objektname;
            serveranfrage += "objekt=" + ausleihName + "&";
        }
    }
    let url: string = urlAnfang + '/?' + serveranfrage.slice(0,-1);

    let response: Response = await fetch(url);
    let result: string = await response.text();
    result = result.replaceAll("%20", " ");
    alert(result);
    window.open("./index.html","_self");
}

document.getElementById("reserviertReservieren").addEventListener("click", reservierenServer);