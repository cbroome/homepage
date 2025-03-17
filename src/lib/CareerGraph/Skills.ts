import * as d3 from 'd3';
import { keys, bind, debounce } from 'lodash-es';

export class Skills {
	/**
	 * @property	{Backbone.Collection}	jobs
	 */
	jobs: IExperienceWorkModel[] = [];

	/**
	 * @property	{Backbone.Collection}	projects
	 */
	projects: IExperienceProjectModel[] = [];

	/**
	 * @property	{Array}	skills
	 */
	skills: ISkillModel[] = [];

	/**
	 * @property	{d3}	svg
	 */
	svg: d3.Selection<SVGElement>;

	/**
	 * @property    {d3}    group
	 */
	group?: d3;

	/**
	 * @property    {Integer}   startY
	 */
	startY = 5;

	/**
	 * @property	{Integer}	cursorY
	 */
	cursorY?: number = undefined;

	/**
	 * @property	{Integer}	heightLine
	 */
	heightLine = 13;

	/**
	 * @property    {Integer}   heightHeader
	 */
	heightHeader = 17;

	/**
	 * @property	{Integer}	x
	 */
	x = 900;

	/**
	 * @property    {Integer}   xHeader
	 */
	xHeader = 900;

	/**
	 * @property    {Integer}   width       width of widest component, should be computed eventually
	 */
	width = 124;

	/**
	 * @property    {Integer}   xComputed
	 */
	xComputed?: number;

	/**
	 * @property    {Array} sortOrder
	 */
	sortOrder?: Record<string, string>;

	/**
	 * @property    {Integer}   startY
	 */
	// startY = 14;

	constructor(jobs: IExperienceWorkModel[], projects: IExperienceProjectModel[]) {
		this.jobs = jobs;
		this.projects = projects;

		this.initialize();
	}

	/**
	 *
	 */
	initialize() {
		// var render = debounce( bind( this.render, this ), 100 );
		this.svg = d3.select('svg');

		this.group = this.svg.append('g').attr('class', 'group-skills');
		this.skills = [];

		this.sortOrder = {
			language: 'Languages',
			datastore: 'Datastores',
			'version control': 'Version Control',
			framework: 'Frameworks',
			library: 'Libraries',
			utility: 'Utilities',
			misc: 'Miscellaneous'
		};
	}

	/**
	 * @chainable
	 * @returns	{view.Skills}
	 */
	render(windowWidth: number) {
		const sortedSkills: Record<string, Set<string>> = {};
		const orderedKeys: string[] = keys(this.sortOrder);
		// const getY = bind(this.getY, this, this.heightLine);

		this.xComputed = windowWidth - this.width;

		this.cursorY = this.startY;

		this.cursorY = this.startY;

		this.group.selectAll('text.skill-label').remove();

		console.log({ orderedKeys });

		orderedKeys.forEach((type) => {
			if (!sortedSkills[type]) {
				sortedSkills[type] = new Set();
			}
		});

		// orderedKeys.map()

		/*

		this.collection.each(function (skill) {
			var type = _.indexOf(orderedKeys, skill.get('type')) >= 0 ? skill.get('type') : 'misc';
			sortedSkills[type].push(skill);
		}, this);

		sortedSkills.(
		
			 (section: {}, key: string) => {
				this.createHeader(key);
				_.each(section, this.createSkill, this);

				this.getY(10);
			},
		);
        */

		this.jobs.forEach((job) => {
			/*
            			var type =
										(orderedKeys.indexOf(skill.type) >= 0 
                                        ? skill.type : 'misc';
									sortedSkills[type].push(skill);
            */
			job.skills.forEach((skill) => {
				sortedSkills[skill].add(skill);
			});
		});

		Object.keys(sortedSkills).forEach((skill) => {
			console.log({ skill });
			this.createHeader(skill);
			sortedSkills[skill].forEach((skill) => {
				// this.createSkill(skill);
			});
		});

		return this;
	}

	/**
	 *
	 * @param   {String}    title
	 */
	protected createHeader(title: string) {
		var x = this.xComputed,
			y = this.getY(this.heightHeader),
			obj;

		obj = this.group
			.append('text')
			.text(this.sortOrder[title])
			.attr('class', 'skill-header')
			.attr('x', this.xComputed)
			.attr('y', y);
	}

	/**
	 *
	 * @param   {SkillModel}    skill
	 */
	protected createSkill(skill: ISkillModel) {
		var x = this.xComputed,
			y = this.getY(this.heightLine),
			obj;

		obj = this.group
			?.append('text')
			.text(skill.id)
			.attr('class', 'skill-label')
			.attr('x', x)
			.attr('y', y);

		skill = {
			...skill,
			xPos: x,
			yPos: y
		};

		this.skills.push(
			/*
                    new SkillView( {
                        svg: this.svg,
                        d3el: obj,
                        model: skill
                    } )
                        */
			skill
		);
	}

	/**
	 * @param	{Integer}	increment
	 * @returns	{Integer}
	 */
	protected getY(increment: number) {
		var rv = this.cursorY;
		if (!this.cursorY) {
			this.cursorY = increment;
		} else {
			this.cursorY += increment;
		}
		return rv;
	}
}
