import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://zazislovensko-a83dc.firebaseio.com/'
});

export default instance;