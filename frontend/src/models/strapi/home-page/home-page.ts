import type { BaseObject } from '@/models/strapi/base-object';
import type { HeroArea } from '@/models/strapi/hero-area/hero-area';
import type { RichtextSection } from '../base-richtext';

export interface HomePage extends BaseObject {
  heroArea: HeroArea;
  aboutMe: RichtextSection[];
}
