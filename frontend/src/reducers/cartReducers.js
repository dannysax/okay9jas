import {CART_ADD_ITEM, CART_REMOVE_ITEM, ADD_SHIPPING_INFO, ADD_PAYMENT_METHOD_INFO, CART_ITEMS_CLEAR} from '../constants/cartConstants'




export const cartReducer = (state = { cartItems: [], shippingInfo : {}}, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(x => x.product === item.product)

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x =>
                        x.product === existItem.product ? item : x)
                }

            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

            case CART_REMOVE_ITEM:
                return{
                    ...state,
                    cartItems : state.cartItems.filter((item) => item.product !== action.payload)
                }

            case ADD_SHIPPING_INFO:
                return {
                    ...state, shippingInfo : action.payload
                }
            case ADD_PAYMENT_METHOD_INFO:
                return {
                    ...state, paymentMethod : action.payload
                }
            case CART_ITEMS_CLEAR:
                return{}

        default:
            return state
    }
}