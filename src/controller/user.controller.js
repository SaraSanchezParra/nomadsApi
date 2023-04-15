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
      request.body.name,
      request.body.surname,
      request.body.email,
      request.body.descripcion,
      request.body.photo,
      request.query.user_id,
    ];
    console.log(params)
    let sql =
      'UPDATE user SET name = ?, surname = ?, email = ?, descripcion = ?, photo = ? WHERE user_id = ?';
  
    connection.query(sql, params, (err, resp) => {
      if (err) {
        console.log(err);
        let respuesta = {error: true, codigo: 200, mensaje: 'Usuario no actualizado'};
        response.send(respuesta);
      } else {
        let respuesta = {error: false, codigo: 200, mensaje: 'Usuario actualizado'}
        console.log("Usuario actualizado correctamente.");
        response.send(respuesta)
      }
    });
  };
  


  
module.exports = {getStart, getUser, putUser}