import HomeScreen from './screens/HomeScreen';
import {BrowserRouter, HashRouter, Route} from 'react-router-dom';
import ProductScreen from './screens/ProducScreen';
import CartScreen from './screens/CartScreen';
import Header from './components/Header';
import Footer from './components/Footer';
import {Container} from 'react-bootstrap';
import './index.css';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceorderScreen';
import OrderScreen from './screens/OrderScreen';
import UsersListScreen from './screens/UsersListScreen';



function App() {
  return (
    <div className="App">
      <HashRouter>
      <Header />
      <main>
      <Container>
      <Route exact path = "/" component = {HomeScreen}/>
      <Route exact path = "/details/:id/" component = {ProductScreen}/>
      <Route exact path = "/cart/:id?/" component = {CartScreen}/>
      <Route exact path = "/login/" component = {LoginScreen}/>
      <Route exact path = "/register/" component = {RegisterScreen}/>
      <Route exact path = "/profile/" component = {ProfileScreen}/>
      <Route exact path = '/shipping/' component = {ShippingScreen}/>
      <Route exact path = '/payment/' component = {PaymentScreen} />
      <Route exact path = "/placeorder/" component={PlaceOrderScreen} />
      <Route exact path = "/order/:id/" component={OrderScreen} />
      <Route exact path = "/users/" component={UsersListScreen} />
      </Container>
      </main>
      <Footer />
      </HashRouter>
    
    </div>   
  );
}

export default App;
