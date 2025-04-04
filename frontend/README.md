MERN Report Generator

📌 Overview

This is a MERN (MongoDB, Express, React, Node.js) application that allows users to generate reports by filling out a form. The form data is stored in a local MongoDB Compass database, and users can download a generated PDF report.

✨ Features

✅ User-friendly form to input report details.✅ Saves form data to MongoDB (local Compass database).✅ Generates and downloads a PDF report.✅ Backend API to handle form submissions and PDF generation.

🛠 Tech Stack

Frontend

⚛ React.js

Backend

🟢 Node.js

🚀 Express.js

🗃 MongoDB (Compass for local storage)

Libraries Used

📌 mongoose - MongoDB interactions

📌 express - Server handling

📌 react-pdf or pdfkit - PDF generation

📌 cors, dotenv, and body-parser - Server configuration

⚙ Installation & Setup

Prerequisites

Make sure you have the following installed:

Node.js (>=14.x)

MongoDB (Compass for local DB management)

npm or yarn package manager

🚀 Backend Setup


Install dependencies
npm install



Start the backend server
npm run dev

🎨 Frontend Setup

Navigate to the frontend folder
cd ../frontend

Install dependencies
npm install

Start the frontend development server
npm start

🎯 Usage

Open your browser and go to http://localhost:3000.

Fill out the report form and submit it.

The form data is saved in MongoDB and processed by the backend.

A PDF report is generated and available for download.

📡 API Endpoints

Backend API

POST /api/reports - Stores form data in MongoDB and generates a PDF.

GET /api/reports/:id - Fetches a specific report.

🛠 Troubleshooting

Ensure MongoDB is running locally (mongod command).

Check .env configuration for correct database URI.

Use npm run dev in the backend to enable hot-reloading.

📜 License

This project is not open-source and will be used officially only by DC Networks.