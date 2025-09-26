<script lang="ts">
	let { breadcrumbs }: { breadcrumbs: { anchor?: string; label: string }[] } = $props();
</script>

<nav>
	<ul>
		<li><a href="/">Christopher Broome</a></li>
		{#each breadcrumbs as breadcrumb}
			<li>
				{#if breadcrumb.anchor}
					<a href={breadcrumb.anchor}>{breadcrumb.label}</a>
				{:else}
					{breadcrumb.label}
				{/if}
			</li>
		{/each}
	</ul>
</nav>

<style lang="scss">
	nav {
		font-size: 17px;
		display: block;
		max-width: 768px;
		margin: 0 auto;
	}

	ul {
		display: flex;
		list-style: none;
	}

	li::after {
		margin: 0 15px;
		content: '>';
	}

	li:last-child::after {
		content: '';
	}
</style>
