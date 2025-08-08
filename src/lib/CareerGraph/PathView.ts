import { EVENTS } from '$lib/consts';
import type { ExperienceModel } from './ExperienceModel';
import type { SkillModel } from './SkillModel';

interface IPathViewOptions {
	/**
	 * @property	{d3}	line
	 */
	line: any;

	/**
	 * @property	{d3}	svg
	 */
	svg: any;

	/**
	 * @property    {d3}    group
	 */
	group: any;
}

export class PathView {
	/**
	 * @property	{PathModel}
	 */
	model: undefined;

	skill?: SkillModel;

	experience?: ExperienceModel;

	/**
	 * @property	{Object}	options
	 */
	options: IPathViewOptions;

	constructor(experience: ExperienceModel, skill: SkillModel, options: IPathViewOptions) {
		this.options = options;

		this.experience = experience;
		this.skill = skill;

		this.experience?.addListener(EVENTS.EXPERIENCE.HOVER, this.hoverOn.bind(this));
		this.experience?.addListener(EVENTS.EXPERIENCE.HOVER_END, this.hoverOff.bind(this));
		this.skill?.addListener(EVENTS.SKILL.HOVER, this.hoverOn.bind(this));
		this.skill?.addListener(EVENTS.SKILL.HOVER_END, this.hoverOff.bind(this));
	}

	/**
	 *
	 */
	protected hoverOn() {
		this.options?.line?.classed('hovered', true);
		this.options.line.attr('stroke', this.experience?.stroke);
	}

	protected hoverOff() {
		if (!this.experience?.selected && !this.skill?.selected) {
			this.options.line.classed('hovered', false);
		}
	}

	remove() {}
}
