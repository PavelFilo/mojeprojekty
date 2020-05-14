import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    hotels: null,
    loading: false,
    photoUrl: null,
    error: null
}

const fetchAccommStart = (state) => {
    return updateObject(state, {
        loading: true,
        hotels: null
    });
}

const fetchAccommSuccess = (state, action) => {
    return updateObject(state, {
        hotels: action.accommData,
        loading: false
    });
}

const fetchAccommFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ACCOMMODATIONS_START: return fetchAccommStart(state);
        case actionTypes.FETCH_ACCOMMODATIONS_SUCCESS: return fetchAccommSuccess(state, action);
        case actionTypes.FETCH_ACCOMMODATIONS_FAIL: return fetchAccommFail(state, action);
            
        case actionTypes.FETCH_PHOTO_START:
            return updateObject(state, {
                loading: true
            });
        case actionTypes.FETCH_PHOTO_SUCCESS:
            return updateObject(state, {
                photoUrl: action.photoUrl,
                loading: false
            });
        case actionTypes.FETCH_PHOTO_FAIL:
            return updateObject(state, {
                loading: false,
                error: action.error
            });
        default: return { ...state };
    }
        
}

export default reducer;