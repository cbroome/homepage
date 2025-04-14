import { throttle, bind } from 'lodash-es';
import * as d3 from 'd3';
import { EVENTS } from '$lib/consts';
import type { ExperienceModel } from './ExperienceModel';

export class SelectableView {
	/**
	 * @property	{Marionette.Application}	app
	 */
	app: undefined;

	/**
	 * @property	{model.Experience}	model
	 */
	model: ExperienceModel;

	/**
	 * @property	{Boolean}	highlighted
	 */
	highlighted = false;

	/**
	 * @property	{d3}		d3el
	 */
	d3el: d3;

	exp: undefined;

	/**
	 *
	 */
	constructor(d3el: d3.Selection, exp: ExperienceModel) {
		this.d3el = d3el;
		this.model = exp;

		this.highlighted = false;
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
		this.model.addListener(EVENTS.EXPERIENCE.RESELECT, this.onMouseover);
	}

	/**
	 *
	 * @global   ga
	 * @returns  {Boolean}   always false
	 */
	onNameClick() {
		const selected = !this.model.selected;
		this.model.selected = true;

		if (selected) {
			this.onMouseover();
		}
		return false;
	}

	/**
	 *
	 * @returns  {Boolean}   always false
	 */
	onMouseover() {
		this.model.trigger(EVENTS.SKILL.HOVER);
		return false;
	}

	/**
	 *
	 * @returns  {Boolean}   always false
	 */
	onMouseout() {
		this.model.trigger(EVENTS.SKILL.HOVER_END);
		return false;
	}
}
