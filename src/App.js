import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import AddAddressPage from "./pages/AddAddressPage";
import AddressesPage from "./pages/AddressesPage";
import AuthenticationPage from "./pages/AuthenticationPage";
import CheckoutPage from "./pages/CheckoutPage";
import ContactPage from "./pages/ContactPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import OrdersPage from "./pages/OrdersPage";
import PastOrdersPage from "./pages/PastOrdersPage";
import ProductsPage from "./pages/ProductsPage";
import routes from "./routes/routes";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <ProductsPage />
        </Route>
        <Route exact path="/checkout">
          <CheckoutPage />
        </Route>
        <Route path={routes.signIn.template}>
          <AuthenticationPage activeTab="signin" />
        </Route>
        <Route exact path={routes.order.template}>
          <OrderDetailsPage />
        </Route>
        <Route exact path={routes.addAddress.template}>
          <AddAddressPage />
        </Route>
        <Route exact path={routes.addresses.template}>
          <AddressesPage />
        </Route>
        <Route exact path={routes.pastOrders.template}>
          <PastOrdersPage />
        </Route>
        <Route exact path={routes.manageOrders.template}>
          <OrdersPage />
        </Route>
        <Route exact path={routes.manageProducts.template}>
          <ProductsPage />
        </Route>
        <Route exact path={routes.contactUs.template}>
          <ContactPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
