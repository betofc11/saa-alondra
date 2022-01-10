import React from "react";
import styles from "../Card/Card.module.css";


const Card = (region) => {
    console.log(region)
    return (
        <a href="#" className={styles.link}>
            <div className={"card " + styles.card}>
                
                <div className={styles.cardtexto}>
                    {region.region.nombre}
                </div>
            </div>
        </a>
    )
}



export default Card