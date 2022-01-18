import React, { useEffect, useState } from 'react';
import style from './VecinosAdmin.module.css';
import * as yup from 'yup';
import Navbar from '../NavBar/Navbar';
import { IoPaperPlaneSharp } from "react-icons/io5";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const { agregaUsuario } = require('../../helpers/usuarios_helper');
const { getRegions } = require('../../helpers/casas_helper');

const VecinosAdmin = () => {

    const [state, setState] = useState({
        ubicacion: 'Admin vecinos',
        nombre: '',
        primerapellido: '',
        segundoapellido: '',
        email: '',
        telefono: '',
        cedula: '',
        fallecido: false,
        trabaja: true,
        fechanac: new Date(),
        idcasa: 0,
        idregion: 2,
        arrayRegionesCasas: [],
        arrayRegiones: [],
        arrayCasas: []

    });

    const getFormValues = () => {
        let regiones = [];
        let casas = [];
        getRegions().then((res) => {
            for (let reg in res) {
                regiones.push({
                    value: res[reg].idregion,
                    text: res[reg].nombre
                });
                for (let cas in res[reg].casa) {
                    casas.push({
                        region: res[reg].idregion,
                        value: res[reg].casa[cas].idcasa,
                        text: res[reg].casa[cas].nombre,
                    })
                }
            }
            setState({
                ...state,
                arrayRegionesCasas: res,
                arrayRegiones: regiones,
                arrayCasas: casas
            })
            console.log(regiones, casas)
        });
    }

    useEffect(() => {
        getFormValues();
    }, [])

    const validationSchema = yup.object({
        nombre: yup.string().required('El nombre es necesario'),
        primerapellido: yup.string().required('El primer apellido es necesario'),
        segundoapellido: yup.string(),
        email: yup.string().email('Debe de ser un correo valido'),
        telefono: yup.string().matches('[0-9]', 'El formato del telefono es incorrecto'),
        cedula: yup.string().required('La cedula es necesaria').matches('[0-9]', 'El formato de la cedula es incorrecto').length(9, 'La cedula debe de contener 9 digitos'),
        fallecido: yup.boolean().default(false),
        trabaja: yup.boolean().default(true),
        fechanac: yup.date().default(new Date()),
        regiones: yup.number().min(1, 'Debe elegir una region'),
        casas: yup.number().min(1, 'Debe elegir una casa'),
    });

    const renderError = (message) => <p className="alert alert-danger m-2">{message}</p>;

    const onSubmit = async (values) => {
        validationSchema.isValid({
            nombre: values.nombre,
            primerapellido: values.primerapellido,
            segundoapellido: values.segundoapellido,
            email: values.email,
            telefono: values.telefono,
            cedula: values.cedula,
            fallecido: values.fallecido,
            trabaja: values.trabaja,
            fechanac: values.fechanac,
            regiones: values.regiones,
            casas: values.casas,
        }).then(res => {
            console.log(res)
        })
        console.log(values)
    }

    const getListRegions = state.arrayRegiones.map(reg => {
        return (
            <option key={reg.value} value={reg.value} >{reg.text}</option>
        )
    })

    const getListCasas = state.arrayCasas.map(reg => {
        if(reg.region === state.idregion){
            return (
                <option key={reg.value} value={reg.value} >{reg.text}</option>
            )
        }else{
            return(
            <option key={reg.value} value={0} disabled>No hay casas en esta region</option>
            )
        }
        
    })
    

    const onChangeRegion = (value) => {
        setState({
            ...state,
            idregion: parseInt(value.target.value)
        })

    }

    const renderCasasInput = () => {
        if(state.idregion > 0){
            console.log(state)
            return (
                <Field
            name="casas"
            as="select"
            id="casas"
            className="form-select form-select-lg"
        >
            <option value="0" defaultValue disabled>Selecciona casa(Selecciona primero region):</option>
            {getListCasas}
        </Field>
            )
        }else{
            console.log(state)
            return(
                <Field
                name="casas"
                as="select"
                id="casas"
                className="form-select form-select-lg"
                disabled
            >
                <option value="0" >Selecciona casa(Selecciona primero region):</option>
            </Field>
            )
        }
        
            
    }

    return (
        <div>
            <Navbar user={state} />
            <div className={`container ${style.cuerpo}`}>
                <Formik
                    initialValues={state}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { resetForm }) => {
                        await onSubmit(values);
                        resetForm();
                    }}>

                    <div className={style.formcontainer}>
                        <div className={`title ${style.subtitle}`}> Crear vecino nuevo:</div>
                        <Form>
                            <div className="d-flex flex-row flex-wrap w-100 justify-content-center">
                                <div className={`${style.formdivisor}`}>
                                    <div className="form-floating m-1">
                                        <Field
                                            name="nombre"
                                            type="text"
                                            id="nombre"
                                            className="form-control"
                                            placeholder="Nombre"
                                        />
                                        <label htmlFor="nombre">
                                            Nombre(*):
                                        </label>
                                        <ErrorMessage name="nombre" render={renderError} />
                                    </div>

                                    <div className="form-floating m-1">
                                        <Field
                                            name="primerapellido"
                                            type="text"
                                            id="primerapellido"
                                            className="form-control"
                                            placeholder="Primer apellido"
                                        />
                                        <label htmlFor="primerapellido">
                                            Primer apellido(*):
                                        </label>
                                        <ErrorMessage name="primerapellido" render={renderError} />
                                    </div>

                                    <div className="form-floating m-1">
                                        <Field
                                            name="segundoapellido"
                                            type="text"
                                            id="segundoapellido"
                                            className="form-control"
                                            placeholder="Segundo apellido"
                                        />
                                        <label htmlFor="segundoapellido">
                                            Segundo apellido:
                                        </label>
                                        <ErrorMessage name="segundoapellido" render={renderError} />
                                    </div>

                                    <div className="form-floating m-1">
                                        <Field
                                            name="cedula"
                                            type="text"
                                            id="cedula"
                                            className="form-control"
                                            placeholder="Cedula:"
                                        />
                                        <label htmlFor="segundoapellido">
                                            Cedula(*):
                                        </label>
                                        <ErrorMessage name="cedula" render={renderError} />
                                    </div>

                                    <div className="form-group m-1">
                                        <Field
                                            name="regiones"
                                            as="select"
                                            id="regiones"
                                            className="form-select form-select-lg"
                                            onChange={onChangeRegion}
                                            value={state.idregion}
                                        >
                                            <option value="0">Selecciona region:</option>
                                            {getListRegions}
                                        </Field>
                                        <ErrorMessage name="regiones" render={renderError} />
                                    </div>

                                    <div className="form-group m-1">
                                        {
                                            renderCasasInput()
                                        }
                                        <ErrorMessage name="casas" render={renderError} />
                                    </div>

                                    <div className="form-floating m-1">
                                        <Field
                                            name="telefono"
                                            type="text"
                                            id="telefono"
                                            className="form-control"
                                            placeholder="Numero de telefono"
                                        />
                                        <label htmlFor="telefono">
                                            Telefono:
                                        </label>
                                        <ErrorMessage name="telefono" render={renderError} />
                                    </div>
                                </div>
                                <div className={`${style.formdivisor}`}>
                                    <div className="form-floating m-1">
                                        <Field
                                            name="email"
                                            type="email"
                                            id="email"
                                            className="form-control"
                                            placeholder="example@mail.com"
                                        />
                                        <label htmlFor="email">
                                            Correo electronico:
                                        </label>
                                        <ErrorMessage name="email" render={renderError} />
                                    </div>

                                    <div className="form-check form-switch m-1">
                                        <Field
                                            name="fallecido"
                                            type="checkbox"
                                            id="fallecido"
                                            className="form-check-input"
                                        />
                                        <label htmlFor="fallecido" className="form-check-label">
                                        Fallecido(*):
                                    </label>
                                        <ErrorMessage name="fallecido" render={renderError} />
                                    </div>

                                    <div className="form-check form-switch m-1">
                                        <Field
                                            name="trabaja"
                                            type="checkbox"
                                            id="trabaja"
                                            className="form-check-input"
                                        />
                                        <label htmlFor="trabaja" className="form-check-label">
                                        Trabaja(*):
                                    </label>
                                        <ErrorMessage name="fallecido" render={renderError} />
                                    </div>

                                    <div className=" m-1">
                                    <label htmlFor="fechanac">
                                        Fecha de nacimiento(*):
                                    </label>
                                        <DatePicker 
                                        name="fechanac"
                                        id='fechanac'
                                        type="date"
                                        selected={ state.fechanac }
                                        className={`form-control`}
                                        placeholder="Fecha de nacimiento"
                                        />
                                        
                                        <ErrorMessage name="fechanac" render={renderError} />
                                    </div>
                                </div>
                            </div>
                            <div className={`${style.confirmDiv}`}>
                                <button type='submit' className={`btn btn-success ${style.confirmBtn}`} value="Confirmar contraseña">Aceptar <IoPaperPlaneSharp /></button>
                            </div>
                        </Form>
                    </div>
                </Formik>
            </div>
        </div>
    )
}




export default VecinosAdmin