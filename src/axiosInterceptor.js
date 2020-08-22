import axios from 'axios';

const gateway = axios.create({
    baseURL: "https://totemic-fulcrum-225717.firebaseio.com/"
});

export default gateway;