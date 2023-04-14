const connection = require("../database");
const {User} = require("../models/user")
function postUserLoging(request, response) {
  // let respuesta;

  console.log(request.body);

  let username = request.body.username;
  let password = request.body.password;

  let params = [username, password];
  console.log(params);

  let sql = `SELECT * FROM nomads.user WHERE username = ? AND password = ?`;

  let sql2 = `SELECT titulo,viajes.descripcion,foto FROM nomads.viajes
              JOIN nomads.user ON(viajes.user_id_propietario=user.user_id)
              WHERE viajes.user_id_propietario = ?`;

  let sql3 = `SELECT titulo,viajes.descripcion,foto FROM nomads.favoritos
             JOIN nomads.viajes ON(favoritos.viaje_id_fav=viajes.viaje_id) 
             WHERE user_id_fav =?`;

  connection.query(sql, params, (err, res) => {
    if (err) {
      console.log(err);
      respuesta = {
        error: true,
        codigo: 200,
        mensaje: "No logueado",
        data_user: res,
      };
    } else {
      if (res.length > 0) {
        // respuesta = {error:false, codigo:200, mensaje:'logueado', data_user:res}
        let user = new User(res[0].user_id,res[0].name,res[0].surname,res[0].email,
                            res[0].username,res[0].descripcion,res[0].photo,[],[]);
        params = [user.user_id];
      
        connection.query(sql2, params, (err, resViajes) => {
          if (err) {
            console.log(err);
            respuesta1 = {
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
                respuesta1 = {
                  error: true,
                  codigo: 200,
                  mensaje: "no hay favoritos",
                  data: resFavoritos,
                };
              } else {
                user.favs = resFavoritos;
              
                let respuesta = {
                  error: false,
                  codigo: 200,
                  mensaje: "logeado",
                  data_user: user,
                };
                
                response.send(respuesta);
              }
            });
          }
        });
      } else {
        console.log(
          "Los datos proporcionados no coinciden con ningún usuario en la base de datos."
        );
        respuesta1 = {
          error: true,
          codigo: 200,
          mensaje: "No logeado",
          data_user: res,
        };   
        console.log(respuesta1);
      }
    
       
    }
  });
}

module.exports = { postUserLoging };
