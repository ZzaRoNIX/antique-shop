import React from 'react';
import s from './Profile.module.css'
import {NavLink} from "react-router-dom";
import Input from "../../../Common/Input/Input";

const Profile = (props) => {
    return (
        <>
            {
                props.isChanging &&
                <NavLink className={s.changePass} to={'/set_password'}>Сменить пароль</NavLink>
            }
            <div className={s.profile}>
                {
                    !props.isChanging
                    ?
                        <>
                            <div>Фамилия: <br/>{props.last_name}</div>
                            <div>Имя: <br/>{props.first_name}</div>
                            <div>Отчество: <br/>{props.middle_name}</div>
                            <div>Номер телефона: <br/>{props.phone_number}</div>
                            <div>E-mail: <br/>{props.email}</div>
                        </>
                    :
                        <>
                            <Input text={'Фамилия'} type={'text'} value={props.last_name} handleChange={props.handleChange} handleFocus={props.handleChangeInputs} name={'last_name'} required={true}/>
                            <Input text={'Имя'} type={'text'} value={props.first_name} handleChange={props.handleChange} handleFocus={props.handleChangeInputs} name={'first_name'} required={true}/>
                            <Input text={'Отчество'} type={'text'} value={props.middle_name} handleChange={props.handleChange} handleFocus={props.handleChangeInputs} name={'middle_name'} required={false}/>
                            <Input text={'Номер телефона'} type={'tel'} value={props.phone_number} handleChange={props.handleChange} handleFocus={props.handleChangeInputs} name={'phone_number'} required={true}/>
                        </>
                }
            </div>

            {
                props.isEmptyInputs &&
                    <div className={'form__wrong'}>
                        Все поля должны быть заполнены
                    </div>
            }
            {
                !props.phoneSize &&
                    <div className={'form__wrong'}>
                        Пожалуйста, введите корректный номер телефона
                    </div>
            }

        </>
    );
}

export default Profile;
