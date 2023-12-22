import React from 'react';
import s from './Sidebar.module.css'
import {NavLink} from "react-router-dom";

const Sidebar = (props) => {
    return (
        <div className={s.sidebar}>
            <div className={s.top}>
                Категории
            </div>
            <div className={s.catalogListContainer}>
                {
                    props.catalogList.map(c => (
                        <NavLink activeClassName={s.active} to={`/catalog/${c.id}`} className={s.catalogListItem} key={c.id}>
                            {c.name}
                        </NavLink>
                    ))
                }
            </div>
        </div>
    );
}

export default Sidebar;
