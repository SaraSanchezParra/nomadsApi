const Viaje = require('../models/viaje');
const connection = require('../database');

function getStartViajes(req, res) {
    let answer = {error: false, codigo: 200, mensaje: 'Starting Point', data_viaje: null }
}

// MOSTRAR TOP  3 VIAJES -----------------------------------------
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

// VIAJES POR DESTINO Y DIAS----------------------------------------
function viajes(request, response) {
    
    let respuesta;
    let params = [request.query.ubicacion, request.query.ndiasViaje]
    let sql = `SELECT foto, titulo, descripcion, n_likes, user.photo FROM viajes WHERE ubicacion = ? AND n_dias_viaje = ?` +
              `JOIN user ON(viajes.user_id_propietario = user.user_id)`
    console.log(sql);

    connection.query(sql,params, function(err, result){
        if(err){
            console.log(err);
            respuesta = { error: true, codigo: 200, mensaje: 'No encontrado', data: null, data_viaje: null }
        } else {
            console.log(result);
            respuesta = { error: true, codigo: 200, mensaje: 'No encontrado', data: null, data_viaje: result }
        }
        response.send(respuesta)
    })
}

module.exports = {viajes, getViajes}

