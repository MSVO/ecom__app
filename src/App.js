import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import AddAddressPage from "./pages/AddAddressPage";
import AddressesPage from "./pages/AddressesPage";
import AuthenticationPage from "./pages/AuthenticationPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
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
      </Switch>
    </BrowserRouter>
  );
}

export default App;
