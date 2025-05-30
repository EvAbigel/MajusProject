fileUploader(fileResult =>{
    const fileLines = fileResult.split("\n");
    const dataLines = fileLines.slice(1);

    for (const line of dataLines){
        const fields = line.split(";");
        
        const termek = new Termek(fields[0],fields[1],fields[2],fields[3]);
        manager.add(termek);
    }
})

const manager = new Manager();
const tableArea = new TableArea("tableArea", manager);

const answerDiv = createHTMLElement("div", document.body);

const button = createCell("button", "Számít", document.body);
button.addEventListener('click', (e)=>{
    answerDiv.innerHTML = "";
    addSentence(`Az összes kiadás: ${manager.kiadas}.`, answerDiv);
    addSentence(`Az összes bevétel: ${manager.bevetel}.`, answerDiv);
    addSentence(`Az elemek száma: ${manager.bevetel}.`, answerDiv);
});

