import React from 'react';
import s from './Footer.module.css'
import whatsapp from './../../assets/images/whatsapp-2.svg'
import inst from './../../assets/images/instagram-5.svg'
import {NavLink} from "react-router-dom";

const Footer = (props) => {
    return (
        <>
            <div className={s.footer}>
                <div className={s.container}>
                    <div className={s.name}>
                        Antique Shop
                    </div>
                    <div className={s.links}>
                        <div className={s.nav}>
                            <NavLink to={`/main`}>О нас</NavLink>
                            <NavLink to={`/catalog`}>Каталог товаров</NavLink>
                            <NavLink to={'/information'}>Информация</NavLink>
                            <NavLink to={'/profile'}>Кабинет</NavLink>
                            <NavLink to={'/cart'}>Корзина</NavLink>
                        </div>
                        <div className={s.social}>
                            <div>
                                Соц. сети:
                            </div>
                            <a href="https://wa.me/+78622959594" rel="noopener noreferrer" target={'_blank'}><img src={whatsapp} alt="whatsapp"/></a>
                            <a href="https://www.instagram.com/artworldshop.ru/" rel="noopener noreferrer" target={'_blank'}><img src={inst} alt="whatsapp"/></a>
                        </div>
                    </div>
                    <div className={s.devgang}>
                        Powered by Dev.gang
                    </div>
                </div>

            </div>

        </>

    );
}

export default Footer;
