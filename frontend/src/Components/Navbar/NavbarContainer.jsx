import React from 'react';
import {connect} from "react-redux";
import Navbar from "./Navbar";

class NavbarContainer extends React.Component {

    componentDidMount() {

    }

    render() {
        return (
            <Navbar isChecked={this.props.isChecked}/>
        );
    }

}

let mapStateToProps = (state) => {
    return {
        isChecked: state.cart.isChecked,
    }
}

export default connect(mapStateToProps,{})(NavbarContainer);
