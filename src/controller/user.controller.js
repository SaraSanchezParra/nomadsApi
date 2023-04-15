const connection = require("../database");


function userFound(request, response) {
    
    let respuesta;
    let params = [request.query.username]
    let sql = "SELECT username, name, surname, email, descripcion, photo FROM nomads.user WHERE username = ?"
    console.log(sql);

    connection.query(sql,params, function(err, result){
        if(err){
            console.log(err);
            respuesta = { error: true, codigo: 200, mensaje: 'No se ha encontrado el usuario', data_user: null }
        } else {
            console.log(result);
            respuesta = { error: false, codigo: 200, mensaje: 'Usuario encontrado',  data_user: result }
        }
        response.send(respuesta)
    })
}


module.exports = {userFound}