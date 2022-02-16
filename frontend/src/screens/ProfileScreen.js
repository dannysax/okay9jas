import React, { useEffect, useState } from 'react';
import {Row, Col, Form, Button, Table} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getUserDetails, updateUserDetails } from '../actions/userActions';
import { USER_DETAILS_UPDATE_RESET } from '../constants/userConstants';
import { userDetailsReducer, userLoginReducer } from '../reducers/userReducers';
import { userOrderReducer } from '../reducers/OrderReducer';
import { getUserOrders } from '../actions/OrderActions';
import Message from '../components/Message';
import PreLoader from '../components/Message'
import { Link } from 'react-router-dom';
 

function ProfileScreen({history}){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDetailsUpdate = useSelector(state => state.userDetailsUpdate)
    const { success } = userDetailsUpdate

    const userOrders = useSelector(state=>state.userOrders)
    const {loading : userLoading, orders, error : userError} = userOrders


    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.name || success || userInfo.id !== user.id) {
                dispatch({ type: USER_DETAILS_UPDATE_RESET })
                dispatch(getUserDetails('profile'))
                dispatch(getUserOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password != confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserDetails({
                'id': user.id,
                'name': name,
                'email': email,
                'password': password
            }))
            setMessage('')
        }

    }
    
    return (
        <Row>
            <Col md={6}>
            <h2>User Profile</h2>
                <Form onSubmit={submitHandler}>

                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control

                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='passwordConfirm'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control

                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'>
                        Update
                </Button>

                </Form>
</Col>
<Col>
        <h2>My Orders</h2>
        {
        userLoading ?  (
            <PreLoader />
        ) : userError ? (<Message text = {userError} />) : (
            <Table striped responsive className='table-sm'>
            <thead>
            <tr>
                    <th>ID</th>
                            <th>Date</th>
                        <th>Total</th>
                     <th>Paid</th>
                      <th>Delivered</th>
                     </tr>
            </thead>
            <tbody>
               {
                   orders && (
                   orders.map((order) => 
                   <tr key={order.id}>
                       <td>{order.id}</td>
                       <td>{order.createdAt.substring(0,10)}</td>
                       <td>NGN{order.totalPrice}</td>
                       <td>{order.paidAt}</td>
                       <td>
                           <Link to = {`/order/${order.id}`}>
                           <Button type = "submit" >details</Button>
                           </Link>
                       </td>
                   </tr>)
                   )
               }
            </tbody>
    </Table>
    )
        }
        
</Col>
        </Row>
    )
}
export default ProfileScreen;