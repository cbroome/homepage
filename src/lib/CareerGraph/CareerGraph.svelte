<script lang="ts">
	import { onMount } from 'svelte';
	import { CareerGraph } from './CareerGraph';
	import { ExperienceModel } from './ExperienceModel';
	import { PathsView } from './PathsView';
	import { SkillModel } from './SkillModel';

	// const windowWidth = 1024;
	let windowWidth = $state(1024);

	// TODO - debounce
	const onWindowChange = () => {
		windowWidth = window.innerWidth;
	};
	onMount(() => {
		window.addEventListener('resize', onWindowChange);
		onWindowChange();

		const skills: SkillModel[] = [
			new SkillModel({
				id: 'javascript',
				type: 'language',
				skill: 'javascript',
				options: { type: 'language', url: '', related: [] }
			}),
			new SkillModel({
				id: 'typescript',
				type: 'language',
				skill: 'typescript',
				options: { type: 'language', url: '', related: [] }
			})
		];

		const options: ICareerGraphOptions = {
			expProjects: [],

			expWork: [
				new ExperienceModel({
					title: 'work 1',
					description: 'test description',
					skills: ['javascript', 'typescript'],
					dateStart: new Date(),
					dateEnd: new Date(),
					options: { selected: false, stroke: '#000' }
				})
			],

			skills,

			windowWidth
		};

		const careerGraph = new CareerGraph(options);
		careerGraph.render();

		const pathsView = new PathsView();
		pathsView.render();
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
            }
            
            .header {
                font-family: 'Lane - Narrow';
                font-size: .85em;
                text-anchor: end;
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
