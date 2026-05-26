<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchJobData } from '../../lib/job-data';

	onMount(async () => {
		// Code to run after the component is mounted

		// fetch the career data
		const { experiences, skills, experienceSkills, skillCategories } = await fetchJobData();
		console.log({ experiences, skills, experienceSkills, skillCategories });
	});
</script>

<!-- Mobile View -->
<div>
	<h1>Career History</h1>
</div>
