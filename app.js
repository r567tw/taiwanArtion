// 引入所需的模組
const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser'); // 新增 body-parser 中間件


// 建立 Express 應用程式
const app = express();
const port = 3000;

// 設定 EJS 模板引擎
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 使用 session 中間件
app.use(session({
    secret: 'mysecretkey', // 密鑰，可以自行更改
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: false }));


// 登入頁面路由
app.get('/login', (req, res) => {
    res.render('login');
});

// 登入處理
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // 帳號密碼 (示範用，實際情況應儲存在資料庫中)
    const validUsername = 'user';
    const validPassword = 'password';

    // console.log(username, password)
    // 檢查帳號密碼是否正確，這裡只是示範，實際情況需要比對資料庫中的帳號密碼
    if (username === validUsername && password === validPassword) {
        // 設置 session 變數，代表已登入
        console.log("login success")
        req.session.isLoggedIn = true;
        res.redirect('/');
    } else {
        console.log("login error")
        res.redirect('/login');
    }
});

// 登出處理
app.get('/logout', (req, res) => {
    // 清除 session 變數，代表登出
    req.session.isLoggedIn = false;
    res.redirect('/login');
});

// 檢查是否登入的中間件
function checkLoggedIn(req, res, next) {
    if (req.session.isLoggedIn) {
        next();
    } else {
        res.redirect('/login');
    }
}

// 定義路由
app.get('/', checkLoggedIn, (req, res) => {
    // 渲染並回傳 EJS 頁面
    res.render('index');
});

// 啟動伺服器
app.listen(port, () => {
    console.log(`應用程式正在監聽 http://localhost:${port}`);
});
