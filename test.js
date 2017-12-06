#!/usr/bin/env node

const autotile = require('./index.js');

const myLevel = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 1, 1],
  [1, 1, 1, 1, 0, 1, 1],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 1, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 1, 1, 1],
  [0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [1, 0, 1, 1, 1, 0, 1],
  [0, 0, 1, 1, 1, 0, 0],
  [1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [0, 0, 1, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 0, 1, 1, 1],
];

const start = Date.now();
const tiles = autotile(myLevel);
const time = Date.now() - start;

// console.error(JSON.stringify(tiles, null, 2));

console.error(`Operation took ${time}ms`);

const tilesWide = 8; // units wide spreadsheet is
const size = 16; // pixel size of sprites

function linearToGrid(offset) {
  let x = offset % tilesWide;
  let y = Math.floor(offset / tilesWide);
  return {x,y};
}

console.log('<style>table { scale: 400%; } td { background-image: url("tileset.png"); width: 16px; height: 16px; font-size: 3px; color: white;}</style>');
console.log('<table cellpadding="0" cellspacing="0">');
for (let y = 0; y < myLevel.length; y++) {
  console.log('<tr>');
  for (let x = 0; x < myLevel[0].length; x++) {
    let t = tiles[y][x];
    let offset = linearToGrid(t);
    console.log(`<td style="background-position: ${-offset.x*size}px ${-offset.y*size}px;"></td>`);
  }
  console.log('</tr>');
}
console.log('</table>');
