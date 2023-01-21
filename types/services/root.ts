import { Resources } from '../types';

export namespace RootResources {
  export namespace getSetting {
    export type data = {
      site_name: string;
      description: string;
      footer_image: {
        data: {
          id: number;
          attributes: Resources.MediaAttributes;
        }[];
      };
      footer_text: string;
      logo: {
        data: {
          id: number;
          attributes: Resources.MediaAttributes;
        };
      };
    };
    export type response = {
      data: {
        id: number;
        attributes: data;
      };
    };
  }
  export namespace getListLanding {
    export type data = {
      id: number;
      title: string;
      description: string;
      path: string;
      is_external: boolean;
      site_logo: {
        data: {
          id: number;
          attributes: Resources.MediaAttributes;
        };
      };
    };
    export type response = {
      data: {
        id: number;
        attributes: data;
      }[];
    };
  }
}
