const connection = require("../database");

function getViajes(request, response) {

    let respuesta;
    let sql= "SELECT viajes.titulo, viajes.descripcion, viajes.foto, COUNT(*) AS likes FROM favoritos JOIN viajes ON viajes.viaje_id = favoritos.viaje_id GROUP BY viajes.viaje_id ORDER BY likes DESC LIMIT 3";

    connection.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            respuesta = { error: true, codigo: 200, mensaje: 'No encontrado', data: null, userdata: null }
        } else {
            console.log(result);
            respuesta = result ;
        }
        response.send(respuesta)
    })
}


module.exports = {getViajes}

