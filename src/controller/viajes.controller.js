const Viaje = require("../models/viaje");
const connection = require("../database");

function getStartViajes(req, res) {
  let answer = {
    error: false,
    codigo: 200,
    mensaje: "Starting Point",
    data_viaje: null,
  };

  res.send(answer);
}

function getDiasOfViaje(req, response) {
  let excursion;
  let answer;
  let viaje_id = req.query.viaje_id;
  let params = [viaje_id];
  let sql =
    "SELECT titulo, ubicacion, foto, v.descripcion, user_id_propietario as user_id, n_likes as likes, u.photo as user_foto, d.nombre, d.dia_id, corLat, corLong FROM nomads.viajes as v Join nomads.dias as d ON (v.viaje_id = d.viaje_id) Join nomads.user as u ON (v.user_id_propietario= u.user_id) Where v.viaje_id = ?;";
  connection.query(sql, params, (err, res) => {
    if (err) {
      answer = { error: true, codigo: 200, mensaje: err, data_viaje: [null] };
    } else {
      if (res.length != 0) 
      {
        
        //  create Viaje

        console.log(res);

            let datos = res[0]
            console.log("Over here");
            console.log(datos);
            excursion = new Viaje(
                viaje_id,
                datos.titulo,
                datos.descripcion,
                datos.ubicacion,
                datos.foto,
                [],
                datos.user_foto,
                datos.likes,
                datos.user_id,
                datos.corLat,
                datos.corLong)
        
        console.log("estoy aqui");
        console.log(excursion);

        // create days

        res.forEach((viaje) => {
          excursion.days.push({
            dia_id: viaje.dia_id,
            nombre: viaje.nombre,
            puntosDeInteres: [],
          });
        });
      } else {
        answer = { error: true, codigo: 200, mensaje: err, data_viaje: [null] };
      }
    }

    answer = {
      error: false,
      codigo: 200,
      mensaje: "Viaje encontrado",
      data_viaje: [excursion],
    };
    response.send(answer);
  });
}

function getPIOfDay(req, response) {
  let answer;
  let params = [req.query.dia_id];
  let sql =
    "SELECT d.viaje_id, p.dia_id, p.nombre, p.foto, p.corLong, p.corLat FROM nomads.dias as d join puntos_de_interes as p on (d.dia_id = p.dia_id) where d.dia_id = ?;";
  connection.query(sql, params, (err, res) => {
    if (err) {
      answer = { error: true, codigo: 200, mensaje: err, data_viaje: [null] };
    } else {
      answer = { error: false, codigo: 200, mensaje: err, data_dia: res };
    }
    response.send(answer);
  });
}

// "SELECT * FROM nomads.viajes as v join dias as d on (v.viaje_id = d.viaje_id) join puntos_de_interes as p on (d.dia_id = p.dia_id) where v.viaje_id = 1;"

function getTopViajes(request, response) {
  let respuesta;
  let sql = `SELECT viajes.titulo, viajes.descripcion, viajes.foto,user_id_propietario as user_id, viajes.ubicacion, user.photo AS user_foto, viajes.viaje_id, viajes.n_likes AS likes FROM viajes
        JOIN user ON (user.user_id = viajes.user_id_propietario) 
        GROUP BY viajes.viaje_id
        ORDER BY n_likes DESC LIMIT 3`;

  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      respuesta = {
        error: true,
        codigo: 200,
        mensaje: "No encontrado",
        data: null,
        userdata: null,
      };
    } else {
      console.log(result);
      respuesta = result;
    }
    response.send(respuesta);
  });
}

function getTopViajesLog(request, response) {
  let respuesta;
  let sql = `SELECT viajes.titulo, viajes.descripcion, viajes.foto, user.photo AS user_foto, user.user_id, viajes.viaje_id, viajes.n_likes AS likes 
    FROM viajes  
    JOIN user ON (user.user_id = viajes.user_id_propietario)
    GROUP BY viajes.viaje_id 
    ORDER BY n_likes DESC 
    LIMIT 4`;

  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      respuesta = {
        error: true,
        codigo: 200,
        mensaje: "No encontrado",
        data: null,
        userdata: null,
      };
    } else {
      console.log(result);
      respuesta = result;
    }
    response.send(respuesta);
  });
}

