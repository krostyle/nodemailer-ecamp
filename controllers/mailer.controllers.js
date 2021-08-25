const nodemailer = require('nodemailer');

const send = async(to, subject, text) => {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'nodemailerADL@gmail.com',
                pass: 'desafiolatam'
            }
        });

        const mailOptions = {
            from: 'nodemailerADL@gmail.com',
            to,
            subject,
            text
        };

        const info = transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(`Error en el envío de correo, error : ${error}`);
                resolve(false);
            } else {
                console.log('Correo enviado correctamente : ' + info.response);
                resolve(true);
            }
        });
    })


}

module.exports = {
    send
}