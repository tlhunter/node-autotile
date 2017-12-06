const NW = Math.pow(2, 0);
const N = Math.pow(2, 1);
const NE = Math.pow(2, 2);
const W = Math.pow(2, 3);
const E = Math.pow(2, 4);
const SW = Math.pow(2, 5);
const S = Math.pow(2, 6);
const SE = Math.pow(2, 7);

const BITMASK =  {
  2:    1,  8:    2,  10:   3,  11:   4,
  16:   5,  18:   6,  22:   7,  24:   8,
  26:   9,  27:   10, 30:   11, 31:   12,
  64:   13, 66:   14, 72:   15, 74:   16,
  75:   17, 80:   18, 82:   19, 86:   20,
  88:   21, 90:   22, 91:   23, 94:   24,
  95:   25, 104:  26, 106:  27, 107:  28,
  120:  29, 122:  30, 123:  31, 126:  32,
  127:  33, 208:  34, 210:  35, 214:  36,
  216:  37, 218:  38, 219:  39, 222:  40,
  223:  41, 248:  42, 250:  43, 251:  44,
  254:  45, 255:  46, 0:    47
};

function autotileLookup(map, x_boundary, y_boundary, x, y) {
  let sum = 0;
  let n = e = s = w = false;

  if (!map[y][x]) return 0;

  if (y > 0 && map[y-1][x]) { n = true; sum += N; }
  if (x > 0 && map[y][x-1]) { w = true; sum += W; }
  if (x < x_boundary && map[y][x+1]) { e = true; sum += E; }
  if (y < y_boundary && map[y+1][x]) { s = true; sum += S; }

  if (n && w && y > 0 && x > 0 && map[y-1][x-1]) sum += NW;
  if (n && e && y > 0 && x < x_boundary && map[y-1][x+1]) sum += NE;
  if (s && w && y < y_boundary && x > 0 && map[y+1][x-1]) sum += SW;
  if (s && e && x < x_boundary && y < y_boundary && map[y+1][x+1]) sum += SE;

  return BITMASK[sum];
}

module.exports = function autotile(map) {
  const tiles = [];
  const height = map.length;
  const width = map[0].length;
  const x_boundary = width - 1;
  const y_boundary = height - 1;

  for (let y = 0; y < height; y++) {
    tiles[y] = [];
    for (let x = 0; x < width; x++) {
      tiles[y][x] = autotileLookup(map, x_boundary, y_boundary, x, y);
    }
  }

  return tiles;
};
