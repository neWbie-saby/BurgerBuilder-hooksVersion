import React from 'react';

import classes from './Layout.module.css';
import Aux from '../../hoc/Aux';

const layout = props => (
    <Aux>
        <div>Toolbar, Sidebar, Backdrop</div>
        <main className={classes.Seperated}>
            {props.children}
        </main>
    </Aux>
);

export default layout;