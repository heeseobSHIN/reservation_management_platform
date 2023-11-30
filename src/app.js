const express = require("express");
const path = require("path");
const app = express();
const port = 8080;

// 라우터 추가
const mainRoutes = require("./router/mainRoutes");
const loginRoutes = require("./router/loginRoutes");

app.use(express.static(path.join(__dirname, "public")));

// 메인 페이지 라우트
app.use("/", mainRoutes);

// 로그인 페이지 라우트
app.use("/login", loginRoutes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
