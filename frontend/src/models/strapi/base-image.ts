import type { BaseObject } from '@/models/strapi/base-object';

export interface Image extends BaseObject {
  name: string;
  alternativeText: string;
  caption: string | null;
  width: number;
  height: number;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  provider: string;
  provider_metadata: null;
}

export const fullUrl = (image: Image) =>
  `${import.meta.env.VITE_STRAPI_BASEURL}${image.url}`;
