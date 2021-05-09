const nodemailer = require("nodemailer");
require('dotenv').config();

async function enviarCorreo(req, res){
    
    let datos = req.body;
    const {nombre, apellido, telefono, correo, mensaje} = datos.datos;
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user: process.env.USERNAME,
            pass: process.env.PASSWORD
        }
    });

    /*
    user: process.env.CORREO,
            pass: process.env.CONTRASENA
    */

    const htmlMensaje = `
        <h1>Datos cliente servicio</h1>

        <p style="color:red">
             Solicitud de servicio por: <span>${nombre} ${apellido}</span>
        </p>

        <table style="text-align: center">
            <tr>
                <th style="padding:10px">Nombre</th>
                <th style="padding:10px">Telefono</th>
                <th style="padding:10px">Correo</th>
                <th style="padding:10px">Problema</th>
            </tr>
            <tr>
                <td style="padding:10px">${nombre} ${apellido}</td>
                <td style="padding:10px">${telefono}</td>
                <td style="padding:10px">${correo}</td>
                <td style="padding:10px">${mensaje}</td>
            </tr>
        </table>

        <p>Solicitud generada desde la pagina web.</p>
        <p>Spyder PC & MAC.</p>
    `;

    let message = {
        from: "Spyder Pc",
        to: "pcspyder86@gmail.com",
        subject: "Spyder PC Reparaciones",
        text: `Hola`,
        html: htmlMensaje
    };

   transporter.sendMail(message, (err, info) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json(info);
   });
}

module.exports = enviarCorreo;

/*host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "ricky.vandervort47@ethereal.email", // generated ethereal user
            pass: "sB2CWZ7kefQjV4Zjyk", // generated ethereal password
        }, 
        
        
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "ricky.vandervort47@ethereal.email", // generated ethereal user
            pass: "sB2CWZ7kefQjV4Zjyk", // generated ethereal password
        },
        tls:{
            rejectUnauthorized: false
        }
        
        
        */