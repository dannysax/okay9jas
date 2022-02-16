import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import {useSelector, useDispatch} from 'react-redux';
import { register } from '../actions/userActions';



function RegisterScreen({location, history}){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const registerUser = useSelector(state=>state.userRegister);
    const {userInfo, loading, error} = registerUser;

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault();
        
        if(password != confirmPassword){
            setMessage("Passwords must match")
        }else{
            dispatch(register(name, email, password))
            history.push('/login')
        }
    }

    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
    },[userInfo, redirect, history])
    return(
        <FormContainer>
            <h2>Register</h2>
            <h2>{message}</h2>
            <Form onSubmit = {submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                    type="email"
                    placeholder='Enter Email Address'
                    value = {email}
                    required
                    onChange = {(e)=>setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='name'>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                    type="name"
                    placeholder='Enter Name'
                    value = {name}
                    required
                    onChange = {(e)=>setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                    type="password"
                    placeholder='Enter Account Password'
                    value = {password}
                    required
                    onChange = {(e)=>setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Confirm Password:</Form.Label>
                    <Form.Control
                    type="password"
                    placeholder='Confirm Password'
                    value = {confirmPassword}
                    required
                    onChange = {(e)=>setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit'>Sign Up</Button>
            </Form>
            Already have an account? <Link to = {redirect ? `/login?redirect=${redirect}` : '/login'}>Sign In</Link>
        </FormContainer>
    )
}
export default RegisterScreen;