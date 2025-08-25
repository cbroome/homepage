<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article>
	<hgroup>
		<h1>{data.meta.title}</h1>
		<p class="published">Published at {data.meta.date}</p>
	</hgroup>

	<div class="content">
		<data.content />
	</div>
</article>

<style>
	article {
		max-inline-size: var(--size-content-3);
		margin-inline: auto;

		width: 500px;
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
