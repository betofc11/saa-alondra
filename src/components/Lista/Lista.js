import { React, Component } from 'react';
import style from './Lista.module.css';
import { Navigate } from 'react-router-dom';
import { getRegions } from '../../services/regionesServices';
import Card from './Card/Card';
import Navbar from '../NavBar/Navbar';
import Loader from '../Utilities/Loader';
const { verifyLogged } = require('../../helpers/token_helper');
const axios = require('axios');



class Lista extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            islogged: true,
            regiones: [],
            ubicacion: 'Listas',
            loader: true
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
                if (this.state.regiones.length === 0) {
                    getRegions().then((res) => {
                        this.setState({ regiones: JSON.parse(res), loader: false });
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
            <div>
                <Navbar user= {this.state}/>
                <div className={"container " + style.cuerpo}>
                    {
                        this.state.loader ? <Loader />: <span></span>
                    }
                    <div className={style.grupo}>
                        {
                            this.state.regiones.map((region) => {
                                return (
                                    <Card key={region.idregion} region={region} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        ) : <Navigate to="/login" />;
    }
}

export default Lista;