const express = require("express");
const router = express.Router();
const path = require("path");
const mainController = require("../controller/mainController");

// 메인 페이지 라우트
router.get("/", mainController.getMainPage);

module.exports = router;
