import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { black } from '../../vars/theme'

const Banner = styled.div`
  background: ${({background}) => background};
  height: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

Banner.propTypes = {
  background: PropTypes.string,
}

Banner.defaultProps = {
  background: `repeating-linear-gradient(
      70deg,
      transparent, transparent 159px,
      #717171 159px, #717171 160px
    ), repeating-linear-gradient(
      transparent, transparent 159px,
      #717171 159px, #717171 160px
    ), repeating-linear-gradient(
      70deg,
      transparent, transparent 79px,
      #5c5c5c 79px, #5c5c5c 80px
    ), repeating-linear-gradient(
      transparent, transparent 79px,
      #5c5c5c 79px, #5c5c5c 80px
    ), repeating-linear-gradient(
      70deg,
      transparent, transparent 15px,
      #484848 15px, #484848 16px
    ), repeating-linear-gradient(
      transparent, transparent 15px,
      #484848 15px, #484848 16px
    ), ${black}; }
  `
}

export default Banner;
