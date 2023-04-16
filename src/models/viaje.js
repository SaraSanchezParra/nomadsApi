class Viaje {

    constructor(viaje_id, titulo, descripcion, ubicacion, foto, days, user_foto, likes) {
        this.viaje_id = viaje_id
        this.titulo = titulo
        this.descripcion = descripcion
        this.ubicacion  = ubicacion
        this.foto = foto
        this.days = days
        this.user_foto = user_foto
        this.likes = likes
    }
}

module.exports = Viaje