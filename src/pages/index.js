import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from 'styled-components'

import Layout from "../components/layouts/BaseLayout"
import SEO from "../components/meta/SEO"
import Container from '../components/common/Container'
import Link from '../components/common/Link'
import Button from '../components/common/Button'
import Banner from '../components/home/Banner'

const Header = styled.h1`
  color: white;
`

const Content = styled(Container).attrs(props => ({
  fill: 'parent'
}))`
  text-align: center;
  padding: 2em 0;
`

const Text = styled.p`
  margin-bottom: 2em;
`

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
      <Banner>
        <Header>{site.siteMetadata.title.toLowerCase()}</Header>
      </Banner>
      <Content>
        <Text>{site.siteMetadata.description}</Text>
        <Link to="/app">
          <Button>Launch</Button>
        </Link>
      </Content>
    </Layout>
  );
}

export default IndexPage
