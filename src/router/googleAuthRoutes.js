const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

// Google 로그인 라우트
router.get("/login/google", authController.handleGoogleLogin);
// Google 로그인 콜백 라우트
router.get("/login/google/callback", authController.handleGoogleCallback);
// 메인 라우트
router.get("/", authController.handleMainRoute);
// 로그아웃 라우트
router.get("/logout", authController.handleLogout);

module.exports = router;
