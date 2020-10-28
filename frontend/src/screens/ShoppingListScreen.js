import React, { useEffect } from 'react'
import { ListGroup, Button, ButtonGroup, Row, Col } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useDispatch, useSelector } from "react-redux";
import { getPublicItemsList, deleteItemAction, getPrivateItemsList, getAllMyItemsList, getAllItemsList } from '../actions/itemAction';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ItemModal from '../components/ItemModal';

const ShoppingListScreen = () => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin

    const publicItems = useSelector(state => state.publicItems)
    const { loading, error, items: publicItemsList } = publicItems

    const privateItems = useSelector(state => state.privateItems)
    const { loading: loadingPrivateItems, error: errorPrivateItems } = privateItems

    const allMyItems = useSelector(state => state.allMyItems)
    const { loading: loadingAllMyItems, error: errorAllMyItems } = allMyItems
    
    const allItems = useSelector(state => state.allItems)
    const { loading: loadingAllItems, error: errorAllItems } = allItems

    const deleteItem = useSelector(state => state.deleteItem)
    const { error: deleteError } = deleteItem

    // const addItem = useSelector(state => state.addItem)
    // const { item } = addItem

    useEffect(() => {
        dispatch(getPublicItemsList())
    }, [dispatch])

    const deleteHandler = (id) => {
        dispatch(deleteItemAction(id))
    }

    const getPrivateItems = () => {
        dispatch(getPrivateItemsList())
    }

    const getAllMyItems = () => {
        dispatch(getAllMyItemsList())
    }

    const getAllItems = () => {
        dispatch(getAllItemsList()) 
    } 

    return (
        <>
            {deleteError && <Message variant='danger'>{deleteError}</Message>}
            <Row>
                <Col>
                    {userInfo && <ItemModal />}
                </Col>
                <Col >
                    {loading ? null : error ? null : (
                        <ButtonGroup className='float-right' aria-label="Basic example">
                            <Button variant="secondary" onClick={getPrivateItems}>Private Items</Button>
                            <Button variant="secondary" onClick={getAllMyItems}>All My Items</Button>
                            <Button variant="secondary" onClick={getAllItems}>All Items</Button> 
                        </ButtonGroup>)}
                </Col>

            </Row>
            {loading || loadingPrivateItems || loadingAllMyItems|| loadingAllItems ? <Loader /> :
             error || errorPrivateItems || errorAllMyItems|| errorAllItems ? <Message variant='danger'>{error}</Message> : (<>

                <ListGroup>
                    <TransitionGroup>
                        {
                            publicItemsList.map((item) => (
                                <CSSTransition key={item._id} timeout={500} classNames='fade'>
                                    <ListGroup.Item>
                                        {userInfo ? <Button variant='danger' disabled={item.user._id !== userInfo._id} 
                                            className='btn-sm p-2 m-1' onClick={() => deleteHandler(item._id)}>
                                            <i className='fas fa-trash'></i>
                                        </Button> : null}
                                        {item.name} - <strong>{item.user.name}</strong>
                                    </ListGroup.Item>
                                </CSSTransition>
                            ))
                        }
                    </TransitionGroup>
                </ListGroup>
            </>)}
        </>
    )
}

export default ShoppingListScreen 
