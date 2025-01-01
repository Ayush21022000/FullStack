Full-Stack Application with Angular and Node.js
This is a full-stack web application built using Angular for the frontend, Node.js with Express for the backend, and PostgreSQL as the database. It provides a seamless user experience for authentication and other features.

🚀 Features of the application are as follows:-
* User Authentication: Secure login and signup functionality using password hashing (SHA256).
* Frontend: Built with Angular for dynamic and responsive UI.
* Backend: Node.js and Express for handling API requests and managing business logic.
* Database: PostgreSQL for robust data storage.
* Password Security: Client-side hashing to ensure user passwords are never stored in plaintext.
* RESTful API: Follows REST principles for backend services.

🛠️ Tech Stack
Frontend : Angular (Standalone Components, Reactive Forms), Bootstrap (Optional for styling)
Backend: Node.js, Express.js
Database : PostgreSQL
Additional Libraries/Tools :-
CryptoJS (Password hashing)
bcryptjs (Password comparison)
JWT (Authentication tokens)
CORS Middleware (Cross-Origin Resource Sharing)

🔧 Installation and Setup
Prerequisites : 
* Node.js (v14 or above)

* PostgreSQL (Set up a database)

* Angular CLI

Backend Setup
Navigate to the backend folder:
cd backend
Install dependencies:
npm install
Set up environment variables by creating a .env file:

PORT=5000
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_secret_key
Start the backend server by going inside src:
cd src and then
npx ts-node src/app.ts

Frontend Setup
Navigate to the frontend folder:
cd frontend
Install dependencies:
npm install
Start the Angular development server:
ng serve
Access the app in your browser at http://localhost:4200.