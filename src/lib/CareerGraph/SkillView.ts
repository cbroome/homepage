import { EVENTS } from '$lib/consts';
import { SelectableView } from './SelectableView';
import * as d3 from 'd3';

export class SkillView extends SelectableView {
	onMouseover() {
		this.model.trigger(EVENTS.SKILL.HOVER);
		return false;
	}

	onMouseout() {
		this.model.trigger(EVENTS.SKILL.HOVER_END);
		return false;
	}

	protected addListeners(): void {
		super.addListeners();
		this.model.addListener(EVENTS.SKILL.CLICK, this.onMouseover);
	}
}
