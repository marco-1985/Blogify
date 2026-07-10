const { Router } = require('express');
const { requireAuth } = require("../middlewares/authentication");
const multer = require('multer')
const path = require('path')
const Blog = require('../models/blog')
const Comment = require('../models/comments')
const router = Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/uploads"))
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`
    cb(null, fileName);
  }
})
const upload = multer({ storage: storage });
router.get("/add-new", requireAuth, (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
})

router.post("/", requireAuth, upload.single("coverImageURL"), async (req, res) => {
  const { title, body } = req.body;
  let coverImageURL = "";
  if (req.file) {
    coverImageURL = `/uploads/${req.file.filename}`;
  }
  const blog = await Blog.create({
    body,
    title,
    createdBy: req.user._id,
    coverImageURL,
  })
  return res.redirect("/?success=published");
})
router.get("/edit/:id", requireAuth, async (req, res) => {

  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).send("Blog not found");
  }
  if (blog.createdBy.toString() !== req.user._id) {
    return res.status(403).send("Unauthorized");
  }
  res.render("editBlog", {
    user: req.user,
    blog,
  });
});
router.post(
  "/edit/:id",
  requireAuth,
  upload.single("coverImageURL"),
  async (req, res) => {

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).send("Blog not found");
    }

    // Sirf owner edit kar sakta hai
    if (blog.createdBy.toString() !== req.user._id) {
      return res.status(403).send("Unauthorized");
    }

    blog.title = req.body.title;
    blog.body = req.body.body;

    // Agar nayi image upload hui hai to replace karo
    if (req.file) {
      blog.coverImageURL = `/uploads/${req.file.filename}`;
    }

    await blog.save();

    return res.redirect(`/blog/${blog._id}?success=updated`);
  }
);
router.post("/delete/:id", requireAuth, async (req, res) => {

  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).send("Blog not found");
  }

  // Sirf owner delete kar sakta hai
  if (blog.createdBy.toString() !== req.user._id) {
    return res.status(403).send("Unauthorized");
  }

  // Blog ke comments bhi delete kar do
  await Comment.deleteMany({
    blogId: blog._id,
  });

  // Blog delete
  await Blog.findByIdAndDelete(blog._id);

  return res.redirect("/?success=deleted");

});
router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy")
  const comments = await Comment.find({ blogId: req.params.id }).populate("createdBy")
  return res.render("blog", {
    user: req.user,
    blog,
    comments,
    success: req.query.success,
  })
})
router.post("/comment/:blogId", requireAuth, async (req, res) => {
  console.log("User:", req.user);
  console.log("User ID:", req.user._id);
  await Comment.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  })
  return res.redirect(`/blog/${req.params.blogId}`);
})
module.exports = router;