const path = require("path");

// 메인 페이지 컨트롤러
exports.getMainPage = (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "index.html"));
};
