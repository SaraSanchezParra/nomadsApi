const nodemailer = require('nodemailer');

const postEmail =  (req, res) => {
    const { nombre, email, asunto, mensaje } = req.body;

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: 'proyecto.nomads@gmail.com',
            pass: 'nxmrwtznjvzsmauu'
        }
    });

    const mailOptions = {
        from: email,
        to: 'proyecto.nomads@gmail.com',
        subject: asunto,
        html: `
      <p>De: ${nombre}</p>
      <p>Correo: ${email}</p>
      <p>Mensaje: ${mensaje}</p>
    `
    };

    transporter.sendMail(mailOptions)
    .then((info) =>
    {
        console.log(info)
        res.send({ error: false, code: 200, message: "Correo electrónico enviado con éxito" })
    })
    .catch((error) => 
    {
        console.log(error)
        res.send({ error: true, code: 500, message: "Error al enviar el correo electrónico" })
    })
};

module.exports = { postEmail };
