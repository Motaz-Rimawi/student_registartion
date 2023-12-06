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

const student_schema = new mongoose.Schema(
  {
    name: String,
    id: String,
    age: String,
    phone: String,
    email: String,
    money: String,
    residence: String,
    city_access: String,
  },
  {
    versionKey: false,
    _id: false,
  }
);

const course_schema = new mongoose.Schema(
  {
    name: String,
    id: String,
    instructor: String,
    bills: String,
    age: String,
    residence: String,
    city_access: String,
    limit: String,
  },
  {
    versionKey: false,
    _id: false,
  }
);

const enrollments_schema = new mongoose.Schema(
  {
    id: String,
    courseId: String,
    studentId: String,
  },
  {
    versionKey: false,
    _id: false,
  }
);

const Student = new mongoose.model("student_collection", student_schema);
const Course = new mongoose.model("course_collection", course_schema);
const Enrollments = new mongoose.model(
  "enrollments_collection",
  enrollments_schema
);

module.exports = { Student, Course, Enrollments };
