import { getPosts } from '$lib/Posts/Posts.js';

export const prerender = true;

const name = 'Christopher Broome';
const website = 'https://www.christopherbroome.com';

export async function GET() {
	const postData = await getPosts();

	const posts = postData.map((post) => {
		return `
          <item>
            <title>${post.title}</title>
            <link>https://www.christopherbroome.com/blog/${post.slug}</link>
            <description><![CDATA[${post.description}]]></description>
        </item>`;
	});

	const resp = new Response(
		`<?xml version="1.0" encoding="UTF-8" ?>	
    <rss xmlns:dc="https://purl.org/dc/elements/1.1/" xmlns:content="https://purl.org/rss/1.0/modules/content/" xmlns:atom="https://www.w3.org/2005/Atom" version="2.0">
    <channel>
        <title>${name}</title>
        <link>${website}</link>
        <description>Full Stack Web Developer</description>
        ${posts.join('\n')}
      </channel>
    </rss>`,
		{ headers: [['Content-Type', 'application/xml']] }
	);

	return resp;
}