function postViaje(req, response) {
  // n_dias falta
  let corLong;
  let corLat;
  const url = `https://photon.komoot.io/api/?q=${req.body.nombre}`;
  let params = {
    protocol: "https:",
    headers: { "Content-type": "application/json; charset = UTF-8" },
    method: "GET",
  };

  fetch(url, params)
    .then(function (data) {
      return data.json();
    })
    .then(function (result) {
      corLat = result.features[0].geometry.coordinates[0];
      corLong = result.features[0].geometry.coordinates[1];
      console.log(corLat);
      console.log(corLong);
      let sql =
        "INSERT INTO nomads.viajes (titulo, descripcion, ubicacion, foto, user_id_propietario, n_dias_viaje, n_likes, corLong, corLat)" +
        "VALUES ('" +
        req.body.titulo +
        "', '" +
        req.body.descripcion +
        "', '" +
        req.body.ubicacion +
        "', '" +
        req.body.foto +
        "', '" +
        req.body.user_id_propietario +
        "', '" +
        req.body.n_dias_viaje +
        "', '" +
        0 +
        "', '" +
        corLong +
        "', '" +
        corLat +
        "');";

      let answer;
      console.log(req.body.user_id_propietario);
      connection.query(sql, (err, res) => {
        console.log("Post Viaje");
        console.log(sql);
        if (err) {
          answer = {
            error: true,
            codigo: 200,
            mensaje: "No encontrado",
            data: null,
            userdata: null,
          };
          console.log(err);
        } else {
          if (res.insertId) {
            answer = {
              error: false,
              codigo: 200,
              mensaje: String(res.insertId),
              data_viaje: null,
            };
          } else {
            answer = {
              error: true,
              code: 200,
              message: "-1",
              data_viaje: [null],
            };
          }
        }
        response.send(answer);
        console.log(answer);
      });
    });
}

// añadir día y punto interés

async function getCoordenadas(punto, insert_id, pIndex, len) {
  let corLong;
  let corLat;
  let answer;
  console.log(punto.nombre);
  const url = `https://photon.komoot.io/api/?q=${punto.nombre}`;
  let params = {
    protocol: "https:",
    headers: { "Content-type": "application/json; charset = UTF-8" },
    method: "GET",
  };

  let data = await fetch(url, params);
  let result = await data.json();

  console.log(result);
  corLat = result.features[0].geometry.coordinates[0];
  corLong = result.features[0].geometry.coordinates[1];
  console.log(corLat);
  console.log(corLong);
  let sql =
    "INSERT INTO nomads.puntos_de_interes (nombre, foto, dia_id, corLong, corLat) VALUES (?, ?, ?, ?, ?);";
  values = [punto.nombre, punto.foto, insert_id, corLong, corLat];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      answer = {
        error: true,
        codigo: 500,
        mensaje: "Error al añadir punto de interés a la base de datos",
      };
    } else {
      if (result.insertId) {
        console.log(insert_id);
      } else {
        answer = {
          error: true,
          codigo: 201,
          mensaje: "-1",
          data: { id: result.insertId },
        };
      }
    }
    console.log(answer);
  });
}

function postDia(req, res) {
  const sql = "INSERT INTO nomads.dias (nombre, viaje_id) VALUES (?, ?)";
  const values = [req.body.nombre, req.body.viaje_id];
  console.log(req.body);
  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: true0, codigo: 500, mensaje: "0", data: null });
    } else {
      let sqlD = "SELECT n_dias_viaje FROM nomads.viajes WHERE viaje_id = ?;";
      let paramsD = [req.body.viaje_id];
      const dia_id = result.insertId;
      connection.query(sqlD, paramsD, (err, res) => {
        if (err) {
          console.error(err);
          answer = {
            error: true,
            codigo: 500,
            mensaje: "Error al añadir punto de interés a la base de datos",
          };
        } else {
          let nDays = res[0];
          let sqlV =
            "UPDATE nomads.viajes SET n_dias_viaje = ? WHERE (viaje_id = ?);";
          let paramsV = [nDays + 1, req.body.viaje_id];
          connection.query(sqlV, paramsV, (err, res) => {
            if (err) {
              console.error(err);
              answer = {
                error: true,
                codigo: 500,
                mensaje: "Error al añadir punto de interés a la base de datos",
              };
            } else {
              req.body.puntosDeInteres.forEach((punto, index) => {
                getCoordenadas(
                  punto,
                  dia_id,
                  index,
                  req.body.puntosDeInteres.length
                ).then((result) => {
                  console.log(result);
                });
              });
            }
          });
        }
      });
    }
  });
}

function viajeID(req, response) {
  let sql =
    "SELECT * FROM nomads.viajes WHERE viaje_id = (SELECT MAX(viaje_id) FROM nomads.viajes)";
  connection.query(sql, (err, res) => {
    if (err) {
      console.log(err);
      respuesta = {
        error: true,
        codigo: 200,
        mensaje: "No encontrado",
        data_viaje: null,
      };
    } else {
      console.log(res);
      respuesta = {
        error: false,
        codigo: 200,
        mensaje: String(res[0].viaje_id),
        data_viaje: res,
      };
    }
    response.send(respuesta);
  });
}
//MODIFICAR VIAJE Y DIA

