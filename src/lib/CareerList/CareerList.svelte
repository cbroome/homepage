<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchJobData } from '../../lib/job-data';
	import { format } from 'date-fns';

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

		experiences?.sort((a, b) => b.start_date.localeCompare(a.start_date));
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

	const formatDate = (date: string) => {
		return format(new Date(date), 'yyyy');
	};
</script>

<!-- Mobile View -->
<div class="career-list">
	<h2>Career Summary</h2>
	<div class="listing">
		<ul class="experiences">
			{#each experiences as experience (experience.id)}
				<li class="grid-item experience">
					<button
						type="button"
						class={getExperienceClass(experience)}
						onclick={() => onExperienceClick(experience)}
					>
						<div class="company-name">
							{experience.company_name}
						</div>

						<div class="dates">
							{formatDate(experience.start_date)} - {formatDate(experience.end_date)}
						</div>
					</button>
				</li>
			{/each}
		</ul>

		<ul class="skills">
			{#each skills as skill (skill.id)}
				<li class="grid-item skill">
					<button type="button" onclick={() => onSkillClick(skill)} class={getSkillClass(skill)}>
						{skill.name}
					</button>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style lang="scss" type="text/css">
	.career-list {
		padding: 15px;
		display: none;
	}

	h2 {
		font-size: 25px;
		margin-bottom: 25px;
	}

	.listing {
		display: flex;
		gap: 25px;
	}

	ul {
		font-size: 16px;
	}

	ul.experiences {
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	li.experience {
		list-style: none;
		display: inline-block;
		width: 150px;
		opacity: 1;

		button {
			padding: 10px;
			font-size: 20px;
			font-weight: bold;
			width: 100%;
		}

		.dates {
			font-size: 12px;
			font-style: italic;
		}
	}

	.dates {
		font-size: 13px;
		text-align: right;
	}

	ul.skills {
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		justify-content: right;
		gap: 5px;
	}

	.skill {
		list-style: none;
		display: inline-block;
		button {
			padding: 8px;
		}
	}

	button {
		font-family: 'Lane - Narrow', Tahoma, sans-serif;

		border: 1px solid rgba(129, 194, 237, 0.9);
		border-radius: 5px;
		color: rgb(4, 47, 76);
		background: radial-gradient(ellipse at top, rgba(129, 194, 237, 0.5), white);
		transition: background-color 1s ease;
	}

	button.selected {
		background: radial-gradient(ellipse at top, rgba(3, 84, 138, 0.9), rgba(25, 159, 249, 0.9));
		color: rgb(246, 249, 255);
		border-color: white;
	}

	@media (max-width: 768px) {
		.career-list {
			display: block;
		}
	}
</style>
