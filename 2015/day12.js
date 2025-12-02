import fs from 'fs/promises';

const text = await fs.readFile("day12.txt", "utf-8");

function p1() {
    const matches = text.match(/-?[0-9]+/g);
    let total = 0;
    matches.forEach(match => {
        total += Number(match);
    })
    console.log(total);
}

function p2(){
    let total = 0;
    function findNonReds(object){
        if(object instanceof Array){
            object.forEach(e => {
                findNonReds(e);
            })
        } else if(object instanceof Object){
            if(!Object.values(object).includes("red")){
                Object.values(object).forEach(e => {
                    findNonReds(e);
                })
            }
        } else {
            if(Number.isInteger(object)) {
                total += Number(object);
            }
        }
    }
    const parsed = JSON.parse(text);

    findNonReds(parsed);
    console.log(total);
}

p2();