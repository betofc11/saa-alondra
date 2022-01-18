const axios = require("axios");
const config = require('../config.json');



const getRegions = async () => {
    try {
        const regions = await axios.get(config.URL_API + "regiones");
        return JSON.stringify(regions.data);
    } catch (e) {
        console.log(e.message)
    }
}
const getRegionById = async (id) => {
    try {
        const region = await axios.get(config.URL_API + `regiones/${id}`);
        const vecinos = await axios.get(config.URL_API + `vecinos/getByRegion/${id}`);
        region.data.vecinos = vecinos.data;
        console.log(region.data)
        return JSON.stringify(region.data)
    } catch (e) {
        console.log(e.message)
    }
}

export { getRegions, getRegionById }



