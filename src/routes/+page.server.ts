import { getPosts } from '$lib/Posts/Posts';
import { json } from '@sveltejs/kit';

export const prerender = true;

export async function load() {
	/*
	const response = await fetch('/api/posts');
	const posts: Post[] = await response.json();
	*/

	const posts = await getPosts();

	return { posts };
}
