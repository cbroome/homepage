import * as d3 from 'd3';

export class ExperienceModel implements IExperienceModel {
	description: string;
	selected: boolean | undefined;
	options: { selected?: boolean; stroke?: string };
	title: string;
	skills: string[];

	listeners: Map<string, (() => void)[]>;
	listen?: () => void;
	dateStart: Date;
	dateEnd: Date;

	_stroke?: typeof d3;
	_xPos: number = 0;
	_yPos: number = 0;

	constructor(options: IExperienceModel) {
		this.description = options.description;
		this.selected = options.selected;
		this.options = options.options;
		this.title = options.title;
		this.skills = options.skills;
		this.dateStart = options.dateStart;
		this.dateEnd = options.dateEnd;
		this.listeners = new Map();
	}

	addListener(event: string, listener: () => void) {
		const existingListeners = this.listeners.get(event) || [];
		this.listeners.set(event, [...existingListeners, listener]);
	}

	removeListener(event: string) {
		this.listeners.delete(event);
	}

	reset() {
		this.listeners.clear();
	}

	trigger(event: string) {
		const listeners = this.listeners.get(event);
		if (listeners) {
			listeners.forEach((listener) => listener());
		}
	}

	get xPos() {
		return this._xPos;
	}

	set xPos(position: number) {
		this._xPos = position;
	}

	get yPos() {
		return this._yPos;
	}

	set yPos(position: number) {
		this._yPos = position;
		this.listen && this.listen();
	}

	get stroke() {
		return this._stroke;
	}

	set stroke(newStroke) {
		this._stroke = newStroke;
	}
}
