import React from 'react';
import s from './Advantage.module.css'

const Advantage = (props) => {
    return (
        <div className={s.advantage}>
            <img src={props.img} alt="advantage"/>
            <div className={s.content}>
                <div className={s.title}>
                    {props.title}
                </div>
                <div className={s.text}>
                    {props.text}
                </div>
            </div>
        </div>
    );
}

export default Advantage;
