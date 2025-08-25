<slot />

<div class="footer">
	&copy; 2025 |

	<a href="https://github.com/cbroome/homepage" target="_blank">Source Code</a>
</div>

<style lang="scss">
	:global {
		/**
 * http://colorschemedesigner.com/#3u21TeJiO-5ZC
 * https://kuler.adobe.com/Clustered-color-theme-3230414/
 */

		/**
 * http://www.fontsquirrel.com/fonts/Lane
 */

		@font-face {
			font-family: 'Lane - Narrow';
			src: url('../lib/lanenar_-webfont.eot');
			src:
				url('../lib/lanenar_-webfont.eot?#iefix') format('embedded-opentype'),
				url('../lib/lanenar_-webfont.woff') format('woff'),
				url('../lib/lanenar_-webfont.ttf') format('truetype'),
				url('../lib/lanenar_-webfont.svg#lane_-_narrowregular') format('svg');
			font-weight: normal;
			font-style: normal;
		}

		body {
			font-family: 'Fjord One', serif;
			font-size: 35px;
			margin: 0;
			padding: 0;
			color: #81616a;
			background: #fffcee;

			background-size: 150% 150%;

			background: radial-gradient(circle, rgba(255, 252, 238, 1) 43%, rgb(255, 248, 223) 88%);
		}

		.section {
			margin: 0 auto;
		}

		a {
			color: #0d9ffe;
			text-decoration: none;
		}

		/*

		h1,
		h2,
		h3,
		h4 {
			margin: 0;
			padding: 0;
			font-family: 'Lane - Narrow', Tahoma, sans-serif;
		}
            */

		h1 {
			font-weight: normal;
			font-size: 2em;
		}

		h2 {
			font-size: 1.5em;
		}

		ul {
			padding: 0;
			margin: 0;
		}

		.clearit {
			clear: both;
		}

		.heading-font {
			font-family: 'Lane - Narrow', Tahoma, sans-serif;
		}

		.heading-color {
			color: #60474e;
		}

		.main-display {
			height: 450px;
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

		/* Right
 * ================================================= */
		.right-header-menu {
			padding-top: 5px;
			font-size: 0.67em;
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
			padding-bottom: 0px;
			position: fixed;
			bottom: 0;
			left: 50%;
			transform: translateX(-50%);
		}

		.header .scant-bio {
			font-size: 0.75em;
		}

		h1.head {
			width: 100%;
			font-size: 1.4em;
			font-weight: bold;
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
		}

		/* Footer
 * ================================================= */
		.footer {
			margin-top: 1em;
			margin-bottom: 1em;
			text-align: center;
			font-size: 0.4em;
		}

		/* main-section
 * ================================================= */

		.main-section {
			position: relative;
			height: 0;
			overflow: visible;
			text-align: center;
		}

		.main-section svg {
			margin: 0 auto;
		}

		/* detail view
 * ================================================= */

		.detail-view-column {
			position: absolute;
			left: 33%;
			top: 0;
		}

		.detail-view {
			font-size: 0.55em;
			background: rgba(69, 69, 80);
			text-align: left;
			color: #d0cec6;
		}

		.detail-view a {
			color: #679abc;
		}

		.detail-view .heading-color {
			color: #d0cec6;
		}

		.detail-view .title {
			font-size: 1.67em;
			font-weight: bold;
			border-bottom: 1px solid;
		}

		.detail-view .experience-detail {
			margin: auto 0;
			padding: 1.5em;
		}

		.detail-view .dates {
			font-size: 0.7em;
		}

		.detail-view div {
			margin-bottom: 5px;
		}

		.detail-view a {
			font-size: 0.9em;
		}

		.detail-view .description {
			font-size: 0.9em;
		}

		.detail-view .status {
			text-transform: uppercase;
			font-size: 0.35em;
			display: inline-block;
			border: 1px solid #060046;
			border-radius: 3px;
			padding: 3px;
			width: auto;
			margin: 10px;
			float: right;
		}

		.detail-view .status.active {
			background: #211c5d;
			color: #fff;
		}

		.detail-view .status.inactive {
			border-color: #8a87a0;
			color: #8a87a0;
		}

		.detail-view .related {
			padding-top: 10px;
			font-size: 0.85em;
		}

		.detail-view .related ul {
			list-style: none;
		}

		.detail-view .related li {
			margin-left: 15px;
		}

		/* arrow
 * ================================================= */

		.arrow {
			position: absolute;
			width: 0;
			height: 0;
			left: -24px;
			z-index: 10;

			border-right: 25px solid #acb7de;
			border-top: 25px solid transparent;
			border-bottom: 25px solid transparent;
		}

		.arrow:before {
			content: ' ';
			position: absolute;
			width: 0;
			height: 0;
			top: -25px;
			left: 1px;
			z-index: 11;

			border-right: 25px solid #fff;
			border-top: 25px solid transparent;
			border-bottom: 25px solid transparent;
		}

		/* read-more
 * ================================================= */
		.read-more {
			text-align: center;
		}
	}
</style>
