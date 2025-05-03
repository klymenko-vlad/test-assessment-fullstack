To run the application, you need to have Node.js (version 18 or higher) and npm or yarn installed. You also need to configure environment variables in both the frontend/ and backend/ folders.

First, clone the repository and navigate into the project directory. Then, go to the backend/ folder, install the dependencies using npm install, and create a .env file with a PORT environment. For example, you can set PORT=3001. Start the backend server by running npm run start.

In a separate terminal tab, go to the frontend/ folder, install the dependencies using npm install, and create a .env.local file. Add the following environment variable: NEXT_PUBLIC_API_BASE_URL=http://localhost:3001. Then, start the frontend using npm run dev.

Once both servers are running, you can access the frontend at http://localhost:3000. The frontend will make API requests to the backend at http://localhost:3001.

Make sure to run the backend and frontend in parallel for full functionality. The backend must be running before the frontend can fetch any dat