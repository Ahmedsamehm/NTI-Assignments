=============================
📚 Task: Student Grades Manager
=============================

📁 Goal:
Build a system to manage student grades using Node.js and JSON as a data store.

📂 Structure:
student_grades_manager/
├── data/
│ └── grades.json
├── modules/
│ ├── add.grade.js
│ ├── delete.grade.js
│ ├── read.grades.js
│ ├── update.grade.js
│ └── save.grades.js
└── main.js

📝 Description:

- grades.json: Stores an array of student grade records.
- add.grade.js: Adds a new grade record (student name, subject, grade).
- delete.grade.js: Deletes a student's grade record by ID or name.
- read.grades.js: Reads from file and displays all student grades.
- update.grade.js: Updates an existing student's grade.
- save.grades.js: Helper function to write to grades.json.
- main.js: Entry point to test functionality via command line.
