import nodemailer from 'nodemailer'

const emailOlvidePassword = async(datos) =>{
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT ,
        auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
        }
    });

    const { email, nombre, token } = datos;

    //Enviar email
    const info = await transporter.sendMail({
        from: 'APV - administrador de pacientes de veterinaria',
        to: email,
        subject: 'Reestablece tu password',
        text: "restablece tu password",
        html: `<p>Hola ${nombre}, has solicitado reestablecer tu contraseña. </p>
            <p> Sigue el siguiente enlace para generar un nuevo password:
            <a href="${process.env.FRONTEND_URL}/OlvidePassword/${token}">Reestablecer password</a></p>  
            <p>Si tu no creaste esta cuenta ignora el mensaje</p>
        `
    });

    console.log('Mensaje enviado: %s', info.messageId);

}

export default emailOlvidePassword