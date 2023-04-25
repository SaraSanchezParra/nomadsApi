
const connection = require("src/database");

function getChats(request,response){
  
  let params = [request.query.user_id];

  let sql = `SELECT photo, username, hora, chats.user_id_participante AS user_id, chats.chat_id FROM nomads.user
    JOIN nomads.chats ON(user.user_id=chats.user_id_participante)
    WHERE user_id_creador=? 
    ORDER BY chats.hora DESC`;
  

  connection.query(sql,params, function (errCreador, resultCreador) {
    console.log("Estos son tus chats");
    if(errCreador) {
      console.log(errCreador);
    respuesta ={error:true, codigo:200, mensaje:'no se encuentran tus chats', data:resultCreador} 
    } 
   
    else {

    sql = `SELECT photo, username, hora, chats.user_id_creador AS user_id , chats.chat_id FROM nomads.user
           JOIN nomads.chats ON(user.user_id=chats.user_id_creador)
           WHERE user_id_participante=? 
           ORDER BY chats.hora DESC`;

    connection.query(sql,params, function (errParticipante, resultParticipante) {
      console.log("Estos son tus chats");
      if(errParticipante) {
        console.log(resultParticipante);
      respuesta ={error:true, codigo:200, mensaje:'no se encuentran tus chats', data:result} 
      } 
      else{
  
      respuesta = {error:false, codigo:200, mensaje:'todos tus chats', data:[...resultCreador, ...resultParticipante]}
    }
    response.send(respuesta)
    })}
  });
}

// función getChat con : user_id1 y user_id2
// Comprobar si en la tabla de chat existe un chat con estos id de usuario
// debe devolver el chat_id

function getChat(request,response){
  let params = [request.query.user_id1,
                request.query.user_id2,
                request.query.user_id1, 
                request.query.user_id2];
    
  let sql=`SELECT * FROM chats
           WHERE (chats.user_id_creador=? AND chats.user_id_participante=?) 
           OR (chats.user_id_participante=? AND chats.user_id_creador=?)`;
  
  console.log(request.query);

  connection.query(sql,params,(err,resp)=>
    {
    if(err){
      console.log(err);
      respuesta = {error:true, codigo:200, mensaje:'el chat no existe', data:resp}
    } else {
        console.log(resp);
        respuesta = {error:false, codigo:200, mensaje:'chat encontrado', data:resp}
    } 
    console.log(respuesta);
    response.send(respuesta)
  })
}

// función postChat: user_id_creador y user_id_participante.

function postChat(request,response)
{
  let params=[request.body.user_id_creador,request.body.user_id_participante,request.body.hora]
  let sql=`INSERT INTO nomads.chats (user_id_creador, user_id_participante, hora)
  VALUES (?,?,?)`
  console.log(request.body.hora)
  console.log(sql);
  connection.query(sql,params,(err,res)=>{
    if(err){
      console.log(err);
      respuesta = {error:true, codigo:200, mensaje:'chat no añadido', data:res}
    } else {
      if(res.length > 0){
        respuesta = {error:false, codigo:200, mensaje:'chat añadido', data:res}
      } else {
        console.log('Los datos proporcionados han sido añadidos.')
        respuesta = {error:false, codigo:200, mensaje:'Los datos proporcionados han sido añadidos.', data:res}
      }
      console.log(respuesta);
    }
    response.send(respuesta)
  })
}




function deleteChat(request, response)
{
  let params=[request.body.chat_id];
  let sql = `DELETE chats FROM chats WHERE chat_id = ?`;
  connection.query(sql,params,(err,resp)=>
    {
    if(err){
      console.log(err);
      respuesta = {error:true, codigo:200, mensaje:'chat no eliminado', data:resp}
    } else {
        respuesta = {error:false, codigo:200, mensaje:'chat eliminado', data:resp}
    } 
    response.send(respuesta)
  })

};

module.exports={getChats,deleteChat,getChat,postChat}
