const config = require('../config.json')
const axios = require('axios')

const getBool = (val) => { return val ? 1 : 0 }

const agregaVecino = async (values) => {
  try {
    const token = JSON.parse(localStorage.getItem('usuarioLogged')).token
    const bodyParameters = {
      nombre: values.nombre,
      primerapellido: values.primerapellido,
      segundoapellido: values.segundoapellido,
      email: values.email,
      telefono: values.telefono,
      cedula: values.cedula,
      idcasa: values.idcasa,
      trabaja: getBool(values.trabaja),
      fallecido: getBool(values.fallecido),
      fechanac: values.fechanac
    }
    console.log(bodyParameters)
    const authorization = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    console.log(bodyParameters)
    const a = await axios.post(config.URL_API + 'vecinos/agregaVecino', bodyParameters, authorization)
    console.log(a.data)
    return a.data
  } catch (error) {
    console.log(error.message)
    return false
  }
}

export { agregaVecino }
