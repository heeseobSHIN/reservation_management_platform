// services/passportService.js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
    new GoogleStrategy(
        {
            //아직 구글 api 프로젝트 생성 안함
            clientID: "YOUR_GOOGLE_CLIENT_ID",
            clientSecret: "YOUR_GOOGLE_CLIENT_SECRET",
            callbackURL: "http://localhost:8080/login/google/callback",
        },
        (accessToken, refreshToken, profile, done) => {
            // Google 인증이 완료된 후 실행되는 콜백 함수
            // 사용자 정보는 profile에 담겨 있음
            return done(null, profile);
        }
    )
);

passport.serializeUser((user, done) => {
    // 사용자 정보를 세션에 저장
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    // 세션에서 사용자 정보 가져오기
    done(null, obj);
});
