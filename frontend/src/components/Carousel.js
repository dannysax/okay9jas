import React, { useEffect } from 'react';
import { Carousel, Image } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getTopProductsAction } from '../actions/productActions';
import { Link } from 'react-router-dom';


function TopCarousel(){

    const productGetTop = useSelector(state=>state.productGetTop)
    const {loading, products, error} = productGetTop

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getTopProductsAction())
    }, dispatch)

    return (
        <React.Fragment>
            <Carousel pause='hover' className='bg-dark'>
                {
                    products.map((product) => 
                    <Carousel.Item>
                        <Link to={`/details/${product.id}`}>
                        <Image src={product.image} alt={product.name} fluid></Image>
                        <Carousel.Caption className='carousel.caption'>
                            <h4>{product.name} (NGN{product.price})</h4>
                        </Carousel.Caption>
                        </Link>
                        
                    </Carousel.Item>
                    )
                }
            </Carousel>
        </React.Fragment>
    )
}
export default TopCarousel;