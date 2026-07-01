const readGrades = require("./read.grades.js");
const saveGrades = require("./save.grades.js");

function addGrade({ studentName, subject, grade }) {
  if (!studentName || !subject || typeof grade !== "number") {
    throw new Error("studentName, subject, and a numeric grade are required.");
  }

  const grades = readGrades();
  const newRecord = {
    id: grades.length ? grades[grades.length - 1].id + 1 : 1,
    studentName,
    subject,
    grade,
  };

  grades.push(newRecord);
  saveGrades(grades);
  return newRecord;
}

module.exports = addGrade;
