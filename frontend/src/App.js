import React from 'react';
import './App.css';
// import Preloader from "./Common/Preloader/Preloader";
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import './Common/style.css'
import Container from "./Components/Container/Container";
import {account} from "./redux/authentication";
import Preloader from "./Common/Preloader/Preloader";

class App extends React.Component {


    componentDidMount() {
        this.props.account()
    }

    render() {

        if(!this.props.isInitialized) {
            return <Preloader />
        }

        return (
            <Switch>
                <Route path='/mailru-domainqQIgiavSJO6mEX3H.html' render={ () => <div>mailru-domain: qQIgiavSJO6mEX3H</div>} />
                <Container />
            </Switch>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        isInitialized: state.auth.isInitialized,
    }
}

export default connect(mapStateToProps, {account})(App);
