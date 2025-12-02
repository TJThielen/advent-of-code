import fs from 'fs/promises';

const text = await fs.readFile("day6.txt", "utf-8");

function p1() {
    const arr = text.split("\n");
    const lights = new Set();
    for(const line of arr){
        let on = false;
        let startCoords = [];
        let endCoords = [];
        const parts = line.split(" ");
        if(parts.length == 4){
            on = "toggle";
            startCoords = parts[1].split(',');
            endCoords = parts[3].split(',');
        } else {
            on = parts[1] == "on";
            startCoords = parts[2].split(',');
            endCoords = parts[4].split(',');
        }

        if(on == "toggle"){
            for(let i = Number(startCoords[0]); i <= Number(endCoords[0]); i++){
                for(let j = Number(startCoords[1]); j <= Number(endCoords[1]); j++){
                    lights.has(`${i},${j}`) ? lights.delete(`${i},${j}`) : lights.add(`${i},${j}`);
                }
            }
        } else if (on) {
            for(let i = Number(startCoords[0]); i <= Number(endCoords[0]); i++){
                for(let j = Number(startCoords[1]); j <= Number(endCoords[1]); j++){
                    lights.add(`${i},${j}`);
                }
            }
        } else {
            for(let i = Number(startCoords[0]); i <= Number(endCoords[0]); i++){
                for(let j = Number(startCoords[1]); j <= Number(endCoords[1]); j++){
                    lights.delete(`${i},${j}`);
                }
            }
        }
    }

    console.log(lights.size);
}

function p2() {
    const arr = text.split("\n");
    const lights = new Map();
    for(const line of arr){
        let on = false;
        let startCoords = [];
        let endCoords = [];
        const parts = line.split(" ");
        if(parts.length == 4){
            on = "toggle";
            startCoords = parts[1].split(',');
            endCoords = parts[3].split(',');
        } else {
            on = parts[1] == "on";
            startCoords = parts[2].split(',');
            endCoords = parts[4].split(',');
        }

        if(on == "toggle"){
            for(let i = Number(startCoords[0]); i <= Number(endCoords[0]); i++){
                for(let j = Number(startCoords[1]); j <= Number(endCoords[1]); j++){
                    lights.has(`${i},${j}`) ? lights.set(`${i},${j}`, lights.get(`${i},${j}`) + 2) : lights.set(`${i},${j}`, 2);
                }
            }
        } else if (on) {
            for(let i = Number(startCoords[0]); i <= Number(endCoords[0]); i++){
                for(let j = Number(startCoords[1]); j <= Number(endCoords[1]); j++){
                    lights.has(`${i},${j}`) ? lights.set(`${i},${j}`, lights.get(`${i},${j}`) + 1) : lights.set(`${i},${j}`, 1);
                }
            }
        } else {
            for(let i = Number(startCoords[0]); i <= Number(endCoords[0]); i++){
                for(let j = Number(startCoords[1]); j <= Number(endCoords[1]); j++){
                    lights.has(`${i},${j}`) ? lights.set(`${i},${j}`, lights.get(`${i},${j}`) != 0 ? lights.get(`${i},${j}`) - 1 : 0) : lights.set(`${i},${j}`, 0);
                }
            }
        }
    }

    let total = 0;
    for(const l of lights.values()){
        total += l;
    }
    console.log(total);
}

p2();