import {ausleihObjekte, ausleihObjekt} from "./ausleihObjekte";
let Objekte: ausleihObjekte;
initialiserung();

async function initialiserung(): Promise<void>{
    let response: Response = await fetch("https://katharinasserver.herokuapp.com/objekte");
    Objekte = await response.json();

    for (let i: number = 1; i <= 9; i++) {
        let ausleihObjektObjekt: ausleihObjekt = Objekte.objekte[i-1];
        let ausleihObjektname: string = ausleihObjektObjekt.objektname;
        let ausleihPreis: number = ausleihObjektObjekt.preis;
        document.getElementById("Objekt" + i).innerHTML = ausleihObjektname + " - Preis:" + ausleihPreis;
    }

    for (let i: number = 1; i <= 9; i++){
        let ausleihObjektObjekt: ausleihObjekt = Objekte.objekte[i-1];
        let ausleihObjektname: string = ausleihObjektObjekt.objektname;
        let url: string = "https://katharinasserver.herokuapp.com/verfuegbar";
        response = await fetch (url + "/?" + "objekt=" + ausleihObjektname);

        let responseText: string = await response.text();
        if (responseText.includes("verfuegbar")){
            document.getElementById("Status" + i).innerHTML = "Verfügbar";
            (<HTMLButtonElement>document.getElementById("Auslgeliehen" + i)).disabled = true;
            (<HTMLButtonElement>document.getElementById("Verfuegbar" + i)).disabled = true;
        }
        else if(responseText.includes("reserviert")){
            let antworten:Array<String> = responseText.split("&");
            let nutzer: String = antworten[1].split("=")[1];
            document.getElementById("Status" + i).innerHTML = "Reserviert - " + nutzer;
            (<HTMLButtonElement>document.getElementById("Auslgeliehen" + i)).disabled = false;
            (<HTMLButtonElement>document.getElementById("Verfuegbar" + i)).disabled = false;
        }
        else if(responseText.includes("ausgeliehen")){
            let antworten:Array<String> = responseText.split("&");
            let nutzer: String = antworten[1].split("=")[1];
            document.getElementById("Status" + i).innerHTML = "Ausgeliehen - " + nutzer;
            (<HTMLButtonElement>document.getElementById("Auslgeliehen" + i)).disabled = true;
            (<HTMLButtonElement>document.getElementById("Verfuegbar" + i)).disabled = false;
        }
    }

    for (let i: number = 1; i<=9; i++){
        document.getElementById("Auslgeliehen" + i).addEventListener("click", ()=> {ausgeliehen(i)});
        document.getElementById("Verfuegbar" + i).addEventListener("click", ()=> {verfuegbar(i)});

    }

}

async function ausgeliehen (index: number): Promise<void> {
    let objektname: string;
    objektname = Objekte.objekte[index - 1].objektname; 

    let urlAnfang: string = "https://katharinasserver.herokuapp.com/ausgeliehen";
    await fetch (urlAnfang + "/?" + "objektname=" + objektname);

    initialiserung();
}

async function verfuegbar (index: number): Promise<void> {
    let objektname: string;
    objektname = Objekte.objekte[index - 1].objektname; 

    let urlAnfang: string = "https://katharinasserver.herokuapp.com/zurueckgeben";
    await fetch (urlAnfang + "/?" + "objektname=" + objektname);

    initialiserung();
}
