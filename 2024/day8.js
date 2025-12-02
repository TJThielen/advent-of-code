import fs from 'fs'

var locations = {};
var input = fs.readFileSync('./2024AdventOfCodeDay8Input.txt').toString();
//input = fs.readFileSync('./testInput.txt').toString();
const rows = input.split('\n');
export const run = (input) => {
    const networks = findAllNetworks(input);
    findAntiNodes(input, networks);
    //printMap(input)
  
    return findResult(input);
  };
  
  const findAllNetworks = (map) => {
    const networks = [];
    for (let row = 0; row < map.length; row++) {
      for (let col = 0; col < map[row].length; col++) {
        const curr = map[row][col];
        if (curr !== ".") {
          const existingNetwork = networks.find((x) => x.val === curr);
          if (existingNetwork) {
            existingNetwork.antennas.push({ row, col });
          } else {
            networks.push({ val: curr, antennas: [{ row, col }] });
          }
        }
      }
    }
    return networks;
  };
  
  const findAntiNodes = (map, networks) => {
    networks.forEach((network) => {
      for (let i = 0; i < network.antennas.length; i++) {
        for (let j = 0; j < network.antennas.length; j++) {
          if (i === j) continue;
  
          const newRow = 2 * network.antennas[i].row - network.antennas[j].row;
          const newCol = 2 * network.antennas[i].col - network.antennas[j].col;
  
          if (
            newRow < 0 ||
            newRow >= map.length ||
            newCol < 0 ||
            newCol >= map[0].length
          )
            continue;
          map[newRow][newCol].anti++;
        }
      }
    });
  };
  
  const findResult = (map) => {
    let res = 0;
    map.forEach((line) => {
      line.forEach((pos) => {
        if (pos.anti > 0) res++;
      });
    });
    return res;
  };
  
  const printMap = (map) => {
    map.forEach((line) => {
      let str = "";
      line.forEach((pos) => {
        str += pos.anti > 0 ? "#" : pos.val;
      });
      console.log(str);
    });
  };

run(rows)