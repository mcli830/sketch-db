import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layouts/BaseLayout"
import SEO from "../components/meta/SEO"
import Container from '../components/common/Container'

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
      <Container>
        <h1>{site.siteMetadata.title}</h1>
        <p>{site.siteMetadata.description}</p>
        <Link to="/app">Launch</Link>
      </Container>
    </Layout>
  );
}

export default IndexPage
