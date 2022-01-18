const axios = require("axios");
const config = require('../config.json');



module.exports.getRegions = async () => {
    try {
        const regions = await axios.get(config.URL_API + "regiones");
        return JSON.stringify(regions.data);
    } catch (e) {
        console.log(e.message)
    }
}
module.exports.getRegionById = async (id) => {
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





