async function sendeDaten (): Promise<void> {
    let vorname: string = (<HTMLInputElement>document.getElementById("vorname")).value; 
    let nachname: string = (<HTMLInputElement>document.getElementById("nachname")).value; 
    let email: string = (<HTMLInputElement>document.getElementById("mailadresse")).value; 
    let adresse: string = (<HTMLInputElement>document.getElementById("adresse")).value;
    let passwort: string = (<HTMLInputElement>document.getElementById("passwort")).value;
    
    let urlAnfang: string = "http://katharinasserver.herokuapp.com/erstelleaccount";
    let url: string = urlAnfang + '/?vorname=' + vorname + '&nachname=' + nachname + '&mailadresse=' + email + '&adresse=' + adresse + '&passwort=' + passwort;
    

    let response: Response = await fetch(url);
    let result: string = await response.text();
    result = result.replaceAll("%20", " ");
    document.getElementById("serverantwort").innerHTML = result;
}

document.getElementById("registrieren").addEventListener("click", sendeDaten);

