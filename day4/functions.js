var valueView = document.querySelector(".viewfinder");

var btn1 = document.querySelector("#symbol1"); //Number 1
var btn2 = document.querySelector("#symbol2"); //Number 2

var btnSomar = document.querySelector("#symbolSum"); 
var btnResul = document.querySelector("#symbolResul"); 

var previewResul, tamanhoValueView, lastNumber="";

btn1.addEventListener("click", function(){ //Number 1
    valueView.innerHTML += btn1.innerHTML;
});

btn2.addEventListener("click", function(){ //Number 1
    valueView.innerHTML += btn2.innerHTML;
});

btnSomar.addEventListener("click", function(){  //+
    
    tamanhoValueView = valueView.innerHTML.length;

    if(valueView.innerHTML == "")
        valueView.innerHTML = "";
    else if (
        (valueView.innerHTML.substring(tamanhoValueView-1, tamanhoValueView) == "+") ||
        (valueView.innerHTML.substring(tamanhoValueView-1, tamanhoValueView) == "-") ||
        (valueView.innerHTML.substring(tamanhoValueView-1, tamanhoValueView) == "x") ||
        (valueView.innerHTML.substring(tamanhoValueView-1, tamanhoValueView) == "/") 
    ){
        valueView.innerHTML += "";
    }
    else
    {
        for(var i = valueView.innerHTML.length; i > 0; i--){ //roda procurando outros sinais antes para calcular apenas o último valor
            if ((valueView.innerHTML.substring(i-1, i) != "+") ||
                (valueView.innerHTML.substring(i-1, i) != "-") ||
                (valueView.innerHTML.substring(i-1, i) != "x") ||
                (valueView.innerHTML.substring(i-1, i) != "/"))
            {
                lastNumber += valueView.innerHTML.substring(i-1, i);
                console.log(lastNumber);
                console.log("======");
            }
        }
        valueView.innerHTML += btnSomar.innerHTML;  
    }
});

btnResul.addEventListener("click", function(){  //=

    const resul = valueView.innerHTML;
    alert(resul);
});