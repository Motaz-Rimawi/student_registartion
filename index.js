const express = require("express");
const { Student, Course, Enrollments } = require("./DB_Schemas/schemas");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const courses = [
  {
    name: "DataBase",
    id: "1",
    instructor: "Ahmad",
    bills: "100",
    age: "18",
    residence: "Jerusalem",
    city_access: "Jerusalem",
    limit: "5",
  },
  {
    name: "MobileDevelopment",
    id: "2",
    instructor: "Ali",
    bills: "200",
    age: "19",
    residence: "Jerusalem",
    city_access: "Ramallah",
    limit: "5",
  },
  {
    name: "DataStructure",
    id: "3",
    instructor: "Khalid",
    bills: "300",
    age: "20",
    residence: "Jerusalem",
    city_access: "Jaffa",
    limit: "10",
  },
  {
    name: "Java",
    id: "4",
    instructor: "Ibraheem",
    bills: "300",
    age: "18",
    residence: "Jerusalem",
    city_access: "Ramallah",
    limit: "7",
  },
  {
    name: "WebDevelopment",
    id: "5",
    instructor: "Rami",
    bills: "400",
    age: "20",
    residence: "Jerusalem",
    city_access: "Nablus",
    limit: "7",
  },
];

// Create and store the courses from courses array in the MongoDB
function createCourses(courses) {
  for (const course of courses) {
    Course.findOne({ id: course.id })
      .then((result) => {
        if (!result) {
          Course.insertMany([course]);
        }
      })
      .catch((err) => console.error("Failed to create courses !!"));
  }
  console.log("courses has been created !");
}
// Get all students
app.get("/api/students", async (req, res) => {
  const students = await Student.find();
  res.send({ Students: students });
});

// Get a specific student based on ID and show the courses that he enrolled in
app.get("/api/students/:id", async (req, res) => {
  const id = req.params.id;
  const result = [];

  try {
    const student = await Student.findOne({ id: id });

    if (student) {
      result.push(student);

      const enrollments = await Enrollments.find({ studentId: id });

      if (enrollments) {
        for (const element of enrollments) {
          const courses = await Course.find({ id: element.courseId });
          result.push(courses);
        }
      } else {
        result.push("This student hasn't enrolled in any courses yet");
      }
    } else {
      result.push("Sorry we don't have this student in our school");
    }

    res.send(result);
  } catch (err) {
    console.error(err);
    res.send(err);
  }
});

// Register a new student after checking if the ID is used or not
app.post("/api/student", async (req, res) => {
  const data = {
    name: req.body.name,
    id: req.body.id,
    age: req.body.age,
    phone: req.body.phone,
    email: req.body.email,
    money: req.body.money,
    residence: req.body.residence,
    city_access: req.body.city_access,
  };

  Student.findOne({ id: data.id })
    .then((result) => {
      if (result) {
        console.log("This id is already taken for this student : ", result);
        res.send("This id is already taken !");
      } else {
        Student.insertMany([data]);
        console.log(data.name, " has registered succefully ");
        res.send("Thanks for chosen us !");
      }
    })
    .catch((err) => {
      console.error(err);
    });
});

// Check if the student is eligible to register for the course
async function checkEligibility(student, course) {
  if (parseInt(student.age) < parseInt(course.age)) return false;
  if (parseInt(course.limit) <= 0) return false;
  if (student.city_access != course.city_access) return false;
  if (parseInt(student.money) < parseInt(course.bills)) return false;

  const new_limit = parseInt(course.limit) - 1;
  const new_money = parseInt(student.money) - parseInt(course.bills);

  await Course.findOneAndUpdate(
    { id: course.id },
    { $set: { limit: String(new_limit) } },
    { new: true }
  );

  await Student.findOneAndUpdate(
    { id: student.id },
    { $set: { money: String(new_money) } },
    { new: true }
  );

  return true;
}

// Register an existing student to a specific course and store this action in Enrollments collection in MongoDB
app.post("/api/students/:s_id/:c_id", (req, res) => {
  const st_id = req.params.s_id;
  const crs_id = req.params.c_id;

  Student.findOne({ id: st_id })
    .then((student) => {
      if (student) {
        Course.findOne({ id: crs_id })
          .then((course) => {
            if (course) {
              Enrollments.findOne({ courseId: crs_id, studentId: st_id }).then(
                (enrolled) => {
                  if (enrolled)
                    res.send("Student is already enrolled in this course !");
                  else {
                    checkEligibility(student, course).then((eligible) => {
                      if (eligible) {
                        const data = {
                          id: student.id + "_" + course.id,
                          courseId: course.id,
                          studentId: student.id,
                        };
                        Enrollments.insertMany([data]);
                        res.send(
                          "Student has been enrolled to the course succefully !"
                        );
                      } else
                        res.send(
                          "Sorry, the student isn't eligible for this course, pls check the course requiremnts"
                        );
                    });
                  }
                }
              );
            } else res.send("Sorry we dont teach this course");
          })
          .catch((err) => {
            console.error(err);
          });
      } else res.send("There is no such student !");
    })
    .catch((err) => {
      console.error(err);
    });
});

// Update a specific student info based on the ID
app.put("/api/students/:id", async (req, res) => {
  const student_id = req.params.id;
  const new_data = req.body;

  try {
    const updated_student = await Student.findOneAndUpdate(
      { id: String(student_id) },
      new_data,
      { new: true }
    );

    if (!updated_student) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updated_student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete a specific student based on ID
app.delete("/api/students/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const student = await Student.findOneAndDelete({ id: id });

    if (student) {
      const enrollments = await Enrollments.find({ studentId: student.id });

      if (enrollments.length) {
        for (const record of enrollments) {
          const course = await Course.findOne({ id: record.courseId });
          if (course) {
            const new_limit = parseInt(course.limit) + 1;
            await Course.findOneAndUpdate(
              { id: course.id },
              { $set: { limit: String(new_limit) } },
              { new: true }
            );
          }
        }

        await Enrollments.deleteMany({ studentId: student.id });
        res.send("Student has been deleted");
      } else {
        res
          .status(404)
          .send("This student hasn't enrolled in any courses yet.");
      }
    } else {
      res.status(404).send("There is no such student!");
    }
  } catch (err) {
    res.send(err);
  }
});

app.listen(3000, () => {
  console.log("Welcome to Motaz's school");
  createCourses(courses);
});
