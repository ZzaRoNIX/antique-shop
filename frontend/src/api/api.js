import axios from "axios";

const debug = true //true - localhost

let baseUrl = ""

if (debug) {
    baseUrl = 'http://127.0.0.1:8000/'
}

else {
    baseUrl = 'https://artworldshop.ru/'
}

const getOptions = (mass, auth, method) => { //Если нужен Bearer token, то auth = true
    let formdata = new FormData();

    mass.map(m => {
        return formdata.append(m.name, m.value);
    })

    let requestOptions = {
        method: method,
        body: formdata,
        redirect: 'follow',
    }
    let requestAuthOptions = {
        method: method,
        body: formdata,
        headers: getHeaders(),
        redirect: 'follow',
    }
    if(!auth) return requestOptions;
    else return requestAuthOptions;
}

const getHeaders = () => {
    const accessToken = 'Bearer  ' + localStorage.getItem('accessToken')
    let myHeaders = new Headers();
    myHeaders.append("Authorization", accessToken);
    return myHeaders
}

export const catalogApi = {

    getCatalogList() { //Список категорий товаров
        return axios.get(baseUrl + `api/categories`)
            .then(response => response)
    },
    getCatalogData(categoriesId, find_by_letters, pageNumber) { //Товары по конкретной категории
        let options = getOptions([{name: 'find_by_letters',value: find_by_letters}], false, 'POST')
        return fetch(baseUrl + `api/categories/${categoriesId}?page=${pageNumber}`, options)
            .then(response => response.json())
    },

}

export const productApi = {
    getProductData(productId) { //Информация по товару по id
        return axios.get(baseUrl + `api/products/${productId}`)
            .then(response => response)
    },

}

export const cartApi = {
    createOrder(description, delivery_type, product_ids) { //Создание заказа
        const accessToken = 'Bearer  ' + localStorage.getItem('accessToken')
        let myHeaders = new Headers();

        myHeaders.append("Authorization", accessToken);
        myHeaders.append("Content-Type", "application/json");
        let raw = JSON.stringify({ "description":description,"delivery_type":delivery_type,"product_ids": product_ids });
        let requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        }
        return fetch(baseUrl + `api/new_order`, requestOptions)
    }
}

export const authApi = {
    account() {//Проверка пользователя
        const accessToken = 'Bearer  ' + localStorage.getItem('accessToken')
        let myHeaders = new Headers();
        myHeaders.append("Authorization", accessToken);
        let requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: 'follow',
        }
        return fetch(baseUrl + `api/account`, requestOptions)
    },
    accountChange(last_name, first_name, middle_name, phone_number) {//Изменение данных пользователя
        let options = getOptions([{name: 'last_name', value: last_name}, {name: 'first_name', value: first_name}, {name: 'middle_name', value: middle_name}, {name: 'phone_number', value: phone_number}], true,  'PUT')
        return fetch(baseUrl + `api/account`, options)
    },
    login(username, password) {//Логин
        let options = getOptions([{name: 'username', value: username}, {name: 'password', value: password}], false,  'POST')
        return fetch(baseUrl + `auth/jwt/create/`, options)
    },
    register(username, password, email, last_name, first_name, middle_name, phone_number) { //Регистрация
        let options = getOptions([{name: 'username', value: username}, {name: 'password', value: password}, {name: 'email', value: email},
            {name: 'last_name', value: last_name}, {name: 'first_name', value: first_name}, {name: 'middle_name', value: middle_name}, {name: 'phone_number', value: phone_number}], false,  'POST')
        return fetch(baseUrl + `auth/users/`, options)
    },
    activation(uid, token) { //Активация аккаунта
        let options = getOptions([{name: 'uid', value: uid}, {name: 'token', value: token}], false,  'POST')
        return fetch(baseUrl + `auth/users/activation/`, options)
    },
    setPassword(current_password, new_password, re_new_password) { //Смена пароля
        let options = getOptions([{name: 'new_password', value: new_password}, {name: 're_new_password', value: re_new_password}, {name: 'current_password', value: current_password}], true,  'POST')
        return fetch(baseUrl + `auth/users/set_password/`, options)
    },
    resetPassword(email) { //Смена пароля
        let options = getOptions([{name: 'email', value: email}], false,  'POST')
        return fetch(baseUrl + `auth/users/reset_password/`, options)
    },
    accountRecovery(email) { //Проверка email пользователя
        let options = getOptions([{name: 'email', value: email}], false,  'POST')
        return fetch(baseUrl + `api/account_recovery`, options)
    },
    resetPasswordConfirm(uid, token, new_password, re_new_password) { //Смена пароля
        let options = getOptions([{name: 'uid', value: uid}, {name: 'token', value: token}, {name: 'new_password', value: new_password}, {name: 're_new_password', value: re_new_password}], false,  'POST')
        return fetch(baseUrl + `auth/users/reset_password_confirm/`, options)
    },
}
