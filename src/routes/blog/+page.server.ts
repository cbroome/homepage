import { getPosts } from '$lib/Posts/Posts.js';

export const prerender = true;
export const csr = false;

export async function load() {
	const posts = await getPosts();
	return { posts };
}
