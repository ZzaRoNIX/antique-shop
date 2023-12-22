import React from 'react';
import {connect} from "react-redux";
import './../../../Common/style.css'
import Input from "../../../Common/Input/Input";
import BeigeButton from "../../../Common/BeigeButton/BeigeButton";
import TransparentButton from "../../../Common/TransparentButton/TransparentButton";
import {registration} from "../../../redux/authentication";
import {Redirect} from "react-router-dom";
import s from './Register.module.css'

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            last_name: "",
            first_name: "",
            middle_name: "",
            phone_number: "",
            email: "",
            password: "",
            isConfirm: false, //Нажал ли пользователь кнопку "Зарегистрироваться"
            isEmptyInputs: false, //Все ли поля пустые
            isPasswordSize: false, //Если пароль короче 9 символов или не содержит символы

            isPasswordSimple: false, //Распространен ли пароль
            isEmailTaken: false, //Зарегистрирован ли такой адрес
            isEmailWrong: false, //Введ ли неправильный email
            phoneSize: true, //Подходит ли номер телефона
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeInputs = this.handleChangeInputs.bind(this)
        this.handleFindKey = this.handleFindKey.bind(this)
    }

    handleChange(e) {
        let name = e.target.name
        let value = e.target.value

        this.setState({
            [name]: value,
        })
    }

    handleSubmit() {
        let tel = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/
        let mail = /^[\w-\d*]+@[\w\d]+(\.\w{2,4})$/
        let ok = tel.test(this.state.phone_number)
        console.log(ok)
        if(this.state.first_name === '' || this.state.last_name === '' || this.state.phone_number === '' || this.state.email === '' || this.state.password === '') {
            this.setState({
                isEmptyInputs: true
            })
        }
        else if(this.state.phone_number.length < 10 || !ok) {
            this.setState({
                phoneSize: false
            })
        }
        else if(this.state.password.length < 8 || !isNaN(this.state.password)) {
            this.setState({
                isPasswordSize: true,
            })
        }
        else if(!mail.test(this.state.email)) {
            this.setState({
                isEmailWrong: true,
            })
        }

        else {
            this.props.registration(this.state.email, this.state.password, this.state.email, this.state.last_name, this.state.first_name, this.state.middle_name, this.state.phone_number)
            this.setState({
                isConfirm: true
            })
        }
    }

    handleChangeInputs() {
        this.setState({
            isConfirm: false,
            isEmptyInputs: false,
            isPasswordSize: false,
            isPasswordSimple: false,
            isEmailWrong: false,
            phoneSize: true,
        })
    }

    handleFindKey(e) {
        if(e.keyCode === 13) { // Регистрация с нажатием enter
            this.handleSubmit()
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.isPasswordSimple !== this.props.isPasswordSimple && this.state.isPasswordSimple !== this.props.isPasswordSimple ) {
            this.setState({
                isPasswordSimple: this.props.isPasswordSimple,
                isConfirm: false,
            })
        }
        if(prevProps.isEmailTaken !== this.props.isEmailTaken && this.state.isEmailTaken !== this.props.isEmailTaken ) {
            this.setState({
                isEmailTaken: this.props.isEmailTaken,
                isConfirm: false,
            })
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <>
                {
                    this.props.isLogin ? <Redirect to="/profile"/>
                        :
                            (this.state.isConfirm && !this.state.isPasswordSimple && !this.state.isEmailTaken)
                                ?
                                <div className={s.confirm}>
                                    На адрес <span className={s.email}>{this.state.email}</span> отправлено письмо для активации аккаунта
                                </div>
                                :
                                <div className={'form__outer'}>
                                    <div className={'form__inner'}>
                                        <h3 className={'form__title'}>Регистрация</h3>

                                        <Input text={'Фамилия'} type={'text'} name={'last_name'} handleFindKey={this.handleFindKey} handleChange={this.handleChange}
                                               value={this.state.last_name} handleFocus={this.handleChangeInputs} required={true}/>
                                        <Input text={'Имя'} type={'text'} name={'first_name'} handleFindKey={this.handleFindKey} handleChange={this.handleChange}
                                               value={this.state.first_name} handleFocus={this.handleChangeInputs} required={true}/>
                                        <Input text={'Отчество'} type={'text'} name={'middle_name'} handleFindKey={this.handleFindKey} handleChange={this.handleChange}
                                               value={this.state.middle_name} handleFocus={this.handleChangeInputs} required={false}/>
                                        <Input text={'Номер телефона'} type={'tel'} name={'phone_number'} handleFindKey={this.handleFindKey}
                                               handleChange={this.handleChange} value={this.state.phone_number} handleFocus={this.handleChangeInputs} required={true}/>
                                        <Input text={'Email'} type={'email'} name={'email'} handleFindKey={this.handleFindKey} handleChange={this.handleChange}
                                               value={this.state.email} handleFocus={this.handleChangeInputs} required={true}/>
                                        <Input text={'Пароль'} type={'password'} name={'password'} handleFindKey={this.handleFindKey}
                                               handleChange={this.handleChange} value={this.state.password} handleFocus={this.handleChangeInputs} required={true}/>

                                        {
                                            this.state.isEmptyInputs &&
                                            <div className={'form__wrong'}>
                                                Пожалуйста, заполните обязательные поля
                                            </div>
                                        }
                                        {
                                            this.state.isPasswordSize &&
                                            <div className={'form__wrong'}>
                                                Пароль должен быть длиннее 7 символов и содержать латинские буквы
                                            </div>
                                        }
                                        {
                                            this.state.isPasswordSimple &&
                                            <div className={'form__wrong'}>
                                                Пароль слишком распространен
                                            </div>
                                        }
                                        {
                                            this.state.isEmailTaken &&
                                            <div className={'form__wrong'}>
                                                Данный адрес уже занят
                                            </div>
                                        }
                                        {
                                            this.state.isEmailWrong &&
                                            <div className={'form__wrong'}>
                                                Пожалуйста, введите корректный адрес эл. почты
                                            </div>
                                        }
                                        {
                                            !this.state.phoneSize &&
                                            <div className={'form__wrong'}>
                                                Пожалуйста, введите корректный номер телефона
                                            </div>
                                        }

                                        <BeigeButton text={'Зарегистрироваться'} handleSubmit={this.handleSubmit}/>
                                        <TransparentButton text={'Войти в личный кабинет'} link={'/login'}/>
                                    </div>
                                </div>
                }
            </>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        isLogin: state.auth.isLogin,
        isPasswordSimple: state.auth.isPasswordSimple,
        isEmailTaken: state.auth.isEmailTaken,
    }
}

export default connect(mapStateToProps,{registration})(Register);
