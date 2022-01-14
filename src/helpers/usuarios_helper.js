const config = require('../config.json');
const axios = require('axios');

module.exports = {
    agregaUsuario: async (values) => {
        try {
            console.log(values);
            const token = JSON.parse(localStorage.getItem('usuarioLogged')).token;
            console.log(token);
            const bodyParameters = {
                nombre: values.nombre,
                primerapellido: values.primerapellido,
                segundoapellido: values.segundoapellido,
                email: values.email,
                telefono: values.telefono,
                password: values.password,
                confirmedPassword: values.passwordConfirmation,
                usuario: values.usuario,
                admin: values.admin? 1: 0
            };
            const authorization = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            console.log(bodyParameters)
            const a = await axios.post(config.URL_API + 'usuarios/', bodyParameters, authorization);
            console.log(a.data)
            return a.data

        } catch (error) {
            console.log(error.message);
            return false;
        }

    }
}