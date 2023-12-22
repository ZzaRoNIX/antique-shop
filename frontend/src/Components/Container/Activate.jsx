import React from 'react';
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {activation} from "../../redux/authentication";

class Activate extends React.Component {

    componentDidMount() {
        const url = new URLSearchParams(this.props.location.search)
        let uid = url.get('uid');
        let token = url.get('token');
        this.props.activation(uid, token)
    }

    render() {

        if(this.props.isLogin) {
            return <Redirect to="/catalog" />
        }

        if(this.props.isFetch) {
            return <></>
        }

        return (
            <>
                <Redirect to={'/login'} />
            </>
        );
    }

}

let mapStateToProps = (state) => {
    return {
        isFetch: state.auth.isFetch,
        isLogin: state.auth.isLogin,
    }
}

let WithUrlActivate = withRouter(Activate)

export default connect(mapStateToProps,{activation})(WithUrlActivate);
