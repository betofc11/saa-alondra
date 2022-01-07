import React, { Component } from "react";
import './Login.css';
import { Navigate } from 'react-router-dom';
import {verifyLogged} from "../../helpers/token_helper";
const config = require('../../config.json');
const axios = require('axios');

class Login extends Component {

    state = {
        username: '',
        password: '',
        islogged: false
    }
    submitHandler = (event) => {
        event.preventDefault();
        const user = event.target.user.value.trim();
        const pass = event.target.pass.value.trim();
        this.setState({ username: user, password: pass });
        axios.post(config.URL_API + 'usuarios/login', {
            usuario: user,
            password: pass
        }).then(res => {
            console.log('IsLoogedIn:', !!res.data)
            localStorage.setItem('usuarioLogged', JSON.stringify(res.data));
            this.setState({islogged: true});
        }).catch(err => {
            console.log(err);
        })
    }
    async checkLoginStatus() {
        const isl = await verifyLogged();
        isl ? this.setState({islogged: true}) : this.setState({islogged: false})
    }
    componentDidMount() {
        this.checkLoginStatus();
    }
    render() {
        return !this.state.islogged ? (
            <div className="container h-100">
                <div>
                    <h1 className="title">SAA Alondra</h1>
                </div>
                <div className="card">
                    <form onSubmit={this.submitHandler}>
                        <h2 className="card-header">Iniciar sesion</h2>
                        <div className="card-body">
                            <div className="">
                                <input type="text" name="user" className="form-control" placeholder="Usuario" />
                                <input type="password" name="pass" className="form-control" placeholder="Contraseña" autocomplete="on"/>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-success"> INICIAR SESION</button>
                        </div>
                    </form>
                </div>
            </div>
        ) : <Navigate to="/dashboard" replace/>
    }
}


export default Login;