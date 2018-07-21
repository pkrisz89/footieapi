import axios from 'axios';

const getGames = () => axios.get('/games').then(res => res.data);
const updateResult = (id, result) => axios.put(`game/${id}/result`, result);
const addGame = payload => axios.post('/game', payload)

export {getGames, updateResult, addGame};