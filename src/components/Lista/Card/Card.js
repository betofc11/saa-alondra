import React from "react";
import styles from "../Card/Card.module.css";
import { NavLink } from 'react-router-dom';


const Card = (region) => {
    console.log(region)
    return (
        <NavLink to={`/regiones/${region.region.idregion}`} className={styles.link}>
            <div className={"card " + styles.card}>
                
                <div className={styles.cardtexto}>
                    {region.region.nombre}
                </div>
            </div>
        </NavLink>
    )
}



export default Card