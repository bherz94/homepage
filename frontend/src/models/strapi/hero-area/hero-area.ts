import type { Image } from '@/models/strapi/base-image';
import type { BaseObject } from '@/models/strapi/base-object';

export interface HeroArea extends BaseObject {
  preTitle: string;
  title: string;
  subTitle: string;
  description: string;
  image: Image;
}
