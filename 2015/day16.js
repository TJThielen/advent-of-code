import fs from 'fs/promises';

const text = await fs.readFile("day16.txt", "utf-8");
const lines = text.split('\n');
const sues = {};
lines.forEach(line => {
    let parts = line.split(',').map(p => p.split(":"));
    const sue = parts[0].splice(0, 1);
    sues[sue] = {};
    parts.forEach(p => {
        sues[sue][p[0].trim()] = Number(p[1]);
    })
})

const match = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1
}

function p1(){
    outer:
    for(const [sue, stats] of Object.entries(sues)){
        for(const [stat, num] of Object.entries(stats)){
            if(match[stat] !== num){
                continue outer;
            }
        }
        console.log(sue);
    }
}

function p2(){
    outer:
    for(const [sue, stats] of Object.entries(sues)){
        for(const [stat, num] of Object.entries(stats)){
            if(stat == "trees" || stat == "cats"){
                if(match[stat] >= num){
                    continue outer;
                }
            } else if(stat == "goldfish" || stat == "pomeranians"){
                if(match[stat] <= num){
                    continue outer;
                }
            } else {
                if(match[stat] !== num){
                    continue outer;
                }
            }
        }
        console.log(sue);
    }
}

p2();