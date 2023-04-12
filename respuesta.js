export class Respuesta {
    constructor(
      error,
      codigo,
      mensaje,
      data_viaje,
      data_user,
      data_chat,
      chatPrivado
    ) {
      this.error = error
      this.codigo = codigo
      this.mensaje = mensaje
      this.data_viaje = data_viaje
      this.data_user = data_user
      this.data_chat = data_chat
      this.chatPrivado = chatPrivado
    }
  }
  