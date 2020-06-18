import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    hotelData: null,
    loading: false,
    statusDone: false,
    error: null
}

const addHotelStart = (state) => {
    return updateObject(state, {
        loading: true,
        error: null
    });
}

const addHotelSuccess = (state, action) => {
    return updateObject(state, {
        hotelData: action.hotelData,
        loading: false,
        statusDone: true
    });
}


const addHotelResetDone = (state) => {
    return updateObject(state, {
        statusDone: false
    });
}

const addHotelFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
}


const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPLOAD_HOTEL_START: return addHotelStart(state);
        case actionTypes.UPLOAD_HOTEL_SUCCESS: return addHotelSuccess(state, action);
        case actionTypes.UPLOAD_HOTEL_FAIL: return addHotelFail(state, action);
        case actionTypes.UPLOAD_HOTEL_RESET: return addHotelResetDone(state);
        default: return state;
    }

}

export default Reducer;