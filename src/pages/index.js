import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layouts/BaseLayout"
import SEO from "../components/meta/SEO"
import Container from '../components/common/Container'
import Link from '../components/common/Link'
import Button from '../components/common/Button'

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
      <Container fill='parent' style={{
        textAlign: 'center'
      }}>
        <h1>{site.siteMetadata.title.toLowerCase()}</h1>
        <p>{site.siteMetadata.description}</p>
        <Link to="/app">
          <Button>Launch</Button>
        </Link>
      </Container>
    </Layout>
  );
}

export default IndexPage
