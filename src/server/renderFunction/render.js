import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "../../react/App";
import ProductSotre from '../../react/store/productStore';
import { Provider } from "mobx-react";

export default function render(req, store) {
  const context = {};
  const markup = renderToString(
    <Provider ProductSotre={ProductSotre}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  );
  return markup;
}