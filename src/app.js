// server.js
const express = require("express");
const path = require("path");
const app = express();
const port = 8080;

// 정적 파일을 제공하기 위한 미들웨어
app.use(express.static(path.join(__dirname, "public")));

// 메인 페이지 라우트
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 로그인 페이지 라우트
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
