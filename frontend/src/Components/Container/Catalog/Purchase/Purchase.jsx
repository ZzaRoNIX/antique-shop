import React from 'react';
import s from './Purchase.module.css'
import {NavLink} from "react-router-dom";
import Form from "../../../../Common/Form/Form";

const Purchase = ({productData, ...props}) => {
    const id = Math.floor(props.catalogId)
    return (
        <div className={s.purchase}>
            <div className={s.top}>
                <NavLink to={`/catalog/${id}`}>Вернуться к каталогу</NavLink>
                <div className={s.registration}>
                    Оформление заказа
                </div>
            </div>
            <div className={s.product}>
                <div className={s.photoContainer}>
                    <img src={productData.images[0]} alt="product"/>
                </div>
                <div className={s.info}>
                    <div className={s.name}>
                        {productData.name}
                    </div>
                    {
                        productData.is_contract_price ?
                            <div className={s.typePrice}>
                                Цена: Договорная
                            </div> :
                        productData.sale_price === null ?
                            <div className={s.price}>
                                {productData.price}₽
                            </div>
                            :
                            <div className={s.saleContainer}>
                                <div className={s.price}>{productData.sale_price}₽</div>
                                <div className={s.sale}>{productData.price}₽</div>
                            </div>
                    }
                    {
                        productData.category !== undefined &&
                        <div className={s.type}>
                            Категория: {productData.category.name}
                        </div>
                    }

                </div>
            </div>
            <div className={s.description}>
                <div className={s.descriptionTitle}>
                    Описание:
                </div>
                <div className={s.text}>
                    {productData.description}
                </div>
            </div>
            {
                props.isOrderTrue &&
                <div className={'form__right'}>
                    Заказ успешно создан
                </div>
            }
            <Form handleSubmit={props.handleSubmit}
                  onSelectionChange={props.onSelectionChange}
                  handleChange={props.handleChange}
                  isLogin={props.isLogin}
                  delivery_type={props.delivery_type}
                  description={props.description}
            />
        </div>
    );
}

export default Purchase;
