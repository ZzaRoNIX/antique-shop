import React from 'react';
import s from './CatalogItems.module.css'
import {NavLink} from "react-router-dom";

const CatalogItems = (props) => {
    return (
        <div className={s.CatalogItems}>
            {
                props.catalogData.map(c => (
                    <div className={s.itemContainer} key={c.id}>
                        {
                            (c.sale_price !== null && !c.is_contract_price) &&
                            <div className={s.saleButton}>
                                Sale
                            </div>
                        }

                        <NavLink to={`/catalog/${c.category.id}/${c.id}`} className={s.imgContainer}>
                            {
                                c.img_mini !== null ? <img src={c.img_mini} alt="product"/>
                                : <img src={c.img_1} alt="product"/>

                            }

                        </NavLink>
                        <div>
                            <div className={s.name}>
                                {c.name}
                            </div>

                            <div className={s.price}>
                                {
                                    c.is_contract_price ?
                                        <div>
                                            Договорная
                                        </div> :

                                        c.sale_price === null ?
                                            <div>
                                                {c.price}₽
                                            </div>
                                            :
                                            <div>
                                                <div>{c.sale_price}₽</div>
                                                <div className={s.sale}>{c.price}₽</div>
                                            </div>

                                }

                                { //Находится ли данный товар в корзине
                                    props.cartData.some(item => item.id === c.id) ?
                                        <button className={s.inCart} onClick={() => {
                                            props.downTotalPrice(c.price, c.sale_price, c.is_contract_price)
                                            props.deleteItem(c.id, c.price)
                                        }}>
                                            Удалить из корзины
                                        </button>

                                        :   <button className={s.noCart} onClick={() => {
                                            props.upTotalPrice(c.price, c.sale_price, c.is_contract_price)
                                            props.addItemCount(c.id, c.img_1, c.name, c.price, c.description, c.category.name, c.sale_price, c.is_contract_price)
                                        }}
                                        >
                                            Добавить в корзину
                                        </button>
                                }
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default CatalogItems;
