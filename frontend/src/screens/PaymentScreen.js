import React, { useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer';
import { addPaymentMethodAction } from '../actions/cartActions';



function PaymentScreen({history}){

    const dispatch = useDispatch()
    const cart = useSelector(state=>state.cart)
    const {payment} = cart
    
    
    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addPaymentMethodAction(paymentMethod)
        );
        history.push('/placeorder/')
    }

    return (
        <FormContainer>
            <CheckoutSteps/>
            <h2>Choose Payment Method</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                <Col>
                    <Form.Check
                    type = "radio"
                    label = "Paypal or Credit Card"
                    checked
                    onChange={(e) => {setPaymentMethod(e.target.value)}}
                    id = 'paypal'
                    >                        
                    </Form.Check>
                    </Col>
                </Form.Group>
                <Button type = "submit" variant="primary">Continue</Button>
            </Form>
        </FormContainer>
    )
}
export default PaymentScreen;