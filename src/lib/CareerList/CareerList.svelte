<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchJobData } from '../../lib/job-data';

	interface IModifiedExperienceREST extends IExperienceREST {
		skills: string[];
	}

	let experiences: IModifiedExperienceREST[] | null = $state([]);
	let skills: ISkillREST[] | null = $state([]);
	let experienceSkills: IExperienceSkillREST[] | null = $state([]);

	let selectedSkills: string[] = $state([]);
	let selectedExperiences: string[] = $state([]);

	onMount(async () => {
		// Code to run after the component is mounted
		// fetch the career data
		const {
			experiences: fetchedExperiences,
			skills: fetchedSkills,
			experienceSkills: fetchedExperienceSkills
		} = await fetchJobData();
		experiences = fetchedExperiences;
		skills = fetchedSkills;
		experienceSkills = fetchedExperienceSkills;

		experiences?.forEach((experience) => {
			const allSkills = experienceSkills?.filter(
				(experienceSkill) => experienceSkill.experience_id === experience.id
			);
			experience.skills = allSkills?.map((skill) => skill.skill) || [];
		});
	});

	const onSkillClick = (skill: ISkillREST) => {
		// Handle skill click event
		selectedSkills = [skill.id];

		// Find associated experiences
		const connectedExperiences = experiences?.filter((exp) => exp.skills.includes(skill.id));
		selectedExperiences = connectedExperiences ? connectedExperiences.map((exp) => exp.id) : [];
	};

	const onExperienceClick = (experience: IModifiedExperienceREST) => {
		selectedExperiences = [experience.id];

		const connectedSkills = skills?.filter((sk) => experience.skills.includes(sk.id));
		selectedSkills = connectedSkills?.map((sk) => sk.id) || [];
	};

	const getExperienceClass = (experience: IModifiedExperienceREST) => {
		return selectedExperiences?.includes(experience.id) ? 'selected' : '';
	};

	const getSkillClass = (skill: ISkillREST) => {
		return selectedSkills?.includes(skill.id) ? 'selected' : '';
	};
</script>

<!-- Mobile View -->
<div class="career-list">
	<h2>Career History</h2>

	{#key selectedSkills}
		<ul class="skills">
			{#each skills as skill (skill.id)}
				<li class="skill">
					<button type="button" onclick={() => onSkillClick(skill)} class={getSkillClass(skill)}>
						{skill.name}
					</button>
				</li>
			{/each}
		</ul>
	{/key}

	{#key selectedExperiences}
		<ul>
			{#each experiences as experience (experience.id)}
				<li class="experience">
					<button
						type="button"
						class={getExperienceClass(experience)}
						onclick={() => onExperienceClick(experience)}
					>
						<h2>{experience.company_name}</h2>
					</button>
				</li>
			{/each}
		</ul>
	{/key}
</div>

<style lang="scss" type="text/css">
	.career-list {
		width: 100%;
	}

	h2 {
		font-size: 25px;
	}

	ul {
		font-size: 16px;
	}

	li.experience {
		margin: 25px 0;

		button {
			padding: 15px;
		}
	}

	.dates {
		font-size: 13px;
	}

	.skills {
		list-style: none;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
	}

	.skill {
		background-color: #eeefe6;
		border-radius: 5px;
		padding: 5px 10px;
		margin: 5px;
		display: inline-block;
	}

	button.selected {
		background: blue;
	}
</style>
