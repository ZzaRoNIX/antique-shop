import React from 'react';
import {connect} from "react-redux";
import Product from "./Product";
import {withRouter} from "react-router-dom";
import {getProductData} from "../../../../redux/product-reducer";
import {addItemCount, deleteItem, downTotalPrice, upTotalPrice} from "../../../../redux/cart-reducer";
import Preloader from "../../../../Common/Preloader/Preloader";

class ProductContainer extends React.Component {

    componentDidMount() { //Получение информации по конкретному каталогу по конкретной странице
        this.props.getProductData(this.props.match.params.productId)
        this.props.changeBreadcrumbs(this.props.productData.name) //Установка хлебных крошек
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.productData.name !== this.props.productData.name){
            this.props.changeBreadcrumbs(this.props.productData.name) //Изменение хлебных крошек
        }
    }

    render() {

        if(!this.props.productData.images) { //Если не пришел массив картинок
            return <Preloader />
        }

        return (
            <Product catalogId={this.props.match.params.id}
                     addItemCount={this.props.addItemCount}
                     upTotalPrice={this.props.upTotalPrice}
                     cartData={this.props.cartData}
                     productId={this.props.match.params.productId}
                     productData={this.props.productData}
                     deleteItem={this.props.deleteItem}
                     downTotalPrice={this.props.downTotalPrice}
            />
        );
    }

}

let mapStateToProps = (state) => {
    return {
        productData: state.product.productData,
        cartData: state.cart.cartData,
    }
}

let WithUrlProductContainer = withRouter(ProductContainer)

export default connect(mapStateToProps,{getProductData, addItemCount, upTotalPrice, deleteItem, downTotalPrice})(WithUrlProductContainer);
