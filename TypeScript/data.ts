//Interfaces, die definieren in welchem "Format" die Daten im data.json stehen.

export interface Kopf1 {
    name: string;
    preis: number;
    farbe: string;
    bild: string;
}

export interface Kopf2 {
    name: string;
    preis: number;
    farbe: string;
    bild: string;
}

export interface Kopf3 {
    name: string;
    preis: number;
    farbe: string;
    bild: string;
}

export interface Koepfe {
    Kopf1: Kopf1;
    Kopf2: Kopf2;
    Kopf3: Kopf3;
}

export interface JsonData {
    Koepfe: Koepfe;
}

//Oberkoerper 

export interface Oberkoerper1 {
    name: string;
    preis: number;
    farbe: string;
    bild: string;
}

export interface Oberkoerper2 {
    name: string;
    preis: number;
    farbe: string;
    bild: string;
}

export interface Oberkoerper3 {
    name: string;
    preis: number;
    farbe: string;
    bild: string;
}

export interface Oberkoerper {
    Oberkoerper1: Oberkoerper1;
    Oberkoerper2: Oberkoerper2;
    Oberkoerper3: Oberkoerper3;
}

export interface JsonData {
    Oberkoerper: Oberkoerper;
}

//Unterkoerper 

export interface Unterkoerper1 {
    name: string;
    preis: number;
    farbe: string;
    bild: string;
}

export interface Unterkoerper2 {
    name: string;
    preis: number;
    farbe: string;
    bild: string;
}

export interface Unterkoerper3 {
    name: string;
    preis: number;
    farbe: string;
    bild: string;
}

export interface Unterkoerper {
    Unterkoerper1: Unterkoerper1;
    Unterkoerper2: Unterkoerper2;
    Unterkoerper3: Unterkoerper3;
}

export interface JsonData {
    Unterkoerper: Unterkoerper;
}