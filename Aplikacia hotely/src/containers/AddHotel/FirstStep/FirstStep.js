import React, { Component } from 'react';

import classes from './FirstStep.module.css';
import Bratislava from '../../../assets/images/Bratislava.jpg';

class FirstStep extends Component {

    state = {
        classes: [classes.AddHotel]
    }

    slideAndChange = () => {
        this.setState({ classes: [...this.state.classes, classes.SlideOut] })
        setTimeout(() => {
            this.props.history.push('/pridat2');
        }, 400);
    }

    render() {

        return (
            <div className={this.state.classes.join(' ')}>
                <div className={classes.Steps}>
                    <h2>Stačia vám tri kroky</h2>
                    <h3>Krok prvý</h3>
                </div>
                <div className={classes.Why}>
                    <h1>Prečo si ku nám pridať hotel</h1>
                    <p>Máte ubytovanie s kopou voľných dní? Pri nás to takto nezostane, ubezpečujeme vás, že budete mať celé mesiace plné hostí.</p>
                </div>

                <div className={classes.ImgDiv}>
                    <img className={classes.Behind} src={Bratislava} alt='Bratislava' />
                    <img className={classes.ImgAnimate} src={Bratislava} alt='Bratislava' />
                </div>
                <div>
                    <h1>Čo pre vás robíme</h1>
                    <p>Umožnujeme jednoducho, rýchlo a hlavne bezpečne hostiť ubytovanie. So svojim hosťom komunikujete vy, takže si môžete overiť akých príjemných ľudí uchýlite vo svojom príbytku.</p>
                </div>

                <div className={classes.More}>
                    <h3>Chcete vedieť prečo sa ubytovávať?</h3>
                    <p onClick={this.slideAndChange} className={classes.button}> Kliknite tu a dozviete sa viac...</p>
                </div>
            </div>
            );
    }
}

export default FirstStep;