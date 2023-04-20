
const connection = require("../database");


// en mensajes controller hacer función getMessages: chat_id
// me devuelve los mensajes asociados a ese chat


function getMessages(request,response)
{
  let params=[request.query.chat_id]
  let sql =`SELECT emisor,mensaje_body FROM nomads.mensajes WHERE chat_id=?`
  connection.query(sql,params,(err,resp)=>
    {
    if(err){
      console.log(err);
      respuesta = {error:true, codigo:200, mensaje:'no hay mensajes', data:resp}
    } else {
        respuesta = {error:false, codigo:200, mensaje:'mensajes', data:resp}
    } 
    response.send(respuesta)
  })
}

function postMessages(request,response)
{
  let params=[request.body.emisor,request.body.mensaje_body,request.body.chat_id]
  let sql = `INSERT INTO nomads.mensajes (emisor, mensaje_body, chat_id) VALUES (?, ?, ?)`
  connection.query(sql,params,(err,resp)=>
    {
    if(err){
      console.log(err);
      respuesta = {error:true, codigo:200, mensaje:'mensaje no insertado', data:resp}
    } else {
        respuesta = {error:false, codigo:200, mensaje:'mensaje insertado', data:resp}
    } 
    response.send(respuesta)
  })

}






module.exports={getMessages,postMessages}