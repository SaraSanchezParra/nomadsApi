const { User } = require("../models/user");
const {connection} = require("../database");



function userFound(request, response) {
    
  let respuesta;
  let params = [request.query.username]
  let sql = "SELECT user_id, username, name, surname, email, descripcion, photo FROM nomads.user WHERE username = ?"
  let sql2 = `SELECT viaje_id, titulo,v.descripcion,foto, v.user_id_propietario, u.photo as user_foto, n_likes as likes FROM nomads.viajes as v JOIN nomads.user as u ON(v.user_id_propietario=u.user_id) WHERE v.user_id_propietario = ?`;

  let sql3 = `SELECT v.viaje_id, titulo, v.descripcion,foto, v.user_id_propietario, u.photo as user_foto, n_likes as likes FROM nomads.favoritos as f JOIN nomads.viajes as v ON(f.viaje_id_fav= v.viaje_id) Join nomads.user as u ON (v.user_id_propietario = u.user_id) WHERE user_id_fav = ?`;


  console.log(sql);

  connection.query(sql,params, function(err, result){
      if(err){
          console.log(err);
          respuesta = { error: true, codigo: 200, mensaje: 'Error en conexión', data_user: null }
      } else {
        if (result.length === 0) {
          respuesta = { error: true, codigo: 200, mensaje: 'Ningún usuario encontrado',  data_user: null }
          response.send(respuesta);
        }
        else {
          console.log(result);{  // respuesta = {error:false, codigo:200, mensaje:'logueado', data_user:res}
            let user = new User(result[0].user_id, result[0].name, result[0].surname, result[0].email,
              result[0].username, result[0].descripcion, result[0].photo, [], []);
            params = [user.user_id];
    
            connection.query(sql2, params, (err, resViajes) => {
              if (err) {
                console.log(err);
                respuesta = {
                  error: true,
                  codigo: 200,
                  mensaje: "viaje no encontrado",
                  data: resViajes,
                };
              } else {
                user.misViajes = resViajes;
                console.log(resViajes)
                params = [user.user_id];
                connection.query(sql3, params, (err, resFavoritos) => {
                  if (err) {
                    console.log(err);
                    respuesta = {
                      error: true,
                      codigo: 200,
                      mensaje: "no hay favoritos",
                      data: resFavoritos,
                    };
                  } else {
                    user.favs = resFavoritos
                    respuesta = {error:false, codigo:200, mensaje:'encontrado', data_user:[user]}
                       
                    response.send(respuesta);
                  }
                });
    
              }
            });
          } 
        
            console.log(respuesta);
          }
    
    
        }
       
      }
      );
  //         respuesta = { error: false, codigo: 200, mensaje: 'Usuario encontrado',  data_user: result }
  //       }
  //     }
  //     response.send(respuesta)
  // })
}




















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
  


  
module.exports = {getStart, getUser, putUser, userFound}


