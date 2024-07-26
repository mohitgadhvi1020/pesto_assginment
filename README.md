# Task Management Application

## Introduction

This is a full-stack task management application that allows users to create, update, and delete tasks. Users can view a list of tasks and filter them by status. The application is built using [Frontend Framework] for the front-end and [Backend Technology] for the back-end, with [Database] as the database.

## Features

- Create new tasks with title, description, and status
- View a list of all tasks
- Update task status
- Delete tasks
- Filter tasks by status
- Responsive design for desktop and mobile devices

## Assumptions and Design Decisions

1. Task Status: We've implemented three status options: "To Do," "In Progress," and "Done." This covers the basic workflow for most task management scenarios.

2. Database Schema: Tasks are stored with the following fields: id (auto-generated), title (required), description (optional), status (required), createdAt, and updatedAt.

3. Error Handling: The backend returns appropriate HTTP status codes and error messages for invalid requests or server errors.

4. Frontend State Management: We've used [state management solution, e.g., Redux, Context API] for managing application state on the frontend.

5. Authentication: Basic authentication has been implemented using [authentication method, e.g., JWT]. Users need to log in to access the task management features.

6. Responsive Design: The application is designed to be responsive, with a mobile-first approach, ensuring usability on various device sizes.

7. Code Structure: We've followed a modular approach, separating concerns between components, services, and utilities to enhance maintainability and readability.

## Technologies Used

- Frontend: [ React]
- Backend: [ Node.js with Express, ]
- Database: [ MongoDB]
- CSS: [ Tailwind]
- Version Control: Git

## Setup and Installation

1. Clone the repository:

# For FE - https://github.com/mohitgadhvi1020/pesto_assginment/tree/frontend

# For BE - https://github.com/mohitgadhvi1020/pesto_assginment/tree/master

## API Endpoints

- GET /api/tasks - Retrieve all tasks
- POST /api/tasks - Create a new task
- PUT /api/tasks/:id - Update a task
- DELETE /api/tasks/:id - Delete a task

## Testing

To run the unit tests:
npm test for BE
