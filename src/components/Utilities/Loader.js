import React, { useState } from 'react';
import styles from './Loader.module.css';
import image from './img/spider.gif';


const Loader = () =>{

    const style =  styles.loader + ' ' + styles.show;
    

    return (
        <div className={style}>
            <img src={image} alt="Loading" />
        </div>
    )
}



export default Loader