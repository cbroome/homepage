import { error } from '@sveltejs/kit';
import type { EntryGenerator } from './$types';
import { getPosts } from '$lib/Posts/Posts';

export const prerender = true;

export const entries: EntryGenerator = async () => {
	const posts = await getPosts();
	return posts.map((post) => ({ slug: post.slug }));
};

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
