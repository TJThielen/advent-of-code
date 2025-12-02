import fs from 'fs/promises';

const text = await fs.readFile("day7.txt", "utf-8");

function p1() {
    let arr = text.split("\n");
    arr = orderInstructions(arr);

    const map = new Map();
    for(const line of arr){
        const parts = line.split(" ");
        let operator = "SET";
        let operand1 = null;
        let operand2 = null;
        let operand3 = null;
        if(parts.length == 4){
            operand3 = parts[3];
            operand1 = isNaN(parts[1]) ? map.has(parts[1]) ? map.get(parts[1]) : 0 : Number(parts[1]);
            operator = "NOT";
        } else if(parts.length == 5){
            operator = parts[1];
            operand1 = isNaN(parts[0]) ? map.has(parts[0]) ? map.get(parts[0]) : 0 : Number(parts[0]);
            operand2 = isNaN(parts[2]) ? map.has(parts[2]) ? map.get(parts[2]) : 0 : Number(parts[2]);
            operand3 = parts[4];
        } else {
            operand1 = isNaN(parts[0]) ? map.has(parts[0]) ? map.get(parts[0]) : 0 : Number(parts[0]);
            operand3 = parts[2];
        }

        let val = 0;
        switch(operator){
            case "SET":
                val = operand1;
                break;
            case "NOT":
                val = ~operand1;
                break;
            case "LSHIFT":
                val = operand1 << operand2;
                break;
            case "RSHIFT":
                val = operand1 >> operand2;
                break;
            case "AND":
                val = operand1 & operand2;             
                break;
            case "OR":
                val = operand1 | operand2;
                break;
            default:
                console.log("aaahhh");
        }

        if(val > -1){
            map.set(operand3, val);
        } else {
            map.set(operand3, 65536 + val);
        }
    }
    console.log(map.get("a"));
}

function orderInstructions(arr){
    const unOrdered = [...arr];
    const ordered = [];
    const set = new Set();

    let i = 0;
    while(unOrdered.length > 0){
        const line = unOrdered[i];

        const parts = line.split(" ");

        if(parts.length == 3 && (!isNaN(parts[0]) || set.has(parts[0]))){
            ordered.push(line);
            set.add(parts[2]);
            unOrdered.splice(i, 1);
        } else {
            if(parts.length == 4 && (!isNaN(parts[1]) || set.has(parts[1]))) { 
                ordered.push(line);
                set.add(parts[3]);
                unOrdered.splice(i, 1);
            } else if(parts.length == 5 && (!isNaN(parts[0]) || set.has(parts[0])) && (!isNaN(parts[2]) || set.has(parts[2]))){
                ordered.push(line);
                set.add(parts[4]);
                unOrdered.splice(i, 1);
            } else {
                i = i >= unOrdered.length - 1 ? 0 : i + 1;
            }
        }

        if(i >= unOrdered.length) {
            i = 0;
        }
    }

    return ordered;
}

p1();