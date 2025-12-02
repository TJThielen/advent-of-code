import fs from 'fs/promises';

const text = await fs.readFile("day13.txt", "utf-8");
const lines = text.split('\n').map(line => {
    const parts = line.split(' ');
    return [parts[0], parts[2] == "gain" ? '+' : '-', parts[3], parts[10].substring(0, parts[10].length-1)]
});
const map = new Map();
lines.forEach(line => {
    if(!map.has(line[0])){
        map.set(line[0], {})
    }
    const object = map.get(line[0]);
    object[line[3]] = line[1] == "-" ? -line[2] : Number(line[2]);
    map.set(line[0], object);
})

function generateCombos(){
    const options = [...map.keys()];
    const results = [];

    function fillInNextPerson(arr){
        if(arr.length == options.length){
            results.push(arr);
            return;
        }

        options.forEach(person => {
            if(!arr.includes(person)){
                fillInNextPerson([...arr, person]);
            }
        })
    }

    fillInNextPerson([]);
    return results;
}

function addInTJ(){
    const TJObj = {};
    for(const [person, vals] of map.entries()){
        const newVals = vals;
        newVals["TJ"] = 0;
        map.set(person, newVals);
        TJObj[person] = 0;
    }

    map.set("TJ", TJObj);
}

function evaluate(arr) {
    let total = 0;
    for(let i = 0; i < arr.length; i++){
        const personData = map.get(arr[i]);
        total += personData[arr[(i+1) % arr.length]];
        total += personData[arr[(i-1) < 0 ? arr.length - 1 : i-1]];
    }
    return total;
}

function p1() {
    const combos = generateCombos();
    let max = 0;

    combos.forEach(possibility => {
        const happiness = evaluate(possibility);
        max = max < happiness ? happiness : max;
    })
    console.log(max);
}


function p2() {
    addInTJ();
    const combos = generateCombos();
    let max = 0;

    combos.forEach(possibility => {
        const happiness = evaluate(possibility);
        max = max < happiness ? happiness : max;
    })
    console.log(max);
}

p1();