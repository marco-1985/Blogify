const express = require("express");
const router = express.Router();

const { chatWithBlog } = require("../controllers/aiController");

router.post("/chat", chatWithBlog);

module.exports = router;