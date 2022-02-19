const config = require('../config.json')
const axios = require('axios')

const verifyLogged = async () => {
  try {
    if (localStorage.getItem('usuarioLogged') != null) {
      const token = JSON.parse(localStorage.getItem('usuarioLogged')).token
      if (token) {
        const a = await axios.post(config.URL_API + 'usuarios/islogged/', { token: token })
        console.log(a.data.status)
        return a.data.status
      } else {
        return false
      }
    } else {
      return false
    };
  } catch (error) {
    console.log(error.message)
    return false
  }
}

export { verifyLogged }
