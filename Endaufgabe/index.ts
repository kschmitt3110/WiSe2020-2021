import {ausleihObjekte, ausleihObjekt} from "./ausleihObjekte";

let Objekte: ausleihObjekte;

initialiserung();

const enum ZUSTAND {
VERFUEGBAR = "VERFUEGBAR",
RESERVIERT = "RESERVIERT",
AUSGELIEHEN = "AUSGELIEHEN",
NICHTVERFUEGBAR = "NICHTVERFUEGBAR",
}

async function initialiserung (): Promise<void> {
    sessionStorage.setItem("objekt1", ZUSTAND.VERFUEGBAR);
    sessionStorage.setItem("objekt2", ZUSTAND.VERFUEGBAR);
    sessionStorage.setItem("objekt3", ZUSTAND.VERFUEGBAR);
    sessionStorage.setItem("objekt4", ZUSTAND.VERFUEGBAR);
    sessionStorage.setItem("objekt5", ZUSTAND.VERFUEGBAR);
    sessionStorage.setItem("objekt6", ZUSTAND.VERFUEGBAR);
    sessionStorage.setItem("objekt7", ZUSTAND.VERFUEGBAR);
    sessionStorage.setItem("objekt8", ZUSTAND.VERFUEGBAR);
    sessionStorage.setItem("objekt9", ZUSTAND.VERFUEGBAR);

    for (let i: number = 1; i <= 9; i++ ) { 
        sessionStorage.setItem("objekt" + i + "ausgewaehlt", "false");
    }
    let response: Response = await fetch("./ausleihObjekte.json");
    Objekte = await response.json();

    for (let i: number = 1; i <= 9; i++) {
        let ausleihObjektObjekt: ausleihObjekt = Objekte.objekte[i-1];
        let ausleihObjektname: string = ausleihObjektObjekt.objektname;
        let ausleihPreis: number = ausleihObjektObjekt.preis;
        document.getElementById("objekt" + i).innerHTML = ausleihObjektname + " preis:" + ausleihPreis;
    }

    for (let i: number = 1; i <= 9; i++){
        let ausleihObjektObjekt: ausleihObjekt = Objekte.objekte[i-1];
        let ausleihObjektname: string = ausleihObjektObjekt.objektname;
        let url: string = "http://localhost:8100/verfuegbar";
        response = await fetch (url + "/?" + "objekt=" + ausleihObjektname);

        let responseText: string = await response.text();
        if (responseText.includes("verfuegbar")){
            sessionStorage.setItem("objekt" + i, ZUSTAND.VERFUEGBAR);
        }
        else {
            sessionStorage.setItem("objekt" + i, ZUSTAND.NICHTVERFUEGBAR);
        }
    }

    applyHighlights();
}

function highlightObjekt (index: number): void {
    if (sessionStorage.getItem("objekt" + index) == ZUSTAND.VERFUEGBAR){ 
        var zustand: string = sessionStorage.getItem("objekt" + index + "ausgewaehlt");

        if (zustand == "true") {
            sessionStorage.setItem("objekt" + index + "ausgewaehlt", "false");
        } else {
            sessionStorage.setItem("objekt" + index + "ausgewaehlt", "true");
        }
    }
    else {
        alert("Der ausgewählte Gegenstand ist nicht verfügbar!");
    }

    applyHighlights();
}
document.getElementById("objekt1").addEventListener("click",()=>(highlightObjekt(1)));
document.getElementById("objekt2").addEventListener("click",()=>(highlightObjekt(2)));
document.getElementById("objekt3").addEventListener("click",()=>(highlightObjekt(3)));
document.getElementById("objekt4").addEventListener("click",()=>(highlightObjekt(4)));
document.getElementById("objekt5").addEventListener("click",()=>(highlightObjekt(5)));
document.getElementById("objekt6").addEventListener("click",()=>(highlightObjekt(6)));
document.getElementById("objekt7").addEventListener("click",()=>(highlightObjekt(7)));
document.getElementById("objekt8").addEventListener("click",()=>(highlightObjekt(8)));
document.getElementById("objekt9").addEventListener("click",()=>(highlightObjekt(9)));

function applyHighlights (): void {
    
    for (let i: number = 1; i <= 9; i++ ) {
        if (sessionStorage.getItem("objekt" + i) == ZUSTAND.NICHTVERFUEGBAR){
            document.getElementById("objekt" + i).style.backgroundColor = "blue";
        }
        
        else { 
            if (sessionStorage.getItem("objekt" + i + "ausgewaehlt") == "true") { 
                document.getElementById("objekt" + i).style.backgroundColor = "red";
            }
        
            else {
                document.getElementById("objekt" + i).style.backgroundColor = "white";
            }
        }
        
    }
    ausleihKostenBerechnen();
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

    document.getElementById("kosten").innerHTML = "Ausleihkosten:" + gesamtkosten;
}

