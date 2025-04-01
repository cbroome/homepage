interface IPositionable {
	xPos: number;
	yPos: number;
	stroke?: {};
}

interface IPathViewOptions {
	/**
	 * @property	{d3}	line
	 */
	line: undefined;

	/**
	 * @property	{d3}	svg
	 */
	svg: undefined;

	/**
	 * @property    {d3}    group
	 */
	group: undefined;
}

export class PathView {
	/**
	 * @property	{PathModel}
	 */
	model: undefined;

	skill?: IPositionable;

	experience?: IPositionable;

	/**
	 * @property	{Object}	options
	 */
	options: IPathViewOptions;

	constructor(options: IPathViewOptions) {
		this.options = options;

		const positionable: IPositionable = {
			xPos: 0,
			yPos: 0,
			stroke: undefined
		};

		this.skill = { ...positionable };
		this.experience = { ...positionable };
	}

	initialize() {
		/*
			this.listenTo(this.model.get('experience'), EVENTS.EXPERIENCE.HOVER, this._hoverOn);
			this.listenTo(this.model.get('skill'), EVENTS.SKILL.HOVER, this._hoverOn);
			this.listenTo(this.model.get('experience'), EVENTS.EXPERIENCE.HOVER_END, this._hoverOff);
			this.listenTo(this.model.get('skill'), EVENTS.SKILL.HOVER_END, this._hoverOff);
			app.vent.on(EVENTS.PATHS.RESET, _.bind(this._hoverOff, this));
        */
	}

	/**
	 *
	 */
	protected hoverOn() {
		this.options?.line?.classed('hovered', true);
		this.options?.line?.attr('stroke', this.model.get('experience').get('stroke'));

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
	}
}