function modViaje(req, response) {
  let params = [
    req.body.titulo,
    req.body.descripcion,
    req.body.ubicacion,
    req.body.foto,
    req.body.n_dias_viaje,
    req.body.viaje_id,
  ];
  let sql =
    "UPDATE nomads.viajes SET titulo = COALESCE(?, titulo), descripcion = COALESCE(?, descripcion), ubicacion = COALESCE(?, ubicacion), foto = COALESCE(?, foto), n_dias_viaje = COALESCE(?, n_dias_viaje) WHERE (viaje_id = ?);";
  let answer;
  connection.query(sql, params, (err, res) => {
    console.log(res);
    if (err) {
      answer = {
        error: true,
        code: 200,
        message: "wrong db connection",
        data: res,
      };
      console.log(err);
    } else {
      if (res.affectedRows) {
        answer = {
          error: false,
          codigo: 200,
          mensaje: String(res.affectedRows),
          data_viaje: null,
        };
      } else {
        answer = { error: true, code: 200, message: "0", data_viaje: [null] };
      }
    }
    response.send(answer);
    // in front, succesful edit is when message === "1", and failed edit is message === "0"
  });
}

function modPI(req, response) {
  let answer;
  let corLong;
  let corLat;
  const url = `https://photon.komoot.io/api/?q=${req.body.nombre}`;
  let params = {
    protocol: "https:",
    headers: { "Content-type": "application/json; charset = UTF-8" },
    method: "GET",
  };

  fetch(url, params)
    .then(function (data) {
      return data.json();
    })
    .then(function (result) {
      corLat = result.features[0].geometry.coordinates[0];
      corLong = result.features[0].geometry.coordinates[1];
      console.log(corLat);
      console.log(corLong);
      let params = [req.body.nombre, req.body.foto, req.body.punto_interes_id];
      let sql = `UPDATE nomads.puntos_de_interes SET nombre = COALESCE(?, nombre), foto =COALESCE(?, foto), corLong = '${corLong}', corLat = '${corLat}' WHERE punto_interes_id = ?`;
      connection.query(sql, params, (err, result) => {
        if (err) {
          answer = {
            error: true,
            code: 200,
            message: "wrong db connection",
            data: res,
          };
          console.log(err);
        } else {
          if (result.affectedRows != 0) {
            answer = {
              error: false,
              code: 200,
              message: "Se ha editado",
              data: res,
            };
          }
        }
      });
    });
}

// VIAJES POR DESTINO Y DIAS----------------------------------------
function viajes(request, response) {
  let respuesta;
  let params = [request.query.ubicacion, request.query.ndiasViaje];
  let sql =
    "SELECT viaje_id, foto, titulo, viajes.descripcion, n_likes AS likes, ubicacion, user.photo AS user_foto FROM viajes " +
    "JOIN user ON (viajes.user_id_propietario = user.user_id) WHERE ubicacion = ? AND n_dias_viaje = ? ";
  console.log(sql);

  connection.query(sql, params, function (err, result) {
    if (err) {
      console.log(err);
      respuesta = {
        error: true,
        codigo: 200,
        mensaje: "No encontrado",
        data_viaje: null,
      };
    } else {
      console.log(result);
      respuesta = {
        error: false,
        codigo: 200,
        mensaje: "Encontrado",
        data_viaje: result,
      };
    }
    response.send(respuesta);
  });
}

function getTopNomads(request, response) {
  let respuesta;
  let sql = `SELECT user.photo, user.username, COUNT(viajes.n_likes) AS likes
    FROM viajes
    JOIN user ON user.user_id = viajes.user_id_propietario
    GROUP BY user.user_id, user.photo
    ORDER BY likes DESC
    LIMIT 4`;

  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      respuesta = {
        error: true,
        codigo: 200,
        mensaje: "No encontrado",
        data: null,
        userdata: null,
      };
    } else {
      console.log(result);
      respuesta = result;
    }
    response.send(respuesta);
  });
}

