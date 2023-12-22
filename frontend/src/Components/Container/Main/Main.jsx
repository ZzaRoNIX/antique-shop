import React from 'react';
import s from './Main.module.css'
import {NavLink} from "react-router-dom";
import Advantage from "./Advantage/Advantage";
import location from '../../../assets/images/location.svg'
import teamwork from '../../../assets/images/teamwork.svg'
import shipping from '../../../assets/images/shipping.svg'

const Main = (props) => {
    return (
        <div className={s.main}>
            <h1 className={s.title}>
                ANTIQUE SHOP
            </h1>
            <h2 className={s.subtitle}>
                ОЦЕНКА, ПОКУПКА И ПРОДАЖА АНТИКВАРИАТА
            </h2>
            <div className={s.description}>
                Онлайн магазин ARTWORLDSHOP.RU был создан для ценителей эксклюзивных товаров и произведений искусств индивидуального характера.
                <br/>
                Всё, что Вы можете приобрести на данном ресурсе, принадлежит частным коллекциям и не выставлялось в онлайн формате. Мы имеем эксклюзивные права на продажу.
            </div>

            <h3 className={s.advantageTitle}>
                В чём наши преимущества:
            </h3>

            <Advantage img={location} title={'Уникальная схема доставки до клиента'} text={'Нами разработана и реализована новая схема доставки до клиента товара с учетом максимальной защиты его прав (см. раздел информация)'} />
            <Advantage img={shipping} title={'Богатый ассортимент изделий'} text={'На нашем ресурсе Вы можете найти как современные, так и исторически ценные картины и изделия, которые существуют в единственном экземпляре'} />
            <Advantage img={teamwork} title={'Договорная продажа с учетом снижения цены'} text={'Для успешной реализации выставленных изделий, мы готовы рассмотреть договорные варианты продажи с учетом снижения цены и с привлечением в переговорный процесс законных владельцев изделий'} />

            <NavLink to={`/catalog`} className={s.button}>
                Перейти в каталог
            </NavLink>
        </div>
    );
}

export default Main;
