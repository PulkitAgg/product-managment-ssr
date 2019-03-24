import { observable, action, computed } from 'mobx';
import "isomorphic-fetch";
import URLS from "../common/api";

class ProductStore {
    @observable productList = [];
    originalProductList = [];

    setProductList(data) {
        this.productList = data;
    }

    setoriginalProductList(data) {
        this.originalProductList = data;
        this.productList = data;
    }

    @action getProducts() {
        return fetch(URLS.productList)
            .then(res => res.json())
            .then(res => {
                this.setoriginalProductList(res.data)
            })
    }

    @action addProduct(params) {
        let option = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params)
        }
        return fetch(URLS.addProduct, option)
    }

    @action editProduct(params) {
        let option = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params)
        }
        return fetch(URLS.editProduct, option)
    }
    
    @action search(productName) {
        this.setProductList(this.originalProductList.filter(data => {
            return data.name.toLowerCase().includes(productName.toLowerCase())
        })
        )
    }

    @action sortBy(type, asc) {
        let sortedVal = [];
        if (asc) {
            switch (type) {
                case 'price':
                    sortedVal = this.productList.sort((first, second) => second.price - first.price);
                    break;
                case 'name':
                    sortedVal = this.productList.sort((first, second) => {
                        let firstName = first.name.toLowerCase();
                        let secondName = second.name.toLowerCase();
                        if (firstName < secondName) //sort string ascending
                            return -1
                        if (firstName > secondName)
                            return 1
                        return 0 //default return value (no sorting)
                    });
                    break;
                case 'description':
                    sortedVal = this.productList.sort((first, second) => {
                        let firstName = first.description.toLowerCase();
                        let secondName = second.description.toLowerCase();
                        if (firstName < secondName) //sort string ascending
                            return -1
                        if (firstName > secondName)
                            return 1
                        return 0 //default return value (no sorting)
                    });
                    break;
            }
        } else {
            switch (type) {
                case 'price':
                    sortedVal = this.productList.sort((first, second) => first.price - second.price);
                    break;
                case 'name':
                    sortedVal = this.productList.sort((first, second) => {
                        let firstName = first.name.toLowerCase();
                        let secondName = second.name.toLowerCase();
                        if (firstName > secondName) //sort string ascending
                            return -1
                        if (firstName < secondName)
                            return 1
                        return 0 //default return value (no sorting)
                    });
                    break;
                case 'description':
                    sortedVal = this.productList.sort((first, second) => {
                        let firstName = first.description.toLowerCase();
                        let secondName = second.description.toLowerCase();
                        if (firstName > secondName) //sort string ascending
                            return -1
                        if (firstName < secondName)
                            return 1
                        return 0 //default return value (no sorting)
                    });
                    break;
            }
        }

        this.setProductList(sortedVal);
    }

}

const store = new ProductStore();

export default store;