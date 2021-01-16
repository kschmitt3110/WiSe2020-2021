async function einlogen (): Promise<void> {
    let email: string = (<HTMLInputElement>document.getElementById("einlogMail")).value; 
    let passwort: string = (<HTMLInputElement>document.getElementById("einlogPasswort")).value;
    
    let urlAnfang: string = "https://katharinasserver.herokuapp.com/einlogen";
    let url: string = urlAnfang + '&mailadresse=' + email + '&passwort=' + passwort;
    

    let response: Response = await fetch(url);
    let result: string = await response.text();
    result = result.replaceAll("%20", " ");
    document.getElementById("serverantwort").innerHTML = result;
}

document.getElementById("einlogen").addEventListener("click", einlogen);

