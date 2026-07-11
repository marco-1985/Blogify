const { Router } = require("express");
const { requireAuth } = require("../middlewares/authentication");
const multer = require("multer");
const cloudinary = require("../services/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const Blog = require("../models/blog");
const Comment = require("../models/comments");

const router = Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blogify",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({
  storage,
});
router.get("/add-new", requireAuth, (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});
// ================= CREATE BLOG =================

router.post("/", requireAuth, upload.single("coverImageURL"), async (req, res) => {
  const { title, body } = req.body;

  let coverImageURL = "";

  if (req.file) {
    coverImageURL = req.file.path;
  }

  await Blog.create({
    title,
    body,
    createdBy: req.user._id,
    coverImageURL,
  });

  return res.redirect("/?success=published");
});

// ================= EDIT PAGE =================

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

// ================= UPDATE BLOG =================

router.post(
  "/edit/:id",
  requireAuth,
  upload.single("coverImageURL"),
  async (req, res) => {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).send("Blog not found");
    }

    if (blog.createdBy.toString() !== req.user._id) {
      return res.status(403).send("Unauthorized");
    }

    blog.title = req.body.title;
    blog.body = req.body.body;

    if (req.file) {
      blog.coverImageURL = req.file.path;
    }

    await blog.save();

    return res.redirect(`/blog/${blog._id}?success=updated`);
  }
);

// ================= DELETE BLOG =================

router.post("/delete/:id", requireAuth, async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).send("Blog not found");
  }

  if (blog.createdBy.toString() !== req.user._id) {
    return res.status(403).send("Unauthorized");
  }

  await Comment.deleteMany({
    blogId: blog._id,
  });

  await Blog.findByIdAndDelete(blog._id);

  return res.redirect("/?success=deleted");
});

// ================= SINGLE BLOG =================

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");

  const comments = await Comment.find({
    blogId: req.params.id,
  }).populate("createdBy");

  return res.render("blog", {
    user: req.user,
    blog,
    comments,
    success: req.query.success,
  });
});

// ================= COMMENT =================

router.post("/comment/:blogId", requireAuth, async (req, res) => {
  await Comment.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });

  return res.redirect(`/blog/${req.params.blogId}`);
});

module.exports = router;