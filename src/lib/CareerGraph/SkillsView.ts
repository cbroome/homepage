import * as d3 from 'd3';
import { keys, bind, debounce } from 'lodash-es';
import type { SkillModel } from './SkillModel';
import { SkillView } from './SkillView';

export class SkillsView {
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
	skillModels: SkillModel[] = [];

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
	startY = 25;

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
	 * @property	{number}	xPadding	padding from the right of the screen
	 */
	xPadding = 150;

	/**
	 * @property    {Array} sortOrder
	 */
	sortOrder?: Record<string, string>;

	skills: SkillView[];

	skillCategories: ISkillCateogry[];

	/**
	 * @property    {Integer}   startY
	 */
	// startY = 14;

	constructor(
		jobs: IExperienceWorkModel[],
		projects: IExperienceProjectModel[],
		skillModels: SkillModel[],
		skillCategories: ISkillCateogry[]
	) {
		this.jobs = jobs;
		this.projects = projects;
		this.skillModels = skillModels;
		this.skillCategories = skillCategories;
		this.skills = [];
		this.initialize();
	}

	/**
	 *
	 */
	initialize() {
		// var render = debounce( bind( this.render, this ), 100 );
		this.svg = d3.select('svg');

		this.group = this.svg.append('g').attr('class', 'group-skills');

		this.skillCategories.sort((a, b) => a.sort_order - b.sort_order);

		this.sortOrder = this.skillCategories.reduce((acc, skillCategory) => {
			acc[skillCategory.id] = skillCategory.name;
			return acc;
		}, {});
	}

	/**
	 * @chainable
	 * @returns	{view.Skills}
	 */
	render(windowWidth: number) {
		const sortedSkills: Record<string, Set<string>> = {};
		const orderedKeys: string[] = keys(this.sortOrder);
		this.xComputed = windowWidth - this.xPadding;

		this.cursorY = this.startY;

		this.cursorY = this.startY;

		this.group.selectAll('text.skill-label').remove();

		orderedKeys.forEach((type) => {
			if (!sortedSkills[type]) {
				sortedSkills[type] = new Set();
			}
		});

		this.jobs.forEach((job) => {
			job.skills.forEach((skill) => {
				const type = this.skillModels.find((skillModel) => skillModel.id === skill)?.type;
				sortedSkills[type || 'misc'].add(skill);
			});
		});

		Object.keys(sortedSkills).forEach((sortedSkill) => {
			if (sortedSkills[sortedSkill].size > 0) {
				this.createHeader(sortedSkill);
				sortedSkills[sortedSkill].forEach((skill) => {
					const model = this.skillModels.find((skillModel) => skillModel.id === skill);
					model && this.createSkill(model);
				});

				// Add some padding beneath the section
				this.getY(5);
			}
		});

		return this;
	}

	/**
	 *
	 * @param   {String}    title
	 */
	protected createHeader(title: string) {
		const x = this.xComputed;
		const y = this.getY(this.heightHeader);

		this.group
			.append('text')
			.text(this.sortOrder?.[title])
			.attr('class', 'skill-header')
			.attr('x', this.xComputed)
			.attr('y', y);
	}

	/**
	 *
	 * @param   {SkillModel}    skill
	 */
	protected createSkill(skill: SkillModel) {
		var x = this.xComputed,
			y = this.getY(this.heightLine),
			obj;

		obj = this.group
			?.append('text')
			.text(skill.skill)
			.attr('class', 'skill-label')
			.attr('x', x)
			.attr('y', y);
		skill.xPos = x || 0;
		skill.yPos = y || 0;

		this.skills.push(new SkillView(obj, skill));
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
