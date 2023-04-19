class Viaje {

    constructor(viaje_id, titulo, descripcion, ubicacion, foto, days, user_foto, likes, user_id, corLat, corLong) {
        this.viaje_id = viaje_id
        this.titulo = titulo
        this.foto = foto
        this.ubicacion  = ubicacion
        this.descripcion = descripcion
        this.days = days
        this.likes = likes
        this.user_id = user_id
        this.user_foto = user_foto
        this.corLat = corLat
        this.corLong = corLong
    }
}

module.exports = Viaje