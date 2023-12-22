import {productApi} from "../api/api";

const SET_PRODUCT_DATA = 'SET_PRODUCT_DATA'

let initialState = {
    productData: {},
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCT_DATA:
            return {
                ...state,
                productData: action.productData,
            }
        default:
            return state;
    }
}

export const setProductData = (productData) => ({type: SET_PRODUCT_DATA, productData})

export const getProductData = (productId) => { //Получение информации по конкретному товару
    return async (dispatch) => {
        let response = await productApi.getProductData(productId)
        // console.log('productData', response.data)
        if(response.status === 200) {
            dispatch(setProductData(response.data))
        }
    }
}

export default productReducer
