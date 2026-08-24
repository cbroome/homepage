import { EVENTS } from '$lib/consts';
import { SelectableView } from './SelectableView';

export class SkillView extends SelectableView {
	onMouseover() {
		super.onMouseover();
		this.model.trigger(EVENTS.SKILL.HOVER);
		return false;
	}

	onMouseout() {
		super.onMouseout();

		this.model.trigger(EVENTS.SKILL.HOVER_END);
		return false;
	}
}
