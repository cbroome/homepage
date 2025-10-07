<script lang="ts">
	let { breadcrumbs }: { breadcrumbs: { anchor?: string; label: string }[] } = $props();
</script>

<nav>
	<ul>
		<li>
			<a href="/">Home</a>
		</li>
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

	li::before {
		margin: 0 15px;
		content: '>';
	}

	li:first-child::before {
		content: '';
		margin: 0;
	}

	@media (max-width: 768px) {
		nav {
			padding: 0 10px;
		}

		li {
			max-width: 120px;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}
	}
</style>
