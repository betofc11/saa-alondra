const config = require('../config.json')
const axios = require('axios')

const sendEmail = async (values) => {
  try {
    if (localStorage.getItem('usuarioLogged') != null) {
      const { token, nombre, primerapellido, segundoapellido } = JSON.parse(localStorage.getItem('usuarioLogged'))
      if (token) {
        const bodyParameters = {
          sender: nombre + ' ' + primerapellido + ' ' + segundoapellido,
          to: values.to,
          message: values.message,
          subject: values.subject
        }
        const authorization = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
        const a = await axios.post(
          config.URL_API + 'email/',
          bodyParameters,
          authorization
        )
        console.log(a)
        return a
      } else {
        return false
      }
    } else {
      return false
    }
  } catch (error) {
    console.log(error.message)
    return false
  }
}

export { sendEmail }
