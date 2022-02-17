import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,

    PRODUCT_REVIEW_CREATE_REQUEST,
    PRODUCT_REVIEW_CREATE_SUCCESS,
    PRODUCT_REVIEW_CREATE_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,

    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,
 


} from '../constants/productConstants'


export const ProductListReducer = (state = {products: []}, action) => {
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return {loading : true, products : []}

        case PRODUCT_LIST_SUCCESS:
            return {
                loading:false, 
                products:action.payload.products,
                page:action.payload.page,
                pages:action.payload.pages
            }

        case PRODUCT_LIST_FAIL:
            return {loading:false, 
                error:action.payload.products
            }

        default:
            return state
    }
}

export const ProductDetailsReducer = (state = {product : {reviews : []}}, action) => {
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true, ...state
            }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false, product : action.payload
            }
        case PRODUCT_DETAILS_FAIL:
            return {
                loading: false, 
                error: action.payload
            }
        default:
            return state
    }
 }

 export const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return { loading: true }

        case PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }

        case PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case PRODUCT_CREATE_RESET:
            return {}

        default:
            return state
    }
}

 export const ProductReviewReducer = (state = {}, action) => {
     switch(action.type){
         case PRODUCT_REVIEW_CREATE_REQUEST:
             return {
                 loading : false
             }

        case PRODUCT_REVIEW_CREATE_SUCCESS:
            return {
                loading : false,
                reviews : action.payload,
                success : true
            }

        case PRODUCT_REVIEW_CREATE_FAIL:
            return {
                loading : false,
                error : action.payload
            }

        case PRODUCT_CREATE_REVIEW_RESET:
            return {}

        default:
            return state
     }
 }


 export const productGetTopReducer = (state={products:[]}, action) => {
     switch(action.type){
         case PRODUCT_TOP_REQUEST:
             return {
                 loading : true,
                 ...state
             }
        case PRODUCT_TOP_SUCCESS:
            return {
                loading : false,
                products : action.payload
            }
        case PRODUCT_TOP_FAIL:
            return {
                loading : false
            }
        default:
            return state
     }
 }