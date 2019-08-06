import API from './api';
import configParams from './config';


//总代理管理
const tasks = params => API.$post(configParams.tasks, params, {})


const defaultapi = {

  tasks,

}
export default defaultapi
