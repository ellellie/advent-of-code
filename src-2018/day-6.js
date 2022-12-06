let input = require("./util").input(6)

function numbers(str) {
  return (str.match(/-?[0-9]+/g) || []).map(Number);
}
function inc(table, key, amt = 1) {
  table[key] = (table[key] || 0) + amt;
}
function sortBy(array, criterion = a => a) {
  return array.sort((a, b) => {
    const aBy = criterion(a);
    const bBy = criterion(b);
    if (aBy == bBy) return 0;
    return (aBy > bBy ? 1 : -1);
  });
}

function dist(a, b) {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}
function pointId([a, b]) {
  return `${a},${b}`;
}

input = input.split('\n').map(r => numbers(r));

let closest = {};

for (let i = -400; i < 800; i++) {
  for (let j = -400; j < 800; j++) {
    let curPoint = [i, j];
    let distances = [];
    for (const point of input) {
      distances.push([pointId(point), dist(point, curPoint)]);
    }
    sortBy(distances, a => a[1]);
    if (distances[0][1] === distances[1][1]) continue;
    inc(closest, distances[0][0]);
  }
}

let closest2 = {};
for (let i = -450; i < 850; i++) {
  for (let j = -450; j < 850; j++) {
    let curPoint = [i, j];
    let distances = [];
    for (const point of input) {
      distances.push([pointId(point), dist(point, curPoint)]);
    }
    sortBy(distances, a => a[1]);
    if (distances[0][1] === distances[1][1]) continue;
    inc(closest2, distances[0][0]);
  }
}

closest = sortBy(Object.entries(closest), en => en[1]);
closest2 = sortBy(Object.entries(closest2), en => en[1]);
for (let i = closest2.length - 1; i >= 0; i--) {
  if (closest[i][1] === closest2[i][1]) {
    console.log(closest[i][1]);
    break;
  }
}

let inRegion = 0;

for (let i = -500; i < 900; i++) {
  for (let j = -500; j < 900; j++) {
    let curPoint = [i, j];
    let totalDist = 0;
    for (const point of input) {
      totalDist += dist(point, curPoint);
    }
    if (totalDist < 10000) inRegion++;
  }
}

console.log(inRegion);
