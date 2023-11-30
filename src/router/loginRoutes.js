const express = require("express");
const router = express.Router();

const loginController = require("../controller/loginController");

// 로그인 페이지 라우트
router.get("/", loginController.getLoginPage);

module.exports = router;
