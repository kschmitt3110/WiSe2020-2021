"use strict";
function neuesRechteckHinzufügen() {
    let newDiv = document.createElement("div");
    newDiv.className = "SichtbaresRechteck";
    document.body.insertBefore(newDiv, null);
}
function rechteckEntfernen() {
    let x = document.getElementsByClassName("SichtbaresRechteck");
    let y = document.getElementsByClassName("DynamischesRechteck");
    let i;
    for (i = x.length - 1; i >= 0; i--) {
        x.item(i).remove();
    }
    for (i = y.length - 1; i >= 0; i--) {
        y.item(i).remove();
    }
}
function neuesRechteckParameter(widthValue, heightValue, positionX, positionY) {
    let neuesDiv = document.createElement("div");
    neuesDiv.className = "DynamischesRechteck";
    neuesDiv.style.width = String(widthValue) + "px";
    neuesDiv.style.height = String(heightValue) + "px";
    neuesDiv.style.outline = "5px solid red";
    neuesDiv.style.top = String(positionY) + "px";
    neuesDiv.style.left = String(positionX) + "px";
    neuesDiv.style.position = "absolute";
    document.body.insertBefore(neuesDiv, null);
}
function zufaelligesRechteckErstellen() {
    let i;
    let parameter = [0, 0, 0, 0];
    for (i = 0; i < 4; i++) {
        parameter[i] = Math.random() * 300;
    }
    neuesRechteckParameter(parameter[0], parameter[1], parameter[2], parameter[3]);
}
document.getElementById("zurueck").addEventListener("click", rechteckEntfernen);
document.getElementById("rechteck").addEventListener("click", zufaelligesRechteckErstellen);
//# sourceMappingURL=Aufgabe2.3.js.map