import React from 'react';
import {connect} from "react-redux";
import {Switch, withRouter, Route} from "react-router-dom";
import s from './Catalog.module.css'
import Top from "./Top/Top";
import Sidebar from "./Sidebar/Sidebar";
import Preloader from "../../../Common/Preloader/Preloader";
import CatalogItemsContainer from "./CatalogItems/CatalogItemsContainer";
import ProductContainer from "./Product/ProductContainer";
import PurchaseContainer from "./Purchase/PurchaseContainer";
import {getCatalogData} from "../../../redux/catalog-reducer";

class CatalogContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            find_by_letters: "",
            currentCard: "",
            currentPage: "",
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleFindKey = this.handleFindKey.bind(this)
        this.handleFind = this.handleFind.bind(this)
        this.changeBreadcrumbs = this.changeBreadcrumbs.bind(this)
        this.onPageChanged = this.onPageChanged.bind(this)
    }

    onPageChanged = (pageNumber) => { // Поиск по новой странице + изменение текущей
        this.props.getCatalogData(this.props.match.params.id, this.state.find_by_letters, pageNumber);
        this.setState({
            isFetch: false
        })
    }

    handleChange(e) {
        let name = e.target.name
        let value = e.target.value
        this.setState({
            [name]: value
        })
    }

    handleFindKey(e) {
        if(e.keyCode === 13) { // Поиск с нажатием enter
            this.props.getCatalogData(this.props.match.params.id, this.state.find_by_letters, this.state.currentPage)
        }
    }

    handleFind() { //Получение информации по конкретному каталогу по конкретной странице + поиск
        this.props.getCatalogData(this.props.match.params.id, this.state.find_by_letters, this.state.currentPage)
    }

    changeBreadcrumbs(currentCard) {
        this.setState({
            currentCard: currentCard, //установка хлебных крошек
        })
    }

    componentDidMount() {
        this.setState({ //Установка текущей страницы
            currentPage: this.props.currentPage
        })
    }

    render() {

        if(this.props.catalogList.length === 0) { //Пока не пришел список каталогов
            return <Preloader />
        }

        return (
            <>
                <Switch>
                    <Route path='/catalog/:id/:productId/purchase' render={ () => <PurchaseContainer /> } />
                    <>
                        <Top handleFind={this.handleFind} catalogID={this.props.match.params.id} currentCard={this.state.currentCard} handleFindKey={this.handleFindKey} handleChange={this.handleChange} find_by_letters={this.state.find_by_letters}/>
                        <div className={s.content}>
                            {/*Это сайдбар с навигацией*/}
                            <Sidebar catalogList={this.props.catalogList} />

                            <Route exact path='/catalog/:id' render={ () => <CatalogItemsContainer changeBreadcrumbs={this.changeBreadcrumbs}
                                                                                                   find_by_letters={this.state.find_by_letters}
                                                                                                   catalogList={this.props.catalogList}
                                                                                                   currentPage={this.props.currentPage}
                                                                                                   onPageChanged={this.onPageChanged}
                                                                            />}
                            />

                            <Route path='/catalog/:id/:productId' render={ () => <ProductContainer changeBreadcrumbs={this.changeBreadcrumbs} /> } />
                        </div>
                    </>
                </Switch>
            </>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        catalogList: state.catalog.catalogList,
        catalogData: state.catalog.catalogData,
        currentPage: state.catalog.currentPage,
    }

}

let WithCatalogUrl = withRouter(CatalogContainer)

export default connect(mapStateToProps,{getCatalogData})(WithCatalogUrl);
