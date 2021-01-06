async function ladeBenutzer (): Promise<void> { 
 let url: string = "http://katharinasserver.herokuapp.com/benutzerladen";
 let response: Response = await fetch(url);
 let result: string = await response.text();
 result = result.replaceAll("%20", " ");
 document.getElementById("output").innerHTML = result;
}

document.getElementById("anzeigen").addEventListener("click", ladeBenutzer);