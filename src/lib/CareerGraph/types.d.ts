interface IExperienceModel {
	/**
	 * @property    {String}    title   human readable title
	 */
	title: string;

	/**
	 * @property    {String}    description
	 */
	description: string;

	/**
	 * @property    {Array}     skills
	 */
	skills: string[];

	selected?: boolean;

	/**
	 * @property	{Boolean}	options
	 */
	options: {
		/**
		 * @property	{Boolean}	selected
		 */
		selected?: boolean;

		/**
		 * @property    {String}    stroke      hex color...
		 */
		stroke?: string;
	};

	dateStart: Date;

	dateEnd: Date;
}

interface IExperienceWorkModel extends IExperienceModel {
	/**
	 * @property    {Datetime}  dateStart
	 */
	dateStart: Date;

	/**
	 * @property    {Datetime}  dateEnd
	 */
	dateEnd: Date;

	/**
	 * @property    {String}    urlRoot
	 */
	urlRoot?: 'service/work';
}

interface IExperienceProjectModel extends IExperienceModel {}

interface ISkillCateogry {
	id: string;
	name: string;
	sort_order: number;
}

interface ICareerGraphOptions {
	expWork: ExperienceModel[];
	expProjects: ExperienceModel[];
	skills?: SkillModel[];
	skillCategories: ISkillCateogry[];
	windowWidth?: number;
}

type TSkillType =
	| 'language'
	| 'datastore'
	| 'version control'
	| 'framework'
	| 'library'
	| 'utility'
	| 'misc';

interface ISkillModel {
	/**
	 * @property    {Array}     skills
	 */
	skill: string;

	id: string;

	xPos?: number;

	yPos?: number;

	type: TSkillType;

	options: {
		/**
		 * @property    {String}    type
		 */
		type: TSkillType;

		/**
		 * @property    {String}    url
		 */
		url: string;

		/**
		 * @property    {Array} related
		 */
		related?: ISkillModel[];
	};
}

interface IExperienceREST {
	id: string;
	company_name: string;
	description: string;
	start_date: string;
	end_date: string;
}

interface ISkillREST {
	id: string;
	name: string;
	description: string;
	created_at: string;
	modified_at: string;
	skill_category: TSkillType;
}
