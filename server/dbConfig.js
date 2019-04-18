import mysql from '../mysql'
let sqlCont={
  host:'47.95.1.44',
  user:'root',
  password:'961025',
  database:'blog_webServer'
}

let db;
let i=0;
function handleMySql(){
  i+=1;
  db = mysql.createConnection(sqlCont);
  db.connect(function(error){
    if(error){
      console.log(error);
      if(i<50){
        // handleMySql();
        setInterval(handleMySql(),200)
      }
    }else{
      i=0;
      console.log('已连接数据库')
    }
  });
}
handleMySql();


module.exports = db
