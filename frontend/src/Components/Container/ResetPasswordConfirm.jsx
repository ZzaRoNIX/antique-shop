import React from 'react';
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import Input from "../../Common/Input/Input";
import BeigeButton from "../../Common/BeigeButton/BeigeButton";
import {resetPasswordConfirm} from "../../redux/authentication";
import TransparentButton from "../../Common/TransparentButton/TransparentButton";

class ResetPasswordConfirm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            uid: "",
            token: "",
            new_password: "",
            re_new_password: "",

            //Валидация
            isSetPasswordRight: false, //Если успешно сменил пароль
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
            this.props.resetPasswordConfirm(this.state.uid, this.state.token, this.state.new_password, this.state.re_new_password)
            this.setState({
                isSetPasswordRight: true,
            })
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
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.isPasswordSimple !== this.props.isPasswordSimple) {
            this.setState({
                isPasswordSimple: this.props.isPasswordSimple
            })
        }
    }

    componentDidMount() {
        const url = new URLSearchParams(this.props.location.search)
        this.setState({
            uid: url.get('uid'),
            token: url.get('token'),
        })
    }

    render() {

        if(this.props.isLogin) {
            return <Redirect to="/catalog" />
        }
        if(this.state.isSetPasswordRight && !this.state.isPasswordSimple) {
            return <Redirect to="/login" />
        }

        return (
            <>
                <div className={'form__outer'}>
                    <div className={'form__inner'}>
                        <h3 className={'form__title'}>Восстановление пароля</h3>

                        <Input text={'Новый пароль'} type={'password'} name={'new_password'} handleFocus={this.handleChangePasswordsMatch} handleChange={this.handleChange} value={this.state.new_password} required={true}/>
                        <Input text={'Повторите пароль'} type={'password'} name={'re_new_password'} handleFocus={this.handleChangePasswordsMatch} handleChange={this.handleChange} value={this.state.re_new_password} required={true}/>

                        {
                            !this.state.isPasswordsMatch &&
                            <div className={'form__wrong'}>
                                Пароли не совпадают
                            </div>
                        }
                        {
                            (this.state.isSetPasswordRight && !this.state.isPasswordSimple) &&
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
                        <TransparentButton text={'Войти'} link={'/login'}/>
                    </div>
                </div>
            </>
        );
    }

}

let mapStateToProps = (state) => {
    return {
        isLogin: state.auth.isLogin,
        isPasswordSimple: state.auth.isPasswordSimple,
    }
}

let WithUrlResetPasswordConfirm = withRouter(ResetPasswordConfirm)

export default connect(mapStateToProps,{resetPasswordConfirm})(WithUrlResetPasswordConfirm);
