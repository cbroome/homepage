<script lang="ts">
	import CareerGraph from '$lib/CareerGraph/CareerGraph.svelte';
	import HeroHeader from '$lib/HeroHeader/HeroHeader.svelte';
	import PostList from '$lib/Posts/PostList.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Christopher Broome</title>
	<meta property="og:type" content="website" />
	<meta property="og:description" content="Full Stack Web Developer" />
</svelte:head>

<section class="svg-section">
	<div class="main-section">
		<div class="col span_8_of_8 main-display">
			<CareerGraph />
		</div>

		<div class="detail-view-column span_3_of_8 main-display"></div>
	</div>
</section>

<section class="site-content-section">
	<HeroHeader fixed={true} />
	<div class="posts">
		<PostList posts={data?.posts} />
	</div>
</section>

<style lang="scss">
	.site-content-section {
		margin-top: calc(100vh - 375px);
	}
	.posts {
		margin: 0 auto 200px;
		width: 768px;
	}
</style>
