export interface RichtextSection {
  type: RichtextSectionType;
  level?: number;
  children: SectionChildren[];
}

export interface SectionChildren {
  text: string;
  type: SectionChildrenType;
  url?: string;
  children?: SectionChildren[];
}

export type RichtextSectionType = 'paragraph' | 'heading' | 'quote';
export type SectionChildrenType = 'text' | 'link';
