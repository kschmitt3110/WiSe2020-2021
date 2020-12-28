import * as Http from "http"; //Importiert Funktionalitäten für Hypertext Transfer Protocol 

export namespace P_3_1Server { //Beginn des Namespaces
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


    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8"); //Setzen der Header für die Serverantwort
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(_request.url); //Schreibe die Request Url in der Antwort 
        console.log(_request.url);
        _response.end(); //Fertig, sende die Antwort 
    }
}