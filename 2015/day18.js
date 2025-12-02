import fs from 'fs/promises';

const text = await fs.readFile("day18.txt", "utf-8");
const grid = text.split('\n').map(line => line.split(''));

function getNeighbors(row, col, grid) {
    let count = 0;
    for(let i = Number(row)-1; i <= Number(row)+1; i++){
        if(i >= 0 && i < grid.length){
            for(let j = Number(col)-1; j<= Number(col)+1; j++){
                if(j >= 0 && j < grid.length){
                    if(grid[i][j] === '#' && (i != row || j != col)){
                        count++;
                    }
                }
            }
        }
    }
    return count;
}

function getCounts(grid){
    const counts = [];

    for(const r in grid){
        const arr = [];
        for(const c in grid){
            arr.push(getNeighbors(r,c, grid));
        }
        counts.push(arr);
    }
    return counts;
}





function p1(){
    function getNext(grid){
        const next = []
        const counts = getCounts(grid);
        for(let i = 0; i < grid.length; i++){
            const arr = []
            for(let j = 0; j < grid.length; j++){
                if(counts[i][j] == 3 && grid[i][j] === '.'){
                    arr.push('#');
                } else if ((counts[i][j] == 2 || counts[i][j] == 3) && grid[i][j] == '#'){
                    arr.push('#');
                } else {
                    arr.push('.');
                }
            }
            next.push(arr);
        }
        return next;
    }
    let g = grid;
    for(let i = 0; i < 100; i++){
        g = getNext(g);
    }
    
    let counter = 0;
    for(const row of g){
        for(const light of row){
            if(light === '#'){
                counter++;
            }
        }
    }
    console.log(counter);
}

function p2(){
    function getNext(grid){
        const next = []
        const counts = getCounts(grid);
        for(let i = 0; i < grid.length; i++){
            const arr = []
            for(let j = 0; j < grid.length; j++){
                if(counts[i][j] == 3 && grid[i][j] === '.'){
                    arr.push('#');
                } else if ((counts[i][j] == 2 || counts[i][j] == 3) && grid[i][j] == '#'){
                    arr.push('#');
                } else {
                    arr.push('.');
                }
            }
            next.push(arr);
        }
        next[0][0] = "#";
        next[0][next.length-1] = "#";
        next[next.length-1][0] = "#";
        next[next.length-1][next.length-1] = "#";
        return next;
    }
    let g = grid;
    g[0][0] = "#";
    g[0][g.length-1] = "#";
    g[g.length-1][0] = "#";
    g[g.length-1][g.length-1] = "#";
    for(let i = 0; i < 100; i++){
        g = getNext(g);
    }
    
    let counter = 0;
    for(const row of g){
        for(const light of row){
            if(light === '#'){
                counter++;
            }
        }
    }
    console.log(counter);
}

p2();