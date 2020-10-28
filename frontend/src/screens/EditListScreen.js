import React, { useEffect } from 'react'
import { ListGroup, Button } from "react-bootstrap";
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import Loader from '../components/Loader';
import ListItemModal from '../components/ListItemModal';
import Message from '../components/Message';
import { ADD_LIST_RESET } from '../constants/listConstants';
import { deleteListItemAction } from '../actions/listActions';

const EditListScreen = ({ match,history }) => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin

    const addListItem = useSelector(state => state.addListItem);
    const { loading, error, list: ListItem } = addListItem 

    const publicLists = useSelector(state => state.publicLists);
    const { lists } = publicLists
    const list = lists.filter(list => list._id.toString() === match.params.id.toString())[0]
    const deleteItem = useSelector(state => state.deleteItem)
    const { error: deleteError } = deleteItem

    // const addItem = useSelector(state => state.addItem)
    // const { item } = addItem

    useEffect(() => {
        if(list ===undefined){
            history.push('/lists')
        }
        dispatch({ type: ADD_LIST_RESET }) 
    }, [dispatch])

    const deleteHandler = (id,itemID) => {
        dispatch(deleteListItemAction(id, itemID))
    }




    return (
        <>
            <Route render={({ history }) => <ListItemModal match={match} />} />

            {deleteError && <Message variant='danger'>{deleteError}</Message>}
            {list && list.items.map(item => (
                <ListGroup.Item key={item._id}>
                    {userInfo ? <Button variant='danger' 
                        className='btn-sm p-2 m-1' onClick={() => deleteHandler(list._id,item._id)}>
                        <i className='fas fa-trash'></i>
                    </Button> : null}
                    {item.name} - <strong>{item.user.name}</strong>
                </ListGroup.Item>
            ))}
        </>
    )
}

export default EditListScreen 
