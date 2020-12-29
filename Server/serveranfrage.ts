async function sendeDaten (): Promise<void> {
    let vorname: string = (<HTMLInputElement>document.getElementById("vorname")).value; 
    let nachname: string = (<HTMLInputElement>document.getElementById("nachname")).value; 
    let email: string = (<HTMLInputElement>document.getElementById("mailadresse")).value; 
    let adresse: string = (<HTMLInputElement>document.getElementById("adresse")).value;
    let url: string = 'http://localhost:8100/html/?vorname=' + vorname + '&nachname=' + nachname + '&mailadresse=' + email + '&adresse=' + adresse;

    let response: Response = await fetch(url);
    let result: string = await response.text();
    result = result.replaceAll("%20", " ");
    document.getElementById("serverantwort").innerHTML = result;
}

document.getElementById("button").addEventListener("click", sendeDaten);


