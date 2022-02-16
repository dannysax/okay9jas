
import {CART_ADD_ITEM, CART_REMOVE_ITEM, ADD_SHIPPING_INFO, ADD_PAYMENT_METHOD_INFO} from '../constants/cartConstants';
import axios from 'axios';

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data.id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInstock: data.countInstock,
            qty
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type : CART_REMOVE_ITEM,
        payload : id
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const addShippingAction = (data) => async (dispatch) => {
    dispatch({
        type: ADD_SHIPPING_INFO,
        payload: data
    });
    
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const addPaymentMethodAction = (data) => async (dispatch) => {
    dispatch({
        type : ADD_PAYMENT_METHOD_INFO,
        payload : data
    });
    localStorage.setItem("paymentMethod", JSON.stringify(data))
}

