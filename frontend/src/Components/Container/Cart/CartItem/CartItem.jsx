import React from 'react';
import s from './CartItem.module.css'
import cross from '../../../../assets/images/path.svg'

const CartItem = (props) => {
    return (
        <div className={s.itemContainer}>
            <div className={s.basic}>

                <div className={s.imgContainer}>
                    <img src={props.img_1} alt="product"/>
                </div>
                <div className={s.info}>
                    <div className={s.name}>
                        {props.name}

                    </div>
                    {
                        props.is_contract_price ?
                            <div className={s.typePrice}>
                                Цена: Договорная
                            </div> :
                        props.sale_price === null ?
                            <div className={s.price}>
                                {props.price}₽
                            </div>
                            :
                            <div className={s.saleContainer}>
                                <div className={s.price}>{props.sale_price}₽</div>
                                <div className={s.sale}>{props.price}₽</div>
                            </div>
                    }
                    <div className={s.type}>
                        Категория: {props.type}
                    </div>
                </div>
                <button onClick={() => {
                    props.deleteItem(props.id, props.price)
                    props.downTotalPrice(props.price, props.sale_price, props.is_contract_price)
                }} className={s.delete}>
                    <img src={cross} alt="delete item"/>
                </button>
            </div>
            <div className={s.description}>
                <div className={s.descriptionTitle}>
                    Описание:
                </div>
                <div className={s.text}>
                    {props.description}
                </div>
            </div>
        </div>
    );
}

export default CartItem;
