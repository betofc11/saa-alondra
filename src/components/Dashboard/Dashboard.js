import React from 'react';
import style from './Dashboard.module.css';
import { Navigate } from 'react-router-dom';
const token_helper = require('../../helpers/token_helper');
const axios = require('axios');

const Dashboard = () =>{
    return (
        <div className="container">
            <h1 className="title">Dashboard</h1>
        </div>
    )
}

export default Dashboard;