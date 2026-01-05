<script lang="ts">
	let { children, data } = $props();
</script>

<svelte:head>
	<title>{data.meta.title} - Christopher Broome</title>
	<meta content={data.meta.description} />
	<meta name="description" property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
	<meta property="og:description" content={data.meta.description} />
	<meta property="og:url" content={`https://www.christopherbroome.com/blog/${data.slug}`} />
</svelte:head>

{@render children()}
