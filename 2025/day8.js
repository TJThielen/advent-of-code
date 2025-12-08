import {readFile} from 'fs/promises';

// const file = await readFile('./test.txt', 'utf8')
const file = await readFile('./day8.txt', 'utf8')
const lines = file.split('\n').map(line => line.split(',').map(num => Number(num)));

lines.sort((a, b) => a[0] - b[0]);
const connections = [];

function p1(){
    let total = 1;
    let j = 0;
    
    let min = 0;
    while(j < 1000){
        let closestDistance = 1000000000;
        let closest = null;

        for(let i = 0; i < lines.length; i++){
            const res = getClosest(i, closestDistance, min);
            if(res){
                if(res[0] < closestDistance){
                    closestDistance = res[0];
                    closest = [i, res[1]]
                }
            }
        }

        if(!connections[closest[0]]){
            connections[closest[0]] = new Set();
            connections[closest[0]].add(closest[0])
        }

        if(!connections[closest[1]]){
            connections[closest[1]] = new Set();
            connections[closest[1]].add(closest[1])
        }

        if(!connections[closest[0]].has(closest[1])){

            for(const n of connections[closest[0]]){
                connections[closest[1]].add(n);
            }
            for(const n of connections[closest[1]]){
                connections[n] = connections[closest[1]];
            }
        }
        min = closestDistance;
        j++;
    }


    const visited = new Set();
    let a = 0;
    connections.sort((a, b) => b.size - a.size);

    for(const circuit of connections){
        if(circuit){
            if(!visited.has([...circuit][0])){
                a++;
                total *= circuit.size;
                visited.add([...circuit][0]);
                if(a == 3){
                    break;
                }
            }
        }
    }
    console.log(total);
}  

function getClosest(index, max, min){
    let xIndex = 0;

    for(let i = 0; i < lines.length; i++){
        if(lines[i] == lines[index]){
            xIndex = i;
        }
    }

    let closest = max;
    let closestIndex = 0;
    
    let i = 1;
    while(true){  
        if(xIndex + i < lines.length){
            const xDist = Math.abs(lines[xIndex+i][0]-lines[index][0]);
            const yDist = Math.abs(lines[xIndex+i][1]-lines[index][1]);
            const zDist = Math.abs(lines[xIndex+i][2]-lines[index][2]);

            if(xDist > closest){
                break;
            }

            let distance = Math.sqrt(xDist * xDist + yDist * yDist + zDist * zDist);
            if(distance < closest && distance > min){
                closest = distance;
                closestIndex = xIndex+i;
            }
            i++;
        } else {
            break;
        }
    }

    i = 1;
    while(true){  
        if(xIndex - i >= 0){
            const xDist = Math.abs(lines[xIndex-i][0]-lines[index][0]);
            const yDist = Math.abs(lines[xIndex-i][1]-lines[index][1]);
            const zDist = Math.abs(lines[xIndex-i][2]-lines[index][2]);

            if(xDist > closest){
                break;
            }

            let distance = Math.sqrt((xDist * xDist) + (yDist * yDist) + (zDist * zDist));
            if(distance < closest && distance > min){
                closest = distance;
                closestIndex = xIndex-i;
            }
            i++;
        } else {
            break;
        }
    }
    return [closest, closestIndex];
}

function p2(){
    let j = 0;
    
    let closest = null;
    let min = 0;
    while(true){
        let closestDistance = 1000000000;

        for(let i = 0; i < lines.length; i++){
            let res = getClosest(i, closestDistance, min);
            if(res){
                if(res[0] < closestDistance){
                    closestDistance = res[0];
                    closest = [i, res[1]]
                }
            }
        }

        if(!connections[closest[0]]){
            connections[closest[0]] = new Set();
            connections[closest[0]].add(closest[0])
        }

        if(!connections[closest[1]]){
            connections[closest[1]] = new Set();
            connections[closest[1]].add(closest[1])
        }

        if(!connections[closest[0]].has(closest[1])){

            for(const n of connections[closest[0]]){
                connections[closest[1]].add(n);
            }
            for(const n of connections[closest[1]]){
                connections[n] = connections[closest[1]];
            }
        }
        min = closestDistance;
        j++;

        if(connections[0]){
            if(connections[0].size == lines.length){
                break;
            }
        }
    }

    console.log(lines[closest[0]][0] * lines[closest[1]][0]);
}  

p2();