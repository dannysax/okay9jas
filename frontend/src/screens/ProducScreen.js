import React from 'react';
import {useEffect, useState, history} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productInfo, reviewProductAction } from '../actions/productActions';
import PreLoader from '../components/Loader';
import Message from '../components/Message';
import Rating from '../components/Rating';
import { Link } from 'react-router-dom';
import { Col, ListGroup, Row, Button, Card, Form } from 'react-bootstrap';
import { FormGroup } from '@mui/material';
import { ProductReviewReducer } from '../reducers/productsReducer';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';




function ProductScreen({match, history}){ 

    const productDetails = useSelector(state=>state.productDetails)
    const {loading, error, product} = productDetails

    const productReviews =  useSelector(state=>state.productReviews)
    const {loading:loadingReview, success:successReview, error:errorReview, reviews} = productReviews

    const [comment, setComment] = useState('')
    const [rating, setRating] = useState(0)

    const productId = match.params.id

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    const dispatch = useDispatch();
   
    const [Qty, setQty] = useState(1)

    const ReviewSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(reviewProductAction(productId,
            {
                rating,
                comment
            })
        )
    }

useEffect(()=>{
    if (successReview) {
        setRating(0)
        setComment('')
        dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }

    dispatch(productInfo(match.params.id))
 }, [setComment, setRating, successReview, dispatch]);

const handleAddCart = () => {
    history.push(`/cart/${match.params.id}?qty=${Qty}`)
}

    return (
        <React.Fragment>
            <Row marginTop = {5} paddingBottom = {5}><Link to="/"><Button>Back</Button></Link></Row>
            {
                loading ? <PreLoader />
                : error ? <Message text = {error}/>
                : <Row container xs={12} spacing = {2} marginLeft = {10} marginRight = {2}>
                <Col xs={6}>                  
                
                        <Card.Img
                        alt = {product.name} 
                        src = {product.image}
                        height = "300px"
                        />               
                    </Col>
                    <Col xs = {6}>                       
                            <ListGroup>
                        <ListGroup.Item><h6 variant = "h5">{product.name}</h6></ListGroup.Item>
                        <ListGroup.Item><h6 variant = "h6">NGN{product.price}</h6></ListGroup.Item>
                        <ListGroup.Item><Rating value = {product.rating} text = {`${product.numReviews} Reviews`} color = "#f8e825"/></ListGroup.Item>
                        <ListGroup.Item><h6 varaiant = "body1">{product.description}</h6></ListGroup.Item>
                        </ListGroup>
                    </Col>
                <Col xs = {5}>
                    <ListGroup>
                    <ListGroup.Item>
                        <Row xs = {4} container>
                        <Col xs = {6}><h6 variant = "h6">Price: </h6></Col>
                        <Col xs = {6}><h6 variant = "h6">NGN{product.price}</h6></Col>
                    </Row>
                    </ListGroup.Item>
 
                    <ListGroup.Item>
                        <Row xs = {4} container>
                        <Col xs={6}><h6 variant = "h6">Status:</h6></Col>
                        <Col xs={6}><h6 variant = "h6">{product.countInstock > 0 ? "In Stock" : "Out of Stock"}</h6></Col>
                    </Row>
                    </ListGroup.Item> 
                    <ListGroup.Item>
                        {
                            product.countInstock > 0 && <form
                            onChange = {(e)=>{setQty(e.target.value)}}>
                                <label>Quantity:</label>
                                <select>
                                    {
                                    [...Array(product.countInstock).keys()].map((option) =>(
                                    <option key = {option + 1} value = {option + 1}>{option + 1}</option>
                                    )
                                    )
}
                                    </select>
                            </form>
                        }
                            
                        </ListGroup.Item>                     
                    <ListGroup.Item>
                         <Button disabled = {product.countInstock == 0} onClick={handleAddCart}>Add to Cart</Button>                     
                       </ListGroup.Item>
                </ListGroup> 
                    </Col>
                </Row>
            }

            <Row>
                <Col md={6}>
                    <h2>REVIEWS</h2>
                    {product.reviews.length === 0 && <Message variant='info' text= "No Review"/>}
                    <ListGroup>
                            {
                                product.reviews.map((review) => 
                                <ListGroup.Item>
                                        <strong>{review.name ? review.name : ""}</strong>
                                        <p>{review.comment}</p>
                                        <Rating value = {review.rating} color = "#f8e825" />
                                </ListGroup.Item>
                                
                                )
                            }
                            <ListGroup.Item>
                                <h2>WRITE A REVIEW</h2>
                                {errorReview && <Message text={errorReview} />}
                                {
                                    userInfo ? (
                                        <Form  onSubmit={ReviewSubmitHandler}>
                                        <FormGroup>
                                            <Form.Label>Rating:</Form.Label>
                                            <Form.Control as = "select" value = {rating} onChange={(e)=>setRating(e.target.value)} required>
                                                            <option value=''>Select...</option>
                                                            <option value='1'>1 - Poor</option>
                                                            <option value='2'>2 - Fair</option>
                                                            <option value='3'>3 - Good</option>
                                                            <option value='4'>4 - Very Good</option>
                                                            <option value='5'>5 - Excellent</option>
                                            </Form.Control>
                                        </FormGroup>

                                        <FormGroup>
                                            <Form.Label>Comment:</Form.Label>
                                            <Form.Control type="textarea" row = '5' value={comment} onChange = {(e)=>setComment(e.target.value)} required></Form.Control>
                                        </FormGroup>

                                        <Button type='submit'>Add Review</Button>
                                </Form>
                                    ) : (
                                        <Message text = "Login to write a review" />
                                    )
                                }
                               
                            </ListGroup.Item>
                        </ListGroup>
                </Col>
            </Row>
            
        </React.Fragment>
    )
}
export default ProductScreen;