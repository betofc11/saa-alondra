const axios = require('axios')
const config = require('../config.json')

const getRegions = async () => {
  try {
    const regions = await axios.get(config.URL_API + 'regiones')
    const vecinos = await axios.get(config.URL_API + 'vecinos')
    regions.data.vecinos = vecinos.data
    return JSON.stringify(regions.data)
  } catch (e) {
    console.log(e.message)
  }
}
const getRegionById = async (id) => {
  try {
    const region = await axios.get(config.URL_API + `regiones/${id}`)
    const vecinos = await axios.get(config.URL_API + `vecinos/getByRegion/${id}`)
    region.data.vecinos = vecinos.data
    console.log(region.data)
    return JSON.stringify(region.data)
  } catch (e) {
    console.log(e.message)
  }
}

const getRegVec = async () => {
  try {
    const region = {
      idregion: 0,
      nombre: 'Todos',
      casa: [],
      vecinos: []
    }
    const vecinos = await axios.get(config.URL_API + 'vecinos')
    region.vecinos = vecinos.data
    console.log(region)
    return JSON.stringify(region)
  } catch (e) {
    console.error(e)
  }
}

export { getRegions, getRegionById, getRegVec }
