import React from 'react';
import s from './Top.module.css'
import {NavLink} from "react-router-dom";
import search from '../../../../assets/images/search.png'

const Top = (props) => {
    return (
        <div className={s.top}>
            <NavLink className={s.toMainBtn} to={'/main'}>
                На главную страницу
            </NavLink>
            <div className={s.topInfo}>
                <div className={s.path}>
                    <NavLink to={`/catalog/${props.catalogID}`} className={s.pathCatalog}>
                        Каталог товаров
                    </NavLink>
                    {
                        props.currentCard !== "" &&
                        <>
                            <div className={s.productTitle}>
                                &emsp;/&emsp;{props.currentCard}
                            </div>
                        </>
                    }
                </div>

                <div className={s.searchContainer}>
                    <input onBlur={props.handleFind} onKeyUp={props.handleFindKey} onChange={props.handleChange} type="text" name={'find_by_letters'} value={props.find_by_letters} placeholder={'Поиск по магазину'}/>
                    <button onClick={props.handleFind}>
                        <img src={search} alt="searchIcon"/>
                    </button>
                </div>
            </div>


        </div>
    );
}

export default Top;
