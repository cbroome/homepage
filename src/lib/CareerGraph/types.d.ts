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

interface ICareerGraphOptions {
	expWork: IExperienceWorkModel[];
	expProjects: IExperienceProjectModel[];
}

interface ISkillModel {
	/**
	 * @property    {Array}     skills
	 */
	skill: string;

	id: string;

	xPos?: number;

	yPos?: number;

	type: string;

	options: {
		/**
		 * @property    {String}    type
		 */
		type: string;

		/**
		 * @property    {String}    url
		 */
		url: string;

		/**
		 * @property    {Array} related
		 */
		related: ISkillModel[];
	};
}
