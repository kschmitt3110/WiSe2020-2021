/*Schreiben Sie eine Funktion multiply welche zwei Zahlen als Parameter entgegen 
nimmt und als Rückgabewert das Ergebnis der Multiplikation der beiden Parameter 
liefert. Testen Sie Ihre Funktion auf eine geeignete Weise.*/

function multiply(zahl1: number, zahl2: number): string {
    var ergebnis: number = zahl1 * zahl2;
    return ergebnis.toFixed(2);
}

console.log(multiply(2.3, 3.5));

/* Schreiben Sie eine Funktion max welche zwei Zahlen als Parameter entgegen nimmt und die größere der beiden zurück gibt. 
Nutzen Sie dafür nicht Math.max sondern schreiben Sie ihre eigene Implementation. Testen Sie Ihre Funktion auf eine geeignete Weise.*/

function max(zahl1: number, zahl2: number): number {
    if (zahl1 == zahl2) {
        return zahl1;
    }
    else if (zahl1 > zahl2) {
        return zahl1;
    }
    else {
        return zahl2;
    }
}

console.log(max(3, 7));
console.log(max(10.5, 3));
console.log(max(-5, 8));

/*Zählen Sie mithilfe einer while Schleife alle Zahlen von 1 bis 100 zusammen und geben Sie das Ergebnis auf der Konsole aus.*/
var ergebnis: number = 0; 
var i: number = 1;

while (i < 101) {
   //0+1+2+3+4...
   ergebnis = ergebnis + i;
   i = i + 1; 
}

console.log(ergebnis);

/*Nutzen Sie eine for Schleife um 10 zufällige Zahlen zwischen 0 und 100 auf der Konsole auszugeben. Nutzen Sie dafür Math.random*/

var x: number = 0;

for (i = 0; i < 10; i++) {
    x = Math.random() * 100;
    console.log(x.toFixed(2));
}