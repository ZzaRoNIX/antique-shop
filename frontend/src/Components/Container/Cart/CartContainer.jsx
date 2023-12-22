import React from 'react';
import {connect} from "react-redux";
import Cart from "./Cart";
import {
    createOrder,
    deleteItem,
    downTotalPrice,
    toggleIsChecking,
    toggleIsOrderTrue
} from "../../../redux/cart-reducer";
import {Redirect} from "react-router-dom";

class CartContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            description: "",
            delivery_type: {
                value: "СДЭК",
                label: "СДЭК",
            },
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onSelectionChange = this.onSelectionChange.bind(this)
    }

    handleSubmit() {
        if(this.props.cartData.length > 0) {
            let product_ids = this.props.cartData.map(c => {
                return c.id
            })
            this.props.createOrder(this.state.description, this.state.delivery_type.value, product_ids)
        }
    }

    onSelectionChange(e) {
        this.setState({
            delivery_type: e,
        })
    }

    handleChange(e) {
        let name = e.target.name
        let value = e.target.value
        this.setState({
            [name]: value
        })
    }

    componentDidMount() {
        this.props.toggleIsChecking(true)
    }

    componentWillUnmount() {
        this.props.toggleIsOrderTrue(false)
    }

    render() {


        if(this.props.isOrderTrue) {
            return <Redirect to={'/profile'} />
        }


        return (
            <Cart handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                  onSelectionChange={this.onSelectionChange}
                  deleteItem={this.props.deleteItem}
                  isLogin={this.props.isLogin}
                  description={this.state.description}
                  delivery_type={this.state.delivery_type}
                  cartData={this.props.cartData}
                  totalPrice={this.props.totalPrice}
                  downTotalPrice={this.props.downTotalPrice} />
        );
    }

}

let mapStateToProps = (state) => {
    return {
        cartData: state.cart.cartData,
        totalPrice: state.cart.totalPrice,
        isOrderTrue: state.cart.isOrderTrue,
        isLogin: state.auth.isLogin,
    }
}

export default connect(mapStateToProps,{toggleIsChecking, deleteItem, downTotalPrice, createOrder, toggleIsOrderTrue})(CartContainer);
