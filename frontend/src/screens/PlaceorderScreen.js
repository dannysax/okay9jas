import React, { useEffect } from 'react';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import Message from '../components/Message'
import { Link, useHistory } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { CreateOrderAction } from '../actions/OrderActions';
import {CART_ITEMS_CLEAR} from '../constants/cartConstants'

function PlaceorderScreen ({history}) {
    const cart = useSelector(state=>state.cart)

    const dispatch = useDispatch()

    const {shippingInfo} = cart

    const orderCreate = useSelector(state=>state.orderCreate)
    const {order, error, success} = orderCreate

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    cart.shippingPrice = (cart.ItemPrice > 100 ? 0 : 10).toFixed(2)
    cart.taxPrice = (Number(cart.itemsPrice) * 0.01).toFixed(2)
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    function placeOrder(e){
        e.preventDefault(); 

        dispatch(CreateOrderAction({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingInfo,
            paymentMethod: cart.paymentMethod,
            itemsPrice: Number(cart.itemsPrice),
            shippingPrice: Number(cart.shippingPrice),
            taxPrice: Number(cart.taxPrice),
            totalPrice: Number(cart.totalPrice),
        }));
    }

    useEffect(()=>{
        if(success){
            history.push(`/order/${order.id}/`)
            dispatch({
                type : CART_ITEMS_CLEAR
            })
        }
    }, [success, order]);

    return (
        <Row className='mt-5'>
            <CheckoutSteps />
            <h3>REVIEW ORDER</h3>
                <Col md={8}>
                    <ListGroup>
                        <ListGroup.Item>
                        <h6>SHIPPING ADDRESS</h6>
                        <p>
                            <strong>Shipping Address:</strong> {' '}
                            {shippingInfo.address}, {shippingInfo.city},
                            {' '}
                            {shippingInfo.postalCode},
                            {' '}
                            {shippingInfo.country}
                            {' '}
                        </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                        <h6>PAYMENT METHOD</h6>
                        <p>
                        <strong>Method:</strong> {' '}
                        {cart.paymentMethod}
                        </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                        <h6>ORDER ITEMS</h6>
                        </ListGroup.Item>
                        {
                            cart.cartItems.length === 0 ? <Message>
                                There are no items in the cart
                            </Message> : (
                                <ListGroup>
                                    {
                                        cart.cartItems.map((item, index) => 
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

                    </ListGroup>                    
                </Col>
               
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrder}
                                >
                                    PLACE ORDER
                                </Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>

        </Row>
    )
}
export default PlaceorderScreen;