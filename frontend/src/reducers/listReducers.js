import {
    GET_PUBLIC_LISTS_FAIL, GET_PUBLIC_LISTS_REQUEST, GET_PUBLIC_LISTS_SUCCESS,
    ADD_LIST_FAIL, ADD_LIST_REQUEST, ADD_LIST_SUCCESS,
    GET_PUBLIC_LISTS_UPDATE, DELETE_LIST_REQUEST, DELETE_LIST_SUCCESS, DELETE_LIST_FAIL,
    GET_PRIVATE_LISTS_REQUEST, GET_PRIVATE_LISTS_SUCCESS, GET_PRIVATE_LISTS_FAIL,
    GET_ALL_MY_LISTS_REQUEST, GET_ALL_MY_LISTS_SUCCESS, GET_ALL_MY_LISTS_FAIL,
    GET_ALL_LISTS_REQUEST, GET_ALL_LISTS_SUCCESS, GET_ALL_LISTS_FAIL, ADD_LIST_ITEM_REQUEST,
     ADD_LIST_ITEM_SUCCESS, ADD_LIST_ITEM_FAIL,ADD_LIST_RESET, DELETE_LIST_ITEM_REQUEST, DELETE_LIST_ITEM_SUCCESS, DELETE_LIST_ITEM_FAIL

} from "../constants/listConstants.js";

export const publicListsReducer = (state = { lists: [] }, action) => {

    switch (action.type) {
        case GET_PUBLIC_LISTS_REQUEST:
            return ({ ...state, loading: true })
        case GET_PUBLIC_LISTS_SUCCESS:
            return ({ loading: false, lists: action.payload })
        case GET_PUBLIC_LISTS_FAIL:
            return ({ loading: false, error: action.payload })
        case GET_PUBLIC_LISTS_UPDATE:
            return { loading: false, lists: action.payload }
        default:
            return state
    }
}

export const privateListsReducer = (state = { lists: [] }, action) => {

    switch (action.type) {
        case GET_PRIVATE_LISTS_REQUEST:
            return ({ ...state, loading: true })
        case GET_PRIVATE_LISTS_SUCCESS:
            return ({ loading: false, lists: action.payload })
        case GET_PRIVATE_LISTS_FAIL:
            return ({ loading: false, error: action.payload })

        default:
            return state
    }
}

export const AllMyListsReducer = (state = { lists: [] }, action) => {

    switch (action.type) {
        case GET_ALL_MY_LISTS_REQUEST:
            return ({ ...state, loading: true })
        case GET_ALL_MY_LISTS_SUCCESS:
            return ({ loading: false, lists: action.payload })
        case GET_ALL_MY_LISTS_FAIL:
            return ({ loading: false, error: action.payload })

        default:
            return state
    }
}

export const AllListsReducer = (state = { lists: [] }, action) => {

    switch (action.type) {
        case GET_ALL_LISTS_REQUEST:
            return ({ ...state, loading: true })
        case GET_ALL_LISTS_SUCCESS:
            return ({ loading: false, lists: action.payload })
        case GET_ALL_LISTS_FAIL:
            return ({ loading: false, error: action.payload })

        default:
            return state
    }
}



export const addListReducer = (state = { list: {} }, action) => {
    switch (action.type) {
        case ADD_LIST_REQUEST:
            return ({ ...state, loading: true })
        case ADD_LIST_SUCCESS:
            return { loading: false, success: true, list: action.payload }
        case ADD_LIST_FAIL:
            return { loading: false, error: action.payload }
        case ADD_LIST_RESET:
            return { ...state, list: {} }
        default:
            return state
    }
}

export const deleteListReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_LIST_REQUEST:
            return ({ loading: true })
        case DELETE_LIST_SUCCESS:
            return ({ loading: false, success: true })
        case DELETE_LIST_FAIL:
            return ({ loading: false, error: action.payload })
        default:
            return state
    }
}

export const addListItemReducer = (state = { list: {} }, action) => {
    switch (action.type) {
        case ADD_LIST_ITEM_REQUEST:
            return ({ ...state, loading: true })
        case ADD_LIST_ITEM_SUCCESS:
            return { loading: false, success: true, list: action.payload }
        case ADD_LIST_ITEM_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const deleteListItemReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_LIST_ITEM_REQUEST:
            return ({ loading: true })
        case DELETE_LIST_ITEM_SUCCESS:
            return ({ loading: false, success: true })
        case DELETE_LIST_ITEM_FAIL:
            return ({ loading: false, error: action.payload })
        default:
            return state
    }
}
