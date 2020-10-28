import {
    GET_PUBLIC_LISTS_FAIL, GET_PUBLIC_LISTS_REQUEST, GET_PUBLIC_LISTS_SUCCESS,
    ADD_LIST_FAIL, ADD_LIST_REQUEST, ADD_LIST_SUCCESS, GET_PUBLIC_LISTS_UPDATE,
    DELETE_LIST_REQUEST, DELETE_LIST_FAIL, DELETE_LIST_SUCCESS, GET_PRIVATE_LISTS_REQUEST,
    GET_PRIVATE_LISTS_SUCCESS, GET_PRIVATE_LISTS_FAIL, GET_ALL_MY_LISTS_REQUEST, GET_ALL_MY_LISTS_SUCCESS,
    GET_ALL_MY_LISTS_FAIL, GET_ALL_LISTS_REQUEST, GET_ALL_LISTS_SUCCESS, GET_ALL_LISTS_FAIL, ADD_LIST_ITEM_REQUEST, ADD_LIST_ITEM_SUCCESS, ADD_LIST_ITEM_FAIL, DELETE_LIST_ITEM_REQUEST, DELETE_LIST_ITEM_SUCCESS, DELETE_LIST_ITEM_FAIL
} from "../constants/listConstants.js";
import axisos from 'axios'


export const getPublicLists = () => async (dispatch) => {
    try {
        dispatch({ type: GET_PUBLIC_LISTS_REQUEST })
        const { data } = await axisos.get('/api/lists')
        dispatch({ type: GET_PUBLIC_LISTS_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: GET_PUBLIC_LISTS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}

export const getPrivateLists = () => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_PRIVATE_LISTS_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }
        const { data } = await axisos.get('/api/lists/private', config)
        dispatch({ type: GET_PRIVATE_LISTS_SUCCESS, payload: data })
        dispatch({ type: GET_PUBLIC_LISTS_UPDATE, payload: data })


    } catch (error) {
        dispatch({
            type: GET_PRIVATE_LISTS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}


export const getAllMyLists = () => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_ALL_MY_LISTS_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }
        const { data } = await axisos.get('/api/lists/privateshared', config)
        dispatch({ type: GET_ALL_MY_LISTS_SUCCESS, payload: data })
        dispatch({ type: GET_PUBLIC_LISTS_UPDATE, payload: data })


    } catch (error) {
        dispatch({
            type: GET_ALL_MY_LISTS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}


export const getAllLists = () => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_ALL_LISTS_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }
        const { data } = await axisos.get('/api/lists/all', config)
        dispatch({ type: GET_ALL_LISTS_SUCCESS, payload: data })
        dispatch({ type: GET_PUBLIC_LISTS_UPDATE, payload: data })


    } catch (error) {
        dispatch({
            type: GET_ALL_LISTS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}

export const addListAction = (list) => async (dispatch, getState) => {
    try {
        dispatch({ type: ADD_LIST_REQUEST })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }
        const { data } = await axisos.post('/api/lists', list, config)
        const { publicLists: { lists } } = getState()
        let updatedLists = [...lists, data]
        dispatch({ type: ADD_LIST_SUCCESS, success: true, payload: data })
        dispatch({ type: GET_PUBLIC_LISTS_UPDATE, payload: updatedLists })


    } catch (error) {
        dispatch({
            type: ADD_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}

export const deleteListAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: DELETE_LIST_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        await axisos.delete(`/api/lists/${id}`, config)
        const { publicLists: { lists } } = getState()
        const updatedLists = lists.filter(item => item._id !== id)
        dispatch({ type: DELETE_LIST_SUCCESS, success: true })
        dispatch({ type: GET_PUBLIC_LISTS_UPDATE, payload: updatedLists })
    } catch (error) {
        dispatch({
            type: DELETE_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}


export const addListItemAction = (name, id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ADD_LIST_ITEM_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }
        const { data } = await axisos.put(`/api/lists/${id}/additem`, { name }, config)
        const { publicLists: { lists } } = getState()
        let updatedLists = [...lists.map((listMAP) => {
            const listOld = lists.find((list) => list._id === id)
            return listOld ? data : listMAP
        })]
        dispatch({ type: ADD_LIST_ITEM_SUCCESS, success: true, payload: data })
        dispatch({ type: GET_PUBLIC_LISTS_UPDATE, payload: updatedLists })

    } catch (error) {
        dispatch({
            type: ADD_LIST_ITEM_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}

export const deleteListItemAction = (id, itemID) => async (dispatch, getState) => {
    try {
        dispatch({ type: DELETE_LIST_ITEM_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        }
       const {data}= await axisos.delete(`/api/lists/${id}/${itemID}`, config)
        const { publicLists: { lists } } = getState()
        let updatedLists = [...lists.map((listMAP) => {
            const listOld = lists.find((list) => list._id === id)
            return listOld ? data : listMAP
        })]
        dispatch({ type: DELETE_LIST_ITEM_SUCCESS, success: true })
        dispatch({ type: GET_PUBLIC_LISTS_UPDATE, payload: updatedLists }) 
    } catch (error) {
        dispatch({
            type: DELETE_LIST_ITEM_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}