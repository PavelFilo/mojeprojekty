import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    loading: false,
    userId: null,
    error: null
}

const authStart = (state, action) => {
    return updateObject(state, { loading: true, error: null });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        token: action.data.idToken,
        userId: action.data.localId,
        error: null
    })
}

const authLogout = (state, action) => {
    return updateObject(state, {token: null, userId: null})
}


const authFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
}


const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        default: return state;
    }

}

export default Reducer;