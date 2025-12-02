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
    let pos1 = 50;
    let total1 = 0;

    let pos2 = 50;
    let total2 = 0;

    for(const line of lines){
        const num = Number(line.substring(1));
        if(line[0] == 'R'){
            pos1 += num;
        } else {
            if(pos1 == 0){
                pos1 = 100;
            }
            pos1 -= num;
            if(pos1 % 100 == 0){
                pos1 -= 100;
            }
        }
        
        total1 += Math.abs(Math.floor((1000 + pos1) / 100) - 10);
        pos1 = (1000 + pos1) % 100;

        
        if(line[0] == 'R'){
            for(let i = 0; i < num; i++){
                pos2 += 1;
                pos2 = pos2 % 100;
                if(pos2 == 0){
                    total2++;
                }
            } 
        } else {
            for(let i = 0; i < num; i++){
                pos2 -= 1;
                pos2 = (pos2 + 100) % 100;
                if(pos2 == 0){
                    total2++;
                }
            }
        }
        if(total1 != total2){
            console.log();
        }
    }
    console.log(total1);
    console.log(total2);

}

p2();