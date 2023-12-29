# MERN Job Finder

This project is a job finding platform built using MongoDB, Express.js, React.js, and Node.js (MERN Stack). The application allows users to post jobs and find job seekers based on various criteria. It also provides a user authentication system to ensure secure access to the application.

## Features

* **Job Posting**: Users can create and manage job postings. They can specify details like job title, description, location, and required skills.

* **Job Search**: Job seekers can search for jobs based on different criteria such as job title, location, and required skills. They can also save jobs of interest for future reference.

* **User Authentication**: The application has a user authentication system that ensures secure access to user data. Users can register, login, and logout from the application.

## How Technologies Are Used

* **Frontend**: The frontend of the application is built using React.js. It provides a flexible and efficient way to build user interfaces. The UI components are defined using JSX syntax and state management is handled using React's built-in state and props mechanisms 
  
* **Backend**: The server-side operations are handled using Node.js and Express.js. Express.js simplifies the process of building the backend by providing a simple API for managing HTTP requests. The server is setup in `index.js` file and routes are defined to handle different API endpoints 

* **Database**: MongoDB is used as the database for storing user data and job postings. The application uses Mongoose to define a data model for job postings. Each job posting document in the MongoDB database includes fields like title, description, location, and required skills 

* **Authentication**: Within the framework of this project, we have implemented a robust user authentication system leveraging the capabilities of the jsonwebtoken package. This sophisticated tool allows us to seamlessly sign and verify users through meticulously crafted tokens. These tokens serve as digital credentials, stored and retrieved when accessing protected routes. This method ensures a secure and controlled environment, where only authorized users can navigate through the designated pathways of the system.

## Installation and Running the Application

To run the application, follow these steps:

1. Clone the repository to your local machine `git clone https://github.com/PranavMangalgi/mern-jobfinder`.

2. Navigate to the frontend directory and install the dependencies using `npm install`
   
3. Start the vite development server `npm run dev`

4. Now, navigate to the backend directory and install the dependencies using `npm install`
   
5. Start the server `nodemon index.js`


This will start the server and you can interact with the backend APIs.

Please note that the exact installation and running instructions might vary depending on the specific requirements and implementation details of the project. Also, make sure to start both the frontend and backend servers for the application to function properly.

## Deployment

- Backend: Deployed on [Render](https://render.com/)
- Frontend: Hosted with [Netlify](https://www.netlify.com/)




