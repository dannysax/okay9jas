import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import {Row, Col, Image, ListGroup, Form, Card, Button} from 'react-bootstrap';
import Message from "../components/Message";



function CartScreen({match, history, location}){
    const dispatch = useDispatch()
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect(()=>{
        if(productId){
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const handleCartDelete = (id) => {
        dispatch(removeFromCart(id))
    }

    const handleProceedCart = () => {
        history.push("/shipping?redirect=login/")
    }
    return(
        <React.Fragment>
            <h2>Shopping Cart</h2>
          {
              cartItems.length === 0 ? <Message text = "Sorry. No cart items." /> :
              (
                  <ListGroup>
                      {
                          cartItems.map(item =>
                            <ListGroup.Item variant = "flush">
                                <Row>
                                    <Col md={2}><Image src = {item.image} alt = {item.name} fluid rounded/></Col>
                                    <Col md={3}><Link to = {`/details/${item.product}`}>{item.name}</Link></Col>
                                    <Col md = {2}>${item.price}</Col>
                                    <Col>
                                        <Form value = {item.product} onChange = {(e)=>{dispatch(addToCart(item.product, Number(e.target.value)))}}>
                                        <select>
                                            {
                                                [...Array(item.countInstock).keys()].map((option) => (
                                                    <option key = {item.product}>{option + 1}</option>
                                                ))
                                            }
                                            </select>
                                        </Form>
                                    </Col>
                                    <Col md={1}><Button variant = "light" onClick = {()=>handleCartDelete(item.product)}><i className = "fas fa-trash"></i></Button>                                    
                                    </Col> 
                                </Row>
                    </ListGroup.Item> 
                        )
                      }
                      <ListGroup.Item variant = "flush">
                        <Col md = {4}>
                            <Card>
                            <h1>Subtotal({cartItems.reduce((acc, item) => acc + item.qty, 0)})</h1>
                          {cartItems.reduce((acc, item) => acc + item.qty*item.price, 0).toFixed(2)}
                            </Card>    
                        </Col>
                        </ListGroup.Item>
                      <ListGroup.Item>
                      <Button disabled = {cartItems.length === 0} type = "button" 
                      variant = "dark" className = "btn-block" onClick = {handleProceedCart}>Proceed To Checkout</Button>
                      </ListGroup.Item>
                  </ListGroup>
              )
          }
        </React.Fragment>
    );
}
export default CartScreen;