var http = require("http");
var express = require("express");
var path = require("path");
const mysql = require("mysql");
const dbconfig = require("./db/connection.json");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "AIS123456"; // 비밀 키 (보안을 위해 환경 변수 등을 사용하는 것이 좋음)

const app = express();
const pool = mysql.createPool({
    connetionLimit: 10,
    host: dbconfig.host,
    user: dbconfig.user,
    password: dbconfig.password,
    database: dbconfig.database,
    debug: false,
});

///template 경로로 들어오는 요청에 대해서는 __dirname/template경로로 가라
// app.use("/scripts", express.static(__dirname + "/scripts"));
//url을 확장된 url로 보내더라도 그걸 encoding할 수 잇게 환경설정
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use("/public", express.static(path.join(__dirname + "/template/public")));
app.use(express.static("templates"));
// app.use(express.static("./templates/assets"));

//----------------------------------------------------------------

// req로는 웹으로부터 들어온 정보들이 담겨서 들어옴, res는 보내는 정보가 다 담겨있다.
//데이터베이스 update(회원가입)
app.post("/process/adduser", (req, res) => {
    //웹으로 보낸 데이터 추출
    const paramId = req.body.id;
    const paraMName = req.body.name;
    const paramAge = req.body.age;
    const paramPassword = req.body.password;

    //데이터를 얻으면 콜백함수 호출
    pool.getConnection((err, conn) => {
        //에러면 종료
        if (err) {
            conn.release();
            console.log("Mysql connect error");
            res.writeHead("200", { "Content-Type": "text/html; charset=utf8" });
            res.write("<h2> DB연결 실패 </h2>");
            res.end();
            return;
        }

        //쿼리문 입력(데이터 추출)
        conn.query(
            // "insert into user (id , name, age, password) value (?,?,?,password(?));",
            "insert into UserInfo (userID , username, age,  userPassword) values (?,?,?,?);",
            [paramId, paraMName, paramAge, paramPassword],
            (err, result) => {
                conn.release();

                //에러면 종료
                if (err) {
                    console.log("query error");
                    console.dir(err);

                    res.writeHead("200", { "Content-Type": "text/html; charset=utf8" });
                    res.write("<h2> sql 실행 실패 </h2>");
                    res.end();
                    return;
                }
                //결과값result가 있을 경우
                if (result) {
                    console.dir(result);
                    console.log("Inserted " + result);

                    res.writeHead("200", { "Content-Type": "text/html; charset=utf8" });
                    res.write("<h2> 사용자 추가 성공 </h2>");
                    res.end();
                }
                // 없을경우
                else {
                    console.log("Inserted denied");

                    res.writeHead("200", { "Content-Type": "text/html; charset=utf8" });
                    res.write("<h2> 사용자 추가 실패 </h2>");
                    res.end();
                }
            }
        );
        //console.log("Received token:", token);
    });
});

//----------------------------------------------------------------

//데이터베이스 read(로그인)
app.post("/process/signin", (req, res) => {
    const paramId = req.body.id;
    const paramPassword = req.body.password;

    console.log("login request : " + paramId + ",  " + paramPassword);

    //클라이언트에게 데이터를 전송한 후에 헤더를 설정할 수 없음 에러

    pool.getConnection((err, conn) => {
        //에러면 종료
        if (err) {
            conn.release();
            console.log("Mysql connect error");
            res.writeHead("200", { "Content-Type": "text/html; charset=utf8" });
            res.write("<h2> DB연결 실패 </h2>");
            res.end();
            return;
        }

        conn.query(
            "select `userID`, `userPassword` from `UserInfo` where `userID` = ? and `userPassword` = ?",

            [paramId, paramPassword],
            //쿼리문으로 수행하고 에러나 결과값에 따라서 다음 실행 목록을 설정
            (err, rows) => {
                conn.release();
                console.log(" sql query insert");

                if (err) {
                    console.dir(err);
                    res.writeHead("200", { "Content-Type": "text/html; charset=utf8" });
                    res.write("<h2> sql 실행 실패 </h2>");
                    res.end();
                    return;
                }
                //찾았을때
                if (rows.length > 0) {
                    console.log("id match", paramId);

                    res.sendFile(__dirname + "/template/public/signInsuccess.html");

                    return;
                }
                //실패햇을 때
                else {
                    console.log("id dismatch");
                    res.writeHead("200", { "Content-Type": "text/html; charset=utf8" });
                    res.write("<h2> 로그인 실패, 재시도하세요. </h2>");
                    res.end();
                    return;
                }
            }
        );
    });
});

//request 들어왔을때 처리해주는 액션 추가 (get, post)
//서버에서 http 프로토콜 get 요청이 일반적이다. get 요청을 받으면 특정 action을 리다이렉트
//app.get('(desination mac 에 따라서 get 함수 호출)') -> app.get('/')이면 landingPage localhost:[PORT]/ 에서의 요청 처리
//req -> 요청받고, res -> 내보내기
app.get("/", (req, res) => {
    console.log("/에서 요청");
    res.sendFile(__dirname + "/templates/index.html");
});

app.get("/get-token", (req, res) => {
    const user = { id: 123, username: "SHIN" };
    const token = jwt.sign(user, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token: token });
});

//([port],[callback(action)함수]);
app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
