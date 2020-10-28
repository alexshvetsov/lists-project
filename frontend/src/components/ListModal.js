import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { addListAction } from '../actions/listActions'; 
import Message from './Message';

const ListModal = () => {
    const dispatch = useDispatch() 

    const [name, setName] = useState('');
    const [isPublic, setIsPublic] = useState(true);
    const [show, setShow] = useState(false);
    const [permittedUsers, setPermittedUsers] = useState('');
    const [nameError, setNameError] = useState('');


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

 
    const addList = useSelector(state => state.addList)
    const { error ,list } = addList

    const submitForm =  () => {
        if (name) {
            let permittedUsersArray = permittedUsers.split(',')
            permittedUsersArray = permittedUsersArray.map(user => user.trim())
            dispatch(addListAction({ name, isPublic, permittedUsersArray }))
            handleClose()
            setNameError('')
            setName('')
            setPermittedUsers('')
        } else {
            setNameError('Name is requierd')
        }
    }

    return (
        <>
            <Button variant="outline-primary" onClick={handleShow} className='mb-2'>
                Add List
      </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {nameError && <Message variant='danger'>{nameError}</Message>}
                    {error && <Message variant='danger'>{error}</Message>}
                    <Form>
                        <Form.Group controlId='name'>
                            <Form.Label>List name</Form.Label>
                            <Form.Control type='name'
                                placeholder='Enter name'
                                value={name} onChange={(e) => setName(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='permittedUsers'>
                            <Form.Label>Permitted Users </Form.Label>
                            <Form.Control type='permittedUsers'
                                placeholder=' expample@example.com, expample@example.com ...'
                                value={permittedUsers} onChange={(e) => setPermittedUsers(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='isPublic'>
                            <Form.Check type='checkbox'
                                label='Is Public'
                                checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)}>
                            </Form.Check>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
          </Button>
                    <Button variant="primary" onClick={submitForm}>
                        Add List
          </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ListModal
