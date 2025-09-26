import { getPosts } from '$lib/Posts/Posts';
import { json } from '@sveltejs/kit';

export const prerender = true;

export async function GET() {
	const posts = await getPosts();
	return json(posts);
}
