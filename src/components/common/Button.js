import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { white, primary } from '../../vars/theme'

const Button = styled.button.attrs(props => ({
  onClick: props.onClick
}))`
  background-color: transparent;
  padding: 0.5em 1em;
  border-radius: 8px;
  color: ${({color}) => color};
  border: ${({ border, color }) => {
    return border > 0 ? `${border}px solid ${color}` : 'none';
  }};
  cursor: pointer;
  &:hover {
    color: ${white};
    background-color: ${({color}) => color}
  }
  &:focus,
  &:active {
    outline: none;
  }
`

Button.propTypes = {
  color: PropTypes.string,
  border: PropTypes.number,
  onClick: PropTypes.func,
}

Button.defaultProps = {
  color: primary,
  border: 2,
}

export default Button;
