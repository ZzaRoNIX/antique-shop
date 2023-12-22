import React from 'react';
import s from './BeigeButton.module.css'

const BeigeButton = (props) => {
    return (
        <div className={s.button} onClick={props.handleSubmit}>
            {props.text}
        </div>
    );
}

export default BeigeButton;
