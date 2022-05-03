class Keyboard{
    row=[];
constructor()
{
    
    this.keyBoard = document.createElement("div");
    this.keyBoard.id = "keyboard";
    document.body.append(this.keyBoard);
    this.keyMap=this.keysCreator(keyboardProperties);
    const keyboard=this;
    keyBoardMatrix.forEach(rowArray=>
        {
            let tmpRow = document.createElement("div");
            tmpRow.className="keyboard-row"; 
            rowArray.forEach(buttonElement=>
                {
                    tmpRow.append(keyboard.keyMap[buttonElement].thisElement());  
                })
                this.keyBoard.append(tmpRow);  
        })
    window.addEventListener("keydown",function(event)
    {
        event.preventDefault();
        event.stopImmediatePropagation();
        let element =document.getElementById(event.code);
        if(element)
        {
            element.classList.add("Active");
        }
    });
    window.addEventListener("keyup",function(event)
    {
        let element =document.getElementById(event.code);
        if(element)
        {
            element.classList.remove("Active");
        }
    });
}
keysCreator(keysObject)
{
    let keyMap={}
    for(const oneKey in keysObject)
    {
        keyMap[oneKey] = new OneKey(oneKey,keysObject[oneKey].default||keysObject[oneKey].title,keysObject[oneKey]);
    }
    return keyMap;
}
}


class OneKey
{
    constructor(keyCode,keyValue,keyProperty)
    {
        this.key = document.createElement("div");
        this.key.id=keyCode;
        this.key.innerHTML = keyValue.toUpperCase();
        this.key.classList.add("onekey");
        if(keyProperty && keyProperty.size)
        {
            this.key.classList.add(keyProperty.size);
        }
    }
    thisElement()
    {
        return this.key;
    }
}


new Keyboard();
/* let dc={};

window.addEventListener("keydown",function(event)
{
    event.preventDefault();
    event.stopPropagation()
    event.stopImmediatePropagation();
    console.log(event);
dc[event.code]=event.key;
})
document.getElementById("create").addEventListener("click",function(event)
{
console.log(dc);
}) */