//TRUCAZO
const { response, request } = require('express')
const fs = require('fs')
const axios = require('axios')
const { send } = require('./mailer.controllers')
const url = 'https://mindicador.cl/api'
const mailPath = './mails/correos.json'
const uuid = require('uuid')


const getIndicador = async() => {
    const response = await axios.get(url)
    const { dolar, euro, uf, utm } = response.data
    return { dolar, euro, uf, utm }
}

const getMail = async(req = request, res = response) => {
    const { correos, asunto, contenido } = req.query
    const contenidoPlano = contenido.replace(/(<([^>]+)>)/ig, '')
    if (correos !== '' && asunto !== '' && contenido !== '' && correos.includes(',')) {
        const data = await getIndicador()
        const mensaje = `${contenidoPlano}\n
        El valor del dolar el día de hoy es : ${data.dolar.valor}\n
        El valor del euro el día de hoy es : ${data.euro.valor}\n
        El valor del uf el día de hoy es : ${data.uf.valor}\n
        El valor del utm el día de hoy es : ${data.utm.valor}\n`
        const resMail = await send(correos.split(','), asunto, mensaje)
        if (resMail) {
            const payload = {
                id: uuid.v4(),
                correos: correos.split(','),
                asunto,
                contenido: mensaje
            }
            fs.writeFileSync(mailPath, JSON.stringify(payload))
            res.status(200).json({
                ok: true,
                mensaje: 'Correos enviados Correctamente'
            });
        }
    } else {
        res.json({
            msg: 'Faltan campos por llenar correctamente'
        })
    }

}


module.exports = {
    getMail,
}