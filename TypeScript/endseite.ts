import {JsonData} from "./data";

async function aktualisiereAuswahl (): Promise<void> {
    let jsonData: JsonData = null;
    let response: Response = await fetch("./data.json");
    jsonData = await response.json();

    let cookieString: string;

    cookieString = document.cookie;

    let cookieBestandteile: string[] = cookieString.split(";");
    console.log(cookieBestandteile);

    let auswahlKopf: string;
    let auswahlOberkoerper: string; 
    let auswahlUnterkoerper: string; 
    let i: number = 0;

    for (i = 0; i < cookieBestandteile.length; i++) {
        if (cookieBestandteile[i].search("kopf") != -1) {
            let x: number = cookieBestandteile[i].search("=");
            auswahlKopf = cookieBestandteile[i].substring(x + 1);
        } else if (cookieBestandteile[i].search("oberkoerper") != -1) {
            let x: number = cookieBestandteile[i].search("=");
            auswahlOberkoerper = cookieBestandteile[i].substring(x + 1);
        } else {
            let x: number = cookieBestandteile[i].search("=");
            auswahlUnterkoerper = cookieBestandteile[i].substring(x + 1);
        }
    }
    let bildKopf: string;

    if (auswahlKopf == "bild1") {
        bildKopf = jsonData.Koepfe.Kopf1.bild;
    } 
    else if (auswahlKopf == "bild2"){
        bildKopf = jsonData.Koepfe.Kopf2.bild;
    }
    else if (auswahlKopf == "bild3") {
        bildKopf = jsonData.Koepfe.Kopf3.bild;
    }
    else {
        bildKopf = ""; 
    }
    
    let vorschauKopf: HTMLImageElement = document.getElementById("AuswahlKopf") as HTMLImageElement;

    vorschauKopf.src = bildKopf;

    let bildOberkoerper: string;

    if (auswahlOberkoerper == "bild1") {
        bildOberkoerper = jsonData.Oberkoerper.Oberkoerper1.bild;
    } 
    else if (auswahlOberkoerper == "bild2"){
        bildOberkoerper = jsonData.Oberkoerper.Oberkoerper2.bild;
    }
    else if (auswahlOberkoerper == "bild3") {
        bildOberkoerper = jsonData.Oberkoerper.Oberkoerper3.bild;
    }
    else {
        bildOberkoerper = ""; 
    }
    
    let vorschauOberkoerper: HTMLImageElement = document.getElementById("AuswahlOberkoerper") as HTMLImageElement;

    vorschauOberkoerper.src = bildOberkoerper;

    let bildUnterkoerper: string;

    if (auswahlUnterkoerper == "bild1") {
        bildUnterkoerper = jsonData.Unterkoerper.Unterkoerper1.bild;
    } 
    else if (auswahlUnterkoerper == "bild2"){
        bildUnterkoerper = jsonData.Unterkoerper.Unterkoerper2.bild;
    }
    else if (auswahlUnterkoerper == "bild3") {
        bildUnterkoerper = jsonData.Unterkoerper.Unterkoerper3.bild;
    }
    else {
        bildUnterkoerper = ""; 
    }
    
    let vorschauUnterkoerper: HTMLImageElement = document.getElementById("AuswahlUnterkoerper") as HTMLImageElement;

    vorschauUnterkoerper.src = bildUnterkoerper;


    console.log(auswahlUnterkoerper);
    console.log(auswahlKopf);
    console.log(auswahlOberkoerper);

    if (auswahlKopf != "unbekannt"|| auswahlOberkoerper != "unbekannt" || auswahlUnterkoerper != "unbekannt") {
        document.getElementById("willkommen").innerHTML = "Hier sehen Sie ihre Auswahl:";
    }
    else {
        document.getElementById("willkommen").innerHTML = "Willkommen! Stellen Sie ihre Figur zusammen:";
    }

    let url: string = "https://gis-communication.herokuapp.com";

    let query: URLSearchParams = new URLSearchParams(<any>document.cookie);
    url = url + "?" + query.toString();
    response = await fetch(url);
    console.log("Response", await response);
}



aktualisiereAuswahl();