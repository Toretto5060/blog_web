let express = require("express");
let bodyParser=require("body-parser");
const jwt = require("./tokenFuc"); //生成token

let app = express();
let sqlCont={
  host:'',      //ip
  user:'',      //用户
  password:'',  // 密码
  database:''   // 数据库名称
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var hostName = 'http://192.168.6.129';
app.all('*', function(req, res, next) {
    if (req.method == "OPTIONS") {
      var haders={};
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,BLOG_TOKEN");
      res.send();
    }else{
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,BLOG_TOKEN");
      res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
      res.header("X-Powered-By", ' 3.2.1')
      res.header("Content-Type", "application/json;charset=utf-8");
      if (req.url != '/login' && req.url != '/register' && req.url != '/checkUser') {
        jwt.verifyToken(req,res,next)
      }else{
        next();
      }
    }
});







let port = 1234;
app.listen(port,function(){
  // console.log("node服务已启动");
  console.log(`服务器运行在http://${hostName}:${port}`);
 });



module.exports = {
  app,
  sqlCont
};
const register = require('./port/user.js');

//测试使用 supervisor 启动server.js












