import React, { Component } from 'react'
import './Login.css'
import { Navigate } from 'react-router-dom'
import { verifyLogged } from '../../helpers/token_helper'
import Loader from '../Utilities/Loader'
const config = require('../../config.json')
const axios = require('axios')

class Login extends Component {
    state = {
      username: '',
      password: '',
      islogged: false,
      loader: false,
      error: false
    }

    submitHandler = (event) => {
      event.preventDefault()
      this.setState({
        ...this.state,
        loader: true
      })
      const user = event.target.user.value.trim()
      const pass = event.target.pass.value.trim()
      this.setState({ username: user, password: pass })
      axios.post(config.URL_API + 'usuarios/login', {
        usuario: user,
        password: pass
      }).then(res => {
        console.log('IsLoogedIn:', !!res.data)
        localStorage.setItem('usuarioLogged', JSON.stringify(res.data))
        this.setState({
          ...this.state,
          islogged: true
        })
      }).catch(err => {
        this.setState({
          ...this.state,
          islogged: false,
          loader: false,
          error: true
        })
        console.log(err)
      })
    }

    async checkLoginStatus () {
      verifyLogged().then((res) => {
        res ? this.setState({ islogged: true }) : this.setState({ islogged: false })
      }).catch(err => {
        console.log(err.message)
      })
    }

    componentDidMount () {
      this.checkLoginStatus()
    }

    render () {
      return !this.state.islogged
        ? (
            <div className="container h-100">
                {
                    this.state.loader ? <Loader /> : <div></div>
                }
                <div>
                    <h1 className="title">SAA Alondra</h1>
                </div>
                <div className="card">
                    <form onSubmit={this.submitHandler}>
                        <h2 className="card-header">Iniciar sesion</h2>
                        <div className="card-body">
                            <div className="">
                                <input type="text" name="user" className="form-control" placeholder="Usuario" autoComplete="username"/>
                                <input type="password" name="pass" className="form-control" placeholder="Contraseña" autoComplete="current-password"/>
                            </div>
                        </div>

                {
                    this.state.error
                      ? <div className={'alert alert-danger mx-3'}>
                        Credenciales incorrectas
                    </div>
                      : <p></p>
                }
                        <div className="card-footer">
                            <button type="submit" className="btn btn-success"> INICIAR SESION</button>
                        </div>
                    </form>
                </div>
            </div>
          )
        : <Navigate to="/" replace/>
    }
}

export default Login
