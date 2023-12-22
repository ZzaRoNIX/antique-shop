import React, { useState } from 'react';
import SlidingPanel from 'react-sliding-side-panel';
import './Sidebar.css'
import {NavLink} from "react-router-dom";
import lk from "../../../assets/images/profile-3.svg";
import carpet from "../../../assets/images/shopping-bags.svg";
import whatsapp from "../../../assets/images/whatsapp-2.svg";
import inst from "../../../assets/images/instagram-5.svg";

const Sidebar = (props) => {
    const [openPanel, setOpenPanel] = useState(false);
    return (
        <div className={'display'}>
            <div>
                <button className={'nav-icon'} onClick={() => setOpenPanel(true)}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
            <SlidingPanel
                type={'left'}
                isOpen={openPanel}
                size={45}
                noBackdrop={false}
                backdropClicked={() => setOpenPanel(false)}
            >
                <div>
                    <div className={'enter'}>
                        {
                            !props.isLogin ?
                                <>
                                    <NavLink className={'login'} to='/login'>Вход</NavLink>
                                    <NavLink className={'login'} to='/register'>Регистрация</NavLink>
                                </> :
                                <>
                                    <div onClick={props.logout} className={'login'}>Выйти</div>
                                </>
                        }


                    </div>

                    <div className={'menu'}> {/*Нужно будет прописать фиксированную высоту при адаптивности для хороших отступов*/}
                        <NavLink className={'catalog'} to='/main' activeClassName={'active'}>О нас</NavLink>
                        <NavLink className={'catalog'} to='/catalog' activeClassName={'active'}>Каталог</NavLink>
                        <NavLink className={'catalog'} to='/information' activeClassName={'active'}>Информация</NavLink>
                    </div>
                    <div className={'links'}>
                        <NavLink to={'/profile'}>
                            <img src={lk} alt="profile"/>
                            <div>Кабинет</div>
                        </NavLink>
                        <NavLink to={'/cart'}>
                            {!props.isChecked && <div className={'checked'}></div>}
                            <img src={carpet} alt="carpet"/>
                            <div>Корзина</div>
                        </NavLink>
                    </div>
                    <div className={'contacts'}>
                        <div>Email:<br/>support@artworldshop.ru</div>
                        <div>Телефон:<br/>8 (862) 295-95-94</div>
                    </div>
                    <div className={'social'}>
                        <a href="https://wa.me/+78622959594" rel="noopener noreferrer" target={'_blank'}><img src={whatsapp} alt="whatsapp"/></a>
                        <a href="https://www.instagram.com/artworldshop.ru/" rel="noopener noreferrer" target={'_blank'}><img src={inst} alt="whatsapp"/></a>
                    </div>
                </div>
                {/*<div className={'close'} onClick={() => setOpenPanel(false)}>*/}
                {/*    Закрыть*/}
                {/*</div>*/}
            </SlidingPanel>
        </div>
    );
};

export default Sidebar;
