import * as d3 from 'd3';
import { ListenerModel } from './ListernerModel';

export class ExperienceModel extends ListenerModel implements IExperienceModel {
	description: string;
	selected: boolean | undefined;
	options: { selected?: boolean; stroke?: string };
	title: string;
	skills: string[];

	listen?: () => void;
	dateStart: Date;
	dateEnd: Date;

	_stroke?: string;
	_xPos: number = 0;
	_yPos: number = 0;

	constructor(options: IExperienceModel) {
		super();

		this.description = options.description;
		this.selected = options.selected;
		this.options = options.options;
		this.title = options.title;
		this.skills = options.skills;
		this.dateStart = options.dateStart;
		this.dateEnd = options.dateEnd;
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
