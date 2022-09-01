const valueView = document.querySelector(".viewfinder");
const previousView = document.querySelector(".previous");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator{
    constructor(valueView, previousView){
        this.valueView = valueView;
        this.previousView = previousView;
        this.currentOperation = "";
    }

    addDigit(digit){

        if(digit === "." && this.valueView.innerText.includes(".")){
            return;
        }

        this.currentOperation = digit;
        this.updateScreen();
    }

    processOperation(operation){

        //checar se a viewFinder está vazia
        if(this.valueView.innerText === "" && operation !== "C"){
            if(this.previousView.innerText !== ""){
                //Muda operação
                this.changeOperation(operation);
            }
            return;
        }

        let operationValue;
        const previousOp = +this.previousView.innerText.split(" ")[0];
        const current = +this.valueView.innerText;

        switch(operation){
            case '+':
                operationValue = previousOp + current;
                this.updateScreen(operationValue, operation, current, previousOp)
                break;
            case '-':
                operationValue = previousOp - current;
                this.updateScreen(operationValue, operation, current, previousOp)
                break;
            case '/':
                operationValue = previousOp / current;
                this.updateScreen(operationValue, operation, current, previousOp)
                break;
            case '*':
                operationValue = previousOp * current;
                this.updateScreen(operationValue, operation, current, previousOp)
                break;
            case 'DEL':
                this.processDelOperator();
                break;
            case 'CE':
                this.processClearCurrentOperation();
                break;
            case 'C':
                this.processClearAll();
                break;
            case '=':
                this.processResul();
                break;
            default:
                return;
        }
    }

    updateScreen(
        operationValue = null, 
        operation = null,
        current = null, 
        previousOp = null){
        
            if(operationValue === null){
                this.valueView.innerText += this.currentOperation;
            } else {
                //Checar se valor é zero
                if (previousOp === 0){
                    operationValue = current;
                }

                this.previousView.innerText = `${operationValue} ${operation}`;
                this.valueView.innerText = "";
            }
    }

    changeOperation(operation){
        const mathOperation = ["*", "/", "+", "-"];

        if(!mathOperation.includes(operation)){
            return;
        }

        this.previousView.innerText = this.previousView.innerText.slice(0, -1) + operation;
    }

    //Deletar o último dígito
    processDelOperator(){
        this.valueView.innerText = this.valueView.innerText.slice(0, -1);
    }

    processClearCurrentOperation(){
        this.valueView.innerText = "";
    }

    processClearAll(){
        this.valueView.innerText = "";
        this.previousView.innerText = "";
    }

    processResul(){
        const operation = previousView.innerText.split(" ")[1];
        this.processOperation(operation);
    }
}

const calc = new Calculator(valueView,previousView);

buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const value = e.target.innerText;

        if(+value >= 0 || value === "."){ //+value converte para number
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    })
});