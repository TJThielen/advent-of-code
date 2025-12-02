import fs from 'fs'

const input = fs.readFileSync('./2024AdventOfCodeDay2Input.txt').toString();
var reports = input.split("\n")
//reports = ["1 3 4", "4 5 8 10 13 14 15 18"];
var counter = 0;
reports.forEach((line, index) => {
    var report = line.split(/\s+/g).map(i => parseInt(i));
    if(isSafe(report)){
        counter++;
    } else {
        for(let i = 0; i < report.length; i++){
            const splicedArr = [...report];
            splicedArr.splice(i,1);
            if(isSafe(splicedArr)){
                counter++
                break;
            }
        }
    }
})

console.log(counter);

function isSafe(report) {
    let isDecreasing = false;
    if (report.length >= 2) {
        isDecreasing = parseInt(report[0]) > parseInt(report[1]);
    }
    let safe = true;
    for (let i = 1; i < report.length; i++) {
        if (isDecreasing) {
            if (report[i-1] <= report[i] || (report[i-1] - report[i]) > 3) {
                safe = false;
                break;
            }
        } else {
            if (report[i-1] >= report[i] || (report[i] - report[i-1]) > 3) {
                safe = false;
                break;
            }
        }
    }
    return safe;
}