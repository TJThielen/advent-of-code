const input = "1321131112";

function lookAndSay(str){
    let result = "";
    let counter = 1;
    let i = 1;

    while(i < str.length){
        if(str.charAt(i) == str.charAt(i-1)){
            counter++;
        } else {
            result += counter + str.charAt(i-1);
            counter = 1;
        }
        i++;
    };
    result += counter + str.charAt(i-1);
    return result;
}

function p1(){
    let str = input;
    for(let i = 0; i < 40; i++){
        str = lookAndSay(str);
    }
    console.log(str.length);
}

function p2(){
    let str = input;
    for(let i = 0; i < 50; i++){
        str = lookAndSay(str);
    }
    console.log(str.length);
}

p2();
