const express = require("express");
const courseRouter = require("./routes/course-routes");
require("dotenv").config();
const dbConnect = require("./config/db-connect");


const app = express();

app.use(express.json());

dbConnect();

app.use("/api/v1/courses", courseRouter);


app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
