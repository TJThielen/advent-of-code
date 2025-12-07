import {readFile} from 'fs/promises';

// const file = await readFile('./test.txt', 'utf8')
const file = await readFile('./day7.txt', 'utf8')
const lines = file.split('\n');

function p1(){
    let total = 0;
    let beamIndicies = new Set();
    for(const line of lines){
        for(let i = 0; i < line.length; i++){
            if(line.charAt(i) == 'S') {
                beamIndicies.add(i);
            }
            if(line.charAt(i) == '^' && beamIndicies.has(i)) {
                total++;
                beamIndicies.delete(i);
                if(i > 0){
                    beamIndicies.add(i-1);
                }
                if(i < line.length-1){
                    beamIndicies.add(i+1);
                }
            }
        }
    }
    console.log(total);
}

function p2(){
    let total = 0;
    let beamIndicies = new Map();
    for(const line of lines){
        let temp = 0;
        for(let i = 0; i < line.length; i++){
            if(line.charAt(i) == 'S') {
                beamIndicies.set(i, 1);
                temp++;
            }
            if(line.charAt(i) == '^' && beamIndicies.has(i)) {
                if(i > 0){
                    if(beamIndicies.has(i-1)){
                        beamIndicies.set(i-1, beamIndicies.get(i-1) + beamIndicies.get(i))
                    } else {
                        beamIndicies.set(i-1, beamIndicies.get(i));
                    }
                }
                if(i < line.length-1){
                    if(beamIndicies.has(i+1)){
                        beamIndicies.set(i+1, beamIndicies.get(i+1) + beamIndicies.get(i))
                    } else {
                        beamIndicies.set(i+1, beamIndicies.get(i));
                    }                }
                if(i < line.length-1 && i > 0){
                    temp+=beamIndicies.get(i);
                }
                beamIndicies.delete(i);
            }
        }
        total += temp;
    }
    console.log(total);
}

/**
 * My recrusive function used purely to fact-check the accuracy of beamIndicies for each line
const arr = [];
function beam(index, trav) {
    if(trav == lines.length){
        n++;
    } else {
        if(lines[trav].charAt(index) == '^'){
            if(index > 0){
                beam(index-1, trav+1);
                if(!arr[trav]) {
                    arr[trav] = new Map();
                } 
                if(arr[trav].has(index-1)){
                    arr[trav].set(index-1, arr[trav].get(index-1)+1);
                } else {
                    arr[trav].set(index-1, 1);
                }
            }
            if(index < lines[trav].length-1){
                beam(index+1, trav+1);
                if(!arr[trav]) {
                    arr[trav] = new Map();
                } 
                if(arr[trav].has(index+1)){
                    arr[trav].set(index+1, arr[trav].get(index+1)+1);
                } else {
                    arr[trav].set(index+1, 1);
                }
            }
        } else {
            beam(index, trav+1);
            if(!arr[trav]) {
                arr[trav] = new Map();
            } 
            if(arr[trav].has(index)){
                arr[trav].set(index, arr[trav].get(index)+1);
            } else {
                arr[trav].set(index, 1);
            }
        }
    }
    
}
*/
