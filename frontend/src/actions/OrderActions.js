import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,

    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,

    USER_ORDER_FAIL,
    USER_ORDER_REQUEST,
    USER_ORDER_SUCCESS,

} from '../constants/OrderConstants';
import axios from 'axios';
 import {CART_ITEMS_CLEAR} from '../constants/cartConstants'


export const CreateOrderAction = (order) => async (dispatch, getState) => {

    try{
        dispatch({
            type : ORDER_CREATE_REQUEST
        });
    
        const {userLogin : {
            userInfo
    }
    } = getState()
    
        const config = {
            headers : {
                "Content-type" : "application/json",
                 Authorization : `Bearer ${userInfo.token}`
            }
        }
    
    
        const {data} = await axios.post("/api/product/order",
        order,
        config)
    
        dispatch({
            type : ORDER_CREATE_SUCCESS,
            payload : data
        });

        dispatch({
            type : CART_ITEMS_CLEAR
        });
        localStorage.removeItem("cartItems")
    
    }catch(error){

        dispatch({
            type : ORDER_CREATE_FAIL,
            payload : error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        });
    }
    
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/product/order/${id}`,
            config
        )

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const orderPayAction = (id, paymentResult) => async (dispatch, getState) => {
    try{
        dispatch({
            type : ORDER_PAY_REQUEST
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

        const {data} = axios.put(`/api/product/order/${id}/pay`,
        config)

        dispatch({
            type : ORDER_PAY_SUCCESS,
            payload : data
        })
    }catch(error){
        dispatch({
            type : ORDER_PAY_FAIL,
            payload : error.response && error.response.data.detail
            ? error.response.data.detail : error.message
        });
    }
}

export const getUserOrders = () => async (dispatch, getState) => {
    try{

        dispatch({
            type : USER_ORDER_REQUEST
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

        const {data} = await axios.get("/api/userorders/",
        config)

        dispatch({
            type : USER_ORDER_SUCCESS,
            payload : data
        });

    }catch(error){
        dispatch({
            type : USER_ORDER_FAIL,
            payload : error.response && error.response.data.detail ?
            error.response.data.detail : error.message
        });
    }
}