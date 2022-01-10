const axios = require("axios");
const config = require('../config.json');

module.exports = {
    getRegions: async () =>{
        try {
            const regions = await axios.get(config.URL_API + "regiones");
            return JSON.stringify(regions.data);
        }catch (e) {
            console.log(e.message)
        }
    }
}



