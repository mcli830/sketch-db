/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled from 'styled-components'

import "./reset.css"

const FluidContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-bottom: 1em;
`
const Content = styled.main`
  flex: 1 1 auto;
`
const Footer = styled.footer`
  text-align: center;
  flex: 0 0 auto;
  opacity: 0.7;
`

const BaseLayout = ({ children }) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          author
          authorPage
        }
      }
    }
  `)

  return (
    <FluidContainer>
      <Content>{children}</Content>
      <Footer>
        © {new Date().getFullYear()}, Built by
        {` `}
        <a href={site.siteMetadata.authorPage}>{site.siteMetadata.author}</a>
      </Footer>
    </FluidContainer>
  )
}

BaseLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default BaseLayout
