import React from 'react';
import Products from '../components/Product';
import {useDispatch, useSelector} from 'react-redux';
import { listProducts } from '../actions/productActions';
import { useEffect } from 'react';
import PreLoader from '../components/Loader';
import Message from '../components/Message';
import { Row } from 'react-bootstrap';
import Paginate from '../components/Paginate';
import TopCarousel from '../components/Carousel';



function HomeScreen({history}){
    const dispatch = useDispatch() 

    let keyword = history.location.search

    const productList = useSelector(state=>state.productList)
    const {error, loading, products, page, pages} =  productList

    useEffect(()=>{
            dispatch(listProducts(keyword))
        }, [dispatch, keyword]);

    return (
        <React.Fragment>
            <TopCarousel />
             <Row className='mt-5'>
                 <h2>Featured Products</h2>
        {
            loading ? <PreLoader />
            : error ? <Message text = {error} />
            :
           
            products.map((product)=>
    
            <Products products = {product} key = {product.id}/>
 
            )
            
        }
        </Row>
        <Row className='mt-3'>
        <Paginate page = {page} pages = {pages} keyword = {keyword}/>
        </Row>
        
          </React.Fragment>
    )
  
}
export default HomeScreen;