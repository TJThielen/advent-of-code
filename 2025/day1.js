import { readFile } from 'fs/promises';

const content = await readFile('./day1.txt', 'utf8');

const lines = content.split('\n');

function p1() {
    let pos = 50;
    let total = 0;
    for(const line of lines){
            const num = Number(line.substring(1));
        if(line[0] == 'R'){
            pos += num;
        } else {
            pos -= num;
        }
        pos = (10000 + pos) % 1000;
        if(pos == 0){
            total++;
        }
    }
    console.log(total);
}

function p2(){
    let pos = 50;
    let total = 0;

    for(const line of lines){
        const num = Number(line.substring(1));
        if(line[0] == 'R'){
            for(let i = 0; i < num; i++){
                pos += 1;
                pos = pos % 100;
                if(pos == 0){
                    total++;
                }
            } 
        } else {
            for(let i = 0; i < num; i++){
                pos -= 1;
                pos = (pos + 100) % 100;
                if(pos == 0){
                    total++;
                }
            }
        }
    }
    console.log(total);

}

p2();