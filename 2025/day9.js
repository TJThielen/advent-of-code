import {readFile} from 'fs/promises';

// const file = await readFile('./test.txt', 'utf8')
const file = await readFile('./day9.txt', 'utf8')
let coords = file.split('\n').map(line => line.split(',')).map(line => [Number(line[0]), Number(line[1])]);
let walls = [];

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

    a:
    for(const area of sortedAreas){
        for(let index = 0; index < coords.length; index++){
            let coord = coords[index];
            const [inMiddle, onEdge] = existsInArea(area[0], coord)
            if(inMiddle){
                continue a;
            } else if(onEdge){
                let lastIndex = index - 1;
                lastIndex = lastIndex < 0 ? coords.length-1 : lastIndex;
                let nextIndex = (index + 1) % coords.length;
                if(cutsAcross(area[0], index, lastIndex) || cutsAcross(area[0], index, nextIndex)){
                    continue a;
                }
            }
        }
        if(isGreen(area[0])){
            console.log(area);
            return;
        }
    }
}

function existsInArea(area, coord){
    let points = area.split(' ').map(a => a.split(',')).map(arr => [Number(arr[0]), Number(arr[1])]);

    if((points[0][0] == coord[0] && points[0][1] == coord[1]) || (points[1][0] == coord[0] && points[1][1] == coord[1])) {
        return [false, false]
    }

    //in or on edge of area
    if((coord[0] <= points[0][0] && coord[0] >= points[1][0]) || (coord[0] >= points[0][0] && coord[0] <= points[1][0])){
        if((coord[1] <= points[0][1] && coord[1] >= points[1][1]) || (coord[1] >= points[0][1] && coord[1] <= points[1][1])){
            
            //on edge
            if(coord[0] == points[0][0] || coord[0] == points[1][0] || coord[1] == points[0][1] || coord[1] == points[1][1]){
                return [false, true];
            }
            
            return [true, null];
        }
    }
    
    return [false, false];
}

function cutsAcross(area, thisIndex, nextIndex){
    let thisPoint = [...coords[thisIndex]];
    let nextPoint = [...coords[nextIndex]];
    let newPoint = [...coords[thisIndex]];

    //move 1 square towards next point and recheck
    if(nextPoint[0] == thisPoint[0] && nextPoint[1] < thisPoint[1]){
        newPoint[1]--;
    } else if(nextPoint[0] == thisPoint[0] && nextPoint[1] > thisPoint[1]){
        newPoint[1]++;
    } else if(nextPoint[1] == thisPoint[1] && nextPoint[0] > thisPoint[0]){
        newPoint[0]++;
    } else if(nextPoint[1] == thisPoint[1] && nextPoint[0] < thisPoint[0]){
        newPoint[0]--;
    }

    const res = existsInArea(area, newPoint);
    return res[0];
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

        if(startWall[1] < startRangeY && endWall[1] > endRangeY && startWall[0] > startRangeX && startWall[0] < endRangeX){
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

        if(startWall[0] < startRangeX && endWall[0] > endRangeX && startWall[1] > startRangeY && startWall[1] < endRangeY){
            return false;
        }
    }

    return true;
}

p2();


//lower than 4661665300, 4661665300