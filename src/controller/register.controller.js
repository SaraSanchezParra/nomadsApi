const connection = require("../database")
const CryptoJS = require("crypto-js");


function getRegister(request,response){

  let sql;
  if (request.query.user_id == null) 
  sql = "SELECT * FROM user";
  else sql = "SELECT username,name,surname,email,password FROM user WHERE user_id = " + request.query.user_id;

  connection.query(sql, function (err, result) {
    console.log("se ha buscado");
    if (err) 
    console.log(err);
    else {
      
      response.send(result);
    }
  });
}


function postRegister(request,response)
{
  console.log(request.body);
  let foto;
  if (request.body.photo != null) {
    foto = request.body.photo
  }
  else {
    foto = "https://imgur.com/NtZPyAq";
  }

  const KEY = '123456$#@$^@1ERF%&€'
  let password = request.body.password;
  let hash = CryptoJS.HmacSHA256(password, KEY);
  let passwordCifrado= CryptoJS.enc.Base64.stringify(hash); 
  console.log(passwordCifrado);
  
  let sql = "INSERT INTO user (username,name,surname,email,descripcion,password,photo)" + 
  "VAlUES ('" + request.body.username + "','"+ 
                request.body.name + "', '" +
                request.body.surname + "', '" +  
                request.body.email + "','', '" + 
                passwordCifrado + "','" + 
                foto + "')"
  // console.log(sql);

  
  connection.query(sql,function(err,res)
  {
    if(err){
      console.log(err);
      respuesta = {error:true, codigo:200, mensaje:'No registrado', data_user:res}

    }else{
      console.log(err);
      respuesta = {error:false, codigo:200, mensaje:'registrado', data_user:res}
    }
    response.json(respuesta)
  })             
}

module.exports={getRegister,postRegister};