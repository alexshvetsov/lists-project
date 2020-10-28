import {
    ITEM_LIST_SUCCESS, ITEM_LIST_REQUEST, ITEM_LIST_FAIL,ITEM_LIST_UPDATE,
    ITEM_ADD_REQUEST, ITEM_ADD_SUCCESS, ITEM_ADD_FAIL,
    ITEM_DELETE_REQUEST, ITEM_DELETE_SUCCESS, ITEM_DELETE_FAIL,
    ITEM_PRIVATE_LIST_FAIL,ITEM_PRIVATE_LIST_REQUEST,ITEM_PRIVATE_LIST_SUCCESS,
     ITEM_ALL_MY_LIST_REQUEST, ITEM_ALL_MY_LIST_SUCCESS, ITEM_ALL_MY_LIST_FAIL,
     ITEM_ALL_LIST_REQUEST, ITEM_ALL_LIST_SUCCESS,ITEM_ALL_LIST_FAIL
} from '../constants/itemConstants.js';


export const publicItemsReducer = (state = { items: [] }, action) => {
    switch (action.type) {
        case ITEM_LIST_REQUEST:
            return { ...state, loading: true }
        case ITEM_LIST_SUCCESS:
            return { loading: false, items: action.payload }
        case ITEM_LIST_FAIL:
            return { loading: false, error: action.payload }
            case ITEM_LIST_UPDATE:
            return {loading:false, items:action.payload}
        default:
            return state
    }
}

export const privateItemsReducer = (state = { items: [] }, action) => {
    switch (action.type) {
        case ITEM_PRIVATE_LIST_REQUEST:
            return { ...state, loading: true }
        case ITEM_PRIVATE_LIST_SUCCESS:
            return { loading: false, items: action.payload }
        case ITEM_PRIVATE_LIST_FAIL:
            return { loading: false, error: action.payload }
           
        default:
            return state
    }
}

export const allMyItemsReducer = (state = { items: [] }, action) => {
    switch (action.type) {
        case ITEM_ALL_MY_LIST_REQUEST:
            return { ...state, loading: true }
        case ITEM_ALL_MY_LIST_SUCCESS:
            return { loading: false, items: action.payload }
        case ITEM_ALL_MY_LIST_FAIL:
            return { loading: false, error: action.payload }
           
        default:
            return state
    }
}

export const allItemsReducer = (state = { item: {} }, action) => {
    switch (action.type) {
        case ITEM_ALL_LIST_REQUEST:
            return { loading: true }
        case ITEM_ALL_LIST_SUCCESS:
            return { loading: false, success: true, item: action.payload }
        case ITEM_ALL_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const addItemReducer = (state = { item: {} }, action) => {
    switch (action.type) {
        case ITEM_ADD_REQUEST:
            return { loading: true }
        case ITEM_ADD_SUCCESS:
            return { loading: false, success: true, item: action.payload }
        case ITEM_ADD_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const deleteItemReducer = (state = {}, action) => {
    switch (action.type) {
        case ITEM_DELETE_REQUEST:
            return { loading: true }
        case ITEM_DELETE_SUCCESS:
            return { loading: false, success: true }
        case ITEM_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}