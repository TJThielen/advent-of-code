const input = "vzbxkghb";

function incrementPassword(str) {
    let i = 0;
    let newStr = str;
    while(true){
        if(str.charCodeAt(str.length - i - 1) < 122) {
            newStr = newStr.substring(0, newStr.length - i - 1) + String.fromCharCode(newStr.charCodeAt(newStr.length - i-1)+1) + newStr.substring(newStr.length-i);
            break;
        } else {
            newStr = newStr.substring(0, newStr.length - i - 1) + 'a' + newStr.substring(newStr.length-i);
            i++;
            if(i >= newStr.length){
                break;
            }
        }
    }
    return newStr;
}

function p1(){
    let password = incrementPassword(input);
    while(!isLegal(password)){
        password = incrementPassword(password);
    }
    console.log(password);
}

function p2(){
    let password = incrementPassword(input);
    while(!isLegal(password)){
        password = incrementPassword(password);
    }

    password = incrementPassword(password);
    while(!isLegal(password)){
        password = incrementPassword(password);
    }

    console.log(password);
}


function isLegal(str) {
    const matches = str.match(/(.)\1/g);
    if(matches == null){ return false };
    
    const set = new Set();
    matches.forEach(match => {
        set.add(match);
    })

    if (/i|o|l/.test(str) || matches.length < 2 || set.size < 2){
        return false;
    };

    for(let i = 2; i < str.length; i++){
        if(str.charCodeAt(i) == str.charCodeAt(i-1) + 1 && str.charCodeAt(i) == str.charCodeAt(i-2) + 2){
            return true;
        }
    }

    return false;
}

p2();
