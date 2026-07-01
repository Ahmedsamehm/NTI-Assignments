const readGrades = require("./read.grades.js");
const saveGrades = require("./save.grades.js");

function deleteGrade(identifier) {
  const grades = readGrades();
  const index = grades.findIndex((record) => record.id === Number(identifier) || record.studentName === identifier);

  if (index === -1) {
    throw new Error("Grade record not found.");
  }

  const removedRecord = grades.splice(index, 1)[0];
  saveGrades(grades);
  return removedRecord;
}

module.exports = deleteGrade;
