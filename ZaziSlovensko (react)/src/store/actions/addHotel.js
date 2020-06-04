import * as actionTypes from './actionTypes';
import axios from '../../instances/axiosOrders';
import storage from '../../instances/firebase.js';


export const uploadHotelSuccess = (id, hotelData) => {
    return {
        type: actionTypes.UPLOAD_HOTEL_SUCCESS,
        hotelId: id,
        hotelData: hotelData
    }
}

export const uploadHotelFail = error => {
    return {
        type: actionTypes.UPLOAD_HOTEL_FAIL,
        error: error
    }
}

export const addHotel = (hotelData, token, img) => {
    return dispatch => {
        dispatch(uploadHotelStart());
        const imgPath = storage.ref().child(hotelData.name + '/' + img.name);
        imgPath.put(img).catch(error => { dispatch(uploadHotelFail(error)); });
        axios.post('/accommodations.json?auth=' + token, hotelData)
                .then(response => {
                    dispatch(uploadHotelSuccess(response.data.name, hotelData));
                    
                }).catch(error => {
                    dispatch(uploadHotelFail(error));

                })
        
    }
}

export const uploadHotelResetDone = () => {
    return {
        type: actionTypes.UPLOAD_HOTEL_RESET,
    }
}

export const resetDone = () => {
    return dispatch => {
        dispatch(uploadHotelResetDone());
    }
}

export const uploadHotelStart = () => {
    return {
        type: actionTypes.UPLOAD_HOTEL_START
    }
}