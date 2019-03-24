import AddProductComponent from "./components/addProduct/addProductComponent";
import ProductListComponent from "./components/productList/productListComponent";

const routes = [
  {
    path: "/",
    exact: true,
    component: ProductListComponent
  },
  {
    path: "/add-product",
    exact: true,
    component: AddProductComponent
  },
];

export default routes;