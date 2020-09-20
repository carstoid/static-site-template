# Manual

This is the office manual for an as-yet-unnamed design practice. It includes the following sections:

1. Culture
  - Branding, advertising, internal culture. The story being sold.
2. Standards
  - General format, organization and design guidelines for everything from drawings to text to file storage.
  - Each section or subject (e.g. Line Weight) is stored in a separate markdown file based on \_template.md within the directory.
3. Observation
  - Workflows on initial research, fact-finding, and problem definition supplemented by referrals to outside resources.
4. Documentation
  - Workflows and specific process knowledge for producing drawings, images, and other document-based deliverables, as well as referrals to outside resources.
5. Fabrication
  - Knowledge on prototyping, manufacturing and building construction and other physical deliverables or works, as well as referrals to outside resources.
6. Glossary.
  - Definitions of useful terms.
  - Is organized as a single directory of individual markdown files for each term, based on \_template.md.

## Development Workflow

Run a local development server: from the `site-src` directory, `npx gatsby develop`. If you'd like the site to be available on your LAN, add `-H 0.0.0.0` to the command.

Deploy to GitHub pages: from the `site-src` directory, run `npm run deploy`. 

## To-Do

- Check scaling/responsive behavior for slides on phones/tablets
  - for pages
  - for slides (fix scroll problem)
- Page anchors on slides for permalinks
- Worth it to use `gatsby-remark-images` or would be better to use `gatsby-remark-copy-linked-files`. Styling the former is very time-consuming, advantage is images are auto-optimized...