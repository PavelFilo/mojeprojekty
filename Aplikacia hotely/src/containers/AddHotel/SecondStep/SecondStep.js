import React, { Component } from 'react';

import classes from './SecondStep.module.css';

class SecondStep extends Component {

    state = {
        classes: [classes.AddHotel]
    }

    slideAndChange = () => {
        this.setState({ classes: [...this.state.classes, classes.SlideOut] })
        setTimeout(() => {
           this.props.history.push('/pridatHotel');
        }, 400);
    }

    render() {

        return (
            <div className={this.state.classes.join(' ')}>
                <div className={classes.Steps}>
                    <h2>Už ste skoro tam</h2>
                    <h3>Krok druhý</h3>
                </div>
                <div className={classes.Why}>
                    <h1>Sme tu pre Vás</h1>
                    <p>Bez ohľadu na to, aký druh domu alebo miestnosti musíte zdieľať, my umožňujeme hosťom jednoduché a bezpečné ubytovanie. Máte úplnú kontrolu nad svojou dostupnosťou, cenami, pravidlami domu a spôsobom interakcie s hosťami.</p>
                </div>

                <div>
                    <h1>Prečo si ku nám pridať hotel</h1>
                    <p>Naša každodenná rutina sa niekedy môže nudiť. Vstávame, chodíme do práce, prichádzame domov, jeme a ideme spať. Jednoduchá. <br />
                        Keď raz za čas privítate cestovateľa do svojho domova, vaše každodenné návyky môžu dať trochu spontánnosť. <br />
                        Cestovatelia sú často veľmi zvedaví a o miestnom živote toho veľa nevedia: hľadajú viac o vás, ako žijete. Budú radi, keď sa budú podieľať na mnohých aktivitách a budete mať veľa tém na diskusiu!
                     </p>
                </div>

                <div className={classes.More}>
                    <h3>Rozhodli ste sa pre nás?</h3>
                    <p onClick={this.slideAndChange} className={classes.button}>Pridať ubytovanie</p>
                </div>
            </div>
            );
    }
}

export default SecondStep;