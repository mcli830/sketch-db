import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layouts/DefaultLayout"
import SEO from "../components/meta/SEO"

const IndexPage = () => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Home" />
      <h1>{site.siteMetadata.title}</h1>
      <p>{site.siteMetadata.description}</p>
      <Link to="/app/">Launch</Link>
    </Layout>
  );
}

export default IndexPage
