import type { ExperienceModel } from './ExperienceModel';
import type { SkillModel } from './SkillModel';

export class PathModel {
	skill: SkillModel;

	experience: ExperienceModel;

	constructor(skill: SkillModel, experience: ExperienceModel) {
		this.skill = skill;
		this.experience = experience;
	}
}
