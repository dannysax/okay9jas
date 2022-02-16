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
} from '../constants/OrderConstants'


export const OrderCreateReducer = (state = { loading: true, orderItems: [], shippingAddress: {} }, action) => {
    switch(action.type){
        case ORDER_CREATE_REQUEST:
            return {
                loading : true
            }
        case ORDER_CREATE_SUCCESS:
            return {
                loading : false,
                success : true,
                order : action.payload
            }
        case ORDER_CREATE_FAIL:
            return {
                loading : false,
                error : action.payload
            }
        default:
            return state
    }
}

export const orderDetailsReducer = (state = {loading : true, shippingAddress : {}, orderItems : []}, action) => {
    switch(action.type){
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading : true
            }
        case ORDER_DETAILS_SUCCESS:
            return {
                loading : false,
                order : action.payload
            }
        case ORDER_DETAILS_FAIL:
            return {
                loading : false,
                error : action.payload
            }
        default:
            return state
    }
}

export const orderPayReducer = (state = {}, action) => {
    switch(action){
        case ORDER_PAY_REQUEST:
            return {
                loading : true
            }
        case ORDER_PAY_SUCCESS:
            return {
                loading : false,
                success : false,
                paymentResult : action.payload
            }

        case ORDER_PAY_FAIL:
            return {
                loading : false,
                error : action.payload
            }

        default:
            return state
    }
}

export const userOrderReducer = (state={}, action) => {
    switch(action.type){
        case USER_ORDER_REQUEST:
            return {
                loading : true
            }
        case USER_ORDER_SUCCESS:
            return {
                loading : false,
                orders : action.payload
            }
        case USER_ORDER_FAIL:
            return {
                loading : false,
                error : action.payload
            }
        default:
            return state
    }
}