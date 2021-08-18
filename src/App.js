import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import ProductsPage from "./pages/ProductsPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <ProductsPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
