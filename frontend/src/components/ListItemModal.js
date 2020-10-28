import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { addListItemAction } from '../actions/listActions';
import Message from './Message';

const ListItemModal = ({match}) => {
    const dispatch = useDispatch()
    
    const addListItem = useSelector(state => state.addListItem)
    const {  error } = addListItem 

    const [name, setName] = useState('');
    const [show, setShow] = useState(false);
    const [nameError, setNameError] = useState('');


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const submitForm = () => {
        if (name) {
           dispatch(addListItemAction(name, match.params.id))
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

export default ListItemModal
