import * as actionTypes from './actionTypes';
import axios from '../../instances/axiosOrders.js';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.BURGER_PURCHASE_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = error => {
    return {
        type: actionTypes.BURGER_PURCHASE_FAIL,
        error: error
    }
}

export const purchaseBurger = (orderData,token) => {
    return dispatch => {
        purchaseBurgerStart(
            axios.post('/orders.json?auth=' + token, orderData)
                .then(response => {
                    dispatch(purchaseBurgerSuccess(response.data.name, orderData));
                    console.log(response.data);
                    purchasePriceUpdate();
                    }).catch(error => {
                        dispatch(purchaseBurgerFail(error));

                    })
        );
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.BURGER_PURCHASE_START
    }
}

export const purchasePriceUpdate = () => {
    console.log('updatujem cenu');
    return {
        type: actionTypes.BURGER_PRICE_UPDATE
    }
}

export const fetchOrderSuccess = (orderData) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orderData: orderData
    }
}


export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrderFail = error => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrders = (token) => {
    return dispatch => {
        dispatch(fetchOrderStart());
        axios.get('/orders.json?auth=' + token)
            .then(response => {
                console.log(response);
            const fetchedOrders = [];
            for (let key in response.data) {
                fetchedOrders.push({
                    ...response.data[key],
                    id: key
                });
            }
            dispatch(fetchOrderSuccess(fetchedOrders))
        }).catch(error => {
            dispatch(fetchOrderFail(error))
        });
    }
}