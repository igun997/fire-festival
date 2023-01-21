import { initializeHttp } from '../../configs/http.config';
import { API_HOST } from '../../constants/http.constant';
import { RootResources } from '../../types/services/root';

const http = initializeHttp(API_HOST ?? '');

export const getSetting = () => {
  return http.get('/setting?populate=*').then((response) => {
    return response.data as RootResources.getSetting.response;
  });
};

// landing-displays?populate=*

export const getListLanding = () => {
  return http.get('/landing-displays?populate=*').then((response) => {
    return response.data as RootResources.getListLanding.response;
  });
};
