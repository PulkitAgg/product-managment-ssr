
/**
 * model for product.
 */
export default class ProductModel {
    constructor() {
        return {
            name: {
                value: "",
                readOnly: false,
                error: false,
                errorMessage: '',
            },
            description: {
                value: '',
                readOnly: false,
                error: false,
                errorMessage: ''
            },
            price: {
                value: '',
                readOnly: false,
                error: false,
                errorMessage: ''
            },
        };
    }
}
