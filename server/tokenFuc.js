let jwt = require("jsonwebtoken");
let verifyJwt = require("jwt-simple"); //验证token

class Jwt {
  //生成token
  generateToken(data){  //data:要生成token的主题信息
    let secretOrPrivateKey = "shitou5698" // 这是加密的key（密钥）
    let token = jwt.sign(data, secretOrPrivateKey, {
      expiresIn: 60*60
      //60 * 60 * 24 // 24小时过期
    });
    return token;
  }
  //验证token
  verifyToken(req,res,next) {
    var token = req.headers['blog_token'];
    if (token) {
      // 确认token
      jwt.verify(token, "shitou5698", function (err, decoded) {
        if (err) {
          return res.status(202).send({
            success: false,
            code:-1,
            message: '登录信息过期'
          });
        } else {
          // 如果没问题的操作
          next();
        }
      });
    } else {
      // 如果没有token，则返回错误
      return res.status(301).send({
        success: false,
        code:-1,
        message: '请登录后再试'
      });
    }
  }
}

module.exports = new Jwt;
