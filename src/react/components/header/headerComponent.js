import React, { Component } from "react";
import { withRouter } from "react-router";
import { Nav } from 'react-bootstrap';
import "./header.scss";

class HeaderComponent extends Component {

    goToPage(path) {
        this.props.history.push(path)
    }

    render() {
        return (
            <header id="header">
                <h3 className="header-text">Header</h3>
                <Nav variant="tabs"  className="justify-content-end">
                    <Nav.Item>
                        <Nav.Link onClick={() => this.goToPage('/')}>Product List</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => this.goToPage('/add-product')}>Add Product</Nav.Link>
                    </Nav.Item>
                </Nav>
            </header>
        )
    }
}

export default withRouter(HeaderComponent);
