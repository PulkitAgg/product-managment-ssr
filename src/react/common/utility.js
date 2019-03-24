
export default {
    showLoader: () => {
        document.getElementsByClassName('loader-wrapper')[0].style.display = 'block';
    },
    hideLoader: () => {
        document.getElementsByClassName('loader-wrapper')[0].style.display = 'none';
    },
};