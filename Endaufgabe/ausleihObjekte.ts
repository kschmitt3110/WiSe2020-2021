import mongodb = require("mongodb");
export interface ausleihObjekte {
    objekte: ausleihObjekt[];
  }
  export interface ausleihObjekt {
    _id: mongodb.ObjectID;
    objektname: string;
    preis: number;
    bild: string;
    beschreibung: string;
  }
  