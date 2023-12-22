import React from 'react';
import s from './Form.module.css'
import Select from "react-select";
import {NavLink} from "react-router-dom";

const Form = (props) => {

    const options = [
        { value: 'СДЭК', label: 'СДЭК' },
        { value: 'DHL', label: 'DHL' },
        { value: 'Самовывоз', label: 'Самовывоз' },
    ];

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            backgroundColor: '#92815c',
            marginBottom: '5px',
            borderRadius: '2px',
            fontSize: '18px',
        }),
        menuList: (provided, state) => ({
            ...provided,
            color: "white",
            padding: 0,
            border: "none",
            backgroundColor: "transparent",
            boxShadow: "none",
        }),
        menu: (provided, state) => ({
            ...provided,
            padding: 0,
            border: "none",
            backgroundColor: "transparent",
            boxShadow: "none",
        }),
        control: (provided, state) => ({
            ...provided,
            border: '1px solid black',
            borderRadius: '2px',
            minHeight: '34px',
            height: '39px',
            fontSize: '18px',
            alignItems: 'center',
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
          padding: '6px',
        }),
    }

    return (
        <>
            <div className={s.data}>
                {
                    !props.isLogin ?
                        <>
                            <div className={'form__wrong'}>
                                Внимание! Для создания заказа Вы должны войти на сайт
                            </div>
                            <NavLink to={'/login'} className={`${s.submit} ${s.toCenter}`}>
                                Войти
                            </NavLink>
                        </>
                        :
                        <div className={s.form}>
                            <div className={s.formItem}>
                                <div className={s.field}>
                                    Комментарии к заказу
                                </div>
                                <textarea placeholder={'Адрес доставки и другие пожелания'} value={props.description} onChange={props.handleChange} name={'description'}/>
                            </div>
                            <div className={s.formSubmit}>
                                <div>
                                    <div className={s.field}>
                                        Выберите способ доставки
                                    </div>
                                    <Select
                                        value={props.delivery_type}
                                        styles={customStyles}
                                        className={s.select}
                                        placeholder={'Способ доставки'}
                                        onChange={props.onSelectionChange}
                                        options={options}
                                    />
                                </div>
                                {
                                    props.isLogin ?
                                        <button onClick={props.handleSubmit} className={s.submit}>
                                            Оформить заказ
                                        </button>
                                        :
                                        <NavLink to={'/login'} className={s.submit}>
                                            Войти
                                        </NavLink>
                                }
                            </div>
                        </div>
                }
            </div>
        </>
    );
}

export default Form
