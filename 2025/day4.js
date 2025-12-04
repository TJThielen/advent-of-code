//I know this ones really sloppy but I went for pure speed and don't feel like refactoring right now

import {readFile} from 'fs/promises';

const content = await readFile('./day4.txt', 'utf8');

const lines = content.split('\n').map(line => {
    const arr = [];
    for(let i = 0; i < line.length; i++){
        arr.push(line.charAt(i));
    }
    return arr;
});

function getNeighbors(row, col, grid){
    let count = 0;
    for(let i = row-1; i <= row + 1; i++){
        if(i >= 0 && i < grid.length){
            for(let j = col - 1; j <= col + 1; j++){
                if(j >= 0 && j < grid.length){
                    if(i === row && j === col) {
                        continue;
                    }
                    if(grid[i][j] === '@'){
                        count++;
                    }
                }
            } 
        }
    }
    return count;
}

function p1(){
    let total = 0;
    for(let i = 0; i < lines.length; i++){
        for(let j = 0; j < lines.length; j++){
            let neighbors = getNeighbors(i,j,lines);
            if(neighbors < 4 && lines[i][j] == '@') {
                total++;
            }
        }
    }
    console.log(total);
}

function p2(){
    let grid = lines;
    let totalRemoved = 0;
    while(true){
        let newGrid = [];
        for(let i = 0; i < lines.length; i++){
            const arr = [];
            for(let j = 0; j < lines.length; j++){
                let neighbors = getNeighbors(i,j,grid);
                if(neighbors < 4 && grid[i][j] == '@') {
                    arr.push('.')
                    totalRemoved++;
                } else {
                    arr.push(grid[i][j]);
                }
            }
            newGrid.push(arr);
        }
        grid = newGrid;
    }
}

p2();