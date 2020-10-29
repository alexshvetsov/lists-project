import React, { useEffect } from 'react'
import {  Button, ButtonGroup, Row, Col, Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';


import { useDispatch, useSelector } from "react-redux";
import { getPublicLists, deleteListAction, getAllMyLists, getPrivateLists, getAllLists } from '../actions/listActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ListModal from '../components/ListModal';

const ListScreen = ({history}) => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin

    const publicLists = useSelector(state => state.publicLists)
    const { loading, error, lists: publicListsList } = publicLists

    const privateLists = useSelector(state => state.privateLists)
    const { loading: loadingPrivateLists, error: errorPrivateLists } = privateLists

    const allMyLists = useSelector(state => state.allMyLists)
    const { loading: loadingAllMyLists, error: errorAllMyLists } = allMyLists

    const allLists = useSelector(state => state.allLists)
    const { loading: loadingAllLists, error: errorAllLists } = allLists

    const deleteList = useSelector(state => state.deleteList)
    const { error: deleteError } = deleteList

 

    const addList = useSelector(state => state.addList)
    const {list } = addList

    useEffect(() => {
        dispatch(getPublicLists())
        if(list && list._id){
        history.push(`/lists/${list._id}/edit`)
        }
    }, [dispatch,list, history])

    const deleteHandler = (id) => {
        dispatch(deleteListAction(id))
        console.log('delete' + id)
    }

    const getPrivateListsHandler = () => {
        dispatch(getPrivateLists())
    }

    const getAllMyListsHandler = () => {
        dispatch(getAllMyLists())
    }

    const getAllListsHandler = () => {
        dispatch(getAllLists())
    }

    return (
        <>
            {deleteError && <Message variant='danger'>{deleteError}</Message>}

            <Row>
                <Col>
                    <ListModal />
                </Col>

                <Col >
                    {loading ? null : error ? null : (
                        <ButtonGroup className='float-right' aria-label="Basic example">
                            <Button variant="secondary" onClick={getPrivateListsHandler}>Private Lists</Button>
                            <Button variant="secondary" onClick={getAllMyListsHandler}>All My Lists</Button>
                            <Button variant="secondary" onClick={getAllListsHandler}>All Lists</Button>
                        </ButtonGroup>)}
                </Col>
            </Row>

            <Table striped bordered hover responsive variant="dark" className='table-sm'>
                <thead>
                    <tr>
                        <th>LIST NAME</th>
                        <th>SUBMITTED BY</th>
                        <th>PRIVACY</th>
                        <th>PERMITTED USERS</th>
                        <th>EDIT/DELETE</th>
                    </tr>
                </thead>


                {loading || loadingAllLists || loadingAllMyLists || loadingPrivateLists ? null :
                    error || errorAllLists || errorAllMyLists || errorPrivateLists ? <Message variant='danger'>{error|| 'Lists not found'}</Message> : (

                        <tbody>
                            {publicListsList.map((list) => (
                                <tr key={list._id}>
                                    <td>{list.name}</td>
                                    <td><strong>{list.user.name}</strong></td>
                                    <td>{list.isPublic ? 'PUBLIC LIST' : 'PRIVATE LIST'}</td>
                                    <td>
                                        <OverlayTrigger
                                            key={'bottom'}
                                            placement={'bottom'}
                                            overlay={
                                                <Tooltip id={`tooltip-bottom`}>

                                                    {list.permittedUsers.length > 0 ? list.permittedUsers.map(user => (
                                                        <strong key={user._id}>  <p key={user._id} variant='primary'>{user.user.name}</p></strong>
                                                    )) : 'NO USER PERMITTED'}

                                                </Tooltip>
                                            }
                                        >
                                            <Button variant="secondary">PERMIITED USERS LIST</Button>
                                        </OverlayTrigger>
                                    </td>
                                    <td>
                                        <LinkContainer to={`/lists/${list._id}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                       {userInfo && <Button variant='danger' disabled={list.user._id !== userInfo._id} className='btn-sm' onClick={() => deleteHandler(list._id)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>}
                                    </td>
                                </tr>))}
                        </tbody>


                    )}
            </Table>
            { loading && <Loader />}
            { loadingAllLists && <Loader />}
            {  loadingAllMyLists && <Loader />}
            {  loadingPrivateLists && <Loader />}
        </>
    )
}

export default ListScreen 
