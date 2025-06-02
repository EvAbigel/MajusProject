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

        manager.setRenderCallBack((array)=>{
            this.#tbody.innerHTML = "";
            manager.kiadas = 0;
            manager.bevetel = 0;
            manager.counter = 0;

            for (const items of array){
                const trow = createHTMLElement("tr", this.#tbody);

                createCell("td", items.tipus, trow);
                createCell("td", items.boltNev, trow);
                createCell("td", items.honap, trow);
                const arTd = createCell("td", items.ar, trow);

                if (items.ar < 0){
                arTd.classList.add("negativ");
                manager.kiadas = plusz(Number(manager.kiadas), Number(items.ar));
                }
                else{
                    arTd.classList.add("pozitív");
                    manager.bevetel = plusz(Number(manager.bevetel), Number(items.ar));
                }

                manager.counter++;
            }
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

class FormArea extends Area{
    #errorDiv

    #monthSelect;
    #selectList;
    #orderList;

    #nameInput
    #numInput

    constructor(className, manager){
        super(className,manager);

        createHTMLElement("label", this.div).innerText = "Megnevezés:";
        this.#nameInput = createHTMLElement("input", this.div)
        this.#nameInput.type = "text";
        createHTMLElement("br", this.div);

        createHTMLElement("label", this.div).innerText = "Hónap:";
        this.#monthSelect = createHTMLElement("select", this.div);
        createHTMLElement("br", this.div);

        createHTMLElement("label", this.div).innerText = "Összeg:";
        this.#numInput = createHTMLElement("input", this.div)
        this.#numInput.type = "number";
        createHTMLElement("br", this.div);

        this.#selectList = createHTMLElement("select", this.div);
        this.#orderList = createHTMLElement("select", this.div);

        this.#fillSelects(["", "jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "szep", "okt", "nov", "dec"],
                          ["","Megnevezés", "Hely", "Hónap", "Összeg"]);

        this.#errorDiv = createHTMLElement("div", this.div);
        this.#errorDiv.classList.add("errorDiv");
    }

    #fillSelects(monthelect, listSelect){
        for (const items of monthelect){
            const option = createHTMLElement("option", this.#monthSelect);
            option.value = items;
            option.innerHTML = items;
        }

        for (const items of ["","Növekvő", "Csökkenő"]){
            const option = createHTMLElement("option", this.#orderList);
            option.value = items;
            option.innerHTML = items;
        }

        for (const items of listSelect){
            const option = createHTMLElement("option", this.#selectList);
            option.value = items;
            option.innerHTML = items;
        }
    }

    validateFields(){
        this.#errorDiv.innerHTML = "";

        if(this.#validateFilter() && this.#validateSort()){
            this.#sortBy();
            this.#filterBy();
        }
        else if (this.#validateFilter()){
            this.#filterBy();
        }
        else if (this.#validateSort()){
            this.#sortBy();
        }
        else{
            
            this.#errorDiv.innerHTML = "Töltsd ki valamelyik 2 v. 3 mezőt!";
            
        }
    }

    #validateFilter(){
        if (this.#nameInput.value != "" && this.#monthSelect.value != "" && this.#numInput.value){
            return true;
        }
        else{
            return false;
        }
    }

    #validateSort(){
        if(this.#selectList.value != "" && this.#orderList.value != ""){
            return true;
        }
        else{
            return false;
        }
    }

    

    #sortBy() {
    const selectVal = this.#selectList.value;
    const orderVal = this.#orderList.value;

    this.manager.sortBy((array) => {
        const sorted = array.slice();

        sorted.sort((a, b) => {
            let aVal, bVal;

            if (selectVal === "Megnevezés") {
                aVal = a.tipus;
                bVal = b.tipus;
            } else if (selectVal === "Hely") {
                aVal = a.boltNev;
                bVal = b.boltNev;
            } else if (selectVal === "Hónap") {
                aVal = a.honap;
                bVal = b.honap;
            } else if (selectVal === "Összeg") {
                aVal = Number(a.ar);
                bVal = Number(b.ar);
            }

            if (typeof aVal === "string") {
                return orderVal === "Növekvő"
                    ? aVal.localeCompare(bVal)
                    : bVal.localeCompare(aVal);
            } else {
                return orderVal === "Növekvő"
                    ? aVal - bVal
                    : bVal - aVal;
            }
        });

        return sorted;
    });
}


    #filterBy() {
    const name = this.#nameInput.value;
    const honap = this.#monthSelect.value;
    const ar = Number(this.#numInput.value);

    this.manager.filterBy((array) => {
        return array.filter(item => {
            return (
                item.tipus === name &&
                item.honap === honap &&
                Number(item.ar) === ar
            );
        });
    });
}

}
