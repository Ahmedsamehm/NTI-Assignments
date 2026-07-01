const readGrades = require("./read.grades.js");
const saveGrades = require("./save.grades.js");

function updateGrade(identifier, updates) {
  const grades = readGrades();
  const record = grades.find((item) => item.id === Number(identifier) || item.studentName === identifier);

  if (!record) {
    throw new Error("Grade record not found.");
  }

  Object.assign(record, updates);
  saveGrades(grades);
  return record;
}

module.exports = updateGrade;
