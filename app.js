const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const Range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");


canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "white";
ctx.fillRect(0,0,700,700);

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;


let painting = false;
let filling = false;

function stopPainting(event){
    painting = false;
}

function startPainting(event){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;

    if(!painting){
        ctx.beginPath(); /*MAKING PATH */
        ctx.moveTo(x,y);
    }
    else{
        ctx.lineTo(x,y);/*MAKING LINE */
        ctx.stroke();
    }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangebar(event){
    const Range_value = event.target.value;
    ctx.lineWidth = Range_value;
}

function handleModeClick(){
    if(filling ===true){
        filling = false;
        mode.innerText = "Fill"

    }else{
        filling =true;
        mode.innerText = "Paint"
    }
}

function handleBackground(event){
    if(filling){
    ctx.fillRect(0,0,700,700);
}
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveBtn(){
    const image = canvas.toDataURL("image/jpeg")
    const link = document.createAttribute("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",handleBackground);
    canvas.addEventListener("contextmenu",handleCM);
}

if (colors){
Array.from(colors).forEach(color =>
    color.addEventListener("click",handleColorClick)
    ); //forEach는 배열속의 원소를 가질수있게 도와주는 함수이다.
}


if (Range) {
    Range.addEventListener("input", handleRangebar);
}

if (mode){
    mode.addEventListener("click",handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click",handleSaveBtn);
}