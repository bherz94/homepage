import type { Schema, Struct } from '@strapi/strapi';

export interface HeroAreaHeroArea extends Struct.ComponentSchema {
  collectionName: 'components_hero_area_hero_areas';
  info: {
    displayName: 'HeroArea';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    preTitle: Schema.Attribute.String;
    subTitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface TextComponentsTextWithImage extends Struct.ComponentSchema {
  collectionName: 'components_text_components_text_with_images';
  info: {
    displayName: 'TextWithImage';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'hero-area.hero-area': HeroAreaHeroArea;
      'text-components.text-with-image': TextComponentsTextWithImage;
    }
  }
}
