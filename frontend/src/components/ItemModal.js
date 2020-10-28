import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { addItemAction } from '../actions/itemAction';
import Message from './Message';

const ItemModal = () => {
    const dispatch = useDispatch()
    
    const addItem = useSelector(state => state.addItem)
    const {  error } = addItem 

    const [name, setName] = useState('');
    const [isPublic, setIsPublic] = useState(true);
    const [show, setShow] = useState(false);
    const [nameError, setNameError] = useState('');


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const submitForm = () => {
        if (name) {
           dispatch(addItemAction({name,isPublic}))
           handleClose()
        }else{
            setNameError('Name is requierd')
        }
    }

    return (
        <>
            <Button variant="outline-primary" onClick={handleShow} className='mb-2'> 
            Add Item
      </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Item</Modal.Title>
                </Modal.Header> 
                <Modal.Body>
                    {nameError && <Message variant='danger'>{nameError}</Message>}
                    {error && <Message variant='danger'>{error}</Message>}
                    <Form>
                        <Form.Group controlId='name'>
                            <Form.Label>Item name</Form.Label>
                            <Form.Control type='name'
                                placeholder='Enter name'
                                value={name} onChange={(e) => setName(e.target.value)}>
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
                        Add Item
          </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ItemModal
