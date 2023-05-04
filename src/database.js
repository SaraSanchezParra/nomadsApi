const mysql = require("mysql2");

const connection = mysql.createPool({
                host : process.env.DB_HOST || "nomads.caxuwrjvrlwf.eu-north-1.rds.amazonaws.com",
                user : process.env.DB_USER || "admin",
                password : process.env.DB_PASSWORD || "Nomads1!",
                database : process.env.DB_NAME || "nomads",
                port : process.env.DB_PORT || 3306,
                connectionLimit: 10
});

// connection.connect (function (error){
//     if (error){
//         console.log(error);
//     }
//     else{
//         console.log("Conexión correcta");
//     }
// });

module.exports = {connection};