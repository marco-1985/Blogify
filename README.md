# 📝 Blog App

A modern **full-stack Blog Application** built with **Node.js, Express.js, MongoDB, and EJS**. The application allows users to securely register, log in, create blogs, upload cover images, edit or delete their own posts, and interact through comments. The project follows the **MVC Architecture** and supports **Docker** for easy deployment.


# ✨ Features

* 🔐 User Authentication (Signup & Login)
* 👤 Secure Session-Based Authentication
* 📝 Create New Blogs
* ✏️ Edit Existing Blogs
* ❌ Delete Blogs
* 📖 Read Blogs
* 🖼️ Upload Cover Images (Multer)
* 💬 Comment System
* 👨 User-Specific Blog Management
* 📱 Responsive UI
* 🗂️ MVC Project Structure
* 🐳 Docker Support

---

# 🛠️ Tech Stack

### Frontend

* EJS
* HTML5
* CSS3
* Bootstrap 5
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* Cookie-Based Authentication
* JWT (if applicable)

### Other Packages

* Multer
* dotenv
* cookie-parser
* uuid
* bcrypt
* jsonwebtoken
* express

---

# 📂 Project Structure

```text
Blog-App/
│
├── controllers/
├── middlewares/
├── models/
├── public/
│   ├── css/
│   ├── js/
│   ├── images/
│   └── uploads/
│
├── routes/
├── services/
├── views/
│   ├── partials/
│   ├── home.ejs
│   ├── addBlog.ejs
│   ├── blog.ejs
│   ├── signin.ejs
│   └── signup.ejs
│
├── .env
├── app.js
├── package.json
├── Dockerfile
├── docker-compose.yml
└── README.md
```

---

# ⚙️ Installation

## 1. Clone the Repository

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Create Environment Variables

Create a `.env` file in the root directory.

```env
PORT=8000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## 4. Start the Development Server

```bash
npm start
```

The application will run on:

```text
http://localhost:8000
```

---

# 🐳 Run with Docker

Build and start the containers.

```bash
docker compose up --build
```

To stop containers

```bash
docker compose down
```

---

# 📦 API/Routes Overview

### Authentication

* Signup
* Login
* Logout

### Blog

* Create Blog
* View Blog
* Update Blog
* Delete Blog

### Comments

* Add Comment
* View Comments

---

# 🔒 Environment Variables

| Variable   | Description                   |
| ---------- | ----------------------------- |
| PORT       | Application Port              |
| MONGO_URL  | MongoDB Connection String     |
| JWT_SECRET | Secret Key for Authentication |

---
## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
PORT=8000
MONGO_URL=mongodb://localhost:27017/blogify
JWT_SECRET=your_jwt_secret_key
```
# 📈 Future Improvements

* ❤️ Like & Dislike System
* 🔖 Bookmark Blogs
* 👤 User Profile
* 🔎 Search Blogs
* 🏷️ Categories & Tags
* 📊 Admin Dashboard
* 🌙 Dark Mode
* 📧 Email Verification
* 🔔 Notifications
* 📱 Progressive Web App (PWA)

---

# 💻 Built With

* Node.js
* Express.js
* MongoDB
* Mongoose
* EJS
* Bootstrap
* Multer
* Docker

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a new branch.
3. Commit your changes.
4. Push the branch.
5. Open a Pull Request.

---

# ⭐ Support

If you found this project useful, please consider giving it a ⭐ on GitHub.

---

# 👨‍💻 Author

**Karan Kumar**

* GitHub: https://github.com/marco-1985
* LinkedIn: https://www.linkedin.com/in/karan-kumar-9380b3310/

---

## 📄 License

This project is licensed under the MIT License.
=======
# Blogify
Developed a full-stack blog platform using Node.js, Express.js, MongoDB, and EJS, featuring user authentication, CRUD operations for blogs, image uploads with Multer, commenting functionality, responsive UI, and Docker-based deployment following the MVC architecture.
