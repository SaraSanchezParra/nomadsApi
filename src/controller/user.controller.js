const connection = require("../database")




function getStart(request, response) {
    let respuesta = {error: true, codigo: 200, mensaje: 'Beginning point'};
    response.send(respuesta);
}

function getUser(request,response){

    let user_id = request.query.user_id;
    let params;
    let sql;
    console.log(request.query);

    params= [user_id]
    sql = `SELECT  username, name, surname, email, descripcion, photo FROM user WHERE user_id = ?` ;
    
   
    
    connection.query(sql,params,(err,res)=>{
      
        if(res.length > 0){
          respuesta = {error:false, codigo:200, mensaje:'Usuario encontrado', data:res}
          // respuesta = res[0]
        } else {
          console.log('Los datos proporcionados no coinciden con ningún usuario en la base de datos.')
          respuesta = {error:true, codigo:200, mensaje:'No encontrado', data:res}
        }
        console.log(respuesta);
      
      response.send(respuesta)
    })
  } 

  
  function putUser(request, response) {
    let params = [
      request.body.user_id,
      request.body.email,
      request.body.name,
      request.body.surname,
      request.body.photo,
      request.body.descripcion,
      request.body.password,
      request.body.password2
    ];
  
    let sql =
      'UPDATE user SET username = ?, name = ?, surname = ?, email = ?, descripcion = ?, password = ?, photo = ? WHERE user_id = ?';
  
    connection.query(sql, params, (err, resp) => {
      let respuesta;
      if (err) {
        console.log(err);
        respuesta = {error: true, codigo: 200, mensaje: 'Usuario no actualizado', data_user: resp
        };
      } else {
        respuesta = {error: false, codigo: 200, mensaje: 'Usuario actualizado', data_user: resp
        };
        console.log(respuesta);
      }
      response.send(respuesta);
    });
  };
  


  
module.exports = {getStart, getUser, putUser}