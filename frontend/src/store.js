import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { OrderCreateReducer, orderDetailsReducer, orderPayReducer, userOrderReducer } from './reducers/OrderReducer';
import {productGetTopReducer, ProductListReducer, ProductReviewReducer} from './reducers/productsReducer';
import {ProductDetailsReducer, productCreateReducer} from './reducers/productsReducer';
import {userDetailsReducer, userLoginReducer, userProfileUpdateReducer, userRegisterReducer, usersListReducer} from './reducers/userReducers';

const middleware = [thunk]
const reducers = combineReducers(
    {productList: ProductListReducer,
    productDetails : ProductDetailsReducer,
    cart : cartReducer,
    userLogin : userLoginReducer,
    userRegister : userRegisterReducer,
    userDetails : userDetailsReducer,
    userDetailsUpdate: userProfileUpdateReducer,
    orderCreate : OrderCreateReducer,
    orderDetails : orderDetailsReducer,
    orderPay : orderPayReducer,
    userOrders : userOrderReducer,
    usersList : usersListReducer,
    productCreate: productCreateReducer,
    productReviews : ProductReviewReducer,
    productGetTop : productGetTopReducer
    }
)

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []

const shippingInfoFromStorage = localStorage.getItem('shippingAddress') ?
JSON.parse(localStorage.getItem('shippingAddress')) : {}

const paymentMethodFromStorage = localStorage.getItem("paymentMethod") ? 
JSON.parse(localStorage.getItem("paymentMethod")) : ""

const userInfoFromStorage = localStorage.getItem('userInfo') ?
JSON.parse(localStorage.getItem("userInfo")) : null



const initialState = {
    cart: {
        cartItems : cartItemsFromStorage, 
        shippingInfo : shippingInfoFromStorage,
        paymentMethod : paymentMethodFromStorage,
    },
    userLogin : {
        userInfo : userInfoFromStorage,
    },
}


const store = createStore(reducers, initialState, 
    composeWithDevTools(applyMiddleware(...middleware)))

export default store;