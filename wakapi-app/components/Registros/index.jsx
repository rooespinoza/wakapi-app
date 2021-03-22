import React, { Fragment, useEffect, useState } from 'react'
import styles from './registros.module.scss'
const initialUsers = [];
export const Registros = ({data}) => {
    console.log(data)
  const renderRegistros = () =>{
    return data.map(u=>(
        <div className={styles.row} key={u.id}>
            <p><b>Nombre:</b> {u.name}</p>
            <p><b>F. Nacimiento:</b> {u.date}</p>
            <p><b>País:</b> {u.country}</p>
        </div>
          )
    )}
  return (
      <Fragment>
        <div className={styles.registros}>
            <div className={styles.title__container}>
              <h1>Registros</h1>
              </div>
            <div className={styles["table--desktop"]}>
                {data.length == 0 ? 
                <div className={styles.row}>
                    <p>Aun no hay registros</p>
                </div>:
                <Fragment>
                    {renderRegistros()}
                </Fragment>
                
                }
              
            </div>
          </div>          
        </Fragment>
  )
}
export default Registros;