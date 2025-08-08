import * as d3 from 'd3';
import { PathView } from './PathView';
import type { PathModel } from './PathModel';

export class PathsView {
	/**
	 * @property	{collection.PathCollection}	collection
	 */
	pathModels: PathModel[];

	/**
	 * @property	{Array}		paths
	 */
	paths?: PathView[] = [];

	/**
	 * @property	{d3}		svg
	 */
	svg?: d3.Selection<d3.BaseType, unknown, HTMLElement, any>;

	/**
	 * @property    {d3}        group
	 */
	group?: d3.Selection<SVGGElement, unknown, HTMLElement, any>;

	constructor(pathModels: PathModel[]) {
		this.pathModels = pathModels;
		this.paths = [];
		this.svg = d3.select('svg#main-svg');

		this.group = this.svg.append('g').attr('class', 'group-paths');
	}

	/**
	 * @chainable
	 * @returns	{PathsView}
	 */
	render() {
		// Remove existing paths
		if (this.paths) {
			this.paths.forEach((path) => path.remove());
		}

		this.paths = [];

		// Create new paths
		const expY = 5;
		const expX = 10;
		const skillX = 5;
		const skillY = 4;

		const findDiff = (start: number, end: number) => {
			return end > start ? start + (end - start) / 2 : end + (start - end) / 2;
		};

		const lineFunction = d3
			.line()
			.x((d) => d[0])
			.y((d) => d[1])
			.curve(d3.curveMonotoneX);

		this.pathModels.forEach((pathModel) => {
			// Simple lines for now...
			const skill = pathModel.skill;
			const experience = pathModel.experience;
			const startX = (experience?.xPos || 0) + expX;
			const startY = (experience?.yPos || 0) - expY;
			const endX = skill.xPos - skillX;
			const endY = skill.yPos - skillY;
			const midX = endX - startX;
			const midY = findDiff(endY, startY);
			const lineData: [number, number][] = [
				[startX, startY],
				[startX + 85, startY],
				[midX, midY],
				[endX - 75, endY],
				[endX, endY]
			];

			const line = this.group
				? this.group
						.append('path')
						.attr('d', lineFunction(lineData))
						.attr('stroke', experience?.stroke)
						.attr('class', 'line')
				: null;

			if (experience && skill) {
				this.paths?.push(
					new PathView(experience, skill, {
						svg: this.svg,
						group: this.group,
						line: line
					})
				);
			}
		}, this);

		return this;
	}
}
