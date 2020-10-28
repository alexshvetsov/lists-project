import { ITEM_LIST_SUCCESS, ITEM_LIST_REQUEST, ITEM_LIST_FAIL, ITEM_ADD_REQUEST, ITEM_ADD_SUCCESS, ITEM_LIST_UPDATE,
    ITEM_ADD_FAIL, ITEM_DELETE_REQUEST, ITEM_DELETE_SUCCESS, ITEM_DELETE_FAIL, ITEM_PRIVATE_LIST_REQUEST, ITEM_PRIVATE_LIST_FAIL, ITEM_PRIVATE_LIST_SUCCESS, ITEM_ALL_MY_LIST_REQUEST, ITEM_ALL_MY_LIST_SUCCESS, ITEM_ALL_MY_LIST_FAIL, ITEM_ALL_LIST_REQUEST, ITEM_ALL_LIST_SUCCESS, ITEM_ALL_LIST_FAIL } from '../constants/itemConstants.js';
import axisos from 'axios'

export const getPublicItemsList = () => async (dispatch) => {
    try {
        dispatch({ type: ITEM_LIST_REQUEST })

        const { data } = await axisos.get('/api/items')
        dispatch({ type: ITEM_LIST_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: ITEM_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}
 
export const getPrivateItemsList = () => async (dispatch,getState) => {
    try {
        dispatch({ type: ITEM_PRIVATE_LIST_REQUEST })

        const {userLogin:{userInfo}}=getState()
        const config = {
            headers: { 
                'Content-Type': 'application/json', 
                Authorization:`Bearer ${userInfo.token}`
            }, 
        }
        const { data } = await axisos.get('/api/items/private', config)
        dispatch({ type: ITEM_PRIVATE_LIST_SUCCESS, payload: data })
        dispatch({ type: ITEM_LIST_UPDATE, payload: data }) 

    } catch (error) {
        dispatch({ 
            type: ITEM_PRIVATE_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}


 
export const getAllMyItemsList = () => async (dispatch,getState) => {
    try {
        dispatch({ type: ITEM_ALL_MY_LIST_REQUEST })

        const {userLogin:{userInfo}}=getState()
        const config = {
            headers: { 
                'Content-Type': 'application/json', 
                Authorization:`Bearer ${userInfo.token}`
            }, 
        }
        const { data } = await axisos.get('/api/items/privatepublic', config)
        dispatch({ type: ITEM_ALL_MY_LIST_SUCCESS, payload: data })
        dispatch({ type: ITEM_LIST_UPDATE, payload: data }) 

    } catch (error) {
        dispatch({ 
            type: ITEM_ALL_MY_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const getAllItemsList = () => async (dispatch,getState) => {
    try {
        dispatch({ type: ITEM_ALL_LIST_REQUEST })

        const {userLogin:{userInfo}}=getState()
        const config = {
            headers: { 
                'Content-Type': 'application/json', 
                Authorization:`Bearer ${userInfo.token}`
            }, 
        }
        const { data } = await axisos.get('/api/items/all', config)
        dispatch({ type: ITEM_ALL_LIST_SUCCESS, payload: data })
        dispatch({ type: ITEM_LIST_UPDATE, payload: data }) 

    } catch (error) {
        dispatch({  
            type: ITEM_ALL_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}




export const addItemAction = (item) => async (dispatch, getState) => {
    try {
        dispatch({ type: ITEM_ADD_REQUEST })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }
        const { data } = await axisos.post('/api/items', item, config)
        const { publicItems: { items } } = getState()
        let updatedItems=[...items, data] 
        dispatch({ type: ITEM_ADD_SUCCESS, success: true, payload: data })
        dispatch({ type: ITEM_LIST_UPDATE, payload: updatedItems }) 

    } catch (error) {
        dispatch({ 
            type: ITEM_ADD_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}


export const deleteItemAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ITEM_DELETE_REQUEST })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }
        await axisos.delete(`/api/items/${id}`, config)
        const { publicItems: { items } } = getState() 
       const updatedItems = items.filter(item => item._id !== id) 
        dispatch({ type: ITEM_DELETE_SUCCESS, success: true })
        dispatch({ type: ITEM_LIST_UPDATE, payload: updatedItems }) 


    } catch (error) {
        dispatch({
            type: ITEM_DELETE_FAIL, 
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}