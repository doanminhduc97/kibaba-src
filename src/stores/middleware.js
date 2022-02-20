import agent from '../api/SuperAgent';
import {
  LOGIN,
  LOGOUT,
  REGISTER
} from './constants/actionTypes';

const localStorageMiddleware = store => next => action => {
  if (action.type === REGISTER || action.type === LOGIN) {
    if (!action.error) {
      console.log("action1", action);
      localStorage.setItem('jwt', action?.payload?.data?.token);
      agent.setToken(action?.payload?.data?.token);
    }
  } else if (action.type === LOGOUT) {
    localStorage.setItem('jwt', '');
    agent.setToken(null);
  }

  next(action);
};



export { localStorageMiddleware }
