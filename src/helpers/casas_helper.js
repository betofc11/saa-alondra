const config = require('../config.json')
const axios = require('axios')

const getCasasByRegion = async () => {
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
const getRegions = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('usuarioLogged')).token
    const authorization = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const a = await axios.get(config.URL_API + 'regiones', {}, authorization)
    console.log(a.data)
    return a.data
  } catch (e) {

  }
}

export { getRegions, getCasasByRegion }
