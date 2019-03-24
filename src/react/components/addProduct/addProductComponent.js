import React, { Component } from "react";
import './addProduct.scss';
import { observer, inject } from 'mobx-react';
import { Form, Button, Alert } from "react-bootstrap";
import ProductModel from "../../models/product";
import global from "../../common/global";
import utility from "../../common/utility";

@inject('ProductSotre')
@observer
class AddProductComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form: new ProductModel(),
            productId: '',
            alert: {
                show: false,
                msg: '',
                error: false,
            }
        };
    }

    componentDidMount() {
        // If we are comming for edit the product.
        if (this.props.location.state && this.props.location.state.productId) {
            let form = this.state.form;
            form.name.value = this.props.location.state.name;
            form.description.value = this.props.location.state.description;
            form.price.value = this.props.location.state.price;
            this.setState({
                form,
                productId: this.props.location.state.productId
            })
        }
    }

    /**
     * function for add/ updating the product.
     */
    addProduct() {
        if (this.checkValidations()) {
            utility.showLoader();
            if (this.state.productId) {
                let params = {
                    id: this.state.productId,
                    name: this.state.form.name.value,
                    description: this.state.form.description.value,
                    price: parseInt(this.state.form.price.value)
                }
                this.props.ProductSotre.editProduct(params)
                    .then(res => res.json())
                    .then(res => {
                        utility.hideLoader();
                        let alert = this.state.alert;
                        if (res.success) {
                            alert.show = true;
                            alert.msg = 'Product updated successfully.'
                            alert.error = false;
                        } else {
                            alert.show = true;
                            alert.msg = 'Something went wrong.'
                            alert.error = true;
                        }
                        this.setState({ alert })
                        setTimeout(() => {
                            let alert = this.state.alert;
                            alert.show = false;
                            alert.msg = ''
                            alert.error = false;
                            this.setState({
                                alert,
                                form: new ProductModel()
                            })
                        }, 3000)
                    }).catch(err => {
                        utility.hideLoader();
                        let alert = this.state.alert;
                        alert.show = true;
                        alert.msg = 'Something went wrong.'
                        alert.error = true;
                        this.setState({ alert });
                        setTimeout(() => {
                            let alert = this.state.alert;
                            alert.show = false;
                            alert.msg = ''
                            alert.error = false;
                            this.setState({
                                alert
                            })
                        }, 3000)
                    })
            } else {
                let params = {
                    name: this.state.form.name.value,
                    description: this.state.form.description.value,
                    price: parseInt(this.state.form.price.value)
                }
                this.props.ProductSotre.addProduct(params).then(res => res.json())
                    .then(res => {
                        utility.hideLoader();
                        let alert = this.state.alert;
                        if (res.success) {
                            alert.show = true;
                            alert.msg = 'Product added successfully.'
                            alert.error = false;
                        } else {
                            alert.show = true;
                            alert.msg = 'Something went wrong.'
                            alert.error = true;
                        }
                        this.setState({ alert })
                        setTimeout(() => {
                            let alert = this.state.alert;
                            alert.show = false;
                            alert.msg = ''
                            alert.error = false;
                            this.setState({
                                alert,
                                form: new ProductModel()
                            })
                        }, 3000)
                    }).catch(err => {
                        utility.hideLoader();
                        let alert = this.state.alert;
                        alert.show = true;
                        alert.msg = 'Something went wrong.'
                        alert.error = true;
                        this.setState({ alert })
                        setTimeout(() => {
                            let alert = this.state.alert;
                            alert.show = false;
                            alert.msg = ''
                            alert.error = false;
                            this.setState({
                                alert,
                            })
                        }, 3000)
                    })
            }

        }
    }

    /**
     * function for checking the validation of the product form.
     */
    checkValidations() {
        let form = this.state.form;
        let formIsValid = true;

        //Name
        if (form.name.value) {
            let nameRegex = new RegExp(global.regex.name)
            if (!nameRegex.test(form.name.value)) {
                formIsValid = false;
                form.name.error = true;
                form.name.errorMessage = "Please enter at least two characters.";
            }
        } else {
            formIsValid = false;
            form.name.error = true;
            form.name.errorMessage = "Please enter name.";
        }

        // Description
        if (form.description.value) {
            let descriptionRegex = new RegExp(global.regex.description)
            if (!descriptionRegex.test(form.description.value)) {
                formIsValid = false;
                form.description.error = true;
                form.description.errorMessage = "Please enter at least five characters.";
            }
        } else {
            formIsValid = false;
            form.description.error = true;
            form.description.errorMessage = "Please enter description.";
        }

        // Price
        if (form.price.value) {
            let numericRegex = new RegExp(global.regex.numeric)
            if (!numericRegex.test(form.price.value)) {
                formIsValid = false;
                form.price.error = true;
                form.price.errorMessage = "Please enter valid price value.";
            }
        } else {
            formIsValid = false;
            form.price.error = true;
            form.price.errorMessage = "Please enter price.";
        }

        this.setState({ form })
        return formIsValid;

    }

    checkInputValidation(e) {
        let valid = true;
        switch (e.target.name) {
            case 'name':
            case 'description':
                let alphaRegex = new RegExp(global.regex.alpha)
                valid = alphaRegex.test(e.target.value);
                break;
            case 'price':
                let numericRegex = new RegExp(global.regex.numeric)
                valid = numericRegex.test(e.target.value);
                break;
        }
        return valid;
    }

    handleInput(e) {
        if (this.checkInputValidation(e)) {
            let form = this.state.form;
            form[e.target.name].value = e.target.value;
            form[e.target.name].error = false;
            form[e.target.name].errorMessage = "";
            this.setState({ form })
        }
    }

    render() {
        const { ProductSotre } = this.props;
        const { form } = this.state;
        return (
            <div className="form">
                {
                    this.state.alert.show
                        ?
                        <div className={this.state.alert.error ? "alert-fixed alert alert-danger" : "alert-fixed alert alert-success"}>
                            <p>
                                {this.state.alert.msg}
                            </p>
                        </div>
                        : null
                }

                <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Product Name"
                            value={form.name.value}
                            onChange={(e) => this.handleInput(e)}
                        />
                        {
                            form.name.error
                                ?
                                <Alert variant="danger">
                                    {form.name.errorMessage}
                                </Alert>
                                :
                                null
                        }
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            placeholder="Product Description"
                            value={form.description.value}
                            onChange={(e) => this.handleInput(e)}
                        />
                        {
                            form.description.error
                                ?
                                <Alert variant="danger">
                                    {form.description.errorMessage}
                                </Alert>
                                :
                                null
                        }
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect2">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="text"
                            name="price"
                            placeholder="Product Price"
                            value={form.price.value}
                            onChange={(e) => this.handleInput(e)}
                        />
                        {
                            form.price.error
                                ?
                                <Alert variant="danger">
                                    {form.price.errorMessage}
                                </Alert>
                                :
                                null
                        }
                    </Form.Group>
                </Form>
                <Button variant="primary" type="submit" onClick={() => this.addProduct()}>
                    {this.state.productId ? 'Update Product' :'Add Product'}
                </Button>
            </div>
        )
    }
}

export default AddProductComponent;
