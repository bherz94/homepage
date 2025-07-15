import type { SkillType } from '@/models/strapi/skills/skillType';
import type { BaseObject } from '@/models/strapi/base-object';

export interface Skill extends BaseObject {
  title: string;
  description: string;
  icon: string;
  skill_type: SkillType;
}
