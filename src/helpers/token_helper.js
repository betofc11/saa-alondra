const { Navigate } = require('react-router-dom');
const config = require('../config.json');
const axios = require('axios');

module.exports = {
    verifyLogged: async () => {
        try {
            const token = JSON.parse(localStorage.getItem('usuarioLogged')).token;
            if (!!token) {
                const a = await axios.post(config.URL_API + 'usuarios/islogged/', { token: token })
                return a.data.status
            } else {
                return false;
            }

        } catch (error) {
            console.log(error.message)
        }

    }
}