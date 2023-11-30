const path = require("path");

// 메인 페이지 컨트롤러
const getMainPage = (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "index.html"));
};

//모듈화, 이 파일에서의 컨트롤러들을 함수화하여 객체방식으로 내보냄
module.exports = {
    getMainPage,
};
