import { getPosts } from '#lib/Posts/Posts.js';
import { json } from '@sveltejs/kit';

export const prerender = true;

export async function GET() {
	const posts = await getPosts();
	return json(posts);
}
