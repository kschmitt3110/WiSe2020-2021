//Interfaces, die definieren in welchem "Format" die Daten im data.json stehen.

export interface Option {
    name: string;
    preis: number;
    farbe: string;
    bild: string;
}

export interface Optionsgruppe {
    Option1: Option;
    Option2: Option;
    Option3: Option;
}

export interface JsonData {
    Koepfe: Optionsgruppe;
    Unterkoerper: Optionsgruppe;
    Oberkoerper: Optionsgruppe;
}