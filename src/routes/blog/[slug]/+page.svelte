<script lang="ts">
	import Navigation from '$lib/Navigation/Navigation.svelte';
	import './style.scss';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.meta.title} - Christopher Broome</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<Navigation breadcrumbs={[{ anchor: '/blog', label: 'Blogs' }, { label: data.meta.title }]} />

<article>
	<hgroup>
		<h1>{data.meta.title}</h1>
		<p class="published">Published at {data.meta.date}</p>
	</hgroup>

	<div class="content">
		<data.content />
	</div>
</article>

<style lang="scss">
	article {
		max-inline-size: var(--size-content-3);
		margin-inline: auto;
		padding: 10px;

		max-width: 768px;
		margin: 0 auto;

		font-size: 0.9em;

		h1 {
			text-transform: capitalize;
		}

		.published {
			font-size: 16px;
			padding: 0;
			margin: 5px 0;
		}

		.content {
			margin: 50px 0 100px;
			font-size: 20px;
		}

		.tags {
			display: flex;
			gap: var(--size-3);
			margin-top: var(--size-7);

			> * {
				padding: var(--size-2) var(--size-3);
				border-radius: var(--radius-round);
			}
		}
	}
</style>
