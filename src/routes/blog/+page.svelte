<script lang="ts">
	export const prerender = true;

	import Navigation from '$lib/Navigation/Navigation.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Blogs - Christopher Broome</title>
</svelte:head>

<section>
	<Navigation breadcrumbs={[{ label: 'Blogs' }]} />

	<h1>Blogs</h1>

	<ul class="posts">
		{#each data.posts as post}
			<li class="post">
				<h2><a href={`/blog/${post.slug}`} class="title">{post.title}</a></h2>
				<p class="date">{post.date}</p>
				<p class="description">{post.description}</p>
			</li>
		{/each}
	</ul>
</section>

<style>
	section {
		margin: 15px auto;
		max-width: 768px;
		padding: 0 5px;
	}

	h1 {
		margin: 20px 0 30px;
	}

	h2 {
		border-bottom: 1px dotted;
	}

	.posts {
		list-style: none;
		padding: none;
		font-size: 22px;
	}

	.date {
		font-size: 16px;
		margin: 5px 0;
	}

	.post {
		margin-bottom: 50px;
	}

	.description {
		font-style: italic;
	}
</style>
