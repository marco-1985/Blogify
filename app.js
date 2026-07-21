require('dotenv').config({ quiet: true });
const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");
const path = require('path');
const express = require('express');
const UserRoute = require('./routes/user');
const blogRoute = require('./routes/blog');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const Blog = require('./models/blog');
const resend = require("./services/resend");
const { checkForAuthenticationCookie } = require('./middlewares/authentication');
const app = express();
const PORT = process.env.PORT || 8000;
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(console.error);
app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"))
app.use("/user", UserRoute);
app.use("/blog", blogRoute);
app.use(express.static(path.resolve("./public")));
app.use(express.json());
app.use("/ai", require("./routes/ai"));
app.get("/", async (req, res) => {

  const search = req.query.search || "";

  let query = {};

  if (search) {

    query = {
      $or: [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          body: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    };

  }

  const allBlogs = await Blog.find(query)
    .populate("createdBy")
    .sort({ createdAt: -1 });

  res.render("home", {
    user: req.user,
    blogs: allBlogs,
    search,
    success: req.query.success,
  });

});
app.post("/contact", async (req, res) => {
  if (!req.user) {

    return res.redirect("/user/signin");

  }
  try {
    const email = req.user.email;
    const { message } = req.body;
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "karank47417@gmail.com",
      replyTo: email,
      subject: "New Message From Blogify",
      text: `
Visitor Email: ${email}

Message:
${message}
      `,
    });

    return res.redirect("/?success=mail");
  } catch (error) {
    console.error(error);
    return res.redirect("/?success=mailerror");
  }
});
app.get("/test", async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});
const server = app.listen(PORT, () => {
  console.log(`Server is started on http://localhost:${PORT}`);
});

server.on("error", (err) => {
  console.error(err);
});