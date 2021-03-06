import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    PRODUCT_REVIEW_CREATE_REQUEST,
    PRODUCT_REVIEW_CREATE_SUCCESS,
    PRODUCT_REVIEW_CREATE_FAIL,

    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL

} from '../constants/productConstants';
import axios from 'axios';



export const listProducts = (keyword='') => async (dispatch) => {
    try{
        dispatch({
            type: PRODUCT_LIST_REQUEST
        });

        const {data} = await axios.get(`/api/products${keyword}`)

    dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload : data
    });

    }catch(error){
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        });

    }
}

export const productInfo = (id) => async (dispatch) => {
   try{
        dispatch({
            type: PRODUCT_DETAILS_REQUEST
        });
    const {data} = await axios.get(`/api/products/${id}`)
    dispatch({
        type: PRODUCT_DETAILS_SUCCESS, 
        payload: data
    })
   }catch(error){
       dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload : error.response && error.response.data.message
        ? error.response.data.message
        : error.message
       });
        
    }
}

export const reviewProductAction = (productId, review) => async (dispatch, getState) => {
    try{

        dispatch({
            type : PRODUCT_REVIEW_CREATE_REQUEST,
        });

        const {
            userLogin : {
                userInfo
            }
        } = getState()

        const config = {
            headers : {
                "Content-type" : "application/json",
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const {data} = axios.post(`/api/product/${productId}/reviews`,
        review,
        config)

        dispatch({
            type : PRODUCT_REVIEW_CREATE_SUCCESS,
            payload : data
        });

    }catch(error){
        dispatch({
            type : PRODUCT_REVIEW_CREATE_FAIL,
            payload : error.response && error.response.data.detail ?
            error.response.data.detail : error.message  
        })
    }
}

export const getTopProductsAction = () => async (dispatch) => {
   try{

    dispatch({
        type : PRODUCT_TOP_REQUEST
    });

    const {data} = await axios.get('/api/products/top')

    dispatch({
        type : PRODUCT_TOP_SUCCESS,
        payload : data
    })

   }catch(error){

    dispatch({
        type : PRODUCT_TOP_FAIL,
        payload : error.response && error.response.data.message ?
        error.response.data.message : error.message
    });

   }
}