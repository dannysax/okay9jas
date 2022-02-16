import Button from "@restart/ui/esm/Button";
import React from "react";
import {Col, Row, Form} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import FormContainer from "../components/FormContainer";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { login } from "../actions/userActions";


function LoginScreen({location, history}){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const redirect = location.search ? location.search.split('=')[1] : '/'
    const userLogin = useSelector(state => state.userLogin)
    const {loading, userInfo, error} = userLogin
    const dispatch = useDispatch()

    const submitHandler = (e) => {
            e.preventDefault();
            dispatch(login(email, password))
    }
    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
    },[userInfo, redirect, history])
    
    return (
        <FormContainer>
            <h2>Sign In</h2>
            <Form onSubmit = {submitHandler}>
                <Form.Group controlId = "email">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type = "email"
                    value = {email}
                    onChange = {(e)=>setEmail(e.target.value)}
                    placeholder = "Enter email address">
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId = "password">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type = "password" value = {password}
                    onChange = {(e)=>setPassword(e.target.value)}
                    placeholder = "Enter Password">
                    </Form.Control>
                </Form.Group>
                <Button type = "submit" variant = "primary">Sign In</Button>
            </Form>
            Don't have an account yet? <Link
            to = {'redirect' ? `/redirect?=${redirect}` : '/redirect'}
            >Register</Link>
        </FormContainer>
    )
}
export default LoginScreen;