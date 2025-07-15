import type { BaseObject } from "@/models/strapi/base-object";
import type { HeroArea } from "@/models/strapi/hero-area/hero-area";

export interface HomePage extends BaseObject {
    heroArea: HeroArea;
}