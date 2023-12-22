import React from 'react';
import {connect} from "react-redux";
import Sidebar from "./Sidebar";
import {logout} from "../../../redux/authentication";

class SidebarContainer extends React.Component {

    componentDidMount() {

    }

    render() {
        return (
            <Sidebar isChecked={this.props.isChecked} logout={this.props.logout} isLogin={this.props.isLogin}/>
        );
    }

}

let mapStateToProps = (state) => {
    return {
        isLogin: state.auth.isLogin,
        isChecked: state.cart.isChecked,
    }
}

export default connect(mapStateToProps,{logout})(SidebarContainer);
