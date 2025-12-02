import fs from 'fs/promises';

const text = await fs.readFile("day5.txt", "utf-8");
const arr = text.split("\n");

function p1() {
    let total = 0;
    arr.forEach(str => {
        let vowels = 0;
        let dup = 0;
        let bad = 0;
        for(let i = 0; i < str.length; i++){
            if(str.charAt(i) == 'a' || str.charAt(i) == 'e' || str.charAt(i) == 'i' || str.charAt(i) == 'o' || str.charAt(i) == 'u'){
                vowels++;
            }
            if(i > 0){
                if(str.charAt(i) == str.charAt(i-1)) {
                    dup = 1;
                }
                if(str.charAt(i) == 'b' && str.charAt(i-1) == 'a' || 
                    str.charAt(i) == 'y' && str.charAt(i-1) == 'x' || 
                    str.charAt(i) == 'q' && str.charAt(i-1) == 'p' || 
                    str.charAt(i) == 'd' && str.charAt(i-1) == 'c'
                ) {
                    bad = 1;
                    continue;
                }
            }
        }
        if(vowels > 2 && dup == 1 && bad == 0){
            total++;
        }
    })
}

function p2(){
    let total = 0;
    arr.forEach(str => {
        const map = new Map();
        let app = 0;
        let pat = 0;
        for(let i = 1; i < str.length; i++){
            const existing = map.get(`${str.charAt(i-1)},${str.charAt(i)}`)
            if(existing){
                if(!existing.split(',').includes((i-1).toString())){
                    app = 1;
                }
            } else {
                map.set(`${str.charAt(i-1)},${str.charAt(i)}`, `${i-1},${i}`)
            }

            if(i > 1){
                if(str.charAt(i) == str.charAt(i-2)){
                    pat = 1;
                }
            }
        }
        if(app == 1 && pat == 1){
            total++;
        }
    })
    console.log(total);
}

p2();
