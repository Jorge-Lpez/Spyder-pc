const nodemailer = require("nodemailer");

async function enviarCorreo(req, res){
    
    let datos = req.body;
    const {nombre, apellido, telefono, correo, mensaje} = datos.datos;
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user: process.env.CORREO,
            pass: process.env.CONTRASENA
        }
    });

    /*
    user: process.env.CORREO,
            pass: process.env.CONTRASENA
    */

    const htmlMensaje = `
        <h1>Datos cliente servicio</h1>

        <p style="padding: 10px 0;">
            Solicitud de servicio por: <span>${nombre} ${apellido}</span>
        </p>

        <table style="border: 1px solid black;
                    border-collapse: collapse;
                    margin: 20px 0;">
            <tr>
                <th style="padding: 10px;
                    border: 1px solid black;">Nombre</th>
                <th style="padding: 10px;
                    border: 1px solid black;">Telefono</th>
                <th style="padding: 10px;
                    border: 1px solid black;">Correo</th>
                <th style="padding: 10px;
                    border: 1px solid black;">Problema</th>
            </tr>
            <tr>
                <td style="padding: 10px;
                    border: 1px solid black;">${nombre} ${apellido}</td>
                <td style="padding: 10px;
                    border: 1px solid black;">${telefono}</td>
                <td style="padding: 10px;
                    border: 1px solid black;">${correo}</td>
                <td style="padding: 10px;
                    border: 1px solid black;">${mensaje}</td>
            </tr>
        </table>

        <p style="padding: 2px 0;">Solicitud generada desde la pagina web.</p>
        <p style="padding: 2px 0;">Spyder PC & MAC.</p>
        <a style="text-decoration: none; padding: 2px 0; display: block; color: blue; width: 100px;" href="https://zen-swanson-e300d5.netlify.app/">Sitio Web</a>
        <p style="padding: 2px 0;">Correo: pcspyder86@gmail.com</p>
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