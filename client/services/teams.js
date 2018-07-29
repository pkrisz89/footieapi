import axios from 'axios';

const getTeams = () => axios
    .get('/teams')
    .then(res => res.data);
const postTeam = data => axios.post('/teams', data);
const deleteTeam = id => axios.delete(`/teams/${id}`);

export {getTeams, postTeam, deleteTeam};