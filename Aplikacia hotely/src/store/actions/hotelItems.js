import * as actionTypes from './actionTypes';
import axios from '../../instances/axiosOrders';
import storage from '../../instances/firebase.js';

export const fetchAccommodationsSuccess = (accommData) => {
    return {
        type: actionTypes.FETCH_ACCOMMODATIONS_SUCCESS,
        accommData: accommData
    }
}

export const fetchAccommodationsStart = () => {
    return {
        type: actionTypes.FETCH_ACCOMMODATIONS_START
    }
}

export const fetchAccommodationsFail = error => {
    return {
        type: actionTypes.FETCH_ACCOMMODATIONS_FAIL,
        error: error
    }
}

export const fetchAccommodations = (query) => {
    return dispatch => {
        dispatch(fetchAccommodationsStart());
        axios.get('accommodations.json' + query)
            .then(response => {
                const fetchedAccommodations = [];
                for (let key in response.data) {
                    fetchedAccommodations.push({    
                        ...response.data[key],
                        id: key
                    });
                }
                dispatch(fetchAccommodationsSuccess(fetchedAccommodations));
            }).catch(error => {
                console.log('erroring');
                dispatch(fetchAccommodationsFail(error));
            });
    }
}

export const fetchPhotoStart = () => {
    return {
        type: actionTypes.FETCH_PHOTO_START,
    }
}


export const fetchPhotoSuccess = (photoUrl) => {
    return {
        type: actionTypes.FETCH_PHOTO_SUCCESS,
        photoUrl: photoUrl
    }
}


export const fetchPhotoFail = (error) => {
    return {
        type: actionTypes.FETCH_PHOTO_FAIL,
        error: error
    }
}

export const fetchPhoto = (name) => {
    return dispatch => {
        dispatch(fetchPhotoStart());
        storage.ref().child(name).getDownloadURL()
            .then(url => {
                dispatch(fetchPhotoSuccess(url));
            }).catch(error => {
                dispatch(fetchPhotoFail(error));
            });
    }
}