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

// pages?populate=*&filters[slug][$eq]=festival

export const getStaticPage = (slug: string) => {
  return http.get(`/pages?populate=*&filters[slug][$eq]=${slug}`).then((response) => {
    return response.data as RootResources.getStaticPage.response;
  });
};

// events?populate=*

export const getListEvent = () => {
  return http.get('/events?populate=*').then((response) => {
    return response.data as RootResources.getListEvent.response;
  });
};

// events?populate=*&filters[slug][$eq]=ngodi

export const getEventDetail = (slug: string) => {
  return http.get(`/events?populate=deep&filters[slug][$eq]=${slug}`).then((response) => {
    return response.data as RootResources.getListEvent.response;
  });
};
