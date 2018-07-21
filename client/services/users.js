import axios from 'axios';

const getUsers = () => axios.get('/allUser').then(res => res.data);

export {getUsers};