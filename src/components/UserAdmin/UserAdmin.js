import React, { useEffect, useState } from 'react';
import style from './UserAdmin.module.css';
import * as yup from 'yup';
import Navbar from '../NavBar/Navbar';
import { IoPaperPlaneSharp } from "react-icons/io5";
import { Formik, Form, Field, ErrorMessage } from "formik";
const {agregaUsuario} = require('../../helpers/usuarios_helper');

const UserAdmin = () => {

    const [state, setState] = useState({
        ubicacion: 'Admin usuarios',
        nombre: '',
        primerapellido: '',
        segundoapellido: '',
        email: '',
        telefono: '',
        password: '',
        passwordConfirmation: '',
        usuario: '',
        admin: true
    })

    useEffect(() => {

    })

    const validationSchema = yup.object({
        nombre: yup.string().required('El nombre es necesario'),
        primerapellido: yup.string().required('El primer apellido es necesario'),
        segundoapellido: yup.string(),
        email: yup.string().email('Debe de ser un correo valido'),
        telefono: yup.string().matches('[0-9]', 'El formato del telefono es incorrecto'),
        password: yup.string().required('La contraseña es necesaria'),
        passwordConfirmation: yup.string().required('Es necesario la confirmacion de contraseña').oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden'),
        usuario: yup.string().required('El usuario es necesario'),
        admin: yup.boolean().default(true)
    });

    const renderError = (message) => <p className="alert alert-danger m-2">{message}</p>;

    const onSubmit = async (values) => {
        validationSchema.isValid({
            nombre: values.nombre,
            primerapellido: values.primerapellido,
            segundoapellido: values.segundoapellido,
            email: values.email,
            telefono: values.telefono,
            password: values.password,
            passwordConfirmation: values.passwordConfirmation,
            usuario: values.usuario,
            admin: values.admin
        }).then(res =>{
            if(res){
                const a = agregaUsuario(values).then(res => console.log(res));
                console.log(a);
            }
        })
        console.log(values)
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

                                    <div className="form-floating m-1">
                                        <Field
                                            name="usuario"
                                            type="text"
                                            id="usuario"
                                            className="form-control"
                                            placeholder="Usuario"
                                        />
                                        <label htmlFor="usuario">
                                            Usuario(*):
                                        </label>
                                        <ErrorMessage name="usuario" render={renderError} />
                                    </div>

                                    <div className="form-floating m-1">
                                        <Field
                                            name="password"
                                            type="password"
                                            id="password"
                                            className="form-control"
                                            placeholder="Contraseña"
                                        />
                                        <label htmlFor="password">
                                            Contraseña(*):
                                        </label>
                                        <ErrorMessage name="password" render={renderError} />
                                    </div>

                                    <div className="form-floating m-1">
                                        <Field
                                            name="passwordConfirmation"
                                            type="password"
                                            id="passwordConfirmation"
                                            className="form-control"
                                            placeholder="Confirmacion de contraseña"
                                        />
                                        <label htmlFor="passwordConfirmation">
                                            Confirmar contraseña(*):
                                        </label>
                                        <ErrorMessage name="passwordConfirmation" render={renderError} />
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




export default UserAdmin