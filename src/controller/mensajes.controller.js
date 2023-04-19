
const connection = require("../database");


// en mensajes controller hacer función getMessages: chat_id
// me devuelve los mensajes asociados a ese chat


function getMessages(request,response)
{
  let params=[request.query.chat_id]
  console.log(request.query);
  let sql =`SELECT emisor,mensaje_body FROM nomads.mensajes WHERE chat_id=?`
  console.log(params);
  connection.query(sql,params,(err,resp)=>
    {
    if(err){
      console.log(err);
      respuesta = {error:true, codigo:200, mensaje:'no hay mensajes', data:resp}
    } else {
        respuesta = {error:false, codigo:200, mensaje:'mensajes', data:resp}
        
    } 
    console.log(respuesta)
    response.send(respuesta)
  })
}

function postMessages(request,response)
{
  let params=[request.body.mensaje_body]
  let sql = `INSERT INTO nomads.mensaje ()`
}


module.exports={getMessages}