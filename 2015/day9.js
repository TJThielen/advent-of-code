import fs from 'fs/promises';

const text = await fs.readFile("day9.txt", "utf-8");

function p1(){
    const paths = {};
    const lines = text.split("\n");
    const map = new Map();
    let smallest = 1000;

    function recursivelyFind(arr, distance){
        if(arr.length == map.size){
            paths[arr] = distance;
            smallest = distance < smallest ? distance : smallest;
            return;
        }

        for(const [town, routes] of map){
            if(!arr.includes(town)){
                recursivelyFind([...arr, town], distance + Number(routes[arr[arr.length-1]]))
            }
        }
    }

    

    lines.forEach(line => {
        const parts = line.split(" ");
        const place1 = parts[0];
        const place2 = parts[2];
        const distance = parts[4];
        if (!map.has(place1)) {
            map.set(place1, {});
        }
        if (!map.has(place2)) {
            map.set(place2, {});
        }
        map.get(place1)[place2] = distance;
        map.get(place2)[place1] = distance;
    });


    for(const head of map.keys()){
        recursivelyFind([head], 0);
    }
    console.log(smallest);
}

function p2(){
    const paths = {};
    const lines = text.split("\n");
    const map = new Map();
    let largest = 0;

    function recursivelyFind(arr, distance){
        if(arr.length == map.size){
            paths[arr] = distance;
            largest = distance > largest ? distance : largest;
            return;
        }

        for(const [town, routes] of map){
            if(!arr.includes(town)){
                recursivelyFind([...arr, town], distance + Number(routes[arr[arr.length-1]]))
            }
        }
    }

    

    lines.forEach(line => {
        const parts = line.split(" ");
        const place1 = parts[0];
        const place2 = parts[2];
        const distance = parts[4];
        if (!map.has(place1)) {
            map.set(place1, {});
        }
        if (!map.has(place2)) {
            map.set(place2, {});
        }
        map.get(place1)[place2] = distance;
        map.get(place2)[place1] = distance;
    });


    for(const head of map.keys()){
        recursivelyFind([head], 0);
    }

    console.log(largest);
}


p2();