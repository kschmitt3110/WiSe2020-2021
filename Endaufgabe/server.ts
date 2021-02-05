import * as Http from "http"; //Importiert Funktionalitäten für Hypertext Transfer Protocol 
import * as Mongo from "mongodb";
import {serverdatenInterface} from "./serverdatenInterface";

export namespace server { //Beginn des Namespaces
    class Serverdaten implements serverdatenInterface{
        ausleihname: string; 
        objektname: string;
        zustand: string;
    }
    console.log("Starting server");
    let port: number = Number(process.env.PORT); //Sobald Port vorhanden, schreibe den aktuellen Port in die Variable Port
    if (!port) //Wenn noch kein Port vergeben, auf 8100 setzen
        port = 8100;

    let server: Http.Server = Http.createServer(); //Erstelle Webserver
    server.addListener("request", handleRequest); //Server reagiert bei request mit Funktion Handlerequest
    server.addListener("listening", handleListen); //Server listening bei request mit Funktion HandleListen
    server.listen(port); //Warte auf Anfragen über angegeben Port

    function handleListen(): void {
        console.log("Listening");
    }

    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8"); //Setzen der Header für die Serverantwort
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url.startsWith("/reservieren")){
            let mongoclient: Mongo.MongoClient = new Mongo.MongoClient("mongodb+srv://rina3110:geheim123@katharina.hlejk.mongodb.net/test?retryWrites=true&w=majority");
            await mongoclient.connect();
            let asta: Mongo.Collection = mongoclient.db("test").collection("astaverleih");
            let reservieren: string = _request.url; 
            reservieren = reservieren.replace("/reservieren", "");
             
            let felder: Array<string>; 
            felder = reservieren.split("&");
            console.log(felder);

            let reservierName: string = felder[0].split("=")[1];
           
            let i: number;
            for(i = 1; i < felder.length; i++){
                let objekt: string = felder[i].split("=")[1]; 
                let datensatz: Serverdaten = new Serverdaten();
                datensatz.ausleihname = reservierName;
                datensatz.objektname = objekt;
                datensatz.zustand = "reserviert";

                asta.insertOne(datensatz);
            }
            _response.write("Reservierung erfolgreich!")

        } else if (_request.url.startsWith("/verfuegbar")){
            let verfuegbar: string = _request.url; 
            verfuegbar = verfuegbar.replace("/verfuegbar/?" , "");

            let objektname: string = verfuegbar.split("=")[1];
            
           _response.write(await pruefeVerfuegbarkeit(objektname));

        } else if (_request.url.startsWith("/zurueckgeben")){
            let url: string = _request.url;
            url = url.replace("/zurueckgeben/?", "");

            let objektname: string = url.split("=")[1];
            await setzeVerfuegbar(objektname);
        } else if (_request.url.startsWith("/ausgeliehen")){
            let url: string = _request.url;
            url = url.replace("/ausgeliehen/?", "");

            let objektname:string = url.split("=")[1];
            await setzeAusgeliehen(objektname);
        }
        else {
            _response.write(_request.url); //Schreibe die Request Url in der Antwort 
            console.log(_request.url);
        }
        
        _response.end(); //Fertig, sende die Antwort 
    }

    async function pruefeVerfuegbarkeit(objektname: string): Promise<string> {
        let mongoclient: Mongo.MongoClient = new Mongo.MongoClient("mongodb+srv://rina3110:geheim123@katharina.hlejk.mongodb.net/test?retryWrites=true&w=majority");
        await mongoclient.connect();
        let astaverleih: Mongo.Collection = mongoclient.db("test").collection("astaverleih");
        let datensatz: Mongo.Cursor<serverdatenInterface>;
        datensatz = astaverleih.find({"objektname":objektname});
        if (await datensatz.count() == 0){
            return "zustand=verfuegbar";
        }
        else {
            let zustand: string;
            let person: string;

            await datensatz.forEach(function (document: Serverdaten){zustand = document.zustand; person = document.ausleihname});
            return "zustand=" + zustand + "&person=" + person;
        }

    }

    async function setzeAusgeliehen(objektname: string): Promise<void> {
        let mongoclient: Mongo.MongoClient = new Mongo.MongoClient("mongodb+srv://rina3110:geheim123@katharina.hlejk.mongodb.net/test?retryWrites=true&w=majority");
        await mongoclient.connect();
        let astaverleih: Mongo.Collection = mongoclient.db("test").collection("astaverleih");
        let datensatzReservierung: Mongo.Cursor<serverdatenInterface>;
        datensatzReservierung = await astaverleih.find({"objektname":objektname});
        let reservierName: string;
        await datensatzReservierung.forEach(function (document: Serverdaten){reservierName = document.ausleihname});
        await setzeVerfuegbar(objektname);

        let datensatz: Serverdaten = new Serverdaten();
        datensatz.ausleihname = reservierName;
        datensatz.objektname = objektname;
        datensatz.zustand = "ausgeliehen";

        astaverleih.insertOne(datensatz);

    }

    async function setzeVerfuegbar(objektname: string): Promise<void>{
        let mongoclient: Mongo.MongoClient = new Mongo.MongoClient("mongodb+srv://rina3110:geheim123@katharina.hlejk.mongodb.net/test?retryWrites=true&w=majority");
        await mongoclient.connect();
        let astaverleih: Mongo.Collection = mongoclient.db("test").collection("astaverleih");
        astaverleih.deleteOne({"objektname": objektname});
    }
    
}