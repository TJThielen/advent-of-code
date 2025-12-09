import {readFile} from 'fs/promises';

// const file = await readFile('./test.txt', 'utf8')
const file = await readFile('./day9.txt', 'utf8')
let coords = file.split('\n').map(line => line.split(',')).map(line => [Number(line[0]), Number(line[1])]);

function p1(){
    let rectangleArea = 0;
    for(let i = 0; i < coords.length; i++){
        for(let j = i+1; j < coords.length; j++){
            let area = (Math.abs(coords[i][0] - coords[j][0]) + 1) * (Math.abs(coords[i][1] - coords[j][1]) + 1);
            rectangleArea = rectangleArea > area ? rectangleArea : area;
        }
    }
    console.log(rectangleArea);
}

function p2(){
    let areas = new Map();
    for(let i = 0; i < coords.length; i++){
        for(let j = i+1; j < coords.length; j++){
            let area = (Math.abs(coords[i][0] - coords[j][0]) + 1) * (Math.abs(coords[i][1] - coords[j][1]) + 1);
            areas.set(`${coords[i][0]},${coords[i][1]} ${coords[j][0]},${coords[j][1]}`, area);
        }
    }

    const sortedAreas = [...areas].sort((a, b) => b[1] - a[1]);

    for(const area of sortedAreas){
        if(isGreen(area[0])){
            console.log(area);
            return;
        }
    }
}

function isGreen(area){
    let points = area.split(' ').map(a => a.split(',')).map(arr => [Number(arr[0]), Number(arr[1])]);
    
    let startRangeX = points[0][0];
    let endRangeX = points[1][0];

    if(startRangeX > endRangeX){
        let temp = startRangeX;
        startRangeX = endRangeX;
        endRangeX = temp;
    }

    let startRangeY = points[0][1];
    let endRangeY = points[1][1];

    if(startRangeY > endRangeY){
        let temp = startRangeY;
        startRangeY = endRangeY;
        endRangeY = temp;
    }

    //vertical line check
    for(let i = 0; i < coords.length; i+=2){
        let startWall = coords[i];
        let endWall = coords[i+1];

        if(startWall[1] > endWall[1]){
            let temp = [...startWall];
            startWall = [...endWall];
            endWall = temp;
        }

        if(startWall[1] < endRangeY && endWall[1] > startRangeY && startWall[0] > startRangeX && startWall[0] < endRangeX){
            return false;
        }

    }

    //horizontal line check
    for(let i = 1; i < coords.length; i+=2){        
        let startWall = coords[i];
        let endWall = coords[(i+1) % coords.length];

        if(startWall[0] > endWall[0]){
            let temp = [...startWall];
            startWall = [...endWall];
            endWall = temp;
        }

        if(startWall[0] < endRangeX && endWall[0] > startRangeX && startWall[1] > startRangeY && startWall[1] < endRangeY){
            return false;
        }
    }

    return true;
}

p2();


//lower than 4661665300, 4661665300