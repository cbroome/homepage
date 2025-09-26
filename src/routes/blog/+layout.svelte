<script>
	import HeroHeader from '$lib/HeroHeader/HeroHeader.svelte';
	export const prerender = true;
</script>

<HeroHeader />

<slot />
