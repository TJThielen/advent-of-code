const input = {
    Sprinkles: {capacity: 2, durability: 0, flavor: -2, texture: 0, calories: 3},
    Butterscotch: {capacity: 0, durability: 5, flavor: -3, texture: 0, calories: 3},
    Chocolate: {capacity: 0, durability: 0, flavor: 5, texture: -1, calories: 8},
    Candy: {capacity: 0, durability: -1, flavor: 0, texture: 5, calories: 8}
}


function putPossible(obj, key){
    const arr = [];
    for(let i = 0; i <= obj.remaining; i++){
        const newObj = {...obj};
        newObj.remaining = obj.remaining - i;
        newObj[key] = i;
        arr.push(newObj);
    }
    return arr;
}

function putPossibleCandy(obj){
    const newObj = {...obj};
    newObj.remaining = 0
    newObj["Candy"] = obj.remaining;
    return newObj;
}


function getCombos(){
    const combos = putPossible({"remaining": 100}, "Sprinkles");
    let combos2 = []
    combos.forEach(combo => {
        combos2.push(putPossible(combo, "Butterscotch"));
    });
    combos2 = combos2.flat();
    let combos3 = [];
    combos2.forEach(combo => {
        combos3.push(putPossible(combo, "Chocolate"));
    });
    combos3 = combos3.flat();
    let combos4 = [];
    combos3.forEach(combo => {
        combos4.push(putPossibleCandy(combo));
    });
    return combos4;
}



function p1(){
    const combos = getCombos();
    let maxScore = 0;
    combos.forEach(combo => {
        const totals = {capacity: 0, durability: 0, flavor: 0, texture: 0, calories: 0};
        for(const [ing, stats] of Object.entries(input)){
            for(const [stat, amt] of Object.entries(stats)){
                totals[stat] += amt * combo[ing];
            }
        }

        for(const [stat, val] of Object.entries(totals)){
            if(val < 0){
                totals[stat] = 0;
            }
        }
        maxScore = totals.capacity * totals.durability * totals.flavor * totals.texture > maxScore ? totals.capacity * totals.durability * totals.flavor * totals.texture : maxScore;
    });
    console.log(maxScore);
}

function p2(){
    const combos = getCombos();
    let maxScore = 0;
    combos.forEach(combo => {
        const totals = {capacity: 0, durability: 0, flavor: 0, texture: 0, calories: 0};
        for(const [ing, stats] of Object.entries(input)){
            for(const [stat, amt] of Object.entries(stats)){
                totals[stat] += amt * combo[ing];
            }
        }

        for(const [stat, val] of Object.entries(totals)){
            if(val < 0){
                totals[stat] = 0;
            }
        }

        if(totals.calories <= 500){
            maxScore = totals.capacity * totals.durability * totals.flavor * totals.texture > maxScore ? totals.capacity * totals.durability * totals.flavor * totals.texture : maxScore;
        }
    });
    console.log(maxScore);
}

p2();
