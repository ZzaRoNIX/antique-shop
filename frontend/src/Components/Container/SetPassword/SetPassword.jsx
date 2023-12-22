import React from 'react';
import {connect} from "react-redux";
import './../../../Common/style.css'
import Input from "../../../Common/Input/Input";
import BeigeButton from "../../../Common/BeigeButton/BeigeButton";
import TransparentButton from "../../../Common/TransparentButton/TransparentButton";
import {setPassword, setPasswordConditions} from "../../../redux/authentication";
import {Redirect} from "react-router-dom";

class SetPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            current_password: "",
            new_password: "",
            re_new_password: "",

            //Валидация
            isSetPasswordRight: false, //Если успешно сменил пароль
            isCurrentPasswordWrong: false, //Если текущий пароль неправильный
            isPasswordsMatch: true, //Если пароли совпадают
            isPasswordSimple: false, //Если пароль распространен
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangePasswordsMatch = this.handleChangePasswordsMatch.bind(this)
    }

    handleChange(e) {
        let name = e.target.name
        let value = e.target.value

        this.setState({
            [name]: value,
        })
    }

    handleSubmit() {
        if(this.state.new_password === this.state.re_new_password) {
            this.props.setPassword(this.state.current_password, this.state.new_password, this.state.re_new_password)
        }
        else {
            this.setState({
                isPasswordsMatch: false,
            })
        }
    }

    handleChangePasswordsMatch() {
        this.setState({
            isPasswordsMatch: true,
            isCurrentPasswordWrong: false,
        })
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.isSetPasswordRight !== this.props.isSetPasswordRight) {
            this.setState({
                isSetPasswordRight: this.props.isSetPasswordRight
            })
        }
        if(prevProps.isCurrentPasswordWrong !== this.props.isCurrentPasswordWrong) {
            this.setState({
                isCurrentPasswordWrong: this.props.isCurrentPasswordWrong
            })
        }
        if(prevProps.isPasswordSimple !== this.props.isPasswordSimple) {
            this.setState({
                isPasswordSimple: this.props.isPasswordSimple
            })
        }
    }

    componentWillUnmount() {
        this.props.setPasswordConditions()
    }

    render() {
        return (
            <>
                {
                    !this.props.isLogin ? <Redirect to="/login" />
                        :
                        <div className={'form__outer'}>
                            <div className={'form__inner'}>
                                <h3 className={'form__title'}>Изменение пароля</h3>

                                <Input text={'Текущий пароль'} type={'password'} name={'current_password'} handleFocus={this.handleChangePasswordsMatch} handleChange={this.handleChange} value={this.state.current_password} required={true}/>
                                <Input text={'Новый пароль'} type={'password'} name={'new_password'} handleFocus={this.handleChangePasswordsMatch} handleChange={this.handleChange} value={this.state.new_password} required={true}/>
                                <Input text={'Повторите пароль'} type={'password'} name={'re_new_password'} handleFocus={this.handleChangePasswordsMatch} handleChange={this.handleChange} value={this.state.re_new_password} required={true}/>

                                {
                                    !this.state.isPasswordsMatch &&
                                    <div className={'form__wrong'}>
                                        Пароли не совпадают
                                    </div>
                                }
                                {
                                    this.state.isCurrentPasswordWrong &&
                                    <div className={'form__wrong'}>
                                        Пароль неправильный
                                    </div>
                                }

                                {
                                    this.state.isSetPasswordRight &&
                                    <div className={'form__right'}>
                                        Пароль успешно изменен
                                    </div>
                                }

                                {
                                    this.state.isPasswordSimple &&
                                    <div className={'form__wrong'}>
                                        Пароль слишком распространен
                                    </div>
                                }

                                <BeigeButton text={'Изменить пароль'} handleSubmit={this.handleSubmit} />
                                <TransparentButton text={'Вернуться в личный кабинет'} link={'/profile'}/>
                            </div>
                        </div>
                }
            </>
        );
    }

}

let mapStateToProps = (state) => {
    return {
        isSetPasswordRight: state.auth.isSetPasswordRight,
        isCurrentPasswordWrong: state.auth.isCurrentPasswordWrong,
        isLogin: state.auth.isLogin,
        isPasswordSimple: state.auth.isPasswordSimple,
    }
}

export default connect(mapStateToProps,{setPassword, setPasswordConditions})(SetPassword);
