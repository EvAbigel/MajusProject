class Area{
    #div;
    #manager

    get div(){
        return this.#div;
    }

    get manager(){
        return this.#manager
    }

    constructor(className, manager){
        this.#manager = manager;
        const container = this.#getContainer();
        this.#div = document.createElement("div");
        this.#div.className = className;
        container.appendChild(this.#div);
    }

    #getContainer(){
        let container = document.querySelector(".container");

        if(!container){
            container = document.createElement("div");
            container.className = "container";
            document.body.appendChild(container);
        }

        return container;
    }
}

class TableArea extends Area{
    #tbody;

    constructor(className, manager){
        super(className, manager)

        this.#tbody = this.#makeTableWithHeader(["Megnevezés", "Hely", "Hónap", "Összeg"]);

        manager.setAddCallBack((termek)=>{
            const trow = createHTMLElement("tr", this.#tbody);

            createCell("td", termek.tipus, trow);
            createCell("td", termek.boltNev, trow);
            createCell("td", termek.honap, trow);
            const arTd = createCell("td", termek.ar, trow);

            if (termek.ar < 0){
                arTd.classList.add("negativ");
                manager.kiadas = plusz(Number(manager.kiadas), Number(termek.ar));
            }
            else{
                arTd.classList.add("pozitív");
                manager.bevetel = plusz(Number(manager.bevetel), Number(termek.ar));
            }

            manager.counter++;

        });
    }

    #makeTableWithHeader(array){
        const table = createHTMLElement("table", this.div);
        const header = createHTMLElement("thead", table)
        const trow = createHTMLElement("tr", header);

        for (const item of array){
            createCell("th", item, trow);
        }

        const tbody = createHTMLElement("tbody", table);
        return tbody;
    }
}
