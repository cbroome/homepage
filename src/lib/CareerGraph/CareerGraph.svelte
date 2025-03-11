<script lang="ts">
	import { onMount } from 'svelte';
	import { CareerGraph } from './CareerGraph';

	onMount(() => {
		const options: ICareerGraphOptions = {
			expProjects: [],

			expWork: [
				{
					title: 'work 1',
					description: 'test description',
					skills: ['javascript', 'typescript'],
					dateStart: new Date(),
					dateEnd: new Date(),
					options: { selected: false, stroke: '#000' }
				}
			]
		};

		const careerGraph = new CareerGraph(options);
		careerGraph.render();
	});
</script>

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
