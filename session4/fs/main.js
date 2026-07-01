const addGrade = require("./modules/add.grade.js");
const readGrades = require("./modules/read.grades.js");
const deleteGrade = require("./modules/delete.grade.js");
const updateGrade = require("./modules/update.grade.js");

function runDemo() {
  const initial = readGrades();
  console.log("Initial grades:", initial);

  const added = addGrade({ studentName: "test", subject: "English", grade: 88 });
  console.log("Added:", added);

  const updated = updateGrade(1, { grade: 95 });
  console.log("Updated:", updated);

  const deleted = deleteGrade("Sara");
  console.log("Deleted:", deleted);

  console.log("Final grades:", readGrades());
}

runDemo();
