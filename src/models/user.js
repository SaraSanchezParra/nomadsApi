class User {
constructor(user_id,name, surname, email, username, descripcion, photo, favs, misViajes) {
    this.user_id=user_id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.username = username;
    this.descripcion = descripcion;
    this.photo = photo;
    this.favs = favs;
    this.misViajes = misViajes;
    
  }
}
module.exports={User}
