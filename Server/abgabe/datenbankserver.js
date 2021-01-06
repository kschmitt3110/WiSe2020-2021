"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const Http = require("http"); //Importiert Funktionalitäten für Hypertext Transfer Protocol 
const Mongo = require("mongodb");
var server;
(function (server_1) {
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
        if (_request.url.startsWith("/benutzerladen")) {
            let antwort = "<table>";
            let mongoclient = new Mongo.MongoClient("mongodb+srv://rina3110:geheim123@katharina.hlejk.mongodb.net/test?retryWrites=true&w=majority");
            await mongoclient.connect();
            let studenten = mongoclient.db("test").collection("students");
            let anzeigen;
            anzeigen = studenten.find();
            antwort = antwort + "<tr> <th> Vorname </th> <th> Nachname </th> <th> Emailadresse </th> <th> Adresse </th> <th> Passwort </th> </tr>";
            await anzeigen.forEach(function (document) {
                antwort = antwort + "<tr>" + "<td>" + document.vorname + "</td>" + "<td>" + document.nachname + "</td>" + "<td>" + document.mailadresse + "</td>" + "<td>" + document.adresse + "</td>" + "<td>" + document.passwort + "</td>" + "</tr>";
                console.log(antwort);
            });
            antwort = antwort + "</table>";
            _response.write(antwort);
        }
        else if (_request.url.startsWith("/erstelleaccount")) {
            let speichern = _request.url;
            speichern = speichern.replace("/erstelleaccount/?", "");
            let felder;
            felder = speichern.split("&");
            console.log(felder);
            let daten; //Typ muss any sein, da unterschiedliche Eingaben möglich sind 
            daten = {};
            let i;
            for (i = 0; i < felder.length; i++) {
                let schluessel = felder[i].split("=")[0];
                let wert = felder[i].split("=")[1];
                daten[schluessel] = wert;
            }
            if (await pruefeMail(daten["mailadresse"]) == true) {
                erstelleDatensatz(daten);
                _response.write("Account erfolgreich angelegt!");
            }
            else {
                _response.write("Bitte verwenden Sie eine andere E-mail Adresse.");
            }
        }
        else if (_request.url.startsWith("/einlogen")) {
            let email;
            let passwort;
            let login = _request.url;
            login = login.replace("/login/?", "");
            let felder;
            felder = login.split("&");
            console.log(felder);
            let i;
            for (i = 0; i < felder.length; i++) {
                let schluessel = felder[i].split("=")[0];
                let wert = felder[i].split("=")[1];
                if (schluessel == "mailadresse") {
                    email = wert;
                }
                else if (schluessel == "passwort") {
                    passwort = wert;
                }
            }
            if (await pruefeMail(email) == true) {
                _response.write("Account nicht gefunden!");
            }
            else {
                if (await ueberpruefePasswort(email, passwort) == true) {
                    _response.write("Login erfolgreich!");
                }
                else {
                    _response.write("Falsches Passwort!");
                }
            }
        }
        else {
            _response.write(_request.url); //Schreibe die Request Url in der Antwort 
            console.log(_request.url);
        }
        _response.end(); //Fertig, sende die Antwort 
    }
    async function erstelleDatensatz(daten) {
        let mongoclient = new Mongo.MongoClient("mongodb+srv://rina3110:geheim123@katharina.hlejk.mongodb.net/test?retryWrites=true&w=majority");
        await mongoclient.connect();
        let studenten = mongoclient.db("test").collection("students");
        studenten.insertOne(daten);
    }
    async function pruefeMail(mailadresse) {
        let mongoclient = new Mongo.MongoClient("mongodb+srv://rina3110:geheim123@katharina.hlejk.mongodb.net/test?retryWrites=true&w=majority");
        await mongoclient.connect();
        let studenten = mongoclient.db("test").collection("students");
        let datensatz;
        datensatz = studenten.find({ "mailadresse": mailadresse });
        if (await datensatz.count() == 0) {
            return true;
        }
        else {
            return false;
        }
    }
    async function ueberpruefePasswort(email, passwort) {
        let mongoclient = new Mongo.MongoClient("mongodb+srv://rina3110:geheim123@katharina.hlejk.mongodb.net/test?retryWrites=true&w=majority");
        await mongoclient.connect();
        let studenten = mongoclient.db("test").collection("students");
        let datensatz;
        datensatz = studenten.find({ "mailadresse": email, "passwort": passwort });
        if (await datensatz.count() == 0) {
            return false;
        }
        else {
            return true;
        }
    }
})(server = exports.server || (exports.server = {}));
//# sourceMappingURL=datenbankserver.js.map