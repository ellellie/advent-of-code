const fs = require("fs");
const input = fs.readFileSync("q4.txt", "utf8").split("\n\n");

let p1valid = 0;
let p2valid = 0;

for (const passport of input) {
  let fields = {};
  passport.split(/[\n\s]/g).forEach((c) => {
    let [left, right] = c.split(":");
    fields[left] = right;
  });

  delete fields["cid"];
  if (Object.keys(fields).length == 7) {
    p1valid++;
    // needed
    let req = "byr iyr eyr hgt hcl ecl pid".split(" ");
    hasItems = true;
    req.forEach((c) => {
      if (fields[c] === undefined) hasItems = false;
    });
    if (!hasItems) continue;
    let isvalid =
      fields?.byr >= 1920 &&
      fields?.byr <= 2002 &&
      fields?.byr.length == 4 &&
      fields?.iyr >= 2010 &&
      fields?.iyr <= 2020 &&
      fields?.iyr.length == 4 &&
      fields?.eyr >= 2020 &&
      fields?.eyr <= 2030 &&
      fields?.eyr.length == 4 &&
      !!fields?.hcl.match(/\#[0-9a-f]{6}/) &&
      "amb blu brn gry grn hzl oth".split(" ").includes(fields.ecl) &&
      fields?.pid.length == 9 &&
      !isNaN(+fields?.pid);

    h = fields.hgt;
    if (h.endsWith("cm")) {
      let [x, _] = h.split("cm");
      isvalid = isvalid && x >= 150 && x <= 193;
    } else {
      let [x, _] = h.split("in");
      isvalid = isvalid && x >= 59 && x <= 76;
    }
    if (isvalid) {
      p2valid++;
    }
  }
}

console.log("p1", p1valid);
console.log("p2", p2valid);
