import React from 'react';
import {connect} from "react-redux";
import './../../../Common/style.css'
import Input from "../../../Common/Input/Input";
import BeigeButton from "../../../Common/BeigeButton/BeigeButton";
import TransparentButton from "../../../Common/TransparentButton/TransparentButton";
import {resetPassword} from "../../../redux/authentication";
import {Redirect} from "react-router-dom";
import s from './ResetPassword.module.css'

class ResetPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            isConfirm: false, //Нажал ли пользователь кнопку "Восстановить"
            isEmptyInputs: false, //Заполнено ли поле
            isEmailExists: true, //Существует ли пользователь с таким адресом
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeInputs = this.handleChangeInputs.bind(this)
    }

    handleChange(e) {
        let name = e.target.name
        let value = e.target.value

        this.setState({
            [name]: value,
        })
    }

    handleSubmit() {
        if(this.state.email === '') {
            this.setState({
                isEmptyInputs: true
            })
        }
        else {
            this.props.resetPassword(this.state.email)
            this.setState({
                isConfirm: true
            })
        }
    }

    handleChangeInputs() {
        this.setState({
            isEmptyInputs: false,
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.isEmailExists !== this.props.isEmailExists) {
            this.setState({
                isEmailExists: this.props.isEmailExists,
            })
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <>
                {
                    this.props.isLogin ? <Redirect to="/catalog"/>
                        :
                            this.state.isConfirm && this.state.isEmailExists
                                ?
                                <div className={s.confirm}>
                                    На адрес <span className={s.email}>{this.state.email}</span> отправлено письмо для восстановления пароля
                                </div>
                                :
                                <div className={'form__outer'}>
                                    <div className={'form__inner'}>
                                        <h3 className={'form__title'}>Введите ваш адрес электронной почты</h3>

                                        <Input text={'Email'} type={'email'} name={'email'} handleChange={this.handleChange}
                                               value={this.state.email} handleFocus={this.handleChangeInputs} required={true}/>

                                        {
                                            this.state.isEmptyInputs &&
                                            <div className={'form__wrong'}>
                                                Пожалуйста, заполните поле
                                            </div>
                                        }
                                        {
                                            !this.state.isEmailExists &&
                                            <div className={'form__wrong'}>
                                                Пользователь с таким адресом не существует
                                            </div>
                                        }

                                        <BeigeButton text={'Восстановить пароль'} handleSubmit={this.handleSubmit}/>
                                        <TransparentButton text={'Вернуться'} link={'/login'}/>

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
        isEmailExists: state.auth.isEmailExists,
    }
}

export default connect(mapStateToProps,{resetPassword})(ResetPassword);
