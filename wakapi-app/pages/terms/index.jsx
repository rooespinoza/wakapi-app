import Link from 'next/link'
import Button from '../../components/Button'
import React, { Fragment, useEffect, useState } from 'react'
import styles from './terms.module.scss'
import Head from '../../components/head'


export const Terms = ({}) =>{
return(
    <Fragment>
        <Head title='Terminos y condiciones'></Head>
    <div className={styles.terms__container}>
        <div className={styles.title__container}>
            <h1>Terminos y condiciones</h1>
            <h2>Ultima actualización 12/02/2020</h2>
        </div>
        <div className={styles.text__container}>
            <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. 
            </p>
            <br/>
            <p>
            Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue
            </p>
            <br/>
            <p>
            Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,
            </p>
            <Link href='/'>
            <Button secondary >Volver</Button>
            </Link>
        </div>
        
        
    </div>   
    </Fragment>
)
}
export default Terms;