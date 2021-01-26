"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const Http = require("http"); //Importiert Funktionalitäten für Hypertext Transfer Protocol 
const Mongo = require("mongodb");
var server;
(function (server_1) {
    class Serverdaten {
    }
    console.log("Starting server");
    let port = Number(process.env.PORT); //Sobald Port vorhanden, schreibe den aktuellen Port in die Variable Port
    if (!port) //Wenn noch kein Port vergeben, auf 8100 setzen
        port = 8100;
    let server = Http.createServer(); //Erstelle Webserver
    server.addListener("request", handleRequest); //Server reagiert bei request mit Funktion Handlerequest
    server.addListener("listening", handleListen); //Server listening bei request mit Funktion HandleListen
    server.listen(port); //Warte auf Anfragen über angegeben Port
    function handleListen() {
        console.log("Listening");
    }
    async function handleRequest(_request, _response) {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8"); //Setzen der Header für die Serverantwort
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url.startsWith("/reservieren")) {
            let mongoclient = new Mongo.MongoClient("mongodb+srv://rina3110:geheim123@katharina.hlejk.mongodb.net/test?retryWrites=true&w=majority");
            await mongoclient.connect();
            let asta = mongoclient.db("test").collection("astaverleih");
            let reservieren = _request.url;
            reservieren = reservieren.replace("/reservieren", "");
            let felder;
            felder = reservieren.split("&");
            console.log(felder);
            let reservierName = felder[0].split("=")[1];
            let i;
            for (i = 1; i < felder.length; i++) {
                let objekt = felder[i].split("=")[1];
                let datensatz = new Serverdaten();
                datensatz.ausleihname = reservierName;
                datensatz.objektname = objekt;
                datensatz.zustand = "reserviert";
                asta.insertOne(datensatz);
            }
            _response.write("Reservierung erfolgreich!");
        }
        else if (_request.url.startsWith("/verfuegbar")) {
            let verfuegbar = _request.url;
            verfuegbar = verfuegbar.replace("/verfuegbar/?", "");
            let objektname = verfuegbar.split("=")[1];
            _response.write(pruefeVerfuegbarkeit(objektname));
        }
        else if (_request.url.startsWith("/einlogen")) {
        }
        else {
            _response.write(_request.url); //Schreibe die Request Url in der Antwort 
            console.log(_request.url);
        }
        _response.end(); //Fertig, sende die Antwort 
    }
    async function pruefeVerfuegbarkeit(objektname) {
        let mongoclient = new Mongo.MongoClient("mongodb+srv://rina3110:geheim123@katharina.hlejk.mongodb.net/test?retryWrites=true&w=majority");
        await mongoclient.connect();
        let astaverleih = mongoclient.db("test").collection("astaverleih");
        let datensatz;
        datensatz = await astaverleih.find({ "objektname": objektname });
        if (await datensatz.count() == 0) {
            return "zustand=verfuegbar";
        }
        else {
            let zustand;
            let person;
            await datensatz.forEach(function (document) { zustand = document.zustand; person = document.ausleihname; });
            return "zustand=" + zustand + "&person=" + person;
        }
    }
})(server = exports.server || (exports.server = {}));
//# sourceMappingURL=server.js.map