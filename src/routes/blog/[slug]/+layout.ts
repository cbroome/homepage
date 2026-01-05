import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const { slug } = params;
	try {
		const post = await import(`../../../posts/${slug}.md`);

		return {
			content: post.default,
			meta: post.metadata,
			slug
		};
	} catch (e) {
		error(404, `Could not find ${slug}`);
	}
}
