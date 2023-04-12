const mysql = require("mysql2");

const connection = mysql.createConnection({
                host : "localhost",
                user : "admin",
                password : "Nomads1!",
                database : "Nomads"
});

connection.connect (function (error){
    if (error){
        console.log(error);
    }
    else{
        console.log("Conexión correcta");
    }
});

module.exports = connection;