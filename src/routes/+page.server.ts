import { getPosts } from '$lib/Posts/Posts';

export const prerender = true;

export async function load() {
	const posts = await getPosts();
	return { posts };
}
