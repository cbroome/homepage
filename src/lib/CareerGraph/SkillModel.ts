import { ListenerModel } from './ListernerModel';

export class SkillModel extends ListenerModel implements ISkillModel {
	id: string;
	xPos: number = 0;
	yPos: number = 0;
	type: TSkillType;
	options: { type: TSkillType; url: string; related?: ISkillModel[] };

	skill: string;

	constructor(options: ISkillModel) {
		super();

		this.id = options.id;
		this.xPos = options.xPos || 0;
		this.yPos = options.yPos || 0;
		this.type = options.type;
		this.skill = options.skill;
	}
}
