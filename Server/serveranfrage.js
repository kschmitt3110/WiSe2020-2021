"use strict";
function sendeDaten() {
    alert("hallo");
    //let formElem: HTMLFormElement = document.getElementById("formElem") as HTMLFormElement;
    fetch('localhost:8100/?test=test').then(response => response.json()).then(data => alert(data));
    //let result: string = await response.text();
    //alert(result);
}
//# sourceMappingURL=serveranfrage.js.map