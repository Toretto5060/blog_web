let crypto = require("crypto");//生成token
let mysql = require("mysql");
const server = require('../server');
const jwt = require("../tokenFuc"); //生成token

function handleMySql(fn){
  let db = mysql.createConnection(server.sqlCont);
  db.connect(function(error){
    if(error){
      console.log(error);
    }else{
      console.log('已连接数据库');
      if( fn ) {
        fn(db);
      }else {
        throw new Error("invalid parameter fn , parameter fn must be callback!!");
      }
    }
  });
}

//用户注册(检测账户是否可用)
server.app.post("/checkUser",  (req, res) => {
      if (req.body.user == '' && req.body.psw == '') {
        return res.status(403).send({
          success: false,
          code: -1,
          message: '请保证账号密码的完整性'
        });
        return;
      }
      handleMySql( (db) => {
        db.query(
          'select * from user where user_name = ?',
          [req.body.user],(error, rows) => {
            if (error) {

            }
            if (rows.length >0) {
              res.json({
                "code": "-1",
                "message": "用户名重复"
              });
              db.end();
              console.log('已关闭数据库');
            } else {
              res.json({
                "code": "0",
                "message": "用户名可用"
              });
              db.end();
              console.log('已关闭数据库');
            }
          });
      });
  }),

//用户注册
server.app.post("/register",(req,res) => {
  if (req.body.user == '' && req.body.psw =='') {
     return res.status(403).send({
       success: false,
       code: -1,
       message: '请保证账号密码的完整性'
     });
    return;
  }
  handleMySql((db)=> {
    db.query(
      'select * from user where user_name = ?',
      [req.body.user],function(error,rows) {
        if(error){

        }
        if(rows.length<1){
          inFo(req);
        }
        else
        {
          console.log('用户名重复，请换一个昵称试试');
          res.json({"code":"-1", "message": "用户名重复"});
          db.end();
        }
    });
  });
  function inFo(setDatas){
    handleMySql(function(db) {
      const hash = crypto.createHash('md5');
      hash.update(setDatas.body.psw);
      let md5Paw=hash.digest('hex');
      db.query(
        'INSERT INTO user SET  ?',
        {user_name:setDatas.body.user,password:md5Paw,role:setDatas.body.role},
        function(error,rows){
        if(error){
          console.log(error);
          res.send({"status":502, "message": error});
        }else{
          console.log('注册成功')
          res.json({"status":res.statusCode, "message": "注册成功"});
        }
        db.end();
        console.log("已关闭数据库")
      });
    })
  }
});

//用户登录
server.app.post("/login",function(req,res){
  handleMySql(function(db){
    db.query(
      'select * from user where user_name = ? or nick_name = ?',
      [req.body.user, req.body.user],
        function(error,rows){
          if(error){
          };
          if(rows.length<1){
            console.log('用户不存在')
            res.json({
              "code": "-1",
              "message": "用户不存在"
            });
          }else{
            console.log("已查询到用户")
            inFo(req);
          }
          db.end();
          console.log("已关闭数据库")
        });
  });
  function inFo(datas){
    handleMySql(function(db){
      const hash = crypto.createHash('md5');
      hash.update(datas.body.psw);
      let md5Paw=hash.digest('hex');
      db.query(
        'select * from user where ( user_name = ? or nick_name = ? ) and password = ?',
        [datas.body.user,datas.body.user, md5Paw],(error,rows) => {
          if(error){
            throw error;
          };
          if(rows.length<1){
            res.send({'code':'-1','msg':'密码错误'})
          }else{
            let content = {
              user: datas.body.user
            }; // 要生成token的主题信息
            let token = jwt.generateToken(content);
            rows[0].token = token;
            console.log(rows[0])
            let postData = {
              id : rows[0].user_id,
              name: rows[0].user_name,
              nick_name: rows[0].nick_name,
              sex:rows[0].sex,
              birthday:rows[0].birthday,
              area:rows[0].area,
              post_position:rows[0].post_position,
              post:rows[0].post,
              role:rows[0].role,
              token:rows[0].token,

            }
            res.send({'code':'0','data':postData,'msg':'登录成功'})
            // console.log('登录成功')
            // res.send({"code":"0","msg":"登录成功"});
          }
          db.end();
          console.log("已关闭数据库")
        });

    })
  }
});

server.app.get("/tast",function (req,res) {
  res.send({
    "msg": "身份验证成功"
  })
})

server.app.get("/checkLogin",function (req,res) {
  res.send({
    "code":"0",
    "msg": "身份验证通过"
  })
})

module.exports = server;
