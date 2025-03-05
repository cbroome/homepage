import * as d3 from 'd3';

export interface IExperienceModel {
	/**
	 * @property    {String}    title   human readable title
	 */
	title: string;

	/**
	 * @property    {String}    description
	 */
	description: string;

	/**
	 * @property    {Array}     skills
	 */
	skills: string[];

	/**
	 * @property	{Boolean}	options
	 */
	options: {
		/**
		 * @property	{Boolean}	selected
		 */
		selected?: boolean;

		/**
		 * @property    {String}    stroke      hex color...
		 */
		stroke?: string;
	};
}

export interface IExperienceWorkModel extends IExperienceModel {
	/**
	 * @property    {Datetime}  dateStart
	 */
	dateStart: Date;

	/**
	 * @property    {Datetime}  dateEnd
	 */
	dateEnd: Date;

	/**
	 * @property    {String}    urlRoot
	 */
	urlRoot?: 'service/work';
}

export interface IExperienceProjectModel extends IExperienceModel {}

export interface ICareerGraphOptions {
	expWork: IExperienceWorkModel[];
	expProjects: IExperienceProjectModel[];
}

export class CareerGraph {
	/**
	 * @property
	 */
	views: undefined;

	/**
	 * @property	{collection.Experience.WorkCollection}	expWork
	 */
	expWork: IExperienceWorkModel[] = [];

	/**
	 * @property	{collection.Experience.ProjectCollection}	expProjects
	 */
	expProjects: IExperienceProjectModel[] = [];

	/**
	 * @property	{d3}	svg
	 */
	svg: d3.Selection | null = null;

	/**
	 * @property    {d3}    group
	 */
	group: undefined;

	/**
	 * @property    {Integer}   startY
	 */
	startY = 5;

	/**
	 * @property	{Integer}	cursorY		Keep track of current height
	 */
	cursorY = 0;

	/**
	 * @property	{Integer}	heightHeader
	 */
	heightHeader = 40;

	/**
	 * @property	{Integer}	heightLine
	 */
	heightLine = 50;

	/**
	 * @property	{Integer}	xRegular
	 */
	xHeader = 270;

	/**
	 * @property	{Integer}	xRegular
	 */
	xRegular = 270;

	/**
	 * @property	{Integer}	spacer
	 */
	spacer = 25;

	/**
	 * @property	{Object}	options
	 */
	options: ICareerGraphOptions;

	/**
	 * @property	{Array}		experienceViews
	 */
	protected experienceViews = [];

	constructor(options: ICareerGraphOptions) {
		this.options = {
			expWork: options.expWork,
			expProjects: options.expProjects
		};
		this.initialize();
	}

	initialize = () => {
		this.svg = d3.select('svg#main-svg');
		this.group = this.svg.append('g').attr('class', 'group-experience');

		this.expWork = this.options.expWork;
		this.expProjects = this.options.expProjects;
	};

	/**
	 * @chainable
	 * @returns	{view.Work}
	 */
	render = () => {
		this.svg.selectAll('.exp').remove();
		this.cursorY = this.startY;

		this.renderSection(this.expWork, 'Work Experience').renderSection(
			this.expProjects,
			'Personal Projects'
		);
	};

	/**
	 *
	 */
	protected renderSection = (
		collection: IExperienceWorkModel[] | IExperienceProjectModel[],
		title: string
	) => {
		this.renderHeader(title).renderExperience(collection);
		this.getY(this.spacer);
		return this;
	};

	/**
	 * @chainable
	 * @param	{String}	title
	 * @returns	{view.ExperienceSVG}
	 */
	protected renderHeader = (title: string) => {
		var getY = this._getY(this.heightHeader);
		this.group
			?.append('text')
			.text(title)
			.attr('class', 'header exp')
			.attr('x', this.xHeader)
			.attr('y', getY);

		return this;
	};

	/**
	 *
	 * @chainable
	 * @param	{Backbone.collection}
	 * @returns	{view.ExperienceSVG}
	 */
	protected renderExperience = (collection: IExperienceWorkModel[]) => {
		var data = collection,
			getY = _.bind(this._getY, this, this.heightLine);

		data.forEach((exp) => {
			const x = this.xRegular;
			const y = getY();
			const viewClass = ExperienceWorkView;
			/*
				viewClass =
					exp instanceof IExperienceWorkModel ? ExperienceWorkView : ExperienceProjectView,
                */
			const obj = this.group
				.append('text')
				.text(function () {
					return exp.get('title');
				})
				.attr('class', 'exp experience')
				.attr('x', x)
				.attr('y', y);

			exp.set({
				xPos: x,
				yPos: y
			});

			this.experienceViews.push(
				new viewClass({
					d3el: obj,
					model: exp
				})
			);
		});
		return this;
	};

	/**
	 * @param	{Integer}	increment
	 * @returns	{Integer}
	 */
	protected getY = (increment: number) => {
		var rv = this.cursorY;
		this.cursorY += increment;
		return rv;
	};
}
