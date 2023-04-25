const {connection} = require("../database");
const { User } = require("../models/user")
const CryptoJS = require("crypto-js");

function postUserLoging(request, response) {
  let respuesta;

  console.log(request.body);

  let username = request.body.username;
  let password = request.body.password;

  const KEY = '123456$#@$^@1ERF%&€'
  let hash = CryptoJS.HmacSHA256(password, KEY);
  let passwordCifrado= CryptoJS.enc.Base64.stringify(hash); 
  console.log(passwordCifrado);

  let params = [username, passwordCifrado];
  console.log(params);

  let sql = `SELECT * FROM nomads.user WHERE username = ? AND password = ?`;

  let sql2 = `SELECT viaje_id, titulo,v.descripcion,foto, v.user_id_propietario, n_likes as likes FROM nomads.viajes as v JOIN nomads.user as u ON(v.user_id_propietario=u.user_id) WHERE v.user_id_propietario = ?`;

  let sql3 = `SELECT v.viaje_id, titulo, v.descripcion,foto, v.user_id_propietario, u.photo as user_foto, n_likes as likes FROM nomads.favoritos as f JOIN nomads.viajes as v ON(f.viaje_id_fav= v.viaje_id) Join nomads.user as u ON (v.user_id_propietario = u.user_id) WHERE user_id_fav = ?`;



  connection.query(sql, params, (err, res) => {
    if (err) {
      console.log(err);
      respuesta = {
        error: true,
        codigo: 200,
        mensaje: "No logueado",
        data_user: res,
      };
      console.log(respuesta);
      response.send(respuesta);
    } else if (res.length > 0) {
        // respuesta = {error:false, codigo:200, mensaje:'logueado', data_user:res}
        let user = new User(res[0].user_id, res[0].name, res[0].surname, res[0].email,
          res[0].username, res[0].descripcion, res[0].photo, [], []);
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
            response.send(respuesta);
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

                 respuesta = {
                  error: false,
                  codigo: 200,
                  mensaje: "logeado",
                  data_user: user,
                };

              }
              console.log(respuesta);
              response.send(respuesta);
            });

          }
        });
      } else {
        console.log(
          "Los datos proporcionados no coinciden con ningún usuario en la base de datos."
        );
        respuesta = {
          error: true,
          codigo: 200,
          mensaje: "No logueado",
          data_user: res
        };

        console.log(respuesta);
        response.send(respuesta);
        
      }
  });
}

module.exports = { postUserLoging };
