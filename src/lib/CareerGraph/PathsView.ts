import * as d3 from 'd3';
import { PathView } from './PathView';

export class PathsView {
	/**
	 * @property	{collection.PathCollection}	collection
	 */
	collection: undefined;

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

	initialize() {
		this.paths = [];
		this.svg = d3.select('svg#main-svg');

		this.group = this.svg.append('g').attr('class', 'group-paths');
	}

	/**
	 * @chainable
	 * @returns	{PathsView}
	 */
	render() {
		if (this.paths) {
			/*
			_.each(
				this.paths,
				function (path) {
					path.remove();
				},
				this
			);
            */
			this.paths.forEach((path) => path.remove());
		}

		this.paths = [];

		const expY = 5;
		const expX = 10;
		const skillX = 5;
		const skillY = 4;

		const findDiff = (start: number, end: number) => {
			return end > start ? start + (end - start) / 2 : end + (start - end) / 2;
		};

		const lineFunction = d3.svg
			.line()
			.x(function (d) {
				return d.x;
			})
			.y(function (d) {
				return d.y;
			})
			.interpolate('basis');

		this.paths.forEach((path) => {
			// Simple lines for now...
			const skill = path.skill;
			const experience = path.experience;
			const startX = experience.xPos + expX;
			const startY = experience.yPos - expY;
			const endX = skill.xPos - skillX;
			const endY = skill.yPos - skillY;
			const midX = endX - startX;
			const midY = findDiff(endY, startY);
			const lineData = [
				{ x: startX, y: startY },
				{ x: startX + 85, y: startY },
				{ x: midX, y: midY },
				{ x: endX - 75, y: endY },
				{ x: endX, y: endY }
			];

			const line = this.group
				?.append('path')
				.attr('d', lineFunction(lineData))
				.attr('stroke', experience.get('stroke'))
				.attr('class', 'line');

			this.paths.push(
				new PathView({
					svg: this.svg,
					group: this.group,
					model: path,
					line: line
				})
			);
		}, this);

		return this;
	}
}
