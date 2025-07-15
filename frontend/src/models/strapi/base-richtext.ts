export interface RichtextSection {
  type: RichtextSectionType;
  children: SectionChildren[];
}

export interface SectionChildren {
  type: SectionChildrenType;
  text: string;
}

export type RichtextSectionType = 'paragraph' | 'heading' | 'quote';
export type SectionChildrenType = 'text';
