import React from 'react';
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";
import lev from './../../assets/images/lev.svg'
import whatsapp from './../../assets/images/whatsapp-2.svg'
import inst from './../../assets/images/instagram-5.svg'
import carpet from './../../assets/images/shopping-bags.svg'
import lk from './../../assets/images/profile-3.svg'
import visa from './../../assets/images/visa.svg'
import mastercard from './../../assets/images/mastercard-2.svg'
import SidebarContainer from "./Sidebar/SidebarContainer";


const Navbar = (props) => {
    return (
        <div className={s.navbar}>
            <div className={s.container}>
                {/*Это выпадающее меню слева*/}
                <SidebarContainer />
                <NavLink to={'/'} className={s.logoContainer}>
                    <img className={s.logo} src={lev} alt="logo"/>
                    <div className={s.name}>
                        <div>ART<br/>WORLD<br/>SHOP</div>
                        {/*<div>STORE</div>*/}
                    </div>
                </NavLink>
                <NavLink exact to={`/main`} className={s.catalog} activeClassName={s.active}>
                    О нас
                </NavLink>
                <NavLink to={`/catalog`} className={s.catalog} activeClassName={s.active}>
                    Каталог товаров
                </NavLink>
                <NavLink to={`/information`} className={s.catalog} activeClassName={s.active}>
                    Информация
                </NavLink>
                <div className={s.social}>
                    <a href="https://wa.me/+78622959594" rel="noopener noreferrer" target={'_blank'}><img src={whatsapp} alt="whatsapp"/></a>
                    <a href="https://www.instagram.com/artworldshop.ru/" rel="noopener noreferrer" target={'_blank'}><img src={inst} alt="whatsapp"/></a>
                </div>
                <div className={s.contacts}>
                    <div>Email : support@artworldshop.ru</div>
                    <div>Телефон: 8 (862) 295-95-94</div>
                </div>
                <div className={s.cards}>
                    <img src={visa} alt="visa"/>
                    <img src={mastercard} alt="mastercard"/>
                </div>
                <div className={s.links}>
                    <NavLink to={'/profile'}>
                        <img src={lk} alt="profile"/>
                        <div>Кабинет</div>
                    </NavLink>
                    <NavLink to={'/cart'}>
                        {!props.isChecked && <div className={s.checked}></div>}
                        <img src={carpet} alt="carpet"/>
                        <div>Корзина</div>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
