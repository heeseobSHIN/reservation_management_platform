const passport = require("passport");

// Google 로그인 관련 컨트롤러
exports.handleGoogleLogin = passport.authenticate("google", { scope: ["profile", "email"] });

exports.handleGoogleCallback = passport.authenticate("google", { failureRedirect: "/" }, (req, res) => {
    res.redirect("/");
});

exports.handleMainRoute = (req, res) => {
    res.send(
        req.isAuthenticated()
            ? `<h1>Hello ${req.user.displayName}</h1><a href="/logout">Logout</a>`
            : '<h1>Home</h1><a href="/login/google">Login with Google</a>'
    );
};

exports.handleLogout = (req, res) => {
    req.logout();
    res.redirect("/");
};
