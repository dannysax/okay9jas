import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {addShippingAction} from "../actions/cartActions";
import FormContainer from "../components/FormContainer";


function ShippingScreen({history}){

    const cart = useSelector(state=>state.cart)
    const {shippingInfo} = cart

    const dispatch = useDispatch()

    const [address, setAddress] = useState(shippingInfo.address)
    const [city, setCity] = useState(shippingInfo.city)
    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode)
    const [country, setCountry] = useState(shippingInfo.country)

    const submitHandler = (e) => {
            e.preventDefault();
            console.log("submitted")
            dispatch(addShippingAction({address, city, postalCode, country}));
            history.push('/payment/')
    }
    return (
        <FormContainer>
            <h2>Shipping</h2>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter Address" value = {address ? address : ''} onChange={(e)=>{setAddress(e.target.value)}}></Form.Control>
                </Form.Group>

                <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="Enter City" value = {city ? city : ''} onChange={(e)=>{setCity(e.target.value)}}></Form.Control>
                </Form.Group>

                <Form.Group controlId="postalCode">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control type="text" placeholder="Enter Postal Code" value = {postalCode ? postalCode : ''} onChange={(e)=>{setPostalCode(e.target.value)}}></Form.Control>
                </Form.Group>

                <Form.Group controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control type="text" placeholder="Enter Country" value = {country ? country : ''} onChange={(e)=>{setCountry(e.target.value)}}></Form.Control>
                </Form.Group>
                <Button type="submit">Next</Button>
            </Form>
        </FormContainer>
    )
}
export default ShippingScreen;