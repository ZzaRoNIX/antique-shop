import React from 'react';
import {connect} from "react-redux";
import Footer from "./Footer";

class FooterContainer extends React.Component {

    componentDidMount() {

    }

    render() {
        return (
            <Footer />
        );
    }

}

let mapStateToProps = (state) => {
    return {
    }
}

export default connect(mapStateToProps,{})(FooterContainer);
