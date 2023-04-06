import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:8888/JavaEE'
});

instance.interceptors.request.use(config => {
  const data = config.data;
  if (config.method === 'get'){
    config.params = data;
  }
  config.headers = {'Content-Type': 'application/json; charset=UTF-8'};
  const user = JSON.parse(JSON.parse(localStorage.getItem('persist:root') as string).User);
  if (user.token){
    config.headers['token'] = user.token;
  }
  return config;
}, error => {
  return Promise.reject(error);
})

instance.interceptors.response.use(respond => {
  return respond.data;
}, error => {
  return Promise.reject(error);
})

export default instance;

