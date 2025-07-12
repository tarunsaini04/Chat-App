Real-time Chat Application
A simple, yet effective, real-time chat application built with Node.js and Socket.IO, featuring a clean and responsive frontend. This application allows multiple users to join and communicate instantly in a shared chat room.

✨ Features
Real-time Messaging: Instant message delivery to all connected users.

User Join/Leave Notifications: Alerts when a new user joins or an existing user leaves the chat.

Simple & Intuitive UI: A straightforward interface for easy communication.

Scalable Backend: Built with Socket.IO for efficient handling of WebSocket connections.

🚀 Live Demo
Experience the chat application live:
https://chat-app-backend-ec8y.onrender.com

🛠️ Technologies Used
Backend:

Node.js: JavaScript runtime environment.

Express.js: Web framework for Node.js, used for serving static files.

Socket.IO: A library that enables real-time, bidirectional, and event-based communication.

CORS: Middleware for handling Cross-Origin Resource Sharing.

Frontend:

HTML5: Structure of the web pages.

CSS3: Styling and responsiveness.

JavaScript: Client-side logic for interacting with the Socket.IO server.

📂 Project Structure
.
├── css/
│   └── style.css
├── js/
│   └── client.js
├── nodeServer/
│   ├── node_modules/
│   ├── index.js
│   ├── package-lock.json
│   └── package.json
├── index.html
├── ping.mp3
├── Screenshot__85_-removebg-preview.png
└── README.md

⚙️ How to Run Locally
To get a local copy up and running, follow these simple steps.

Prerequisites
Make sure you have Node.js and npm (Node Package Manager) installed on your system.

Node.js (includes npm)

Installation
Clone the repository:

git clone https://github.com/tarunsaini04/Chat-App.git

Navigate into the project directory:

cd Chat-App

Install backend dependencies:
Navigate into the nodeServer directory and install the required packages.

cd nodeServer
npm install

Start the backend server:

npm start

The server will typically run on http://localhost:8000 (or process.env.PORT if defined).

Open the frontend:
With the server running, open the index.html file in your web browser. You can simply double-click it, or use a tool like Live Server in VS Code.

Important Note for Local Testing:
If your client.js is still configured to connect to your Render URL (https://chat-app-backend-ec8y.onrender.com), you will need to temporarily change it back to http://localhost:8000 (or the port your local server is running on) to test locally. Remember to change it back to the Render URL before pushing to GitHub for deployment.

☁️ Deployment
This application is deployed on Render.

Deployment Steps Summary:

Backend Configuration:

Ensure your nodeServer/index.js listens on process.env.PORT and serves static files using express.static(path.join(__dirname, '../')).

Set up your nodeServer/package.json with a start script: "start": "node index.js".

Render Setup:

Create a new Web Service on Render.

Connect your GitHub repository: https://github.com/tarunsaini04/Chat-App.

Set the Root Directory to nodeServer.

Set the Build Command to npm install.

Set the Start Command to npm start.

Frontend Connection:

Update your js/client.js to connect to your deployed Render backend URL:

const socket = io('https://chat-app-backend-ec8y.onrender.com');

Commit and push these changes to your GitHub repository. Render will automatically redeploy.

🤝 Contributing
Feel free to fork the repository, make improvements, and submit pull requests.

📄 License
This project is open source and available under the MIT License.
