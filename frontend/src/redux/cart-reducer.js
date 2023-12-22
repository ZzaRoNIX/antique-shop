import {cartApi} from "../api/api";
import {account} from "./authentication";

const ADD_ITEM_COUNT = 'ADD_ITEM_COUNT'
const TOGGLE_IS_CHECKING = 'TOGGLE_IS_CHECKING'
const DELETE_ITEM = 'DELETE_ITEM'
const UP_TOTAL_PRICE = 'UP_TOTAL_PRICE'
const DOWN_TOTAL_PRICE = 'DOWN_TOTAL_PRICE'
const TOGGLE_ORDER = 'TOGGLE_ORDER'
const DELETE_CART_DATA = 'DELETE_CART_DATA'

let initialState = {
    cartData: [],
    totalPrice: 0,
    isChecked: true,
    isOrderTrue: false, //Если заказ создан успешно
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM_COUNT:
            return {
                ...state,
                cartData: [...state.cartData, {
                    id: action.id,
                    img_1: action.img_1,
                    name: action.name,
                    price: action.price,
                    description: action.description,
                    categoryName: action.categoryName,
                    sale_price: action.sale_price,
                    is_contract_price: action.is_contract_price,
                }],
                isChecked: false
            }
        case DELETE_ITEM:
            return {
                ...state,
                cartData: state.cartData.filter(
                    (c) => {
                        return c.id !== action.id
                    }
                )
            }
        case UP_TOTAL_PRICE:
            switch (action.is_contract_price){
                case true:
                    return {
                        ...state
                }
                case false:
                    switch (action.sale_price) {
                        case null:
                            return {
                                ...state,
                                totalPrice: state.totalPrice + action.price,
                            }
                        default:
                            return {
                                ...state,
                                totalPrice: state.totalPrice + action.sale_price,
                            }
                    }
                default:
                    return {
                        ...state,
                }
            }
        case DOWN_TOTAL_PRICE:
            switch (action.is_contract_price){
                case true:
                    return {
                        ...state
                    }
                case false:
                    switch (action.sale_price) {
                        case null:
                            return {
                                ...state,
                                totalPrice: state.totalPrice - action.price,
                            }
                        default:
                            return {
                                ...state,
                                totalPrice: state.totalPrice - action.sale_price,
                            }
                    }
                default:
                    return {
                        ...state,
                    }
            }
        case TOGGLE_IS_CHECKING: {
            return {
                ...state,
                isChecked: action.isChecked
            }
        }
        case TOGGLE_ORDER: {
            return {
                ...state,
                isOrderTrue: action.isOrderTrue
            }
        }
        case DELETE_CART_DATA: {
            return {
                ...state,
                cartData: [],
                totalPrice: 0,
            }
        }
        default:
            return state;
    }
}

export const addItemCount = (id, img_1, name, price, description, categoryName, sale_price, is_contract_price) => ({type: ADD_ITEM_COUNT, id, img_1, name, price, description, categoryName, sale_price, is_contract_price}) //Добавление товара в корзину
export const deleteItem = (id, price) => ({type: DELETE_ITEM, id, price}) //Удаление из корзины
export const upTotalPrice = (price, sale_price, is_contract_price) => ({type: UP_TOTAL_PRICE, price, sale_price, is_contract_price}) //Изменение цены
export const downTotalPrice = (price, sale_price, is_contract_price) => ({type: DOWN_TOTAL_PRICE, price, sale_price, is_contract_price}) //Изменение цены
export const toggleIsChecking = (isChecked) => ({type: TOGGLE_IS_CHECKING, isChecked}) //Проверил ли пользователь корзину
export const toggleIsOrderTrue = (isOrderTrue) => ({type: TOGGLE_ORDER, isOrderTrue}) //Уведомление об успешном заказе
export const deleteCartData = () => ({type: DELETE_CART_DATA}) //Удаление данных корзины при успешном заказе

export const createOrder = (description, delivery_type, product_ids) => { //Создание заказа
    return (dispatch) => {
        cartApi.createOrder(description, delivery_type, product_ids)
            .then(response => response.json()
                .then(result => {
                    // console.log('new order', result)
                    if(result) {
                        dispatch(toggleIsOrderTrue(true))
                        dispatch(deleteCartData())
                        dispatch(account()) //Получение новых данных аккаунта
                    }
                }))
    }
}

export default cartReducer
