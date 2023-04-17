
const connection = require("../database");


function getChatsAll(request,response){
  
  
  let sql = `SELECT photo,username, mensajes.hora FROM nomads.user
  JOIN nomads.chats ON(user.user_id=chats.user1)
  JOIN nomads.mensajes ON (chats.chat_id=mensajes.chat_id)
  ORDER BY mensajes.hora DESC`;

  connection.query(sql, function (err, result) {
    console.log("Estos son tus chats");
    if(err) {
      console.log(err);
    respuesta ={error:true, codigo:200, mensaje:'no se encuentran tus chats', data:result} 
    } 
   
    else {
      
      respuesta = {error:true, codigo:200, mensaje:'todos tus chats', data:result}
    }
    response.send(respuesta)
  });
}


function getChat(request,response){
  let username= request.query.username
  let sql;

  if(request.query.username){
    sql = `SELECT photo,username, mensajes.hora FROM nomads.user
    JOIN nomads.chats ON(user.user_id=chats.user1)
    JOIN nomads.mensajes ON (chats.chat_id=mensajes.chat_id)
    WHERE user.username = '${username}'` ;  
  
  }else{

    sql = `SELECT photo,username, mensajes.hora FROM nomads.user
  JOIN nomads.chats ON(user.user_id=chats.user1)
  JOIN nomads.mensajes ON (chats.chat_id=mensajes.chat_id)
  ORDER BY mensajes.hora DESC`;

  }

  connection.query(sql,(err,res)=>{
    if(err){
      console.log(err);
      respuesta = {error:false, codigo:200, mensaje:'usuario no tiene chats', data:res}
    } else {
      if(res.length > 0){
        respuesta = {error:false, codigo:200, mensaje:'chats encontrados', data:res}
      } else {
        console.log('Los datos proporcionados no coinciden con ningún usuario en la base de datos.')
        respuesta = {error:true, codigo:200, mensaje:'No encontrado', data:res}
      }
      console.log(respuesta);
    }
    response.send(respuesta)
  })

}


// function deleteChat(request, response)
// {
//   let params=[request.body.username];
//   let sql = `DELETE FROM chats WHERE username = ?`;
//   connection.query(sql,params,(err,resp)=>
//     {
//     if(err){
//       console.log(err);
//       respuesta = {error:true, codigo:200, mensaje:'chat no eliminado', data:resp}
//     } else {
//       if(resp.length > 0){
//         respuesta = {error:false, codigo:200, mensaje:'chat eliminado', data:resp}
//       } else {
//         console.log('el chat proporcionado ha sido eliminado.')
//         respuesta = {error:true, codigo:200, mensaje:'chat eliminado', data:resp}
//       }
//       console.log(respuesta);
//     }
//     response.send(respuesta)
//   })

// };

module.exports={getChatsAll,getChat}
