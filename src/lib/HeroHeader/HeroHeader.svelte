<script lang="ts">
	let { fixed = false } = $props();
</script>

<div class={`section header hero-header ${fixed ? 'fixed-header' : ''}`}>
	<div class="portrait head">
		<div class="divider"></div>

		<div class="portrait-image">
			<img src="/imgs/portrait-comp.png" alt="Profile" />
		</div>

		<div class="divider"></div>
	</div>

	<h1 class="head heading-color"><a href="/">Christopher Broome</a></h1>

	<div class="scant-bio heading-font">Full Stack Web Developer / Baltimore, MD</div>

	<ul class="social-buttons heading-font">
		<li>
			<a href="http://www.linkedin.com/pub/chris-broome/1b/154/251" target="_blank">
				<img src="/imgs/linkedin.png" alt="LinkedIn" />
			</a>
		</li>

		<li>
			<a href="https://github.com/cbroome" target="_blank">
				<img src="/imgs/github.png" alt="GitHub" />
			</a>
		</li>
	</ul>
</div>

<style lang="scss">
	.hero-header {
		text-align: center;
		left: 50%;
		top: 0px;
		width: 500px;

		margin-bottom: 25px;
		padding: 25px;
	}

	/* portrait
 	 * ================================================= */

	.portrait {
		margin: 0 auto;
		text-align: center;
		height: 130px;
	}

	.portrait .portrait-image {
		width: 130px;
		display: inline-block;
	}

	.portrait img {
		width: 100%;
	}

	.portrait .divider {
		width: 100px;
		margin: 0 25px;
		border-top: 2px solid #d5bdc8;
		display: inline-block;
		height: 50%;
	}

	/* Linkbar
	 * ================================================= */

	ul.linkbar {
		text-align: right;
	}

	ul.linkbar li {
		padding: 0;
		margin: 0;
		list-style: none;
		display: inline-block;
		margin-left: 10px;
	}

	/* Header
 * ================================================= */

	.header {
		text-align: center;
		left: 50%;
		top: 0px;
		width: 500px;
	}

	// Header for the home page only
	.fixed-header {
		position: sticky;
		transform: translateX(-50%);
		border-radius: 50px;
		backdrop-filter: blur(3px) saturate(80%);
		border-top: 1px solid rgba(255, 255, 255, 0.5);
		border-right: 1px solid rgba(255, 255, 255, 0.5);
		box-shadow:
			inset 10px 10px 20px rgba(250, 255, 153, 0.1),
			inset 2px 2px 5px rgba(195, 231, 255, 0.2),
			inset -10px -10px 20px rgba(190, 237, 253, 0.1),
			inset -2px -2px 30px rgba(226, 248, 255, 0.2);
	}

	.header .scant-bio {
		font-size: 0.75em;
	}

	h1.head {
		width: 100%;
		font-size: 1.4em;
		font-weight: bold;

		font-family: 'Lane - Narrow';
		font-size: 0.85em;
	}

	/* social buttons
     * ================================================= */

	ul.social-buttons {
		margin-top: 25px;
		list-style: none;
		text-align: center;
	}

	.social-buttons li {
		display: inline-block;
		height: 35px;
		line-height: 35px;
		margin: 0 10px;

		a {
			filter: saturate(50%);
		}

		a:hover {
			filter: saturate(120%);
		}
	}
</style>
