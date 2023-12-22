import React from 'react';
import {connect} from "react-redux";
import {Route, Switch, Redirect} from "react-router-dom";
import './../../Common/style.css'
import CatalogContainer from "./Catalog/CatalogContainer";
import NavbarContainer from "../Navbar/NavbarContainer";
import FooterContainer from "../Footer/FooterContainer";
import {getCatalogList} from "../../redux/catalog-reducer";
import Preloader from "../../Common/Preloader/Preloader";
import MainContainer from "./Main/MainContainer";
import CartContainer from "./Cart/CartContainer";
import Information from "./Information/Information";
import Login from "./Login/Login";
import Register from "./Register/Register";
import ProfileContainer from "./Profile/ProfileContainer";
import Activate from "./Activate";
import SetPassword from "./SetPassword/SetPassword";
import ResetPasswordConfirm from "./ResetPasswordConfirm";
import ResetPassword from "./ResetPassword/ResetPassword";
import {account} from "../../redux/authentication";


class Container extends React.Component {

    componentDidMount() {
        this.props.getCatalogList()
    }

    render() {

        if(this.props.catalogList.length === 0) {
            return <Preloader />
        }

        return (
            <>
                <div className='outer'>
                    <NavbarContainer />
                    <div className='container'>
                        <Switch>
                            <Route exact path='/' render={ () => <Redirect to={`/catalog`} />} />
                            <Route exact path='/main' render={ () => <MainContainer />} />

                            <Route exact path='/catalog/' render={ () => <Redirect to={`/catalog/${this.props.catalogList[0].id}`}/>} />
                            <Route path='/catalog/:id?' render={ () => <CatalogContainer />} />

                            <Route path='/profile/' render={ () => <ProfileContainer />} />
                            <Route path='/cart/' render={ () => <CartContainer />} />

                            <Route path='/information' render={ () => <Information />} />

                            <Route path='/login' render={ () => <Login />} />
                            <Route path='/register' render={ () => <Register />} />
                            <Route path='/activate' render={ () => <Activate />} />
                            <Route path='/set_password' render={ () => <SetPassword />} />

                            <Route path='/reset_password' render={ () => <ResetPassword />} />
                            <Route path='/password/reset/confirm' render={ () => <ResetPasswordConfirm />} />

                            <Route path='*' render={ () => <div> Страница не найдена </div>} />

                            {/*<Route path='/test' render={ () => <TestContainer />} />*/}
                        </Switch>
                    </div>
                    <FooterContainer />
                </div>
            </>
        );
    }

}

let mapStateToProps = (state) => {
    return {
        catalogList: state.catalog.catalogList,
        isAuth: state.auth.isAuth,
    }
}

export default connect(mapStateToProps,{getCatalogList, account})(Container);
