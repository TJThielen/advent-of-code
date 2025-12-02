const input = [11, 30, 47, 31, 32, 36, 3, 1, 5, 3, 32, 36, 15, 11, 46, 26, 28, 1, 19, 3].sort((a, b) => b-a);

function p1(){
    console.log(addPossible(150, input, 0));
}

function p2(){
    const ways = [];
    function addPossibleTracked(remaining, arrLeft, total, arrDone){
        let result = total;
    
        if(remaining == 0){
            ways.push(arrDone);
        } else if (remaining < 0){
            return result;
        } else {
            for(const i in arrLeft){
                const amt = arrLeft[i];
                const newArr = [...arrLeft];
                newArr.splice(0, Number(i)+1);
                result += addPossibleTracked(remaining - amt, newArr, total, [...arrDone, amt]);
            }
        }
    
        return result
    }

    addPossibleTracked(150, input, 0, []);
    
    let minLen = 100;
    let minLenCounter = 1;
    ways.forEach(w => {
        if(w.length < minLen){
            minLen = w.length;
            minLenCounter = 1;
        } else if(w.length == minLen){
            minLenCounter++;
        }
    })

    console.log(minLen);
    console.log(minLenCounter);
}

function addPossible(remaining, arrLeft, total){
    let result = total;

    if(remaining == 0){
        result++;
    } else if (remaining < 0){
        return result;
    } else {
        for(const i in arrLeft){
            const amt = arrLeft[i];
            const newArr = [...arrLeft];
            newArr.splice(0, Number(i)+1);
            result += addPossible(remaining - amt, newArr, total);
        }
    }

    return result
}



p2();