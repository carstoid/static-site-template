import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../layouts/default';

export default function Template({ data }) {
  console.log(data)
  const { sitePage, site } = data
  const { siteMetadata } = site
  const { context: { html }} = sitePage // frontmatter is available here too

  return (
    <Layout siteMetadata={siteMetadata}>
      <div className="col-span-3" dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  )
};

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    sitePage(path: { eq: $slug }) {
      path
      context {
        html
        frontmatter {
          slug
          title
        }
      }
    }
  }
`;