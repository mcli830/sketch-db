import React from 'react'
import PropTypes from 'prop-types'

const DropShadow = ({id, dx, dy, stdDeviation, color, opacity }) => (
  <filter id={id} x='-40%' y='-40%' width='180%' height='180%'>
    <feDropShadow in='SourceGraphic' dx={dx} dy={dy} stdDeviation={stdDeviation} floodColor={color} floodOpacity={opacity} />
  </filter>
)

DropShadow.propTypes = {
  id: PropTypes.string.isRequired,
  dx: PropTypes.number,
  dy: PropTypes.number,
  stdDeviation: PropTypes.number,
  color: PropTypes.string,
  opacity: PropTypes.number,
}

DropShadow.defaultProps = {
  dx: 2,
  dy: 2,
  stdDeviation: 4,
  color: '#444',
  opacity: 0.5,
}

export default DropShadow
