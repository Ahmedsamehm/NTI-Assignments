# 📚 Building a Simple Courses REST API with Express.js

This guide walks through creating a simple REST API for managing **courses** using **Node.js** and **Express.js**. Along the way, you'll learn how to set up the project, create routes, read and write JSON data, and organize your code using the **MVC pattern**.

---

# 1. Initialize the Project

Create a new Node.js project:

```bash
npm init -y
```

This command generates a `package.json` file that stores your project's information and dependencies.

---

# 2. Create the Entry Point

Create a file named `index.js`.

This is the main file where your application starts.

```text
project/
│── index.js
│── package.json
```

---

# 3. Install Nodemon

Install **nodemon** as a development dependency:

```bash
npm install --save-dev nodemon
```

`nodemon` automatically restarts the server whenever you modify your files.

It also creates:

* `node_modules/`
* `package-lock.json`

---

# 4. Add a Start Script

Update `package.json`:

```json
"scripts": {
  "start": "nodemon index.js"
}
```

Now run your application with:

```bash
npm start
```

---

# 5. Create `.gitignore`

Create a `.gitignore` file to avoid pushing unnecessary files to GitHub.

```gitignore
node_modules/
```

---

# 6. Install Express

```bash
npm install express
```

Express simplifies creating web servers and REST APIs compared to Node's built-in `http` module.

---

# 7. Create the Data File

Create a folder named `data` and add a file called `courses-data.json`.

```text
project/
│── data/
│     └── courses-data.json
```

Read the JSON data:

```js
const fs = require("fs");

let courses = JSON.parse(
  fs.readFileSync("./data/courses-data.json", "utf-8")
);
```

`fs.readFileSync()` reads the file, while `JSON.parse()` converts the JSON string into a JavaScript array.

---

# 8. Create the Express Server

```js
const express = require("express");

const app = express();

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
```

The server is now running on port `5000`.

---

# 9. Create the First GET Endpoint

```js
app.get("/api/v1/courses", (req, res) => {
  res.status(200).json({
    status: "success",
    count: courses.length,
    data: {
      courses,
    },
  });
});
```

Test it:

```
GET http://localhost:5000/api/v1/courses
```

This endpoint returns all courses.

---

# 10. Parse JSON Request Bodies

Before using `POST` or `PATCH`, enable JSON parsing:

```js
app.use(express.json());
```

This middleware converts incoming JSON into a JavaScript object and stores it in `req.body`.

Without it:

```js
console.log(req.body);
```

returns:

```js
undefined
```

---

# 11. Create a New Course (POST)

```js
app.post("/api/v1/courses", (req, res) => {
  const newId = courses[courses.length - 1].id + 1;

  const newCourse = {
    id: newId,
    ...req.body,
  };

  courses.push(newCourse);

  fs.writeFile(
    "./data/courses-data.json",
    JSON.stringify(courses, null, 2),
    () => {
      res.status(201).json({
        status: "success",
        message: "New course added",
        data: {
          course: newCourse,
        },
      });
    }
  );
});
```

Example request body:

```json
{
  "title": "Node.js Fundamentals",
  "instructor": "Esraa",
  "price": 199
}
```

The course is added to the array and saved to the JSON file.

---

# 12. Route Parameters

Dynamic values can be passed through the URL.

Example:

```
/api/v1/courses/:id
```

If the request is:

```
/api/v1/courses/5
```

then:

```js
console.log(req.params);
```

outputs:

```js
{
  id: "5"
}
```

Route parameters are always received as strings.

---

# 13. Get a Course by ID

```js
app.get("/api/v1/courses/:id", (req, res) => {
  const courseId = +req.params.id;

  const course = courses.find(
    (course) => course.id === courseId
  );

  if (!course) {
    return res.status(404).json({
      status: "error",
      message: "Course not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      course,
    },
  });
});
```

The unary `+` converts `"5"` into the number `5`.

---

# 14. Update a Course (PATCH)

```js
app.patch("/api/v1/courses/:id", (req, res) => {
  const courseId = +req.params.id;

  const course = courses.find(
    (course) => course.id === courseId
  );

  const index = courses.findIndex(
    (course) => course.id === courseId
  );

  if (!course) {
    return res.status(404).json({
      status: "error",
      message: "Course not found",
    });
  }

  const updatedCourse = Object.assign(
    course,
    req.body
  );

  courses[index] = updatedCourse;

  fs.writeFile(
    "./data/courses-data.json",
    JSON.stringify(courses, null, 2),
    () => {
      res.status(200).json({
        status: "success",
        message: "Course updated successfully",
        data: {
          course: updatedCourse,
        },
      });
    }
  );
});
```

`Object.assign()` updates only the provided fields while preserving the others.

---

# 15. Delete a Course

```js
app.delete("/api/v1/courses/:id", (req, res) => {
  const courseId = +req.params.id;

  const course = courses.find(
    (course) => course.id === courseId
  );

  const index = courses.findIndex(
    (course) => course.id === courseId
  );

  if (!course) {
    return res.status(404).json({
      status: "error",
      message: "Course not found",
    });
  }

  courses.splice(index, 1);

  fs.writeFile(
    "./data/courses-data.json",
    JSON.stringify(courses, null, 2),
    () => {
      res.status(200).json({
        status: "success",
        message: "Course deleted successfully",
        data: {
          course,
        },
      });
    }
  );
});
```

`splice()` removes the matching course from the array.

---

# 16. Organize the Project with MVC

As applications grow, it's better to separate responsibilities.

Project structure:

```text
project/
│── controllers/
│     └── course-controllers.js
│
│── routes/
│     └── course-routes.js
│
│── data/
│     └── courses-data.json
│
│── index.js
```

---

# 17. Controllers

Controllers contain the business logic.

Example:

```js
const getAllCourses = (req, res) => {
  // logic here
};

const createCourse = (req, res) => {
  // logic here
};

module.exports = {
  getAllCourses,
  createCourse,
};
```

Routes simply call these controller functions.

---

# 18. Routes

Create `routes/course-routes.js`:

```js
const express = require("express");
const courseControllers = require("../controllers/course-controllers");

const router = express.Router();

router
  .route("/")
  .get(courseControllers.getAllCourses)
  .post(courseControllers.createCourse);

router
  .route("/:id")
  .get(courseControllers.getCourseById)
  .patch(courseControllers.updateCourse)
  .delete(courseControllers.deleteCourse);

module.exports = router;
```

`express.Router()` helps organize related endpoints into separate files.

---

# 19. Connect the Router

In `index.js`:

```js
const express = require("express");
const courseRouter = require("./routes/course-routes");

const app = express();

app.use(express.json());

app.use("/api/v1/courses", courseRouter);

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
```

Now all requests starting with:

```
/api/v1/courses
```

are handled by `course-routes.js`.

Examples:

```
GET    /api/v1/courses
POST   /api/v1/courses
GET    /api/v1/courses/1
PATCH  /api/v1/courses/1
DELETE /api/v1/courses/1
```

---

# ✅ Summary

By completing this project, you practiced:

* Initializing a Node.js project
* Creating an Express server
* Reading and writing JSON files with `fs`
* Building RESTful endpoints (`GET`, `POST`, `PATCH`, `DELETE`)
* Using route parameters (`req.params`)
* Parsing JSON request bodies with `express.json()`
* Organizing code using the MVC pattern
* Separating routes from controller logic for better scalability

This structure provides a solid foundation before moving on to databases like **MongoDB** and **Mongoose**.