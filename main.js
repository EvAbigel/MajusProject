const manager = new Manager();
const formArea = new FormArea("formArea", manager);
const button = createCell("button", "Rendezz/Szűrj/Számíts!", formArea.div);
button.addEventListener('click', (e)=>{
    answerDiv.innerHTML = "";
    formArea.validateFields();

    addSentence(`Az összes kiadás: ${manager.kiadas}.`, answerDiv);
    addSentence(`Az összes bevétel: ${manager.bevetel}.`, answerDiv);
    addSentence(`Az elemek száma: ${manager.counter}.`, answerDiv);

    
});

createHTMLElement("br", document.body);

fileUploader(fileResult =>{
    const fileLines = fileResult.split("\n");
    const dataLines = fileLines.slice(1);

    for (const line of dataLines){
        const fields = line.split(";");
        
        const termek = new Termek(fields[0],fields[1],fields[2],fields[3]);
        manager.add(termek);
    }
});



const tableArea = new TableArea("tableArea", manager);
const answerDiv = createHTMLElement("div", document.body);