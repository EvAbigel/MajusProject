class Termek{
    #tipus;
    #boltNev;
    #honap;
    #ar;

    get tipus(){
        return this.#tipus;
    }

    get boltNev(){
        return this.#boltNev;
    }

    get honap(){
        return this.#honap;
    }

    get ar(){
        return this.#ar;
    }

    constructor(tipus, boltNev, honap, ar){
        this.#tipus = tipus;
        this.#boltNev = boltNev;
        this.#honap = honap;
        this.#ar = ar;
    }
}