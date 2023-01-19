import { initializeHttp } from '../../configs/http.config';
import { API_HOST } from '../../constants/http.constant';

const http = initializeHttp(API_HOST ?? '');
