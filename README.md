# Student Registration System

## Overview

- Welcome to the Student Registration System! This server-side application manages the registration of students for courses, offering a seamless experience from registration to enrollment. Explore the simplicity and efficiency of our system built on a powerful tech stack.

## Why Use This Tech Stack?

- **MongoDB:** A flexible and scalable NoSQL database that adapts to changing data structures. It provides expressive queries for efficient data retrieval.
- **Node.js and Express.js:** JavaScript-based technologies for a consistent language throughout the stack. Node.js offers fast execution with an event-driven, non-blocking I/O model, while Express.js provides a minimal and flexible web application framework.

## Getting Started

Follow these comprehensive instructions to set up, run, and use the Student Registration System on your system.

### Prerequisites

- Node.js and npm installed. Download and install from [Node.js website](https://nodejs.org/).
- MongoDB installed. Download and install from [MongoDB website](https://www.mongodb.com/try/download/community).

### Setup Instructions

1. **Clone the repository to your local machine:**

   - `git clone https://github.com/Motaz-Rimawi/student_registration.git`

2. **Navigate to the project directory:**

   - `cd student_registration`

3. **Install dependencies:**
   - `npm install`

### Running the Application

1. **Start the application:**

   - `node index.js`
   - The server will start at `http://localhost:3000`.

2. **Open Postman or any API testing tool.**

### API Endpoints and Usage

#### 1. Get All Students

- **Endpoint:** `GET /api/students`
- **Purpose:** Retrieve details of all registered students.
- **Usage:** Send a GET request to `http://localhost:3000/api/students`.

#### 2. Get Specific Student and Enrolled Courses

- **Endpoint:** `GET /api/students/:id`
- **Purpose:** Retrieve details of a specific student based on ID and the courses they have enrolled in.
- **Usage:** Replace `:id` with the student's ID in the URL. Send a GET request to `http://localhost:3000/api/students/:id`.

#### 3. Register a New Student

- **Endpoint:** `POST /api/student`
- **Purpose:** Register a new student after checking if the ID is already used.
- **Usage:** Send a POST request to `http://localhost:3000/api/student` with the student details in the request body.

#### 4. Enroll a Student in a Course

- **Endpoint:** `POST /api/students/:s_id/:c_id`
- **Purpose:** Enroll an existing student in a specific course.
- **Usage:** Replace `:s_id` with the student's ID and `:c_id` with the course ID in the URL. Send a POST request to `http://localhost:3000/api/students/:s_id/:c_id`.

#### 5. Update Student Information

- **Endpoint:** `PUT /api/students/:id`
- **Purpose:** Update specific student information based on ID.
- **Usage:** Replace `:id` with the student's ID in the URL. Send a PUT request to `http://localhost:3000/api/students/:id` with the updated student details in the request body.

#### 6. Delete a Student and Update Course Enrollments

- **Endpoint:** `DELETE /api/students/:id`
- **Purpose:** Delete a specific student based on ID and update course enrollments.
- **Usage:** Replace `:id` with the student's ID in the URL. Send a DELETE request to `http://localhost:3000/api/students/:id`.
