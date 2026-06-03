import { EXPERIENCE_URL, EXPERIENCE_SKILLS_URL, SKILL_URL, SKILL_CATEGORIES_URL } from './consts';

const data: {
	experiences: IExperienceREST[] | null;
	skills: ISkillREST[] | null;
	experienceSkills: IExperienceSkillREST[] | null;
	skillCategories: ISkillCategoryREST[] | null;
} = {
	experiences: null,
	skills: null,
	experienceSkills: null,
	skillCategories: null
};

export const fetchExperienceData = async (): Promise<IExperienceREST[]> => {
	const response = await fetch(EXPERIENCE_URL);
	return response.json();
};

export const fetchSkillData = async (): Promise<ISkillREST[]> => {
	const response = await fetch(SKILL_URL);
	return response.json();
};

export const fetchExperienceSkillsData = async (): Promise<IExperienceSkillREST[]> => {
	const response = await fetch(EXPERIENCE_SKILLS_URL);
	return response.json();
};

export const fetchSkillCategoriesData = async (): Promise<ISkillCategoryREST[]> => {
	const response = await fetch(SKILL_CATEGORIES_URL);
	return response.json();
};

/**
 * Fetch all job-related data including experience, skills, and experience skills.
 *
 * @returns {Promise<{ experience: any; skill: any; experienceSkills: any; skillCategories: any }>}
 */
export const fetchJobData = async () => {
	if (Object.values(data).some((v) => !v)) {
		const [experiences, skills, experienceSkills, skillCategories] = await Promise.all([
			fetchExperienceData().catch((error) => {
				console.error('Error fetching experience data:', error);
				throw error;
			}),
			fetchSkillData().catch((error) => {
				console.error('Error fetching skill data:', error);
				throw error;
			}),
			fetchExperienceSkillsData().catch((error) => {
				console.error('Error fetching experience skills data:', error);
				throw error;
			}),
			fetchSkillCategoriesData().catch((error) => {
				console.error('Error fetching skill categories data:', error);
				throw error;
			})
		]);

		data.experiences = experiences;
		data.skills = skills;
		data.experienceSkills = experienceSkills;
		data.skillCategories = skillCategories;
	}

	return { ...data };
};
