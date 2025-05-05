import * as d3 from 'd3';
import { bind } from 'lodash-es';
import { SelectableView } from './SelectableView';
import type { ExperienceModel } from './ExperienceModel';
import { Skills } from './Skills';
import type { ICareerGraphOptions } from './types';
import type { SkillModel } from './SkillModel';
import { PathsView } from './PathsView';
import { PathModel } from './PathModel';

const colors = ['#8333E5', '#1700FC', '#CE00FE', '#0B44E5'];

export class CareerGraph {
	/**
	 * @property
	 */
	views: undefined;

	/**
	 * @property	{collection.Experience.WorkCollection}	expWork
	 */
	expWork: ExperienceModel[] = [];

	/**
	 * @property	{collection.Experience.ProjectCollection}	expProjects
	 */
	expProjects: ExperienceModel[] = [];

	skills: SkillModel[] = [];

	/**
	 * @property	{d3}	svg
	 */
	svg: d3.Selection<SVGElement> | null = null;

	/**
	 * @property    {d3}    group
	 */
	group: any;

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

	windowWidth: number;

	pathList: { experience: ExperienceModel; skill: SkillModel }[] = [];

	pathsView: PathsView;

	/**
	 * @property	{Array}		experienceViews
	 */
	protected experienceViews: SelectableView[] = [];

	constructor(options: ICareerGraphOptions) {
		this.windowWidth = options.windowWidth;
		this.options = {
			expWork: options.expWork,
			expProjects: options.expProjects
		};
		this.skills = options.skills;
		this.svg = d3.select('svg#main-svg');
		this.group = this.svg.append('g').attr('class', 'group-experience');

		this.expWork = this.options.expWork;
		this.expProjects = this.options.expProjects;

		const pathModels: PathModel[] = [];
		this.expWork.forEach((experienceModel) => {
			experienceModel.skills.forEach((skill) => {
				const skillModel = this.skills.find((skillModel) => skillModel.id === skill);
				if (skillModel) {
					const pathModel = new PathModel(skillModel, experienceModel);
					pathModels.push(pathModel);
				}
			});
		});

		this.pathsView = new PathsView(pathModels);
	}

	/**
	 * @chainable
	 * @returns	{view.Work}
	 */
	render = () => {
		this.svg.selectAll('.exp').remove();
		this.cursorY = this.startY;

		this.renderSection(this.expWork, 'Work Experience');

		const skillGraph = new Skills(this.expWork, [], this.skills);
		skillGraph.render(this.windowWidth);

		/*

        TODO - reimplement personal projects
        .renderSection(
			this.expProjects,
			'Personal Projects'

		);
        */

		this.buildLists();
		this.drawViews();

		this.pathsView.render();
	};

	/**
	 *
	 * @param {*} exp
	 * @param {*} skill
	 */
	protected associateSkillAndExperience(experience: ExperienceModel, skill: SkillModel) {
		this.pathList.push({
			skill,
			experience
		});
	}

	protected processExperience(experience: ExperienceModel[]) {
		experience.forEach((exp) => {
			const skills = exp.skills;
			//var associateSkillAndExperience = _.bind(this._associateSkillAndExperience, this, exp);
			// _.each(skills, associateSkillAndExperience, this);
			skills.forEach((skill) => {
				const skillModel = this.skills.find((skillModel) => skillModel.id === skill);
				if (skillModel) {
					this.associateSkillAndExperience(exp, skillModel);
				}
			});
		});
	}

	/**
	 *
	 */
	protected renderSection = (collection: ExperienceModel[], title: string) => {
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
		var getY = this.getY(this.heightHeader);
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
	protected renderExperience = (collection: ExperienceModel[]) => {
		var data = collection,
			getY = bind(this.getY, this, this.heightLine);

		data.forEach((exp) => {
			const x = this.xRegular;
			const y = getY();
			const d3el = this.group
				.append('text')
				.text(function () {
					return exp.title;
				})
				.attr('class', 'exp experience')
				.attr('x', x)
				.attr('y', y);

			exp.xPos = x;
			exp.yPos = y;

			this.experienceViews.push(new SelectableView(d3el, exp));
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

	buildLists() {
		const params = {
			reset: true,
			success: this.processExperience
		};
		// const exps = [this.jobs, this.projects];
		const exps = this.expWork;
		let colorIndex = 0;

		/*
		this.skills.add(require('data/SkillData'));
		this.jobs.add(require('data/WorkData'));
		this.projects.add(require('data/ProjectData'));
        */

		exps.forEach((exp) => (exp.stroke = colors[colorIndex++ % colors.length]));

		console.log({ expWork: this.expWork });
		this.processExperience(this.expWork);
		// this._processExperience(this.projects);
	}

	drawViews() {
		// var windowWidth = $(window).width();
		let windowWidth = this.windowWidth;

		if (windowWidth > 2000) {
			windowWidth = 2000;
		} else if (windowWidth > 1024) {
			// for padding...
			windowWidth -= 50;
		} else if (windowWidth < 1024) {
			windowWidth = 1024;
		}

		// $('.main-display svg').attr('width', windowWidth).find('g').empty();

		/*
		this.skillView.render(windowWidth);
		this.experienceSVG.render(windowWidth);
		// Brief delay to render everything
		_.delay(_.bind(this.pathsView.render, this.pathsView), 100);
                */
	}
}
