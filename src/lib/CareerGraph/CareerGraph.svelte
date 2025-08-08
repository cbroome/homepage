<script lang="ts">
	import { onMount } from 'svelte';
	import { CareerGraph } from './CareerGraph';
	import { ExperienceModel } from './ExperienceModel';
	import { SkillModel } from './SkillModel';
	import { throttle } from 'lodash-es';

	// const windowWidth = 1024;
	let windowWidth = $state(1024);
	let careerGraph: CareerGraph | null;

	const options: ICareerGraphOptions = {
		expProjects: [],
		expWork: [],
		skills: [],
		windowWidth
	};

	// TODO - debounce
	const onWindowChange = () => {
		windowWidth = window.innerWidth;

		options.windowWidth = windowWidth;
		redrawChart(options);
	};

	const redrawChart = (options: ICareerGraphOptions) => {
		if (careerGraph) {
			careerGraph = null;
		}

		careerGraph = new CareerGraph(options);
		careerGraph.render();
	};

	onMount(() => {
		const throttledWindowChange = throttle(onWindowChange, 500);
		window.addEventListener('resize', throttledWindowChange);

		(async () => {
			const result = await fetch('https://st0ra.com/experience');
			const experiences = await result.json();

			const experienceMap = new Map<string, ExperienceModel>();

			experiences.forEach((experience) => {
				experienceMap.set(
					experience.id,
					new ExperienceModel({
						title: experience.company_name,
						description: experience.description,
						skills: [],
						dateStart: new Date(Date.parse(experience.start_date)),
						dateEnd: new Date(Date.parse(experience.end_date)),
						options: { selected: false, stroke: '#000' }
					})
				);
			});

			const experienceSkillResult = await fetch('https://st0ra.com/experience_skill');
			const experienceSkills = await experienceSkillResult.json();

			experienceSkills.forEach((experienceSkill) => {
				experienceMap.get(experienceSkill.experience_id)?.skills.push(experienceSkill.skill);
			});

			experienceMap.forEach((experienceModel) => options.expWork.push(experienceModel));

			options.expWork.sort(
				(a: ExperienceModel, b: ExperienceModel) => b.dateStart.getTime() - a.dateStart.getTime()
			);

			const skillResult = await fetch('https://st0ra.com/skills');
			const skills = await skillResult.json();

			skills.forEach((skill) => {
				options.skills.push(
					new SkillModel({
						id: skill.id,
						type: skill.skill_category,
						// skill: skill.name,
						skill: skill.id,
						options: { type: skill.skill_category, url: '', related: [] }
					})
				);
			});

			onWindowChange();
		})();
	});
</script>

<svelte:window onchange={onWindowChange} />

<svg id="main-svg" height="630" width="100%">
	<defs>
		<style type="text/css">
<![CDATA[       
            text {
                fill: #81616a ;
            }
            
            .skill-label {
                font-size: .38em;
                cursor: pointer;
            }
            
            .skill-header {
                font-size: .48em;
                font-family: 'Lane - Narrow';                
				text-anchor: end;
            }
            
            .svg-header {
                font-family: 'Lane - Narrow';
                font-size: .85em;
				font-weight: bold;
                /*text-anchor: end;*/
            }

            .experience {
                font-size: .6em;
                cursor: pointer;
                text-anchor:end;
            }

            .line {
                stroke-width: .5;
                stroke-opacity: .07;
                fill: none;
            }

            path.hovered {
                stroke-opacity: .75;
            }
        ]]>
		</style>
	</defs>
</svg>
