<script>
	import CareerGraph from '$lib/CareerGraph/CareerGraph.svelte';
</script>

<section>
	<div class="main-section">
		<div class="col span_8_of_8 main-display">
			<CareerGraph />
		</div>

		<div class="detail-view-column span_3_of_8 main-display"></div>
	</div>
</section>

<section>
	<div class="section header">
		<div class="portrait head">
			<div class="divider"></div>

			<div class="portrait-image">
				<img src="./imgs/portrait-comp.png" alt="Profile" />
			</div>

			<div class="divider"></div>
		</div>

		<h1 class="head heading-color">Christopher Broome</h1>

		<div class="scant-bio heading-font">Full Stack Web Developer / Baltimore, MD</div>

		<ul class="social-buttons heading-font">
			<li>
				<a href="http://www.linkedin.com/pub/chris-broome/1b/154/251" target="_blank">
					<img src="imgs/linkedin.png" alt="LinkedIn" />
				</a>
			</li>

			<li>
				<a href="https://github.com/cbroome" target="_blank">
					<img src="imgs/github.png" alt="GitHub" />
				</a>
			</li>
		</ul>

		<div class="footer">
			&copy; 2025 |

			<a href="https://github.com/cbroome/homepage" target="_blank">Source Code</a>
		</div>
	</div>
</section>
