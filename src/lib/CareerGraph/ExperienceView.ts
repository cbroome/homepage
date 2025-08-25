import { SelectableView } from './SelectableView';
import { EVENTS } from '$lib/consts';

export class ExperienceView extends SelectableView {
	/**
	 *
	 * @returns  {Boolean}   always false
	 */
	onMouseover() {
		super.onMouseover();
		this.model.trigger(EVENTS.EXPERIENCE.HOVER);
		return false;
	}

	/**
	 *
	 * @returns  {Boolean}   always false
	 */
	onMouseout() {
		super.onMouseout();
		this.model.trigger(EVENTS.EXPERIENCE.HOVER_END);

		return false;
	}
}
