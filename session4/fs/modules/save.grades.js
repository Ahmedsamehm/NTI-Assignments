const fs = require("fs");
const path = require("path");

const gradesPath = path.join(__dirname, "..", "data", "grades.json");

function saveGrades(grades) {
  fs.mkdirSync(path.dirname(gradesPath), { recursive: true });
  fs.writeFileSync(gradesPath, JSON.stringify(grades, null, 2));
  return grades;
}

module.exports = saveGrades;
