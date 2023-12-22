import React from 'react';
import s from './Cart.module.css'
import {NavLink} from "react-router-dom";
import CartItem from "./CartItem/CartItem";
import Form from "../../../Common/Form/Form";

const Cart = (props) => {
    return (
        <div className={s.cart}>
            <div className={s.top}>
                <NavLink to={`/catalog`}>Вернуться к каталогу</NavLink>
                <div className={s.registration}>
                    Корзина
                </div>
            </div>
            <div className={s.itemsContainer}>
                {
                    props.cartData.length !== 0
                        ?
                         props.cartData.map(c => (
                            <CartItem key={c.id}
                                      id={c.id}
                                      img_1={c.img_1}
                                      name={c.name}
                                      sale_price={c.sale_price}
                                      price={c.price}
                                      is_contract_price={c.is_contract_price}
                                      description={c.description}
                                      type={c.categoryName}
                                      deleteItem={props.deleteItem}
                                      downTotalPrice={props.downTotalPrice}
                            />
                        ))
                        :
                        <div className={s.empty}>
                            Корзина пуста
                        </div>
                }
            </div>
            <div className={s.totalPrice}>
                <div className={s.full}>
                    Общая сумма
                </div>
                <div className={s.price}>
                    {props.totalPrice}₽
                </div>
            </div>

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

export default Cart;
