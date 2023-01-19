import { initializeHttp } from '../../configs/http.config';
import { API_HOST } from '../../constants/http.constant';
import { RootResources } from '../../types/services/root';

const http = initializeHttp(API_HOST ?? '');
/**
 * Get Slider Types
 * @param  RootResources.getSliderTypes.request
 * @returns RootResources.getSliderTypes.response
 */
export const getSliders = (params: RootResources.getSliderTypes.request) => {
  return http
    .get('/sliders', { params })
    .then((response) => response.data as RootResources.getSliderTypes.response)
    .catch((error) => {
      throw error;
    });
};

/**
 * Get Page Data
 * @param  RootResources.getPageTypes.request
 * @returns RootResources.getPageTypes.response
 */

export const getPage = (params: any) => {
  return http
    .get('/pages?populate=*&filters[slug][$eq]=' + params)
    .then((response) => response.data as RootResources.getPageTypes.response)
    .catch((error) => {
      throw error;
    });
};
