import React, { useEffect, useState } from 'react';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import Message from '../components/Message'
import { Link, useHistory } from 'react-router-dom';
import {getOrderDetails, orderPayAction} from '../actions/OrderActions'
import { PayPalButton } from "react-paypal-button-v2";
import PreLoader from '../components/Loader'




function OrderScreen ({match, history}) {

    const orderId = match.params.id

    const dispatch = useDispatch()

    const userInfo = useSelector(state=>state.userInfo)

    const orderPay = useSelector(state=>state.orderPay)
    const {paymentResult, success : successPay, loading : loadingPay} = orderPay

    const orderDetails = useSelector(state=>state.orderDetails)
    const {order, error, loading} = orderDetails

    const [sdkReady, setSdkReady] = useState(false)


    if(!loading && !error){
        order.itemsPrice = order .orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }


    const addPaypalScript = () => {
        const script = document.createElement('script')
        script.type = "javascript/tex"
        script.src = <script src="https://www.paypal.com/sdk/js?client-id=AdXqlnZ3-_Kqj-7QxLox6nGOyU0Y6IDwbP8BllXcE4Cgw3LDDS6pJyPM5vidwU5HgsILZqehTRtCivRC"></script>
        script.async = true
        script.onload = () => {
            setSdkReady = true
        }
        document.body.appendChild(script)
    }

    const handlePaymentSuccess = (paymentResult) => {
        dispatch(orderPayAction(orderId, paymentResult))
    }
    
    useEffect(() => {

        //if(!userInfo){
          //  history.push('/login')
        //}

        if (!order || successPay || order.id !== Number(orderId)) {
            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid){
            if(!window.paypal){
            addPaypalScript()
        } else{
            setSdkReady(true)
        }
    }
        console.log('useEffect working!')

    }, [dispatch, order, orderId, successPay])

    return loading ? (<PreLoader />)
    : error ? (<Message />) :
    (
        <Row className='mt-5'>  
            <h3>REVIEW ORDER</h3>
                <Col md={8}>
                    <ListGroup>
                       <ListGroup.Item>
                        <h6>SHIPPING ADDRESS</h6>
                        <p>
                            <strong>Shipping Address:</strong> {' '}
                            {order.shippingAddress.address}, {order.shippingAddress.city},
                            {' '}
                            {order.shippingAddress.postalCode},
                            {' '}
                            {order.shippingAddress.country}
                            {' '}
                        </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                        <h6>CUSTOMER DETAILS</h6>
                        <p>
                            <strong>Email:</strong> {' '}
                            <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                            {' '}
                            <strong>Name:</strong> {' '}
                            {order.user.name}
                        </p>
                        {order.isDelivered ? (
                                        <Message variant='success' text = "Order delivered">Delivered on {order.deliveredAt}</Message>
                                    ) : (
                                            <Message variant='warning' text = "Not delivered">Not Delivered</Message>
                                        )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                        <h6>PAYMENT METHOD</h6>
                        <p>
                        <strong>Method:</strong> {' '}
                        {order.paymentMethod}
                        </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                        <h6>ORDER ITEMS</h6>
                        </ListGroup.Item>
    
                        {
                            order.orderItems.length === 0 ? <Message text = "No existing orders">
                                No existing orders
                            </Message> : (
                                <ListGroup>
                                    {
                                        order.orderItems.map((item, index) => 
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md = {1}>
                                                    <Image src={item.image} fluid rounded/>
                                                </Col>
                                                <Col>
                                                    <Link to = {`/details/${item.product}/`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                        {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                    </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        )
                                    }
                                </ListGroup>
                            )
                        }
                        <ListGroup.Item>
                        {order.isPaid ? (
                                        <Message variant='success' text = "Paid">Delivered on {order.deliveredAt}</Message>
                                    ) : (
                                            <Message variant='warning' text = "Not paid">Not Delivered</Message>
                                        )}
                        </ListGroup.Item>

                    </ListGroup>                    
                </Col>
               
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>ORDER SUMMARY</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                               {!order.isPaid && (
                                        <ListGroup.Item>
                                            {loadingPay && <PreLoader />}

                                            {sdkReady ? (
                                                <PreLoader />
                                            ) : (
                                                    <PayPalButton
                                                        amount={order.totalPrice}
                                                        onSuccess={handlePaymentSuccess}
                                                    />
                                                )}
                                        </ListGroup.Item>
                                    )}

                        </ListGroup>
                    </Card>
                </Col>
        </Row>
    )
}
export default OrderScreen;