import React from 'react';
import {connect} from "react-redux";
import './../../../Common/style.css'
import Input from "../../../Common/Input/Input";
import BeigeButton from "../../../Common/BeigeButton/BeigeButton";
import TransparentButton from "../../../Common/TransparentButton/TransparentButton";
import {login} from "../../../redux/authentication";
import {NavLink, Redirect} from "react-router-dom";
import s from "./Login.module.css";


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            isEmptyInputs: false, //Все ли поля пустые
            isLoginWrong: false, //Если ошибка при логине
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
        if(this.state.email === "" || this.state.password === "") {
            this.setState({
                isEmptyInputs: true //Поля пустые
            })
        }
        else this.props.login(this.state.email, this.state.password)
    }

    handleFindKey(e) {
        if(e.keyCode === 13) { // Логин с нажатием enter
            this.handleSubmit()
        }
    }

    handleChangeInputs() {
        this.setState({
            isEmptyInputs: false,
        })
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.isLoginWrong !== this.props.isLoginWrong) {
            this.setState({
                isLoginWrong: this.props.isLoginWrong,
            })
        }
    }

    render() {
        return (
            <>
                {
                    this.props.isLogin ? <Redirect to="/profile" />
                    :
                        <div className={'form__outer'}>
                            <div className={'form__inner'}>
                                <h3 className={'form__title'}>Вход в личный кабинет</h3>

                                <Input text={'Email'} type={'email'} name={'email'} handleFocus={this.handleChangeInputs} handleFindKey={this.handleFindKey} handleChange={this.handleChange} value={this.state.email} required={true}/>
                                <Input text={'Пароль'} type={'password'} name={'password'} handleFocus={this.handleChangeInputs} handleFindKey={this.handleFindKey} handleChange={this.handleChange} value={this.state.password} required={true}/>

                                {
                                    this.state.isEmptyInputs &&
                                    <div className={'form__wrong'}>
                                        Все поля обязательны для заполнения
                                    </div>
                                }

                                {
                                    this.state.isLoginWrong &&
                                        <div className={'form__wrong'}>
                                            Неправильный логин или пароль
                                        </div>
                                }

                                <NavLink className={s.forgot} to={'/reset_password'}>Забыли пароль?</NavLink>
                                <BeigeButton text={'Войти в личный кабинет'} handleSubmit={this.handleSubmit} />
                                <TransparentButton text={'Зарегистрироваться'} link={'/register'}/>
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
        isLoginWrong: state.auth.isLoginWrong,
    }
}

export default connect(mapStateToProps,{login})(Login);
