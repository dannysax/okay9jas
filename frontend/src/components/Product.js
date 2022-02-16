import React from 'react';
import Rating from "./Rating"
import { Link } from 'react-router-dom';
import {Col, Row, Card, Button, Image, ButtonGroup} from 'react-bootstrap';

function Products({products}){
    return (
        <Col md = {4} xs = {6}>
            <Card>
                <Link to = {`/details/${products.id}`}>
                <Card.Img 
                src = {products.image} />
                </Link>
                <Card.Body>
                    <Card.Title>{products.name}</Card.Title>
                    <Card.Text>{products.description}</Card.Text>
                    <Card.Title>NGN{products.price}</Card.Title>
                    <Rating value = {products.rating} color = "#FFD700"/>
                    <ButtonGroup>
                   <Link to = {products.countInstock ? `/cart/${products.id}` : ""}><Button disabled = {products.countInstock == 0}>Add</Button></Link>
                        <Button>View</Button>
                    </ButtonGroup>
                </Card.Body>
            </Card>
        </Col>
    )
}
export default Products;