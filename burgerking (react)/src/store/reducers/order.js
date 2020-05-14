import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    orders: [],
    loading: false
};



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ORDERS_START:
            return updateObject(state, {
                loading: true
            });
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return updateObject(state, {
                orders: action.orderData,
                loading: false
            });
        case actionTypes.FETCH_ORDERS_FAIL:
            return updateObject(state, {
                loading: false,
            });
        case actionTypes.BURGER_PURCHASE_START:
            return updateObject(state, {
                loading: true
            });
        case actionTypes.BURGER_PURCHASE_SUCCESS:
            const newOrder =  updateObject(action.orderData, {
                id: action.orderId
            });
            return updateObject(state, {
                ingredients: action.ingredients,
                orders: state.orders.concat(newOrder),
                loading: false
            });
        case actionTypes.BURGER_PURCHASE_FAIL:
            return updateObject(state, {
                loading: false
            });
        
        default: return { ...state };
    }   
}

export default reducer;