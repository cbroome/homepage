---
title: A Standard Site
description: Upgrading to support standard.site for AT Proto
date: '2026-09-18'
categories:
draft: false
atUri: "at://did:plc:eyzzcmlcbxsil637pzxurefj/site.standard.document/3mtfbaeonzl2z"
---

[Standard Site](https://standard.site) is the new hotness in the Atmosphere. To my eyes this looks like OpenGraph except with an extra smattering of the DID for identity, just to make things a little more complicated. 

This is a Svelte static site so it's a little trickier than dynamic, server-rendered content for this purpose. Fortunately there's already a tool out to help enable static sites called [Sequoia](https://sequoia.pub/). A few command line prompts and I was good to go. 

The process creates a `sequoia.json` file in the project root, and after my commands my file looked like:

```json
{
  "$schema": "https://tangled.org/stevedylan.dev/sequoia/raw/main/sequoia.schema.json",
  "siteUrl": "https://www.christopherbroome.com",
  "contentDir": "./src/posts",
  "publicDir": "./static",
  "outputDir": "./build",
  "pathPrefix": "/blog",
  "publicationUri": "at://did:plc:eyzzcmlcbxsil637pzxurefj/site.standard.publication/...",
  "pdsUrl": "https://phellinus.us-west.host.bsky.network",
  "frontmatter": {
    "publishDate": "date",
    "coverImage": "image",
    "draft": "draft"
  },
  "publishContent": true
}
```