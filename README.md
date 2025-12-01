# 🎬 Movies Web Application  
CPAN 212 – Modern Web Technologies  
Final Project – Movies App  
**Student Name:  Kirandeep Kaur, Ashika**

---

## 🚀 Project Overview
This is a Movie Management Web Application built using:
- Node.js  
- Express.js  
- Pug Templates  
- MongoDB / Mongoose  
- Express Sessions  
- User Authentication (Login & Register)

The application allows users to:
- Register and Login  
- Add a Movie  
- Edit a Movie  
- Delete a Movie  
- View Movie Details  
- Logout  
- Only logged-in users can add/edit/delete their own movies  

---

## 📁 Folder Structure

MoviesApp/
├─ middleware/
│  └─ auth.js
├─ models/
│  ├─ Movie.js
│  └─ User.js
├─ node_modules/
├─ public/
│  ├─ CSS/
│  │  └─ style.css
│  └─ js/
│     └─ main.js
├─ routes/
│  ├─ movies.js
│  └─ users.js
├─ views/
│  ├─ add_movie.pug
│  ├─ edit_movie.pug
│  ├─ index.pug
│  ├─ layout.pug
│  ├─ login.pug
│  ├─ movie_details.pug
│  └─ register.pug
├─ app.js
├─ package-lock.json
└─ package.json
└─ gitignore
└─ README.md



---

## ⚙️ Install & Run Instructions

### 1️⃣ Install Dependencies


### 2️⃣ Start Server


### 3️⃣ Development Mode


---

## 🔑 Authentication
- New users can register using the Register page  
- Passwords are hashed using **bcryptjs**  
- Sessions used to keep users logged in  
- Route protection ensures:
  - Only logged-in users can add/edit/delete movies  
  - Users can only edit/delete movies they created  

---

## 🌐 Deployment
You can deploy to:
- Render.com  
- Heroku  
- GitHub (server cannot run directly on GitHub)

---

## 🎥 Demo Video Requirements
Your demo must show:
- Register new user  
- Login  
- Add movie  
- Edit movie  
- Delete movie  
- Restriction test (add/edit blocked when logged out)

---

## 📌 Final Notes
This project fulfills:
- Express + Pug + Mongoose  
- Registration/Login  
- Add/Edit/Delete Movies  
- Route Restrictions  
- Validation  
- Deployment  

