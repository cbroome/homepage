import { EVENTS } from '$lib/consts';
import type { ExperienceModel } from './ExperienceModel';
import type { SkillModel } from './SkillModel';

interface IPositionable {
	xPos: number;
	yPos: number;
	stroke?: {};
}

interface IPathViewOptions {
	/**
	 * @property	{d3}	line
	 */
	line: d3;

	/**
	 * @property	{d3}	svg
	 */
	svg: d3;

	/**
	 * @property    {d3}    group
	 */
	group: d3;
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

		this.experience?.addListener(EVENTS.EXPERIENCE.HOVER, this.hoverOn);
		this.experience?.addListener(EVENTS.EXPERIENCE.HOVER_END, this.hoverOff);
		this.skill?.addListener(EVENTS.SKILL.HOVER, this.hoverOn);
		this.skill?.addListener(EVENTS.SKILL.HOVER_END, this.hoverOff);
	}

	/**
	 *
	 */
	protected hoverOn() {
		this.options?.line?.classed('hovered', true);
		//this.options?.line?.attr('stroke', this.model.get('experience').get('stroke'));
		this.options.line.attr('stroke', this.experience?.stroke);

		/* 
		$(this.options?.line[0]).detach();
		$(this.options.group[0]).append(this.options.line[0]);
        */
	}

	protected hoverOff() {
		/*
		if (!this.model.get('experience').get('selected')) {
			this.options.line.classed('hovered', false);
		}
        */
		if (this.experience && !this.experience.selected) {
			// this.options.line.classed('hovered', false);
			console.log('Hovering off ');
		}
	}

	remove() {}
}
