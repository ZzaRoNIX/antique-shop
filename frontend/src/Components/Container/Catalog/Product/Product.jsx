import React from 'react';
import s from './Product.module.css'
import {NavLink} from "react-router-dom";
import Photo from "../../../../Common/Photo/Photo";

const Product = ({productData, ...props}) => {

    return (
        <div className={s.product}>
            <Photo images={productData.images} />
            <div className={s.info}>
                <div className={s.basic}>
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
                                <div className={s.saleButton}>
                                    Sale
                                </div>
                            </div>
                    }
                </div>
                {   productData.name &&
                    <div className={s.type}>
                        Категория: {productData.category.name}
                    </div>
                }

                <div className={s.description}>
                    <div className={s.descriptionTitle}>
                        Описание:
                    </div>
                    <div className={s.text}>
                        {productData.description}
                    </div>
                </div>
                <div className={s.buttons}>
                    { //Находится ли данный товар в корзине
                        props.cartData.some(item => item.id === productData.id) ?
                            <button className={s.inCart} onClick={() => {
                                props.downTotalPrice(productData.price, productData.sale_price, productData.is_contract_price)
                                props.deleteItem(productData.id, productData.price)
                            }}>
                                Удалить из корзины
                            </button>

                        :   <button className={s.noCart} onClick={() => {
                                     props.upTotalPrice(productData.price, productData.sale_price, productData.is_contract_price)
                                     props.addItemCount(productData.id, productData.images[0], productData.name, productData.price, productData.description, productData.category.name, productData.sale_price, productData.is_contract_price)
                                 }}
                            >
                                Добавить в корзину
                            </button>
                    }

                    <NavLink to={`/catalog/${props.catalogId}/${props.productId}/purchase`}>
                        Купить товар
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default Product;
