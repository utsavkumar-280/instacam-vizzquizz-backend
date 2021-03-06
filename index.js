const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const dbConnection = require("./db/dbConnect.js");
const route404Handler = require("./middlewares/route404Handler");
const errorHandler = require("./middlewares/errorHandler");

const posts = require("./routes/posts.router");
const quizzes = require("./routes/quizzes.router");
const userProfiles = require("./routes/userProfiles.router");

const app = express();
const PORT = process.env.PORT || 8040;
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(cors());

dbConnection();

app.get("/", (req, res) => {
	res.send("Welcome to CineQuiz and Instacam Apis");
});

app.get("/hello", (req, res) => {
	res.json({
		success: true,
		response: "Kya bolti Public!!",
	});
});

app.use("/quizzes", quizzes);

app.use("/user-profiles", userProfiles);
app.use("/posts", posts);

//DO NOT MOVE THESE HANDLERS
// 404 Route Handler
app.use(route404Handler);

//Error Handeler
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`server running on http://localhost:${PORT}`);
});
