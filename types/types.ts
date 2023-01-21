import { CSSProperties } from 'react';

export namespace Resources {
  // General Attributes
  export type FormatResource = {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    width: number;
    height: number;
    size: number;
    path: string;
    url: string;
  };
  export type DefaultResponse = {
    id: number;
    attributes: any;
  };
  export type MediaAttributes = {
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: {
      thumbnail: FormatResource;
      medium: FormatResource;
      small: FormatResource;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string;
    provider: string;
    provider_metadata: string;
    created_at: string;
    updated_at: string;
  };
  export type PaginationTypes = {
    page: number;
    pageSize: number;
    withCount: boolean;
    total?: number;
    pageCount?: number;
  };
  export type PopulateTypes = any;
  export type SectionTypes = {
    component: string;
    layout: {
      xs?: any;
      sm?: any;
      md?: any;
      lg?: any;
    };
    data: {
      title?: string;
      paragraphs?: string[];
      contents?: string;
      url?: string;
      text?: string;
      background?: string;
      instagram_username?: string;
      username?: string;
      featured?: string[];
      embed_ig?: string;
      style?: CSSProperties;
      filter?: {
        type?: string;
        category?: string;
      };
    };
  };
  export type PageTypes = {
    title?: string;
    slug?: string;
    keywords?: string;
    description?: string;
    haveSlider?: boolean;
    sections?: SectionTypes[];
  };
  export type Requests = {
    sort?: string[] | string;
    filters?: any;
    populate?: PopulateTypes;
    pagination?: PaginationTypes;
    fields?: string[];
    publicationState?: string;
    locale?: string | string[];
  };
}
