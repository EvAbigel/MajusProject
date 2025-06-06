    class Manager{
        #array
        #addCallback;
        #renderCallback

        #kiadas;
        #bevetel;
        #counter

        get kiadas(){
            return this.#kiadas;
        }

        set kiadas(value){
            this.#kiadas = value;
        }

        get bevetel(){
            return this.#bevetel;
        }

        set bevetel(value){
            this.#bevetel = value;
        }

        get counter(){
            return this.#counter;
        }
        set counter(value){
            this.#counter = value;
        }


        constructor() {
            this.#array = [];
            this.#addCallback = ()=>{};
            this.#renderCallback = () => {};

            this.#kiadas = 0;
            this.bevetel = 0;
            this.counter = 0;
        }

        setAddCallBack(callBack){
            this.#addCallback = callBack;
        }

        setRenderCallBack(callBack){
            this.#renderCallback = callBack;
        }

        add(termek){
            this.#array.push(termek);
            this.#addCallback(termek);
        }

        render(array){
            this.#renderCallback(array);
        }

        generateTextForExport(){
            const result = [];

            for (const termek of this.#array){
                const line = `${termek.tipus};${termek.boltNev};${termek.honap};${termek.ar}`;
                result.push(line);
            }
            return result.join("\n");
        }

        sortBy(callBack) {
            this.#renderCallback(callBack(this.#array));
        }


        filterBy(callBack) {
            this.#renderCallback(callBack(this.#array));   
        }

    }