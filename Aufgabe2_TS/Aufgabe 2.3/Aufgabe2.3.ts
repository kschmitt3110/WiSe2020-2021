function neuesRechteckHinzufügen (): void{
    let newDiv: HTMLDivElement = document.createElement("div");
    newDiv.className = "SichtbaresRechteck";
    document.body.insertBefore(newDiv, null);
}

function rechteckEntfernen (): void {
    let x: HTMLCollection = document.getElementsByClassName("SichtbaresRechteck");
    let y: HTMLCollection = document.getElementsByClassName("DynamischesRechteck");
    let i: number;

    for(i = x.length - 1; i >= 0; i--) {
        x.item(i).remove();
    }
    for(i = y.length - 1; i >= 0; i--) {
        y.item(i).remove();
    }
}

function neuesRechteckParameter (widthValue: number, heightValue: number, positionX: number, positionY: number): void{
    let neuesDiv: HTMLDivElement = document.createElement("div");
    neuesDiv.className = "DynamischesRechteck";

    neuesDiv.style.width = String(widthValue) + "px";
    neuesDiv.style.height = String(heightValue) + "px";
    neuesDiv.style.outline = "5px solid red";
    neuesDiv.style.top = String(positionY) + "px";
    neuesDiv.style.left = String(positionX) + "px";

    neuesDiv.style.position = "absolute";

    document.body.insertBefore(neuesDiv, null);
}

function zufaelligesRechteckErstellen (): void {
    let i: number; 
    let parameter: Array<number> = [0, 0, 0, 0];

    for (i = 0; i < 4; i++) {
        parameter[i] = Math.random() * 300;
    }

    neuesRechteckParameter(parameter[0], parameter[1], parameter[2], parameter[3]);
}

document.getElementById("zurueck").addEventListener("click", rechteckEntfernen);
document.getElementById("rechteck").addEventListener("click", zufaelligesRechteckErstellen);

