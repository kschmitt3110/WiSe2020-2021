async function ladeBenutzer (): Promise<void> { 
 let url: string = "https://katharinasserver.herokuapp.com/benutzerladen";
 let response: Response = await fetch(url, {method:"GET"});
 let result: string = await response.text();
 result = result.replaceAll("%20", " ");
 document.getElementById("output").innerHTML = result;
}

document.getElementById("anzeigen").addEventListener("click", ladeBenutzer);