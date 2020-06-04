import React from 'react';

import classes from './footer.module.css';

const Footer = () => {
    return (
        <footer className={classes.bottomFooter}>
            <p>	&copy; 2020 @ all rights reserved</p>
            {/*
                <form>
                    <select name="langChange">
                        <option value="sk">Slovenčina</option>
                        <option value="en">Angličtina</option>
                    </select>
                </form>
            */}
        </footer>
        )
}

export default Footer;