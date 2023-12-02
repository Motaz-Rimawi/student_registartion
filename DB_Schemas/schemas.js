const mongoose = require("mongoose");

// Connect to MongoDB and check succeed or not
mongoose
  .connect("mongodb://localhost:27017/")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(() => {
    console.log("Failed to connect to MongoDB");
  });

const student_schema = new mongoose.Schema({
  name: String,
  id: String,
  grade: String,
});

const course_schema = new mongoose.Schema({
  name: String,
  id: String,
  teacher: String,
});

const Student = new mongoose.model("student_collection", student_schema);
const Course = new mongoose.model("course_collection", course_schema);

module.exports = { Student, Course };
