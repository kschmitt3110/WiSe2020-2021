import {JsonData, Optionsgruppe} from "./data";


let iface: XMLHttpRequest = new XMLHttpRequest();
let jsonData: JsonData = null;
iface.onreadystatechange = function(): void {
    if (this.readyState == 4 && this.status == 200) {
        jsonData = JSON.parse(this.responseText);
    }
}; 
iface.open("GET", "./data.json", true);
iface.send();

cookieZuruecksetzen();

enum ANZEIGEMODUS {
    KOEPFE, 
    OBERKOERPER,
    UNTERKOERPER
}

let modus: ANZEIGEMODUS = ANZEIGEMODUS.KOEPFE;

function cookieZuruecksetzen (): void {
    document.cookie = "kopf= unbekannt";
    document.cookie = "oberkoerper= unbekannt";
    document.cookie = "unterkoerper= unbekannt";
}

function waehleBild1 (): void {
    setzeCookie("bild1");
    highlightBild(document.getElementById("bild1"));
}

function waehleBild2 (): void {
    setzeCookie("bild2");
    highlightBild(document.getElementById("bild2"));
}

function waehleBild3 (): void {
    setzeCookie("bild3");
    highlightBild(document.getElementById("bild3"));
    
}

function setzeCookie (_bild: string): void {
    
    if (modus == ANZEIGEMODUS.KOEPFE) {
        document.cookie = "kopf=" + _bild;
    } else if (modus == ANZEIGEMODUS.OBERKOERPER) {
        document.cookie = "oberkoerper=" + _bild;
    } else {
        document.cookie = "unterkoerper=" + _bild;
    }
}

function highlightBild (_bilder: HTMLElement): void {
    // Setze Rahmenfarbe auf rot
    highlightZuruecksetzen();

    _bilder.style.borderColor = "black";
    aktualisiereAuswahl();
}

function highlightZuruecksetzen (): void {
    document.getElementById("bild1").style.borderColor = "red";
    document.getElementById("bild2").style.borderColor = "red";
    document.getElementById("bild3").style.borderColor = "red";
}

document.getElementById("bild1").addEventListener("click", waehleBild1);
document.getElementById("bild2").addEventListener("click", waehleBild2);
document.getElementById("bild3").addEventListener("click", waehleBild3);

function modusWechseln (_setzeAufModus: ANZEIGEMODUS): void {
    modus = _setzeAufModus;
    highlightZuruecksetzen();

    let optionen: Optionsgruppe;

    if (modus == ANZEIGEMODUS.KOEPFE)
        optionen = jsonData.Koepfe;
    else if (modus == ANZEIGEMODUS.OBERKOERPER)
        optionen = jsonData.Oberkoerper;
    else
        optionen = jsonData.Unterkoerper;

    document.getElementById("text1").innerHTML = "Name: " + optionen.Option1.name + "</br> Preis: " + optionen.Option1.preis + "</br> Farbe: " + optionen.Option1.farbe;
    document.getElementById("text2").innerHTML = "Name: " + optionen.Option2.name + "</br> Preis: " + optionen.Option2.preis + "</br> Farbe: " + optionen.Option2.farbe;
    document.getElementById("text3").innerHTML = "Name: " + optionen.Option3.name + "</br> Preis: " + optionen.Option3.preis + "</br> Farbe: " + optionen.Option3.farbe;
    
    let image1: HTMLImageElement = document.getElementById("image1") as HTMLImageElement;
    let image2: HTMLImageElement = document.getElementById("image2") as HTMLImageElement;
    let image3: HTMLImageElement = document.getElementById("image3") as HTMLImageElement;

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

function aktualisiereAuswahl (): void {
    let cookieString: string;

    cookieString = document.cookie;

    let cookieBestandteile: string[] = cookieString.split(";");

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

    if (auswahlKopf == "bild1") 
        bildKopf = jsonData.Koepfe.Option1.bild;
    else if (auswahlKopf == "bild2")
        bildKopf = jsonData.Koepfe.Option2.bild;
    else if (auswahlKopf == "bild3")
        bildKopf = jsonData.Koepfe.Option3.bild;
    else 
        bildKopf = "./bilder/auswahl.png"; 

    
    let vorschauKopf: HTMLImageElement = document.getElementById("AuswahlKopf") as HTMLImageElement;

    vorschauKopf.src = bildKopf;

    let bildOberkoerper: string;

    if (auswahlOberkoerper == "bild1")
        bildOberkoerper = jsonData.Oberkoerper.Option1.bild;
    else if (auswahlOberkoerper == "bild2")
        bildOberkoerper = jsonData.Oberkoerper.Option2.bild;
    else if (auswahlOberkoerper == "bild3")
        bildOberkoerper = jsonData.Oberkoerper.Option3.bild;
    else
        bildOberkoerper = "./bilder/auswahl.png"; 
    
    let vorschauOberkoerper: HTMLImageElement = document.getElementById("AuswahlOberkoerper") as HTMLImageElement;

    vorschauOberkoerper.src = bildOberkoerper;

    let bildUnterkoerper: string;

    if (auswahlUnterkoerper == "bild1") 
        bildUnterkoerper = jsonData.Unterkoerper.Option1.bild;
    else if (auswahlUnterkoerper == "bild2") 
        bildUnterkoerper = jsonData.Unterkoerper.Option2.bild;
    else if (auswahlUnterkoerper == "bild3") 
        bildUnterkoerper = jsonData.Unterkoerper.Option3.bild;
    else 
        bildUnterkoerper = "./bilder/auswahl.png"; 
    
    let vorschauUnterkoerper: HTMLImageElement = document.getElementById("AuswahlUnterkoerper") as HTMLImageElement;

    vorschauUnterkoerper.src = bildUnterkoerper;
}

function buttonWeiter (): void {
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

function buttonZurueck (): void { 
    if (modus == ANZEIGEMODUS.OBERKOERPER) {
        modusWechseln(ANZEIGEMODUS.KOEPFE);
    }
    else if (modus == ANZEIGEMODUS.UNTERKOERPER) {
        modusWechseln(ANZEIGEMODUS.OBERKOERPER);
    }
}

document.getElementById("zurueck").addEventListener("click", buttonZurueck);

function buttonAnfang (): void {
    cookieZuruecksetzen();
    modusWechseln(ANZEIGEMODUS.KOEPFE);
    aktualisiereAuswahl();
}

document.getElementById("anfang").addEventListener("click", buttonAnfang);