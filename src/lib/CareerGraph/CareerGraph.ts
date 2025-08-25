import * as d3 from 'd3';
import { bind } from 'lodash-es';
import { SelectableView } from './SelectableView';
import type { ExperienceModel } from './ExperienceModel';
import { SkillsView } from './SkillsView';
import type { SkillModel } from './SkillModel';
import { PathsView } from './PathsView';
import { PathModel } from './PathModel';
import { ExperienceView } from './ExperienceView';
import { EVENTS } from '$lib/consts';
import type { ListenerModel } from './ListernerModel';

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

	skillModels: SkillModel[] = [];

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
	startY = 50;

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
	xHeader = 60;

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

	skillCategories: ISkillCateogry[];

	/**
	 * @property	{Array}		experienceViews
	 */
	protected experienceViews: SelectableView[] = [];

	constructor(options: ICareerGraphOptions) {
		this.windowWidth = options.windowWidth || 0;
		this.options = {
			expWork: options.expWork,
			expProjects: options.expProjects
		};

		this.skillCategories = options.skillCategories || [];
		this.skillModels = options.skills || [];
		this.svg = d3.select('svg#main-svg');

		this.expWork = this.options.expWork;
		this.expProjects = this.options.expProjects;

		const pathModels: PathModel[] = [];

		this.expWork.forEach((experienceModel) => {
			const clearSelections = this.clearSelections.bind(this, experienceModel);
			experienceModel.addListener(EVENTS.PATHS.RESET, clearSelections);

			experienceModel.skills.forEach((skill) => {
				const skillModel = this.skillModels.find((skillModel) => skillModel.id === skill);

				if (skillModel) {
					skillModel.addListener(EVENTS.PATHS.RESET, clearSelections);
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
		this.svg.selectAll('.group-experience').selectAll('*').remove();
		this.svg.selectAll('.group-paths').selectAll('*').remove();
		this.svg.selectAll('.group-skills').selectAll('*').remove();

		this.cursorY = this.startY;

		this.group = this.svg.append('g').attr('class', 'group-experience');

		this.renderSection(this.expWork, 'Work Experience');

		const skillGraph = new SkillsView(this.expWork, [], this.skillModels, this.skillCategories);
		skillGraph.render(this.windowWidth);

		/*

        TODO - reimplement personal projects
        .renderSection(
			this.expProjects,
			'Personal Projects'

		);
        */

		this.buildLists();

		this.pathsView.render();
	};

	/**
	 * Remove the paths, experiences, and skills but not the svg or defs.
	 */
	destroy = () => {
		this.svg.selectAll('g').remove();
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
			skills.forEach((skill) => {
				const skillModel = this.skillModels.find((skillModel) => skillModel.id === skill);
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
		this.renderHeader(title);
		this.renderExperience(collection);
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
			.attr('class', 'svg-header exp')
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
	protected renderExperience = (models: ExperienceModel[]) => {
		const getY = bind(this.getY, this, this.heightLine);
		models.forEach((exp) => {
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

			this.experienceViews.push(new ExperienceView(d3el, exp));
		});
		return this;
	};

	/**
	 * @param	{Integer}	increment
	 * @returns	{Integer}
	 */
	protected getY = (increment: number) => {
		let rv = this.cursorY;
		this.cursorY += increment;
		return rv;
	};

	buildLists() {
		const params = {
			reset: true,
			success: this.processExperience
		};
		const exps = this.expWork;
		let colorIndex = 0;

		exps.forEach((exp) => (exp.stroke = colors[colorIndex++ % colors.length]));
		this.processExperience(this.expWork);
		// this._processExperience(this.projects);
	}

	/**
	 *
	 * @param model
	 */
	clearSelections(model: ListenerModel) {
		this.expWork.forEach((exp) => {
			if (exp !== model) {
				exp.selected = false;
				exp.trigger(EVENTS.EXPERIENCE.HOVER_END);
			}
		});
		this.skillModels.forEach((skill) => {
			if (skill !== model) {
				skill.selected = false;
				skill.trigger(EVENTS.SKILL.HOVER_END);
			}
		});
	}
}
