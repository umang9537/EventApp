import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '../../config';
import {APIClient, setAuthorization} from './api_helper';
import * as url from './url_helper';

const api = new APIClient();

export const ChekLoggedInUser = async () => {
  let LoginDataToken = await AsyncStorage.getItem('access_token');

  if (LoginDataToken) {
    setAuthorization(LoginDataToken);
    return LoginDataToken;
  }
  return null;
};

export const isUserAuthenticated = () => {
  return ChekLoggedInUser() !== null;
};

export const loginapi = rqeuserdata => api.create(url.LOGIN_API, rqeuserdata);

export const getEventsApi = rqeuserdata =>
  api.create(url.GET_EVENTS_API, rqeuserdata);
