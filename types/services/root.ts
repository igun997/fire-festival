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
      base_background: {
        data: {
          id: number;
          attributes: Resources.MediaAttributes;
        };
      };
      footer_text: string;
      instagram_url: string;
      email: string;
      helpdesk: string;
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

  export namespace getStaticPage {
    export type request = {
      slug: string;
    };
    export type data = {
      id: number;
      title: string;
      description: string;
      config: {
        id: number;
        name: string;
        layout: any;
      }[];
      slug: string;
      footer_text: string | null;
      footer_image: {
        data: {
          id: number;
          attributes: Resources.MediaAttributes;
        }[];
      };
    };
    export type response = {
      data: {
        id: number;
        attributes: data;
      }[];
    };
  }

  export namespace getListEvent {
    export type data = {
      id: number;
      event_name: string;
      slug: string;
      is_contact: boolean;
      downloadable_component: string | null;
      downloadable_files: {
        id: number;
        name: string;
        file: {
          data: {
            id: number;
            attributes: Resources.MediaAttributes;
          };
        };
      }[];
      icon: {
        data: {
          id: number;
          attributes: Resources.MediaAttributes;
        };
      };
      featured_image: {
        data: {
          id: number;
          attributes: Resources.MediaAttributes;
        } | null;
      };
      event_info: {
        id: number;
        title: string;
        description: string;
        layout: string;
        medias: {
          data: {
            id: number;
            attributes: Resources.MediaAttributes;
          }[];
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
