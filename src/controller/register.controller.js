const connection = require("../database")


function getRegister(request,response){
  // let sql;
  // if (request.query.id_user == null) 
 let sql = "SELECT * FROM user";
  // else sql = "SELECT username,name,surname,email,password FROM user WHERE id_user = " + request.query.id_user;

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


  let sql = "INSERT INTO user (username,name,surname,email,descripcion,password,foto)" + 
  "VAlUES ('" + request.body.username + "','"+ 
                request.body.name + "', '" +
                request.body.surname + "', '" +  
                request.body.email + "','', '" + 
                request.body.password + "','')"
  console.log(sql);
  connection.query(sql,function(err,res)
  {
    if(err){
      console.log(err);
      respuesta = {error:true, codigo:200, mensaje:'No registrado', data_user:res}

    }else{
      console.log(err);
      respuesta = {error:false, codigo:200, mensaje:'registrado', data_user:res}
    }
    response.send(respuesta)
  })             
}

module.exports={getRegister,postRegister};