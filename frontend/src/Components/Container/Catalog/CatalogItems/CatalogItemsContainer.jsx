import React from 'react';
import {connect} from "react-redux";
import CatalogItems from "./CatalogItems";
import {withRouter} from "react-router-dom";
import {getCatalogData} from "../../../../redux/catalog-reducer";
import {addItemCount, deleteItem, downTotalPrice, upTotalPrice} from "../../../../redux/cart-reducer";
import Paginator from "../../../../Common/Paginator/Paginator";

class CatalogItemsContainer extends React.Component {


    componentDidMount() {
        if(this.props.catalogList.length !== 0) { //Получение информации по конкретному каталогу по конкретной странице + поиск
            this.props.getCatalogData(this.props.match.params.id, this.props.find_by_letters, this.props.currentPage)
        }
        this.props.changeBreadcrumbs("") //Очиска хлебных крошек
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if(prevProps.catalogList !== this.props.catalogList) { //Получение информации по конкретному каталогу по конкретной странице + поиск
            this.props.getCatalogData(this.props.match.params.id, this.props.find_by_letters, this.props.currentPage)
        }
        if(prevProps.match.params.id !== this.props.match.params.id) { //Получение информации по конкретному каталогу по конкретной странице + поиск
            this.props.getCatalogData(this.props.match.params.id, this.props.find_by_letters, this.props.currentPage)
        }
    }

    render() {
        return (
            <>
                <CatalogItems addItemCount={this.props.addItemCount}
                              cartData={this.props.cartData}
                              upTotalPrice={this.props.upTotalPrice}
                              deleteItem={this.props.deleteItem}
                              downTotalPrice={this.props.downTotalPrice}
                              catalogData={this.props.catalogData} />

                <Paginator totalItemsCount={this.props.count}
                           pageSize={this.props.pageSize}
                           currentPage={this.props.currentPage}
                           onPageChanged={this.props.onPageChanged}
                />
            </>
        );
    }

}

let mapStateToProps = (state) => {
    return {
        catalogList: state.catalog.catalogList,
        catalogData: state.catalog.catalogData,
        cartData: state.cart.cartData,
        count: state.catalog.count,
        pageSize: state.catalog.pageSize,
    }
}

let WithCatalogItemsUrl = withRouter(CatalogItemsContainer)


export default connect(mapStateToProps,{getCatalogData, addItemCount, upTotalPrice, deleteItem, downTotalPrice})(WithCatalogItemsUrl);
