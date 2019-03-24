import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "../App";
import ProductSotre from '../store/productStore';
import { Provider } from "mobx-react";

render(
  <Provider ProductSotre={ProductSotre}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("app")
);
