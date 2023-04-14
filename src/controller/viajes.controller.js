const Viaje = require('../models/viaje');
const connection = require('../database');

function getStartViajes(req, res) {
    let answer = {error: false, codigo: 200, mensaje: 'Starting Point', data_viaje: null }

    res.send(answer)
}

function getDiasOfViaje(req, response) {
    let answer;
    let viaje_id = req.query.viaje_id;
    let params = [viaje_id]
    let sql = "SELECT v.viaje_id, v.titulo, v.ubicacion, v.foto, d.nombre, d.dia_id, u.photo FROM nomads.viajes as v join dias as d on (v.viaje_id = d.viaje_id) join user as u on (v.user_id_propietario = u.user_id) where v.viaje_id = ?;"
    console.log(req.query);
    connection.query(sql, params, (err, res) => {
        if (err) {
            answer = {error: true, codigo: 200, mensaje: err, data_viaje: [null]}
        }
        else {
            
            // create viaje
            let datos = res[0]
            let excursion = {
                        "titulo": datos.titulo,
                        "ubicacion": datos.ubicacion,
                        "foto": datos.foto,
                        "user_photo": datos.photo,
                        "days": []
            }

            // create days 

            res.forEach((viaje) => {
                excursion.days.push({dia_id: viaje.dia_id, "nombre": viaje.nombre, "puntosDeInteres": []})
            })
            console.log(excursion);

            answer = {error: false, codigo: 200, mensaje: "Viaje encontrado", data_viaje: [excursion]}

        }
        response.send(answer)
    })
}

function getPIOfDay(req, response) {
    let answer;
    let params = [req.query.dia_id]
    let sql = "SELECT p.nombre, p.foto, p.corLong, p.corLat FROM nomads.dias as d join puntos_de_interes as p on (d.dia_id = p.dia_id) where d.dia_id = ?;";
    connection.query(sql, params, (err,res) => {
        if (err) {
            answer = {error: true, codigo: 200, mensaje: err, data_viaje: [null]}
        }
        else {
            answer = {error: true, codigo: 200, mensaje: err, data_dia: res}
        }
        response.send(answer)
    })
}

// "SELECT * FROM nomads.viajes as v join dias as d on (v.viaje_id = d.viaje_id) join puntos_de_interes as p on (d.dia_id = p.dia_id) where v.viaje_id = 1;"

function getViajeDestino(request, response) {
    
    let sql;
    // if(request.query.ubicacion != null)
    sql = " SELECT * FROM viajes JOIN dias ON (viajes.viaje_id = dias.viaje_id WHERE ubicacion = 'Madrid"

function getTopViajes(request, response) {

    let respuesta;
    let sql= "SELECT viajes.titulo, viajes.descripcion, viajes.foto,user_id_propietario, COUNT(*) AS likes FROM favoritos JOIN viajes ON viajes.viaje_id = favoritos.viaje_id_fav GROUP BY viajes.viaje_id ORDER BY likes DESC LIMIT 3";

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
}

function getTopViajesLog(request, response) {

    let respuesta;
    let sql= "SELECT viajes.titulo, viajes.descripcion, viajes.foto, COUNT(*) AS likes FROM favoritos JOIN viajes ON viajes.viaje_id = favoritos.viaje_id_fav GROUP BY viajes.viaje_id ORDER BY likes DESC LIMIT 4";

    connection.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            respuesta = { error: true, codigo: 200, mensaje: 'No encontrado', data: null, userdata: null }
        } else {
            console.log(result);
            respuesta = result ;
        }
        response.send(respuesta)
    
    }
       
    )}
function postViaje(req, response) {
    let sql = "INSERT INTO nomads.viajes (titulo, descripcion, ubicacion, foto, user_id_propietario, n_dias_viaje, n_likes)" + "VALUES ('" 
                        + req.body.titulo + 
                "', '" + req.body.descripcion 
                +  "', '" + req.body.ubicacion 
                +  "', '" + req.body.foto 
                +  "', '" + req.body.user_id 
                +  "', '" + req.body.n_dias_viaje 
                +  "', '" + 0 + "');";
        
    let answer;
    connection.query(sql, (err, res) => {
        console.log(sql);
        if (err) {
            answer = { error: true, codigo: 200, mensaje: 'No encontrado', data: null, userdata: null }
        }
        else {
            if (res.insertId) {
                answer = { error: true, codigo: 200, mensaje: String(res.insertId), data_viaje: null }
            }
            else {
                answer = {error: true, code: 200, message: "-1", data_viaje:[null]}
            }
        }
        response.send(answer)
    })
}

function putViaje(req, response) {
    let params = [req.body.titulo,
                            req.body.descripcion,
                            req.body.ubicacion,
                            req.body.foto,
                            req.body.n_dias_viaje,
                            req.body.viaje_id]
    let sql = "UPDATE nomads.viajes SET titulo = COALESCE(?, titulo), descripcion = COALESCE(?, descripcion), ubicacion = COALESCE(?, ubicacion), foto = COALESCE(?, foto), n_dias_viaje = COALESCE(?, n_dias_viaje)' WHERE (viaje_id = ?);";
    let answer;
    connection.query(sql, params, (err, res) => {
        if (err) {
            answer =  {error: true, code: 200, message: "wrong db connection", data: res};
            console.log(err);
        }
        else {
            if (res.affectedRows) {
                answer = { error: true, codigo: 200, mensaje: String(res.affectedRows), data_viaje: null }
            }
            else {
                answer = {error: true, code: 200, message: "0", data_viaje:[null]}
            }
        }
        response.send(answer)
        // in front, succesful edit is when message === "1", and failed edit is message === "0"
    })
}

module.exports = {getStartViajes, getDiasOfViaje, getPIOfDay, getViajes, postViaje, putViaje}


// VIAJES POR DESTINO Y DIAS----------------------------------------
function viajes(request, response) {
    
    let respuesta;
    let params = [request.query.ubicacion, request.query.ndiasViaje]
    let sql = "SELECT foto, titulo, viajes.descripcion, n_likes, user.photo FROM viajes "  + 
              "JOIN user ON (viajes.user_id_propietario = user.user_id) WHERE ubicacion = ? AND n_dias_viaje = ? "
    console.log(sql);

    connection.query(sql,params, function(err, result){
        if(err){
            console.log(err);
            respuesta = { error: true, codigo: 200, mensaje: 'No encontrado', data_viaje: null }
        } else {
            console.log(result);
            respuesta = { error: false, codigo: 200, mensaje: 'Encontrado',  data_viaje: result }
        }
        response.send(respuesta)
    })
}

function getTopNomads(request, response) {

    let respuesta;
    let sql= "SELECT user.photo, user.username, COUNT(*) AS likes FROM favoritos JOIN viajes ON viajes.viaje_id = favoritos.viaje_id_fav JOIN user ON user.user_id = viajes.user_id_propietario GROUP BY user.user_id, user.photo ORDER BY likes DESC LIMIT 4";

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


module.exports = {getTopViajes, getStartViajes, getTopViajesLog, getTopNomads,  getDiasOfViaje, getPIOfDay, viajes}

