const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const fs = require("fs");

app.use(express.static(path.join(__dirname, "./public")));

app.get("/", (req, res) => {
	response.sendStatus(200);
});

// Middleware to remove .html extension from URLs
app.use((req, res, next) => {
	const filePath = path.join(__dirname, "public", `${req.path}`);
	if (req.path !== "/" && fs.existsSync(`${filePath}.html`)) {
		req.url = `${req.path}.html`;
	}
	next();
});

// Route to serve .html files
app.get("/*.html", (req, res, next) => {
	const filePath = path.join(__dirname, "public", `${req.path}`);
	if (fs.existsSync(`${filePath}`)) {
		res.sendFile(`${filePath}`);
	} else {
		next();
	}
});

// 404 handler
app.use((req, res) => {
	res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

app.listen(port, () => {
	console.log(`Server listening on port 3000`);
});