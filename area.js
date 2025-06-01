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
            this.#filterBy();
            this.#sortBy();
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

    #validateSort(){
        if(this.#nameInput != "" && this.#monthSelect.value != "" && this.#numInput !=""){
            return true;
        }
        else{
            return false;
        }
    }

    #validateFilter(){
        if (this.#selectList.value != "" && this.#monthSelect != ""){
            return true;
        }
        else{
            return false;
        }
    }

    #sortBy(){
        this.manager.sortBy(this.#selectList, this.#orderList);
    }

    #filterBy(){
        this.manager.filterBy(this.#nameInput.value, this.#monthSelect.value, this.#numInput.value);
    }
}
