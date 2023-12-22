import React from 'react';
import {connect} from "react-redux";
import {getProductData} from "../../../../redux/product-reducer";
import Purchase from "./Purchase";
import {withRouter} from "react-router-dom";
import Preloader from "../../../../Common/Preloader/Preloader";
import {createOrder, toggleIsOrderTrue} from "../../../../redux/cart-reducer";

class PurchaseContainer extends React.Component {

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
        let product_ids = []
        product_ids.push(this.props.productData.id)
        this.props.createOrder(this.state.description, this.state.delivery_type.value, product_ids)
    }

    handleChange(e) {
        let name = e.target.name
        let value = e.target.value
        this.setState({
            [name]: value
        })
    }

    onSelectionChange(e) {
        this.setState({
            delivery_type: e,
        })
    }

    componentDidMount() { //Получение информации по конкретному товару
        this.props.getProductData(this.props.match.params.productId)
    }

    componentWillUnmount() {
        this.props.toggleIsOrderTrue(false)
    }

    render() {

        if(!this.props.productData.images) { //Если не пришли картинки
            return <Preloader />
        }

        return (
            <Purchase handleChange={this.handleChange}
                      handleSubmit={this.handleSubmit}
                      onSelectionChange={this.onSelectionChange}
                      catalogId={this.props.match.params.id}
                      isLogin={this.props.isLogin}
                      isOrderTrue={this.props.isOrderTrue}
                      description={this.state.description}
                      delivery_type={this.state.delivery_type}
                      productData={this.props.productData} />
        );
    }
}

let mapStateToProps = (state) => {
    return {
        productData: state.product.productData,
        isOrderTrue: state.cart.isOrderTrue,
        isLogin: state.auth.isLogin,
    }
}

let WithUrlPurchaseContainer = withRouter(PurchaseContainer)

export default connect(mapStateToProps,{getProductData, createOrder, toggleIsOrderTrue})(WithUrlPurchaseContainer);
