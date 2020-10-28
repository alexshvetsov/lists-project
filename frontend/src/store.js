import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  userLoginReducer, userRegisterReducer
} from './reducers/userReducers.js'
import {
  publicItemsReducer, addItemReducer, deleteItemReducer,
  privateItemsReducer, allMyItemsReducer, allItemsReducer
} from './reducers/itemReducers.js'
import {
  addListReducer, AllListsReducer, AllMyListsReducer, privateListsReducer, publicListsReducer,addListItemReducer, deleteListItemReducer
} from './reducers/listReducers.js'



const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  publicItems: publicItemsReducer,
  privateItems: privateItemsReducer,
  allMyItems: allMyItemsReducer,
  allItems: allItemsReducer,
  addItem: addItemReducer,
  deleteItem: deleteItemReducer,
  publicLists: publicListsReducer,
  privateLists: privateListsReducer,
  allMyLists: AllMyListsReducer,
  allLists: AllListsReducer,
  addList: addListReducer,
  deleteList:deleteItemReducer,
  addListItem:addListItemReducer,
  deleteListItem:deleteListItemReducer

})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  publicItems: { items: [] },
  publicLists:{lists:[]}
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store;    