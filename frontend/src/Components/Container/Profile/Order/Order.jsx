import React from 'react';
import s from './Order.module.css'

const Order = (props) => {
    return (
        <div className={s.order}>
            <div className={s.top}>
                <div>
                    Номер заказа: #{props.id}
                </div>
                <div>
                    Статус:
                    {
                        props.status === 'В обработке' && <span className={s.processing}> в обработке</span>
                    }
                    {
                        props.status === 'Выполнен' && <span className={s.done}> выполнен</span>
                    }
                    {
                        props.status === 'Отменен' && <span className={s.cancel}> отменен</span>
                    }
                </div>
            </div>

            <div className={s.items}>
                {
                    props.products &&
                    props.products.map(p => {

                        return (
                                <div key={p.id} className={s.item}>
                                    <div>
                                        Наименование товара: {p.name}
                                    </div>
                                    {
                                        p.is_contract_price ?
                                            <div className={s.typePrice}>
                                                Цена: Договорная
                                            </div> :
                                            p.sale_price === null ?
                                                <div className={s.totalPrice}>
                                                    {p.price}₽
                                                </div>
                                                :
                                                <div className={s.saleContainer}>
                                                    <div className={s.totalPrice}>{p.sale_price}₽</div>
                                                    <div className={s.sale}>{p.price}₽</div>
                                                </div>
                                    }
                                </div>
                        )
                    })
                }

            </div>

            <div className={s.descriptionContainer}>
                <div className={s.descriptionTitle}>
                    Комментарии к заказу:
                </div>
                <div className={s.description}>
                    {props.description}
                </div>
            </div>

            <div className={s.delivery}>
                Способ доставки: {props.delivery_type}
            </div>

        </div>
    );
}

export default Order;
