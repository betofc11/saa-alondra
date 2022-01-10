import { React, Component } from 'react';
import style from './Dashboard.module.css';
import { Navigate } from 'react-router-dom';
import regionesServices from '../../services/regionesServices';
import Card from './Card/Card';
const { verifyLogged } = require('../../helpers/token_helper');
const axios = require('axios');



class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            islogged: true,
            regiones: []
        };
    }



    async islogged() {
        const a = await verifyLogged();
        if (a && this.state.username === "") {
            const user = JSON.parse(localStorage.getItem('usuarioLogged')).usuario;
            console.log(user);
            this.setState({
                username: user
            });
            console.log(this.state.username)
        }
        return a;

    }

    verifyLogin() {
        try {
            this.islogged().then(res => {
                console.log(res)
                res ? console.log("ESTA LOGUEADO") : this.setState({ islogged: res });
                if(this.state.regiones.length === 0){
                    regionesServices.getRegions().then((res) =>{
                    this.setState({ regiones: JSON.parse(res) });
                    console.log(res);
                })
            };
            });
        } catch (e) {
            console.error(e.message)
        }
    }

    logOutHandler = () => {
        localStorage.removeItem('usuarioLogged')
        this.setState({ islogged: false });
    }

    componentDidMount() {
        try {
            this.verifyLogin();
        } catch (e) {
            console.log(e.message)
        }
    }

    componentDidUpdate(pevProp, prevState) {
        try {
            prevState ?
                this.verifyLogin() :
                console.log('UPDATE')
        } catch (e) {
            console.warn(e.message)
        }
    }

    render() {
        return this.state.islogged ? (
            <div className="container">
                <h1 className="title">DASHBOARD</h1>
                <button type="button" className="btn btn-danger" onClick={this.logOutHandler}>
                    LOGOUT
                </button>
                <div className={style.grupo}>
                    {
                        this.state.regiones.map((region) => {
                            return (
                                <Card region={region} />
                            )
                        })
                    }
                </div>
            </div>
        ) : <Navigate to="/login" />;
    }
}

export default Dashboard;