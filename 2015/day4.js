import crypto from "crypto";

const input = "ckczppom";
// const input = "abcdef";
let i = 0;

while(true){
    const str = input + i;
    const hash = crypto.createHash("md5").update(str).digest('hex');
    if(hash.substring(0, 6) == "000000"){
        console.log(i);
        console.log(hash);
        break;
    }
    i++;
}
