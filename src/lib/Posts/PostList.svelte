<script lang="ts">
	let { posts } = $props();
</script>

<h2>Posts</h2>
<ul class="post-list">
	{#each posts as post}
		<li class="post">
			<div class="title"><a href={`/blog/${post.slug}`}>{post.title}</a></div>
			<div class="description">{post.description}</div>
		</li>
	{/each}
</ul>

<style lang="scss">
	ul.post-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	li.post {
		margin: 20px 0;
	}

	.title {
		font-size: 0.7em;
	}

	.description {
		font-size: 18px;
		font-style: italic;
	}
</style>
