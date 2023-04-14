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





