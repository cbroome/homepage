import { SelectableView } from './SelectableView';
import { EVENTS } from '$lib/consts';

export class ExperienceView extends SelectableView {
	/**
	 *
	 * @returns  {Boolean}   always false
	 */
	onMouseover() {
		this.model.trigger(EVENTS.EXPERIENCE.HOVER);
		return false;
	}

	/**
	 *
	 * @returns  {Boolean}   always false
	 */
	onMouseout() {
		console.log('onMouseout');
		this.model.trigger(EVENTS.EXPERIENCE.HOVER_END);
		return false;
	}

	protected addListeners(): void {
		super.addListeners();
		this.model.addListener(EVENTS.EXPERIENCE.RESELECT, this.onMouseover);
	}
}
