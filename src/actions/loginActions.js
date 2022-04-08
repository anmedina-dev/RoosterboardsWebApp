import * as TYPES from '../types/login.types';
import * as loginService from '../services/loginService';

export const loginActions = {
    signIn: (data) => ({
        type: TYPES.SIGN_IN,
        payload: {
            promise: loginService.signIn(data)
        }
    }),
    logout: (data) => ({
        type: TYPES.LOGOUT,
        payload: {
            promise: loginService.signIn(data)
        }
    }),   
    signUp: (data) => ({
        type: TYPES.SIGN_UP,
        payload: {
            promise: loginService.signIn(data)
        }
    }),
};