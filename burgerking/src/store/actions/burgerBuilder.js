import * as actionTypes from './actionTypes';
import axios from '../../instances/axiosOrders.js';

export const addIngred = name => {
    return {
        type: actionTypes.ADD_INGRED,
        ingredName: name
    }
};

export const deleteIngred = name => {
    return {
        type: actionTypes.REMOVE_INGRED,
        ingredName: name
    }
};

export const setIngred = (ingred) => {
    return {
        type: actionTypes.SET_INGRED,
        ingredients: ingred
    }
}

export const ingredFailed = () => {
    return {
        type: actionTypes.INGRED_FAILED,
    }
}

export const initIngred = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then(response => {
                dispatch(setIngred(response.data));
            }).catch(error => {
                dispatch(ingredFailed())
            })

    }
}

export const buildingReset = () => {
    return {
        type: actionTypes.BUILDING_RESET,
    }
}