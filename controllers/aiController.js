const Blog = require("../models/blog");
const askAI = require("../services/groq");
const mongoose = require("mongoose");

async function chatWithBlog(req, res) {

    try {

        const { blogId, message } = req.body;

        if (!mongoose.Types.ObjectId.isValid(blogId)) {

            return res.status(400).json({
                success: false,
                message: "Invalid Blog ID",
            });

        }

        const blog = await Blog.findById(blogId);

        if (!blog) {

            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });

        }
        const greetings = ["hi", "hello", "hey", "hii", "helo"];

        if (greetings.includes(message.trim().toLowerCase())) {
            return res.json({
                success: true,
                reply: "Hello! 👋 I'm Chitti AI Assistant. How can I help you today?"
            });
        }

        const prompt = `
You are Chitti AI Assistant.

You are friendly, intelligent and conversational.

Rules:

1. If the user's question is related to the blog, answer using the blog.
2. If the answer is not available in the blog, answer using your own knowledge.
3. If the user greets you (Hi, Hello, Hey), greet them naturally.
4. If the user asks who you are, introduce yourself as Chitti AI Assistant.
5. Never say "I couldn't find this information in this article."
6. If you use information from the blog, prefer it over your general knowledge.

BLOG TITLE:
${blog.title}

BLOG CONTENT:
${blog.body}

USER QUESTION:
${message}
`;
        const reply = await askAI(prompt);

        res.json({
            success: true,
            reply,
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            error: err.message,
        });

    }

}

module.exports = {
    chatWithBlog,
};