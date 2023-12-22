import {catalogApi} from "../api/api";

const SET_CATALOG_LIST = 'SET_CATALOG_LIST'
const SET_CATALOG_DATA = 'SET_CATALOG_DATA'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'

let initialState = {
    catalogList: [],
    catalogData: [],
    isInitialized: false,
    isFetch: false,
    count: "",
    pageSize: 12, //сколько контента будет на странице
    currentPage: 1,
}

const catalogReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CATALOG_LIST:
            return {
                ...state,
                catalogList: action.catalogList,
            }
        case SET_CATALOG_DATA:
            return {
                ...state,
                catalogData: action.catalogData.products,
                count: action.catalogData.count,

            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        default:
            return state;
    }
}

export const setCatalogList = (catalogList) => ({type: SET_CATALOG_LIST, catalogList})
export const setCatalogData = (catalogData) => ({type: SET_CATALOG_DATA, catalogData})
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})

export const getCatalogList = () => { //Получения всех групп товаров
    return async (dispatch) => {
        let response = await catalogApi.getCatalogList()
        // console.log('catalogList', response.data)
        if(response.status === 200) {
            dispatch(setCatalogList(response.data))
        }
    }
}
export const getCatalogData = (categoriesId, find_by_letters, pageNumber) => { //Получения товаров по конкретному каталогу
    return async (dispatch) => {
        await catalogApi.getCatalogData(categoriesId, find_by_letters, pageNumber)
            .then(response => {
                // console.log('catalogData', response)
                dispatch(setCatalogData(response))
                dispatch(setCurrentPage(pageNumber))
            })
    }
}

export default catalogReducer
