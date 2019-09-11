import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const FluidContainer = styled.div`
  margin: auto;
  max-width: 600px;
  min-height: ${({ fill }) => {
    return fill === 'parent' ? '100%' : fill === 'window' ? '100vh' : null;
  }};
`

const Container = ({ children, className, style, fill }) => (
  <FluidContainer
    className={className}
    style={style}
  >
    {children}
  </FluidContainer>
)

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  fill: PropTypes.string,
}

Container.defaultProps = {
  className: '',
  style: {},
  fill: 'none',
}

export default Container;
