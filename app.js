const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = 2002;

app.use(cookieParser());
app.use(express.json());

const users = [   //가상 db
   {id: "zkzk"},
   {id: "akak"},
   {id: "qkqk"}
];

const sessions = []

app.get('/users', (req, res) => {
    const user = sessions.find(session => session.ssid === req.cookies.ssid) // sessions db 에 있는 ssid 값과 cookies 로 요청받은 ssid 값은 것을 찾아서 user 에 저장
    console.log(sessions) //sessions db 출력
    console.log(user)     // user 출력 
    res.send({id: user.id})  // 키가 id 이고 벨류가 user.id 로 응답한다 ex) {"id": "zkzk"}
});

app.post('/login', (req, res) => {

    const userid = req.body.userid    //body 로 들어온  userid 키의 값을 userid 에 저장 
    const user = users.find(user => user.id === userid) //가상 db 에 있는 user.id 값과 userid 의 값이 같은 것을 user 에 저장
    //user 데이터 형식이 {id:'zkzk'}
    const ssid = "zlfmaodtod77" //ssid 에 임의의 문자열 저장 

    sessions.push({  //sessions 안에 user 와 ssid 를 저장한다.     ex) { id: 'qkqk', ssid: 'zlfmaodtod77' }
        ...user,
        ssid
    });

    res.cookie("ssid", ssid)  // ssid 값을 쿠키로 응답한다
    res.send(user.id)   // user 에서 .을 이용해 키(id) 만 불러온다  키 안에는 "zkzk" 값이 들어 있어서 "zkzk" 로 응답한다

})



app.post('/logout', (req, res) => {
    res.send("logout page")
});

app.get('/register', (req, res) => {
    res.send("register page")
});



app.listen(port, () => {
    console.log(port, "서버 열림")
});