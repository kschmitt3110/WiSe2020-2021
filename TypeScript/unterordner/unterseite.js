"use strict";
//import {Kopf1, Kopf2, Kopf3, Oberkoerper1, Oberkoerper2, Oberkoerper3, Unterkoerper1, Unterkoerper2, Unterkoerper3} from "./data";
//const daten = require("./data");
function waehleBild1() {
    highlightBild(document.getElementById("bild1"));
}
function waehleBild2() {
    highlightBild(document.getElementById("bild2"));
}
function waehleBild3() {
    highlightBild(document.getElementById("bild3"));
}
function highlightBild(bilder) {
    // Setze Rahmenfarbe auf rot
    document.getElementById("bild1").style.borderColor = "red";
    document.getElementById("bild2").style.borderColor = "red";
    document.getElementById("bild3").style.borderColor = "red";
    bilder.style.borderColor = "black";
}
document.getElementById("bild1").addEventListener("click", waehleBild1);
document.getElementById("bild2").addEventListener("click", waehleBild2);
document.getElementById("bild3").addEventListener("click", waehleBild3);
function modusWechselnKopf() {
    document.getElementById("text1").innerHTML = "blabla";
    document.getElementById("text2").innerHTML = "blabla";
    document.getElementById("text3").innerHTML = "blabla";
}
function modusWechselnOberkoerper() {
    document.getElementById("text1").innerHTML = "blabla";
    document.getElementById("text2").innerHTML = "blabla";
    document.getElementById("text3").innerHTML = "blabla";
}
function modusWechselnUnterkoerper() {
    document.getElementById("text1").innerHTML = "blabla";
    document.getElementById("text2").innerHTML = "Blablabla";
    document.getElementById("text3").innerHTML = "blablabla";
}
document.getElementById("kopf").addEventListener("click", modusWechselnKopf);
document.getElementById("ober").addEventListener("click", modusWechselnOberkoerper);
document.getElementById("unter").addEventListener("click", modusWechselnUnterkoerper);
//# sourceMappingURL=unterseite.js.map