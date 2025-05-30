function createHTMLElement(type, parent){
    const element = document.createElement(type);
    parent.appendChild(element);

    return element;
}

function createCell(type, inner, parent){
    const element = createHTMLElement(type, parent);
    element.innerHTML = inner;

    return element;
}

function createHTMLElementWID( type, id, parent){
    if(parent){
        const element = createHTMLElement(type, parent);
        element.id = id;
    }
    else{
        console.log("nincs parent");
    }
}

function fileUploader(callBack){
    const fileUploader = createHTMLElement("input", document.body)
    fileUploader.type = "file";

    fileUploader.addEventListener('change', (event)=>{
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onload = () =>{
            callBack(fileReader.result);
        }
        fileReader.readAsText(file);
    })
}

function plusz(a, b){
    return a + b;
}

function addSentence(string, parent){
    const div = createHTMLElement("div", parent);
    div.innerHTML = string;
    div.appendChild(document.createElement("br"));
}
