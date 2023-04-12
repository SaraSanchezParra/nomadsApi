const connection = require("../database");

function getViajes(request, response) {

    let respuesta;
    let sql= "SELECT viaje_id, COUNT(*) AS likes FROM favoritos GROUP BY viaje_id ORDER BY likes DESC LIMIT 3";

    connection.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            respuesta = { error: true, codigo: 200, mensaje: 'No encontrado', data: null, userdata: null }
        } else {
            console.log(result);
            respuesta = { result }
        }
        response.send(respuesta)
    })
}


module.exports = {getViajes}