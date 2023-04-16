const nodemailer = require('nodemailer');

const postEmail = async (req, res) => {
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

    try {

        const info = await transporter.sendMail(mailOptions);
        console.log(info);

        res.status(200).send('Correo electrónico enviado con éxito');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error al enviar el correo electrónico');
    }
};

module.exports = { postEmail };
