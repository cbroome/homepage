type Categories = 'sveltekit' | 'svelte';

type Post = {
	title: string;
	slug: string;
	description: string;
	date: string;
	categories: Categories[];
	published: boolean;
};
