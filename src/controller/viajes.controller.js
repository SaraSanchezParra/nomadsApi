const Viaje = require('../models/viaje');
const connection = require('../database');

function getStartViajes(req, res) {
    let answer = {error: false, codigo: 200, mensaje: 'Starting Point', data_viaje: null }

    res.send(answer)
}

function getDiasOfViaje(req, response) {
    let answer;
    // let viaje_id = req.query.viaje_id;
    // let params = [viaje_id]
    let sql = "SELECT * FROM nomads.viajes as v join dias as d on (v.viaje_id = d.viaje_id) where v.viaje_id = 1;"
    console.log(req.query);
    connection.query(sql, (err, res) => {
        if (err) {
            answer = {error: true, codigo: 200, mensaje: err, data_viaje: [null]}
        }
        else {
            
            // create viaje
            let datos = res[0]
            let excursion = {
                        "viaje_id": datos.viaje_id,
                        "titulo": datos.titulo,
                        "descripcion": datos.descripcion,
                        "ubicacion": datos.ubicacion,
                        "foto": datos.foto,
                        "user_id": datos.user_id_propietario,
                        "days": []
            }

            // create days 

            res.forEach((viaje) => {
                excursion.days.push({dia_id: viaje.dia_id, "nombre": viaje.nombre, "puntosDeInteres": []})
            })
            console.log(excursion);

            answer = {error: false, codigo: 200, mensaje: "Viaje encontrado", data_viaje: []}

        }
        response.send(answer)
    })
}

function getPIOfDay(req, response) {
    let answer;
    let params = [req.query.dia_id]
    let sql = "SELECT p.nombre, p.foto, p.coordinates FROM nomads.dias as d join puntos_de_interes as p on (d.dia_id = p.dia_id) where d.dia_id = ?;";
    connection.query(sql, params, (err,res) => {
        if (err) {
            answer = {error: true, codigo: 200, mensaje: err, data_viaje: [null]}
        }
        else {
            console.log(res);
        }
    })
}

module.exports = {getStartViajes, getDiasOfViaje, getPIOfDay}


// "SELECT * FROM nomads.viajes as v join dias as d on (v.viaje_id = d.viaje_id) join puntos_de_interes as p on (d.dia_id = p.dia_id) where v.viaje_id = 1;"
=======
}


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


module.exports = {getViajes, getStartViajes}

