const Viaje = require('../models/viaje');
const connection = require('../database');

function getStartViajes(req, res) {
    let answer = {error: false, codigo: 200, mensaje: 'Starting Point', data_viaje: null }
}


function getViajeDestino(request, response)
{
    
    let sql;
    // if(request.query.ubicacion != null)
    sql = " SELECT * FROM viajes JOIN dias ON (viajes.viaje_id = dias.viaje_id WHERE ubicacion = 'Madrid"

    connection.query(sql,function(err, result){
 
        if(err){
            console.log(err);
       
        }
        else{
          
            console.log(result);
           
        }
               response.send(result)
       })
}



module.exports ={getViajeDestino, getStartViajes}




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