function addLike(req, response) {
  let respuesta;

  let insertSql = `INSERT INTO nomads.favoritos (user_id_fav, viaje_id_fav) VALUES (${req.body.user_id}, ${req.body.viaje_id})`;
  console.log("*********************************************************");
  console.log(insertSql);

  connection.query(insertSql, (err, res) => {
    if (err) {
      console.log(err);
      respuesta = {
        error: true,
        codigo: 200,
        mensaje: "Not liked",
        data: null,
        userdata: null,
      };
      response.send(respuesta);
    } else {
      let updateSql = `UPDATE nomads.viajes SET n_likes = n_likes + 1 WHERE viaje_id = ${req.body.viaje_id}`;
      console.log(updateSql);
      connection.query(updateSql, (err, res) => {
        if (err) {
          console.log(err);
          respuesta = {
            error: true,
            codigo: 200,
            mensaje: "Not liked",
            data: null,
            userdata: null,
          };
          response.send(respuesta);
        } else {
          respuesta = {
            error: false,
            codigo: 200,
            mensaje: "Liked",
            data: null,
            userdata: null,
          };
          console.log(respuesta);
          response.send(respuesta);
        }
      });
    }
  });
}

function removeLike(req, response) {
  let respuesta;

  let deleteSql = `DELETE FROM nomads.favoritos WHERE user_id_fav=${req.body.user_id} AND viaje_id_fav=${req.body.viaje_id}`;
  console.log(deleteSql);

    connection.query(deleteSql, (err, res) => {
        if (err) {
            console.log(err);
            respuesta = { error: true, codigo: 200, mensaje: 'Error removing like', data: null, userdata: null };
            response.send(respuesta)
        } else {
            let updateSql = `UPDATE nomads.viajes SET n_likes = n_likes - 1 WHERE viaje_id = ${req.body.viaje_id}`;
            console.log(updateSql);
            connection.query(updateSql, (err, res) => {
                if (err) {
                    console.log(err);
                    respuesta = {error: true, codigo: 200, mensaje: 'Error removing like',data: null, userdata: null }
                    response.send(respuesta)
                }
                else {
                    respuesta = {error: false, codigo: 200, mensaje: 'Like removed',data: null, userdata: null }
                    console.log(respuesta);
                    response.send(respuesta)
                }
            }) 
        }
      });
    }


function viajeNo(req, response) {
  let params = [req.body.viaje_id];
  console.log(req.body);
  let sql = "DELETE FROM `nomads`.`viajes` WHERE `viaje_id` = ?";
  let answer;
  connection.query(sql, params, (err, res) => {
    if (err) {
      console.log(err);
      answer = {
        error: true,
        codigo: 200,
        mensaje: "No encontrado",
        data: null,
        userdata: null,
      };
    } else {
      if (res.affectedRows === 1) {
        answer = {
          error: false,
          code: 200,
          message: String(res.affectedRows),
          data: res,
        };
      } else {
        answer = {
          error: true,
          codigo: 200,
          mensaje: "0",
          data: null,
          userdata: null,
        };
      }
    }
    response.send(answer);
  });
}

function diaNo(req, response) {
  let params = [req.body.dia_id];
  console.log(req.body);
  let sql = "DELETE FROM `nomads`.`dias` WHERE `dia_id` = ?";
  let answer;
  connection.query(sql, params, (err, res) => {
    if (err) {
      console.log(err);
      answer = {
        error: true,
        codigo: 200,
        mensaje: "No encontrado",
        data: null,
        userdata: null,
      };
    } else {
      if (res.affectedRows === 1) {
        answer = {
          error: false,
          code: 200,
          message: String(res.affectedRows),
          data: res,
        };
        response.send(answer)
        let sqlD = "SELECT n_dias_viaje FROM nomads.viajes WHERE viaje_id = ?;";
        let paramsD = [req.body.viaje_id];
        connection.query(sqlD, paramsD, (err, resp) => {
          if (err) {
            console.error(err);
            answer = {
              error: true,
              codigo: 500,
              mensaje: "Error al añadir punto de interés a la base de datos",
            };
          } else {
            console.log("Days number:");
            console.log(resp);
            let nDays = resp[0];
            let sqlV =
              "UPDATE nomads.viajes SET n_dias_viaje = ? WHERE (viaje_id = ?);";
            let paramsV = [nDays - 1, req.body.viaje_id];
            connection.query(sqlV, paramsV, (err, res) => {
              if (err) {
                console.error(err);
                answer = {
                  error: true,
                  codigo: 500,
                  mensaje: "Error al añadir punto de interés a la base de datos",
                };
              } else {
                console.log("Deleted biens");
              }
            });
          }
        });
      } else {
        answer = {
          error: true,
          codigo: 200,
          mensaje: "0",
          data: null,
          userdata: null,
        };
      }
    }
  });
}

module.exports = {
  getTopViajes,
  getStartViajes,
  getDiasOfViaje,
  getTopViajesLog,
  getTopNomads,
  getPIOfDay,
  viajes,
  postViaje,
  addLike,
  removeLike,
  postDia,
  viajeID,
  modViaje,
  modPI,
  viajeNo,
  diaNo,
};
