const express = require("express");
const path = require("path");
const app = express();
const port = 8080;
const session = require("express-session");
const passport = require("passport");

// 라우터 추가
const mainRoutes = require("./router/mainRoutes");
const loginRoutes = require("./router/loginRoutes");
const googleAuthRoutes = require("./router/googleAuthRoutes");

app.use(session({ secret: "your-secret-key", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "public")));

// 메인 페이지 라우트
app.use("/", mainRoutes);

// 로그인 페이지 라우트
app.use("/login", loginRoutes);

//google login 라우트
app.use("/gauth", googleAuthRoutes);

app.listen(port, () => {
    console.log(`http://localhost:${port}에서 서버 동작중`);
});
