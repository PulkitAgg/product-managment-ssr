import React, { Component } from "react";
import './productList.scss';
import { observer, inject } from 'mobx-react';
import { Table } from "react-bootstrap";
import ProductSotre from "../../store/productStore";

@inject('ProductSotre')
@observer
class ProductListComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productName: '',
            sort: {
                name: '',
                description: '',
                price: ''
            },
        };
    }

    /**
     * function used for server side rendering.
     */
    static initialAction() {
        return ProductSotre.getProducts();
    }

    componentDidMount() {
        this.props.ProductSotre.getProducts();
    }

    changeProductName(e) {
        this.setState({ productName: e.target.value })
    }

    /**
     * function for searching the product by name.
     */
    search() {
        this.props.ProductSotre.search(this.state.productName);
    }

    /**
     * function for sort the table corresponding to heading.
     */
    sortBy(type) {
        let sortElem = this.state.sort;
        if (sortElem[type]) {
            sortElem[type] = !sortElem[type]
        } else {
            sortElem[type] = true;
        }
        this.setState({ sort: sortElem }, this.afterSortChange(type))
    }

    afterSortChange(type) {
        this.props.ProductSotre.sortBy(type, this.state.sort[type]);
    }

    /**
     * function for rendering the table/
     */
    renderProductList() {
        const { productList } = this.props.ProductSotre;
        return productList.map((data, index) => {
            return (
                <tr>
                    <td>{index + 1}</td>
                    <td>{data.name}</td>
                    <td>{data.description}</td>
                    <td>{data.price}</td>
                    <td onClick={() => this.editProduct(data)}>Edit</td>
                </tr>
            )
        })
    }

    /**
     * function for edit the product.
     */
    editProduct(data) {
        this.props.history.push('/add-product', {
            productId: data._id,
            name: data.name,
            description: data.description,
            price: data.price
        })
    }

    render() {
        const { ProductSotre } = this.props;
        return (
            <div className="product-wrapper">

                {
                    ProductSotre.productList.length == 0

                        ?
                        <div className="empty-product">
                            <p>Product list is empty. Please add product first.</p>
                        </div>
                        :
                        <React.Fragment>
                            <div className="row row-wrapper">
                                <div className="col-3">
                                    <div class="input-group">
                                        <input
                                            class="form-control border-secondary py-2"
                                            type="search"
                                            value={this.state.productName}
                                            placeholder="Search by product name"
                                            onChange={(e) => this.changeProductName(e)}
                                        />
                                        <div class="input-group-append">
                                            <button
                                                class="btn btn-outline-secondary"
                                                type="button"
                                                onClick={() => this.search()}
                                            >
                                                Search
                                    </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Table bordered striped responsive className="table-wrapper table-sortable">
                                <thead>
                                    <tr>
                                        <th>S.No.</th>
                                        <th
                                            className={this.state.sort.name ? "asc" : "desc"}
                                            onClick={() => this.sortBy('name')}
                                        >Name
                                        </th>
                                        <th
                                            className={this.state.sort.description ? "asc" : "desc"}
                                            onClick={() => this.sortBy('description')}
                                        >Description
                                         </th>
                                        <th
                                            className={this.state.sort.price ? "asc" : "desc"} onClick={() => this.sortBy('price')}>Price</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderProductList()}
                                </tbody>
                            </Table>
                        </React.Fragment>

                }

            </div>
        )
    }
}

export default ProductListComponent;
