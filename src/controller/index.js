const mainController = require("./mainController");
const loginController = require("./loginController");
const authController = require("./authController");

//컨트롤러에 파일을 추가할 때만다 수정 안해도 되게 함
module.exports = {
    authController,
    mainController,
    loginController,
};
