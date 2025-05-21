import { throttle, bind } from 'lodash-es';
import { EVENTS } from '$lib/consts';
import type { ExperienceModel } from './ExperienceModel';
import type { SkillModel } from './SkillModel';

export class SelectableView {
	/**
	 * @property	{model.Experience}	model
	 */
	model: ExperienceModel | SkillModel;

	/**
	 * @property	{Boolean}	highlighted
	 */
	highlighted = false;

	/**
	 * @property	{d3}		d3el
	 */
	d3el: any;

	exp: undefined;

	/**
	 *
	 */
	constructor(d3el: any, exp: ExperienceModel | SkillModel) {
		this.d3el = d3el;
		this.model = exp;

		this.highlighted = false;
		this.addListeners();
	}

	protected addListeners() {
		const onNameClick = throttle(bind(this.onNameClick, this), 1000, { trailing: false });

		if ('ontouchstart' in window) {
			// Touch events
			this.d3el.on('touchstart', onNameClick);
			this.d3el.on('touchenter', onNameClick);
			this.d3el.on('touchleave', onNameClick);
		} else {
			this.d3el.on('mouseover', bind(this.onMouseover, this));
			this.d3el.on('mouseout', bind(this.onMouseout, this));
			this.d3el.on('mousedown', onNameClick);
		}
	}

	/**
	 *
	 * @global   ga
	 * @returns  {Boolean}   always false
	 */
	onNameClick() {
		const selected = !this.model.selected;
		this.model.selected = selected;

		if (selected) {
			this.onMouseover();
		} else {
			this.onMouseout();
		}
		return false;
	}

	/**
	 *
	 * @returns  {Boolean}   always false
	 */
	onMouseover() {
		return false;
	}

	/**
	 *
	 * @returns  {Boolean}   always false
	 */
	onMouseout() {
		return false;
	}
}
