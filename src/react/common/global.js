
const global = {
    regex: {
        alpha: /^[a-zA-Z\s.]*$/,
        alphaOnly: /^[a-zA-Z\s]*$/,
        numeric: /^[0-9]*$/,
        alphaNumeric: /^[a-zA-Z0-9]*$/,
        name: /^[a-zA-Z\s.]{2,}$/,
        description: /^[a-zA-Z\s.]{5,}$/,
    },
}

export default global;