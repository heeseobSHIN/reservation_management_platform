const path = require("path");

// 로그인 페이지 컨트롤러
exports.getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "login.html"));
};
