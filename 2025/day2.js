import fs from 'fs/promises';

const text = await fs.readFile("day2.txt", "utf-8");

const ranges = text.split(',');

function p1(){
    let total = 0;
    for(const range of ranges){
        const parts = range.split('-');
        const start = Number(parts[0]);
        const end = Number(parts[1]);
        for(let i = start; i <= end; i++){
            if(i.toString().substring(0, Math.floor(i.toString().length/2)) == i.toString().substring(Math.floor(i.toString().length/2))){
                total += i;
            }
        }
    }
    console.log(total);
}

function p2(){
    let total = 0;
    for(const range of ranges){
        const parts = range.split('-');
        const start = Number(parts[0]);
        const end = Number(parts[1]);
        for(let i = start; i <= end; i++){
            if(/^(.+)\1+$/.test(i.toString())){
                total+= i;
            };
        }
    }
    console.log(total);
}

p2();