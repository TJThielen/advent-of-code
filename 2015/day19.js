import fs from 'fs/promises';

const text = await fs.readFile("day19.txt", "utf-8");
const sections = text.split('\n\n');
const molecule = sections[1];
let transformations = sections[0].split('\n');
transformations.sort((a,b) => {
    const aparts = a.split('=>')[1];
    const bparts = b.split('=>')[1];
    return bparts.length-aparts.length;
})

function p1(){
    const options = new Set();
    transformations.forEach(transformation => {
        const parts = transformation.split('=>');
        const find = parts[0].trim();
        const replace = parts[1].trim();
        const regex = new RegExp(find, "g");
        const matches = [...molecule.matchAll(regex)];
        matches.forEach(match => {
            const newStr = molecule.substring(0, match.index) + replace + molecule.substring(match.index+find.length);
            options.add(newStr);
        })
    });
    return options
}

function nextOptions(set){
    const options = new Set();
    for(const val of set.values()){
        transformations.forEach(transformation => {
            const parts = transformation.split('=>');
            const find = parts[0].trim();
            const replace = parts[1].trim();
            const regex = new RegExp(find, "g");
            const matches = [...val.matchAll(regex)];
            matches.forEach(match => {
                const newStr = val.substring(0, match.index) + replace + val.substring(match.index+find.length);
                options.add(newStr);
            })
        });
    }
    return options
}

function nextOptionsReverse(set){
    let shortest = 5000;
    const options = new Set();
        for(const transformation of transformations) {
            for(const val of set.values()){
            const parts = transformation.split('=>');
            const find = parts[1].trim();
            const replace = parts[0].trim();
            const regex = new RegExp(find, "g");
            const matches = [...val.matchAll(regex)];
            for(const match of matches){
                const newStr = val.substring(0, match.index) + replace + val.substring(match.index+find.length);
                if(newStr.length < shortest){
                    shortest = newStr.length;
                }
                if(options.size > 100000){
                    return options;
                }
                if(newStr.length-shortest == 0) {
                    options.add(newStr);
                }
                
            }
        }
    }
    return options
}

function p2(){
    let steps = 0;
    let set = new Set();
    set.add(molecule);


    for(let i = 0; i < 300; i++){
        steps++;
        if(steps == 90){
            console.log();
        }

        set = nextOptionsReverse(set);
        if(set.has('e')){
            console.log(steps);
        }
    }

    // let steps = 1;
    // transformations = transformations.sort((a, b) => {
    //     const aparts = a.split('=>');
    //     const bparts = b.split('=>');
    //     return bparts[1].trim().length - aparts[1].trim().length;
    // })

    // let str = molecule;
    // while(true) {
    //     let temp = transformations.splice(0,1);
    //     transformations.push(temp[0]);
    //     while(true){
    //         for(const transformation of transformations) {
    //             const parts = transformation.split('=>');
    //             const find = parts[1].trim();
    //             const replace = parts[0].trim();
    //             const regex = new RegExp(find, "g");
    //             const matches = [...str.matchAll(regex)];
    //             const match = matches[matches.length-1];
    //             if(match){
    //                 const newStr = str.substring(0, match.index) + replace + str.substring(match.index+find.length);
    //                 if(set.has(newStr)){
    //                     console.log(steps);
    //                     return;
    //                 }
    //                 str = newStr;
    //                 steps++;
    //                 break;
    //             }
                
    //         };
    //         if(steps == 202){
    //             break;
    //         }
    //     }
    // }
}

p2();