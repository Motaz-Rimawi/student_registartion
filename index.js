const express = require("express");
const { Student, Course } = require("./DB_Schemas/schemas");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//const student = new Student();

app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.send({ Students: students });
});

app.post("/student", async (req, res) => {
  const data = {
    name: req.body.name,
    id: req.body.id,
    grade: req.body.grade,
  };

  await Student.insertMany([data]);

  res.send(data.name);
});

app.listen(3000, () => console.log("Welcome to Motaz's school"));
