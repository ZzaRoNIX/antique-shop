import React from 'react';
import {connect} from "react-redux";
import s from './Profile.module.css'
import Profile from "./Profile";
import {NavLink, Redirect} from "react-router-dom";
import Order from "./Order/Order";
import {accountChange, logout} from "../../../redux/authentication";
import Preloader from "../../../Common/Preloader/Preloader";

class ProfileContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            middle_name: "",
            phone_number: "",
            email: "",
            isChanging: false, //Меняется ли профиль
            isEmptyInputs: false, //Все ли поля пустые
            phoneSize: true, //Подходит ли номер телефона
        }
        this.toggleIsChanging = this.toggleIsChanging.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeInputs = this.handleChangeInputs.bind(this)
    }

    toggleIsChanging() {
        if(!this.state.isEmptyInputs) {
            this.setState({
                isChanging: !this.state.isChanging
            })
        }
    }

    handleChange(e) {
        let name = e.target.name
        let value = e.target.value

        this.setState({
            [name]: value,
        })
    }
    handleSubmit() {
        let re = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/
        let ok = re.test(this.state.phone_number)
        if(this.state.first_name === '' || this.state.last_name === '' || this.state.phone_number === '') {
            this.setState({
                isEmptyInputs: true
            })
        }
        else if (this.state.phone_number.length < 10 || !ok) {
            this.setState({
                phoneSize: false
            })
        }
        else {
            this.props.accountChange(this.state.last_name, this.state.first_name, this.state.middle_name, this.state.phone_number)
            this.toggleIsChanging()
        }
    }

    handleChangeInputs() {
        this.setState({
            isEmptyInputs: false,
            phoneSize: true,
        })
    }

    componentDidMount() {
        this.setState({
            first_name: this.props.userData.first_name,
            last_name: this.props.userData.last_name,
            middle_name: this.props.userData.middle_name,
            email: this.props.userData.email,
            phone_number: this.props.userData.phone_number,
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.userData !== this.props.userData) {
            this.setState({
                first_name: this.props.userData.first_name,
                last_name: this.props.userData.last_name,
                middle_name: this.props.userData.middle_name,
                email: this.props.userData.email,
                phone_number: this.props.userData.phone_number,
            })
        }
    }

    render() {

        if(!this.props.userData) {
            return <Preloader />
        }

        return (
            <>
                {
                    !this.props.isLogin ? <Redirect to="/login"/>
                    :
                    <>
                        <div className={s.top}>
                            <NavLink className={`${s.backBtn} ${s.toCatalog}`} to={'/catalog'}>Вернуться к каталогу</NavLink>
                            <div className={`${s.title} ${s.menu}`}>Личный кабинет</div>
                            {
                                this.state.isChanging
                                    ? <div className={`${s.backBtn} ${s.changeProfile}`} onClick={() => {
                                        this.handleSubmit()}
                                    }>Сохранить изменения</div>
                                    : <div className={`${s.backBtn} ${s.changeProfile}`} onClick={this.toggleIsChanging}>Редактировать профиль</div>
                            }
                            <div onClick={this.props.logout} className={`${s.backBtn} ${s.logout}`}>
                                Выход
                            </div>
                        </div>
                        <Profile first_name={this.state.first_name} last_name={this.state.last_name} middle_name={this.state.middle_name} phoneSize={this.state.phoneSize}
                                 phone_number={this.state.phone_number} isEmptyInputs={this.state.isEmptyInputs} email={this.state.email} isChanging={this.state.isChanging}
                                 handleChange={this.handleChange} handleChangeInputs={this.handleChangeInputs} />
                        {
                            this.props.userData.orders &&
                            this.props.userData.orders.length > 0 ?
                            [...this.props.userData.orders].reverse().map(o => {
                                return(
                                    <Order key={o.id} status={o.status} id={o.id} products={o.products} delivery_type={o.delivery_type} description={o.description} />
                                )
                            })
                                :
                                <div className={s.noOrders}>
                                    У Вас ещё нет заказов
                                </div>
                        }

                    </>
                }
            </>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        isLogin: state.auth.isLogin,
        userData: state.auth.userData,
    }
}

export default connect(mapStateToProps,{logout, accountChange})(ProfileContainer);
