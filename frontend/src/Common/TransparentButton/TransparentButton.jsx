import React from 'react';
import s from './TransparentButton.module.css'
import {NavLink} from "react-router-dom";

const TransparentButton = (props) => {
    return (
        <NavLink to={props.link} className={s.button}>
            {props.text}
        </NavLink>
    );
}

export default TransparentButton;
